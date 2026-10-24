'use server';

import { ActionError } from '@/app/action-error';
import type {
  RankStructure,
  RankSubmissionStatus,
} from '@/app/schemas/rank-calculator';
import { serverConstants } from '@/config/constants.server';
import {
  rankSubmissionKey,
  rankSubmissionMetadataKey,
  userOSRSAccountsKey,
} from '@/config/redis';
import { discordBotClient } from '@/discord';
import { redis, redisRaw } from '@/redis';
import { Routes } from 'discord-api-types/v10';
import { assignRankDiscordRole } from './assign-rank-discord-role';
import { sendDiscordMessage } from '@/app/rank-calculator/utils/send-discord-message';
import dedent from 'dedent';
import { getRankName } from '@/app/rank-calculator/utils/get-rank-name';
import type { Player } from '@/app/schemas/player';
import type { Rank } from '@/config/enums';
import * as Sentry from '@sentry/node';

type ApproveSubmissionInput = {
  submissionId: string;
  rank: Rank;
} & (
  | {
      approverId: string;
      isAutomatic?: false;
    }
  | {
      approverId?: never;
      isAutomatic: true;
    }
);

export async function approveSubmission({
  submissionId,
  rank,
  approverId,
  isAutomatic = false,
}: ApproveSubmissionInput) {
  const metadata = (await redisRaw.hmget(
    rankSubmissionMetadataKey(submissionId),
    'status',
    'discordMessageId',
    'submittedBy',
  )) as unknown as [RankSubmissionStatus, string, string];

  if (!metadata) {
    throw new ActionError('Unable to find submission metadata');
  }

  const [submissionStatus, messageId, submitterId] = metadata;

  if (submissionStatus !== 'Pending') {
    throw new ActionError('Submission does not need to be moderated!');
  }

  const submissionData = await redis.json.get<{
    '$.playerName': [string];
    '$.rankStructure': [RankStructure];
  }>(rankSubmissionKey(submissionId), '$.rankStructure', '$.playerName');

  if (!submissionData) {
    throw new ActionError('Unable to find submission data for application');
  }

  const {
    '$.playerName': [playerName],
    '$.rankStructure': [rankStructure],
  } = submissionData;

  if (rankStructure === 'Standard') {
    await discordBotClient.put(
      Routes.channelMessageOwnReaction(
        serverConstants.discord.channelId,
        messageId,
        encodeURIComponent('☑️'),
      ),
    );
    await assignRankDiscordRole(rank, submitterId);

    await sendDiscordMessage(
      {
        content: dedent`
          <@${submitterId}>

          Your application has been ${
            isAutomatic
              ? 'automatically approved'
              : `approved by <@${approverId}>`
          } and you have been assigned the ${getRankName(rank)} role on Discord.

          Please reach out to any member of staff to update your in-game rank!
        `,
      },
      messageId,
    );
  } else {
    await sendDiscordMessage(
      {
        content: dedent`
          <@${submitterId}>

          Your application has been approved by <@${approverId}>.

          Please reach out to a mod or key to update your ranks!
        `,
      },
      messageId,
    );
  }

  const playerRecord = (await redis.hget(
    userOSRSAccountsKey(submitterId),
    playerName.toLowerCase(),
  ))!;

  if (!playerRecord) {
    throw new ActionError('Unable to find player record!');
  }

  const transaction = redis.multi();

  const actionedBy = isAutomatic ? 'System' : approverId;

  if (!actionedBy) {
    Sentry.captureException('Unable to determine actionedBy for approval');

    throw new ActionError('Something went wrong while approving submission');
  }

  transaction.hset<string>(rankSubmissionMetadataKey(submissionId), {
    status: 'Approved',
    actionedBy,
    automaticApproval: isAutomatic ? 'true' : 'false',
  });

  transaction.hset<Omit<Player, 'joinDate' | 'rsn' | 'isMobileOnly'>>(
    userOSRSAccountsKey(submitterId),
    {
      [playerName.toLowerCase()]: { ...playerRecord, rank },
    },
  );

  const result = await transaction.exec();

  if (!result) {
    throw new ActionError('Unable to persist approval to database');
  }

  return { success: true };
}

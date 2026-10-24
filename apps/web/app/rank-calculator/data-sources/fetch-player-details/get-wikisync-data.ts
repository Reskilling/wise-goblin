import { clientConstants } from '@/config/constants.client';
import { isWikiSyncError, WikiSyncResponse } from '@/app/schemas/wiki';
import * as Sentry from '@sentry/nextjs';

export type WikiSyncResult =
  | { status: 'found'; data: WikiSyncResponse }
  | { status: 'not-found' }
  | { status: 'unavailable' };

export async function getWikiSyncData(
  player: string,
): Promise<WikiSyncResult> {
  try {
    const wikiSyncResponse = await fetch(
      `${clientConstants.wikiSync.baseUrl}/runelite/player/${player}/STANDARD`,
      {
        headers: {
          // User agent is required or the API returns a 400
          'User-Agent': 'Wise-Goblin-Rank-Calculator',
        },
      },
    );
    const body: unknown = await wikiSyncResponse.json();

    // WikiSync answers with an error body (e.g. NO_USER_DATA) when the player hasn't synced
    if (isWikiSyncError(body)) {
      Sentry.captureMessage('WikiSync data not found', {
        level: 'info',
        extra: { code: body.code },
      });

      return { status: 'not-found' };
    }

    return { status: 'found', data: WikiSyncResponse.parse(body) };
  } catch (error) {
    // Network failures and unexpected response shapes are real problems worth alerting on
    Sentry.captureException(error);

    return { status: 'unavailable' };
  }
}

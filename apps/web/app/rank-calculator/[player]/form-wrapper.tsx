'use client';

import { FormProvider } from 'react-hook-form';
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { Rank } from '@/config/enums';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { RankCalculator } from './rank-calculator';
import {
  RankCalculatorSchema,
  RankCalculatorValidator,
} from './submit-rank-calculator-validation';
import { RankCalculatorNavigationActions } from '../components/rank-calculator-navigation-actions';
import { Navigation } from '../components/navigation';
import { saveDraftRankSubmissionAction } from './actions/save-draft-rank-submission-action';
import { handleToastUpdates } from '../utils/handle-toast-updates';
import { CurrentPlayerProvider } from '../contexts/current-player-context';
import { ItemListProvider } from '../contexts/item-list-context';
import type { ItemCategory } from '@/app/schemas/items';

const warningMessages = {
  templeCollectionLogNotFound:
    'No TempleOSRS collection log found. Install the TempleOSRS RuneLite plugin to track notable items automatically.',
  templeCollectionLogOutdated:
    'Your TempleOSRS collection log is out of date. Sync it from the TempleOSRS RuneLite plugin.',
  wikiSyncNotFound:
    'No WikiSync data found. Install the WikiSync RuneLite plugin and log in to fill in CAs and diaries automatically.',
  wikiSyncUnavailable:
    "Couldn't load your WikiSync data right now. Enter CAs and diaries manually, or try again later.",
} as const;

const warningAutoCloseMs = 15000;

type Warning = keyof typeof warningMessages;

interface FormWrapperProps {
  formData: Omit<RankCalculatorSchema, 'rank' | 'points'>;
  currentRank?: Rank;
  warnings: Record<Warning, boolean>;
  itemList: [string, ItemCategory][];
}

export function FormWrapper({
  formData,
  currentRank,
  warnings,
  itemList,
}: FormWrapperProps) {
  const {
    form,
    action: {
      executeAsync: saveDraftRankSubmission,
      isExecuting,
      isTransitioning,
    },
  } = useHookFormAction(
    saveDraftRankSubmissionAction,
    zodResolver(RankCalculatorValidator),
    {
      formProps: {
        defaultValues: formData,
        criteriaMode: 'all',
        mode: 'onBlur',
      },
    },
  );

  const { formState, reset, getValues } = form;

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset(getValues());
    }
  }, [formState, reset, getValues]);

  const submitRankCalculator = form.handleSubmit(async (data) =>
    handleToastUpdates(saveDraftRankSubmission(data), {
      pending: 'Saving draft...',
      success: {
        render() {
          return 'Draft saved!';
        },
      },
    }),
  );

  useEffect(() => {
    (Object.keys(warningMessages) as Warning[])
      .filter((warning) => warnings[warning])
      .forEach((warning) => {
        // The toast ID stops the same warning stacking up if the effect runs again
        toast.warning(warningMessages[warning], {
          autoClose: warningAutoCloseMs,
          toastId: warning,
        });
      });
  }, [warnings]);

  return (
    <ItemListProvider itemList={itemList}>
      <CurrentPlayerProvider
        rank={currentRank}
        playerName={formData.playerName}
      >
        <FormProvider {...form}>
          <RankCalculator
            submitRankCalculatorAction={submitRankCalculator}
            navigation={
              <Navigation
                actions={
                  <RankCalculatorNavigationActions
                    isActionActive={isExecuting || isTransitioning}
                  />
                }
                shouldRenderBackButton
              />
            }
          />
        </FormProvider>
      </CurrentPlayerProvider>
    </ItemListProvider>
  );
}

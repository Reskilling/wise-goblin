import { Flex, Separator, Text } from '@radix-ui/themes';
import { useFormContext, useWatch } from 'react-hook-form';
import { format, differenceInDays } from 'date-fns';
import { DataCard } from '../data-card';
import { useCalculatorScaling } from '../../hooks/point-calculator/use-calculator-scaling';
import { formatPercentage } from '../../utils/format-percentage';
import { RankCalculatorSchema } from '../../[player]/submit-rank-calculator-validation';
import { Input } from '../input';

export function PlayerCard() {
  const {
    register,
    formState: { defaultValues },
  } = useFormContext<RankCalculatorSchema>();
  const playerName = useWatch<RankCalculatorSchema, 'playerName'>({
    name: 'playerName',
  });
  const joinDate = useWatch<RankCalculatorSchema, 'joinDate'>({
    name: 'joinDate',
  });
  const scaling = useCalculatorScaling();

  // Calculate days since joined (first day counts as Day 1)
  const daysJoined = joinDate ? differenceInDays(new Date(), joinDate) + 1 : 0;

  // Mapping of day ranges to scaling
  const scalingRanges = [
    { range: 'Day 1–15', value: 0.100 },
    { range: 'Day 16–30', value: 0.175 },
    { range: 'Day 31–45', value: 0.250 },
    { range: 'Day 46–60', value: 0.325 },
    { range: 'Day 61–75', value: 0.400 },
    { range: 'Day 76–90', value: 0.475 },
    { range: 'Day 91–105', value: 0.550 },
    { range: 'Day 106–120', value: 0.625 },
    { range: 'Day 121–135', value: 0.700 },
    { range: 'Day 136–150', value: 0.775 },
    { range: 'Day 151–165', value: 0.850 },
    { range: 'Day 166–180', value: 0.925 },
    { range: 'Day 180+', value: 1.000 },
  ];

  return (
    <DataCard.Root>
      <DataCard.Row
        left={
          <Text role="heading" weight="medium" size="2">
            Player
          </Text>
        }
        right={
          <Text aria-label="Player name" weight="medium" size="2">
            {decodeURIComponent(playerName)}
          </Text>
        }
      />
      <Separator size="4" />
      <DataCard.Row
        left={
          <Text color="gray" size="2">
            Join Date
          </Text>
        }
        right={
          <Text aria-label="Join date" size="2">
            {joinDate ? format(joinDate, 'dd MMM yyyy') : 'N/A'}
          </Text>
        }
      />
      {/* Days Since Joined row with readable scaling dropdown */}
      <DataCard.Row
        left={
          <Text color="gray" size="2">
            Days Since Joined
          </Text>
        }
        right={
          <Flex gap="2" align="center">
            <Text size="2">{daysJoined}</Text>
            <select
              value={scaling}
              disabled
              style={{ fontSize: '0.875rem', padding: '2px 4px' }}
            >
              {scalingRanges.map((option) => (
                <option key={option.range} value={option.value}>
                  {option.range} → {option.value.toFixed(3)}
                </option>
              ))}
            </select>
          </Flex>
        }
      />
      <DataCard.Row
        left={
          <Text color="gray" size="2">
            Scaling
          </Text>
        }
        right={
          <Text aria-label="Point scaling" size="2">
            {formatPercentage(scaling)}
          </Text>
        }
      />
      <Flex gap="4" align="center">
        <Text color="gray" size="2">
          Proof Link
        </Text>
        <Flex asChild justify="end" flexShrink="1" flexGrow="1" flexBasis="0">
          <Input
            {...register('proofLink')}
            defaultValue={defaultValues?.proofLink ?? ''}
            size="1"
            hasError={false}
          />
        </Flex>
      </Flex>
    </DataCard.Root>
  );
}

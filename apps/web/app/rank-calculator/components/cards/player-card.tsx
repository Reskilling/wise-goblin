import { useState } from 'react';
import { Flex, Separator, Text, Button } from '@radix-ui/themes';
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

  const daysJoined = joinDate
    ? differenceInDays(new Date(), joinDate) + 1
    : 0;

  const scalingRanges = [
    { range: '1–15', value: 10 },
    { range: '16–30', value: 17.5 },
    { range: '31–45', value: 25 },
    { range: '46–60', value: 32.5 },
    { range: '61–75', value: 40 },
    { range: '76–90', value: 47.5 },
    { range: '91–105', value: 55 },
    { range: '106–120', value: 62.5 },
    { range: '121–135', value: 70 },
    { range: '136–150', value: 77.5 },
    { range: '151–165', value: 85 },
    { range: '166–180', value: 92.5 },
    { range: '181+', value: 100 },
  ];

  const [showScalingList, setShowScalingList] = useState(false);

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

      <DataCard.Row
        left={
          <Text color="gray" size="2">
            Days Joined
          </Text>
        }
        right={
          <Flex direction="column" gap="2">
            <Flex align="center" gap="2">
              <Text size="2">{daysJoined}</Text>
              <Button
                type="button"
                size="1"
                onClick={() => setShowScalingList(!showScalingList)}
              >
                {showScalingList ? 'Hide Scaling Info' : 'Show Scaling Info'}
              </Button>
            </Flex>

            {showScalingList && (
              <Flex
                direction="column"
                gap="1"
                style={{
                  maxHeight: 200,
                  overflowY: 'auto',
                  padding: 8,
                  backgroundColor: 'var(--card-background)',
                  borderRadius: 6,
                  border: '1px solid #ccc',
                }}
              >
                {/* Header */}
                <Flex justify="between">
                  <Text size="2" weight="medium">Days</Text>
                  <Text size="2" weight="medium">Value</Text>
                </Flex>

                {/* Values */}
                {scalingRanges.map((option) => (
                  <Flex key={option.range} justify="between">
                    <Text size="2">{option.range}</Text>
                    <Text size="2" weight="medium">{option.value}%</Text>
                  </Flex>
                ))}
              </Flex>
            )}
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
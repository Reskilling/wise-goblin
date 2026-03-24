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

  const daysJoined = joinDate ? differenceInDays(new Date(), joinDate) + 1 : 0;

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

  const [hovering, setHovering] = useState(false);

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
      {/* Days Joined with hover tooltip for scaling info */}
      <DataCard.Row
        left={
          <Text color="gray" size="2">
            Days Joined
          </Text>
        }
        right={
          <Flex direction="column" align="start" style={{ position: 'relative' }}>
            <Flex align="center" gap="2">
              <Text size="2">{daysJoined}</Text>
              <Button
                type="button"
                size="1"
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => setHovering(false)}
              >
                Show Scaling Info
              </Button>
            </Flex>

            {hovering && (
              <Flex
                direction="column"
                gap="1"
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  backgroundColor: 'white',
                  border: '1px solid #ccc',
                  padding: '8px',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                  zIndex: 10,
                  maxHeight: 200,
                  overflowY: 'auto',
                }}
              >
                {scalingRanges.map((option) => (
                  <Text key={option.range} size="2">
                    {option.range} → {option.value.toFixed(3)}
                  </Text>
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

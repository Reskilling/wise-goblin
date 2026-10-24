import { render, screen } from '@/test-utils/testing-library';
import * as formDataMocks from '@/mocks/misc/form-data';
import { notableItemsExpectedValues } from '@/fixtures/rank-calculator/notable-items-expected-values';
import { MockFormProvider } from '@/test-utils/mock-form-provider';
import { generateScaledPlayerTests } from '@/test-utils/generated-scaled-player-tests';
import { buildTestItemList } from '@/test-utils/build-test-item-list';
import type { ItemCategory } from '@/app/schemas/items';
import { NotableItemsCard } from './notable-items-card';
import { formatPercentage } from '../../utils/format-percentage';
import { formatNumber } from '../../utils/format-number';
import type { NotableItemsPointCalculatorData } from '../../hooks/point-calculator/notable-items/use-notable-items-point-calculator';

let itemList: [string, ItemCategory][];

beforeAll(async () => {
  itemList = await buildTestItemList();
});

generateScaledPlayerTests<NotableItemsPointCalculatorData>(
  formDataMocks,
  notableItemsExpectedValues,
  (formData, expected) => {
    beforeEach(async () => {
      render(
        <MockFormProvider defaultValues={formData} itemList={itemList}>
          <NotableItemsCard />
        </MockFormProvider>,
      );

      await screen.findByRole('heading', { name: /notable items/i });
    });

    it('renders the total points', () => {
      expect(
        screen.getByLabelText(/^total notable items points$/i).textContent,
      ).toBe(formatNumber(expected.pointsAwarded));
    });

    it('renders the points remaining', () => {
      if (expected.pointsRemaining === 0) {
        expect(
          screen.getByLabelText(/^notable items points remaining$/i)
            .textContent,
        ).toBe('Completed');
      } else {
        expect(
          screen.getByLabelText(/^notable items points remaining$/i)
            .textContent,
        ).toBe(`(${formatNumber(expected.pointsRemaining)})`);
      }
    });

    it('renders the point competion percentage', () => {
      expect(
        screen.getByLabelText(/^notable items point completion percentage$/i)
          .textContent,
      ).toBe(formatPercentage(expected.pointsAwardedPercentage));
    });

    it('renders the items collected', () => {
      expect(
        screen.getByLabelText(/^notable items collected$/i).textContent,
      ).toBe(formatNumber(expected.itemsCollected));
    });

    it('renders the total items available', () => {
      const totalItems = itemList.flatMap(([, { items }]) => items).length;

      expect(
        screen.getByLabelText(/^total notable items available$/i).textContent,
      ).toBe(formatNumber(totalItems));
    });

    it('renders the collected items percentage', () => {
      expect(
        screen.getByLabelText(/^notable items collected percentage$/i)
          .textContent,
      ).toBe(formatPercentage(expected.percentageCollected));
    });
  },
);

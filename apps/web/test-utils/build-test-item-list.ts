import { DroppedItemResponse } from '@/app/schemas/wiki';
import { buildNotableItemList } from '@/app/rank-calculator/utils/build-notable-item-list';
import dropRates from '@/fixtures/rank-calculator/drop-rates.json';

/**
 * Builds the notable item list the same way the rank calculator page does,
 * using a snapshot of the OSRS Wiki drop rates (taken 2026-10-24) so tests don't hit the network.
 */
export async function buildTestItemList() {
  // The snapshot is what fetchItemDropRates returned at runtime, which can include null
  // rates for sources the wiki lists as "Always" (e.g. Yama#Contract)
  return Object.entries(
    await buildNotableItemList(dropRates as unknown as DroppedItemResponse),
  );
}

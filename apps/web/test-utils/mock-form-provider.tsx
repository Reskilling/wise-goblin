import { RankCalculatorSchema } from '@/app/rank-calculator/[player]/submit-rank-calculator-validation';
import { ItemListProvider } from '@/app/rank-calculator/contexts/item-list-context';
import type { ItemCategory } from '@/app/schemas/items';
import { PropsWithChildren, Suspense } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

export function MockFormProvider({
  children,
  defaultValues,
  itemList = [],
}: PropsWithChildren<{
  defaultValues: Omit<RankCalculatorSchema, 'rank' | 'points'>;
  itemList?: [string, ItemCategory][];
}>) {
  const form = useForm({
    defaultValues,
  });

  return (
    <ItemListProvider itemList={itemList}>
      <FormProvider {...form}>
        <Suspense>{children}</Suspense>
      </FormProvider>
    </ItemListProvider>
  );
}

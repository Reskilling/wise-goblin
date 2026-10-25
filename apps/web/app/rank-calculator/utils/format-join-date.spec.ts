import { formatJoinDate } from './format-join-date';

it('formats the UTC calendar day, whatever the local timezone', () => {
  expect(formatJoinDate(new Date('2025-07-12T00:00:00Z'))).toBe('12 Jul 2025');
});

it('accepts dates that were serialised to strings', () => {
  expect(formatJoinDate('2025-07-12T00:00:00.000Z' as unknown as Date)).toBe(
    '12 Jul 2025',
  );
});

import { format } from 'date-fns';

/**
 * Join dates are stored as midnight UTC. Formatting them in the viewer's timezone
 * would show the previous day in the Americas (and differ from the server render),
 * so this always formats the UTC calendar day.
 */
export function formatJoinDate(joinDate: Date) {
  const date = new Date(joinDate);

  return format(
    new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()),
    'dd MMM yyyy',
  );
}

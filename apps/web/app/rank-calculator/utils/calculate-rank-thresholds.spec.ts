import { calculateRankThresholds } from './calculate-rank-thresholds';

it('calculates the rank thresholds correctly', () => {
  const maximumAvailablePoints = 228530;
  const rankThresholds = calculateRankThresholds(maximumAvailablePoints);

  expect(rankThresholds).toEqual<typeof rankThresholds>({
    Standard: {
      Helper: 0,
      Oracle: 1,
      Serenist: 5000,
      Quester: 9000,
      Armadylean: 17000,
      Achiever: 27000,
      Guthixian: 38000,
      Explorer: 53000,
      Saradominist: 70000,
      Raider: 89000,
      Zarosian: 109000,
      Gamer: 137000,
      Zamorakian: 177000,
      Adventurer: 221000,
      Bandosian: 274000,
    },
    Legacy: { Legacy: 0 },
    Admin: {
      Captain: 0,
      General: 27000,
      Colonel: 89000,
      Brigadier: 137000,
      Admiral: 221000,
      Marshal: 274000,
    },
    Moderator: { Moderator: 0 },
    'Deputy Owner': { 'Deputy Owner': 0 },
    Owner: { Owner: 0 },
  });
});

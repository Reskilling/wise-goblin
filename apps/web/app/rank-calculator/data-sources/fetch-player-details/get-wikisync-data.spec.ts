import { server } from '@/mocks/server';
import { http, HttpResponse } from 'msw';
import { clientConstants } from '@/config/constants.client';
import { earlyGamePlayerFixture } from '@/mocks/wiki-sync';
import { set } from 'lodash';
import { getWikiSyncData } from './get-wikisync-data';

function respondWith(response: Response) {
  server.use(
    http.get(
      `${clientConstants.wikiSync.baseUrl}/runelite/player/:player/STANDARD`,
      () => response,
    ),
  );
}

it('returns the data when the player has synced', async () => {
  respondWith(HttpResponse.json(earlyGamePlayerFixture));

  const result = await getWikiSyncData('player');

  expect(result.status).toBe('found');
});

it('accepts diary tiers whose "complete" field is null', async () => {
  const fixture = structuredClone(earlyGamePlayerFixture);

  set(
    fixture,
    ['achievement_diaries', 'Western Provinces', 'Easy', 'complete'],
    null,
  );
  respondWith(HttpResponse.json(fixture));

  const result = await getWikiSyncData('player');

  expect(result.status).toBe('found');
});

it('reports "not-found" when WikiSync has no data for the player', async () => {
  respondWith(
    HttpResponse.json(
      { code: 'NO_USER_DATA', error: 'No user data found.' },
      { status: 400 },
    ),
  );

  const result = await getWikiSyncData('player');

  expect(result).toEqual({ status: 'not-found' });
});

it('reports "unavailable" when WikiSync cannot be reached', async () => {
  respondWith(HttpResponse.error());

  const result = await getWikiSyncData('player');

  expect(result).toEqual({ status: 'unavailable' });
});

it('reports "unavailable" when WikiSync returns an unexpected response', async () => {
  respondWith(HttpResponse.json({ unexpected: true }));

  const result = await getWikiSyncData('player');

  expect(result).toEqual({ status: 'unavailable' });
});

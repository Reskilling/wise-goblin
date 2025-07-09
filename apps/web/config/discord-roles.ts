import {
  TavernDiarySection,
  TavernDiaryTier,
} from '@/app/schemas/tavern-diaries';
import { StandardRank } from './ranks';

export const rankDiscordRoles = {
  Helper: '1275198438971146240',
  Oracle: '845833173416804392',
  Serenist: '846392447629262868',
  Quester: '846392037099962409',
  Armadylean: '845832454090129428',
  Achiever: '1275199994944688170',
  Guthixian: '845832341499019284',
  Explorer: '845832086690463801',
  Saradominist: '845831852543311872',
  Raider: '1275200753778036868',
  Zarosian: '845831429514723360',
  Gamer: '846392933556682773',
  Zamorakian: '1275200867133558876',
  Adventurer: '1275200966181916792',
  Bandosian: '1374495177904881714',
} satisfies Record<StandardRank, string>;

export const tavernDiaryDiscordRoles = {
  'Collection Log': new Map<TavernDiaryTier, string>([
    ['Drunkard', '1368972998744477807'],
    ['Bartender', '1368973172929724517'],
    ['Landlord', '1368973243876245564'],
    ['Baron', '1368973306493141042'],
    ['Duke', '1368973376542212126'],
  ]),
  Combat: new Map<TavernDiaryTier, string>([
    ['Drunkard', '1368972199494422590'],
    ['Bartender', '1368972375806181578'],
    ['Landlord', '1368972466474717214'],
    ['Baron', '1368972527522680894'],
    ['Duke', '1368972613338271744'],
  ]),
  Skilling: new Map<TavernDiaryTier, string>([
    ['Drunkard', '1368972674713387048'],
    ['Bartender', '1368972745681014784'],
    ['Landlord', '1368972813494386861'],
    ['Baron', '1368972884252295369'],
    ['Duke', '1368972944893542534'],
  ]),
} as const satisfies Record<TavernDiarySection, Map<TavernDiaryTier, string>>;

export const achievementDiscordRoles = {
  Grandmaster: '1042811412063465543',
  'Blood Torva': '1138949636103610489',
} as const;

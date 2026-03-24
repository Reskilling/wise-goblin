import {
  TavernDiarySection,
  TavernDiaryTier,
} from '@/app/schemas/tavern-diaries';
import { StandardRank } from './ranks';

export const rankDiscordRoles = {
  Helper: '1392375757451558942',
  Oracle: '1392376531166429184',
  Serenist: '1392376668772892772',
  Quester: '1392376787258052689',
  Armadylean: '1392377351287083099',
  Achiever: '1392377513212117174',
  Guthixian: '1392377597454979082',
  Explorer: '1392377698986233916',
  Saradominist: '1392377769979019344',
  Raider: '1392377852175056966',
  Zarosian: '1392377923280961637',
  Gamer: '1392378062355697694',
  Zamorakian: '1392378155540418590',
  Adventurer: '1392378234674479266',
  Bandosian: '1392378317738610798',
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

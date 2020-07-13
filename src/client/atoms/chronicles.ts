export interface Chronicle {
  id: string;
  name: string;
  startingDate?: string;
  city?: string;
  game: string[];
  gameName: string;
  /**
   * Brief summary of all characters in the game
   */
  characters: Array<Character>;
  pitch?: string;
  playStyle: 'session' | 'pbp';
  description?: string;
  plotHook: string;
  // game themes
  // chronicle tenants
}

export interface Character {
  name: string;
  type: 'player' | 'npc';
}

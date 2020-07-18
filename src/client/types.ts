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
  /**
   * Reason players should join your game
   */
  pitch?: string;
  playStyle: 'session' | 'pbp';
  /**
   * Detailed description of the game and world
   */
  description?: string;
  /**
   * Plot hook for players
   */
  plotHook?: string;
  // game themes
  // chronicle tenants
}

export interface Character {
  name: string;
  type: 'player' | 'npc';
}

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
  characters: Array<{
    name: string;
    type: 'player' | 'npc';
  }>;
  // summary
  // description:
  // game tenets
}

import { Injectable } from '@angular/core';
import { BOARD_LAYOUT } from '../constants/board-layout';
import { BoardCell } from '../models/game-state-model';

export interface PlacedTile {
  index: number;
  cell: BoardCell;
}

export interface ScoreResult {
  baseScore: number;
  wordScores: number[];
  totalScore: number;
}

@Injectable({ providedIn: 'root' })
export class ScoreService {
  // Calculate score for a single word
  calculateWordScore(placedTiles: PlacedTile[]): ScoreResult {
    if (placedTiles.length === 0) {
      return { baseScore: 0, wordScores: [], totalScore: 0 };
    }

    let baseScore = 0;
    let wordMultiplier = 1;
    const wordScores: number[] = [];

    // First pass: letter scores with multipliers
    for (const tile of placedTiles) {
      if (!tile.cell) continue;
      
      const layoutType = BOARD_LAYOUT[tile.index];
      let letterMultiplier = 1;

      switch (layoutType) {
        case 'LTT':
          letterMultiplier = 3;
          break;
        case 'LTD':
          letterMultiplier = 2;
          break;
      }

      const letterScore = tile.cell.points * letterMultiplier;
      baseScore += letterScore;

      if (layoutType === 'TWD') {
        wordMultiplier *= 3;
      } else if (layoutType === 'WLD') {
        wordMultiplier *= 2;
      }
    }

    // Apply word multiplier to base score
    let totalScore = baseScore * wordMultiplier;

    // Calculate individual word scores for display
    let runningScore = 0;
    for (let i = 0; i < placedTiles.length; i++) {
      const tile = placedTiles[i];
      if (!tile.cell) continue;
      
      const layoutType = BOARD_LAYOUT[tile.index];
      let letterMultiplier = 1;

      switch (layoutType) {
        case 'LTT':
          letterMultiplier = 3;
          break;
        case 'LTD':
          letterMultiplier = 2;
          break;
      }

      runningScore += tile.cell.points * letterMultiplier;
      wordScores[i] = runningScore;
    }

    // Apply word multiplier to each score in wordScores
    if (wordMultiplier > 1) {
      for (let i = 0; i < wordScores.length; i++) {
        wordScores[i] *= wordMultiplier;
      }
    }

    return {
      baseScore,
      wordScores,
      totalScore,
    };
  }

  /**
   * Get the letter multiplier for a given board index.
   */
  getLetterMultiplier(index: number): number {
    const layoutType = BOARD_LAYOUT[index];
    switch (layoutType) {
      case 'LTT':
        return 3;
      case 'LTD':
        return 2;
      default:
        return 1;
    }
  }

  /**
   * Get the display text for a given board index.
   */
  getLayoutDisplayText(index: number): string {
    const layoutType = BOARD_LAYOUT[index];
    switch (layoutType) {
      case 'LTT':
        return '3L';
      case 'LTD':
        return '2L';
      case 'TWD':
        return '3W';
      case 'WLD':
        return '2W';
      default:
        return '';
    }
  }

  /**
   * Get the word multiplier for a given board index.
   */
  getWordMultiplier(index: number): number {
    const layoutType = BOARD_LAYOUT[index];
    switch (layoutType) {
      case 'TWD':
        return 3;
      case 'WLD':
        return 2;
      default:
        return 1;
    }
  }
}

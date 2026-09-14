import { Injectable, signal } from '@angular/core';
import { TileModel } from '../models/tile-model';
import { TILE_DISTRIBUTION } from '../constants/tile-distribution';

// Manages the tile bag: shuffling, drawing, and returning tiles
@Injectable({ providedIn: 'root' })
export class TileBagService {
  private bag = signal<TileModel[]>([]);
  private _nextId = 1;

  get count(): number {
    return this.bag().length;
  }

  readonly bagState = this.bag.asReadonly();

  // Initialize bag with 100-tile distribution
  initialize(): void {
    const tiles: TileModel[] = TILE_DISTRIBUTION.map((t) => ({
      ...t,
      id: `tile-${this._nextId++}`,
    }));
    this.bag.set(tiles);
  }

  // Fisher-Yates shuffle
  shuffle(): void {
    const tiles = [...this.bag()];
    for (let i = tiles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
    }
    this.bag.set(tiles);
  }

  // Blind draw — returns null if bag is empty
  drawOne(): TileModel | null {
    const tiles = this.bag();
    if (tiles.length === 0) return null;
    // Draw from the end (top of the bag)
    const tile = tiles.pop()!;
    this.bag.set(tiles);
    return tile;
  }

  // Returns fewer than n if bag runs dry
  draw(n: number): TileModel[] {
    const drawn: TileModel[] = [];
    for (let i = 0; i < n; i++) {
      const tile = this.drawOne();
      if (tile) drawn.push(tile);
    }
    return drawn;
  }

  returnTiles(tiles: TileModel[]): void {
    const current = [...this.bag(), ...tiles];
    this.bag.set(current);
    this.shuffle();
  }

  // Re-initialize + shuffle
  reset(): void {
    this._nextId = 1;
    this.initialize();
    this.shuffle();
  }
}

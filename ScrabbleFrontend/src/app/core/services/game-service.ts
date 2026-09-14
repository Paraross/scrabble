import { Injectable, signal, computed, inject } from '@angular/core';
import { GameStateModel, BoardCell } from '../models/game-state-model';
import { TileModel } from '../models/tile-model';
import { TileBagService } from './tile-bag-service';

@Injectable({ providedIn: 'root' })
export class GameService {
    private tileBag = inject(TileBagService);

    private boardSignal = signal<BoardCell[]>(new Array(225).fill(null));
    private rackSignal = signal<TileModel[]>([]);

    readonly board = this.boardSignal.asReadonly();
    readonly rack = this.rackSignal.asReadonly();

    readonly bagCount = computed(() => this.tileBag.count);

    private selectedIdsSignal = signal<Set<string>>(new Set());
    readonly selectedIds = this.selectedIdsSignal.asReadonly();

    // Reset bag, clear board, deal 7 tiles
    initGame(): void {
        this.tileBag.reset();
        this.boardSignal.set(new Array(225).fill(null));
        this.rackSignal.set(this.tileBag.draw(7));
        this.selectedIdsSignal.set(new Set());
    }

    placeTile(index: number, tile: TileModel): void {
        const currentBoard = this.boardSignal();
        currentBoard[index] = tile;
        this.boardSignal.set(currentBoard);
    }

    // Rack interaction

    toggleTileSelection(tileId: string): void {
        const current = new Set(this.selectedIdsSignal());
        if (current.has(tileId)) {
            current.delete(tileId);
        } else {
            current.add(tileId);
        }
        this.selectedIdsSignal.set(current);
    }

    clearSelection(): void {
        this.selectedIdsSignal.set(new Set());
    }

    getSelectedTiles(): TileModel[] {
        const ids = this.selectedIdsSignal();
        return this.rackSignal().filter((t) => ids.has(t.id));
    }

    removeTiles(tileIds: string[]): TileModel[] {
        const current = [...this.rackSignal()];
        const removed: TileModel[] = [];
        const remaining = current.filter((t) => {
            if (tileIds.includes(t.id)) {
                removed.push(t);
                return false;
            }
            return true;
        });
        this.rackSignal.set(remaining);
        this.clearSelection();
        return removed;
    }

    // Draw replacement tiles to refill the rack
    drawTiles(count: number): TileModel[] {
        const drawn = this.tileBag.draw(count);
        this.rackSignal.set([...this.rackSignal(), ...drawn]);
        return drawn;
    }

    // Return placed tiles to bag and draw replacements
    replenishRack(placedTileIds: string[]): void {
        const count = placedTileIds.length;
        // Draw replacements first
        const drawn = this.tileBag.draw(count);
        // Return old tiles to bag
        const currentRack = [...this.rackSignal()];
        const returned = currentRack.filter((t) => placedTileIds.includes(t.id));
        this.tileBag.returnTiles(returned);
        // Add drawn tiles to rack
        this.rackSignal.set([...currentRack.filter((t) => !placedTileIds.includes(t.id)), ...drawn]);
        this.clearSelection();
    }

    // Exchange tiles: trade in tiles and draw replacements
    exchangeTiles(tileIds: string[]): TileModel[] | null {
        if (this.tileBag.count < 7) return null;

        const count = tileIds.length;
        // Draw replacements first
        const drawn = this.tileBag.draw(count);
        // Return old tiles to bag
        const currentRack = [...this.rackSignal()];
        const returned = currentRack.filter((t) => tileIds.includes(t.id));
        this.tileBag.returnTiles(returned);
        // Update rack
        this.rackSignal.set([...currentRack.filter((t) => !tileIds.includes(t.id)), ...drawn]);
        this.clearSelection();
        return drawn;
    }
}

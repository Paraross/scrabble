import { Injectable, signal} from '@angular/core';
import { GameStateModel, BoardCell } from '../models/game-state-model';
import { TileModel } from '../models/tile-model';


@Injectable({ providedIn: 'root' })
export class GameService {
    private boardSignal = signal<BoardCell[]>(new Array(225).fill(null));
    private rackSignal = signal<TileModel[]>([]);

    readonly board = this.boardSignal.asReadonly();
    readonly rack = this.rackSignal.asReadonly();

    placeTile(index: number, tile: TileModel): void {
        const currentBoard = this.boardSignal();
        currentBoard[index] = tile;
        this.boardSignal.set(currentBoard);
    }
}

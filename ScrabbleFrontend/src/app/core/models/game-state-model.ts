import { TileModel } from './tile-model';

export type BoardCell = TileModel | null;

export interface GameStateModel {
    board: BoardCell[]; //15x15
    rack: TileModel[];
    currentTurn: number; //1 or 2
}

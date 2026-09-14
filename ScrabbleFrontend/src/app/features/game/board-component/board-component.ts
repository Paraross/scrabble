import { Component, inject   } from '@angular/core';
import { GameService } from '../../../core/services/game-service';
import { BoardCell } from '../../../core/models/game-state-model';
import { TileComponent } from '../../../shared/components/tile-component/tile-component';
import { BOARD_LAYOUT } from '../../../core/constants/board-layout';
import { ScoreService } from '../../../core/services/score-service';

@Component({
  imports: [TileComponent],
  standalone: true, 
  selector: 'app-board-component',
  styleUrl: './board-component.css',
  templateUrl: './board-component.html',
})
export class BoardComponent {
  private gameService = inject(GameService);
  private scoreService = inject(ScoreService);

  get board() {
    return this.gameService.board();
  }
  get layout() {
    return BOARD_LAYOUT;
  }

  getPremiumLabel(index: number): string {
    return this.scoreService.getLayoutDisplayText(index);
  }

  onCellClick(index: number) {
    console.log('Clicked cell:', index);
    // TODO: implement tile placement logic
  }
}

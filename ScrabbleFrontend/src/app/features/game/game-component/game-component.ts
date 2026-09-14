import { Component, inject, OnInit } from '@angular/core';
import { BoardComponent } from '../board-component/board-component';
import { RackComponent } from '../rack-component/rack-component';
import { GameService } from '../../../core/services/game-service';

@Component({
  imports: [BoardComponent, RackComponent],
  selector: 'app-game-component',
  standalone: true,
  styleUrl: './game-component.css',
  templateUrl: './game-component.html',
})
export class GameComponent implements OnInit {
  private gameService = inject(GameService);

  ngOnInit(): void {
    this.gameService.initGame();
  }
}

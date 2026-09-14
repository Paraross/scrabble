import { Component, inject } from '@angular/core';
import { BoardComponent } from '../board-component/board-component';
import { RackComponent } from '../rack-component/rack-component';

@Component({
  imports: [BoardComponent, RackComponent],
  selector: 'app-game-component',
  standalone: true,
  styleUrl: './game-component.css',
  templateUrl: './game-component.html',
})
export class GameComponent {}

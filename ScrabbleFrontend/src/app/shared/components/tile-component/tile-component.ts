import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-tile',
  standalone: true,
  styleUrl: './tile-component.css',
  templateUrl: './tile-component.html',
})
export class TileComponent {
  letter = input.required<string>();
  points = input.required<number>();
  color = input.required<string>();
}

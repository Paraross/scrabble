import { Component, inject, computed } from '@angular/core';
import { TileComponent } from '../../../shared/components/tile-component/tile-component';
import { GameService } from '../../../core/services/game-service';

@Component({
  imports: [TileComponent],
  selector: 'app-rack-component',
  standalone: true,
  styleUrl: './rack-component.css',
  templateUrl: './rack-component.html',
})
export class RackComponent {
  private gameService = inject(GameService);

  readonly rack = this.gameService.rack;
  readonly selectedIds = this.gameService.selectedIds;
  readonly bagCount = this.gameService.bagCount;

  readonly selectedCount = computed(() => this.selectedIds().size);

  // Fill rack to 7 slots with empty placeholders
  readonly emptySlots = computed(() => {
    const count = 7 - this.rack().length;
    return Array.from({ length: Math.max(0, count) }, (_, i) => i);
  });

  isSelected(tileId: string): boolean {
    return this.selectedIds().has(tileId);
  }

  toggleSelection(tileId: string): void {
    this.gameService.toggleTileSelection(tileId);
  }

  clearSelection(): void {
    this.gameService.clearSelection();
  }
}

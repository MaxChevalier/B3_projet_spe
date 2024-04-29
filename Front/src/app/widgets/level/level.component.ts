import { Component, ViewChild } from '@angular/core';
import { MapComponent } from './sub_widgets/map/map.component';
import { HeroComponent } from './sub_widgets/hero/hero.component';
import { Spot } from '../../scripts/spot';
import { CellSelectorComponent } from './sub_widgets/cell-selector/cell-selector.component';
import { Cell } from '../../interfaces/cell';
import { NgIf } from '@angular/common';
import { set } from 'mongoose';

@Component({
	selector: 'app-level',
	standalone: true,
	imports: [
		NgIf,
		MapComponent,
		HeroComponent,
		CellSelectorComponent,
	],
	templateUrl: './level.component.html',
	styleUrl: './level.component.css'
})
export class LevelComponent {

	heroSpeed : number = 250;
	turns: number = 0;
	cellSize : string = 'calc(min(calc(95vh - 28px), calc(95vw - 28px)) / 15)'
	cellsType: Array<{cell: Cell, nb: number}> = [
		{nb: 1, cell: { image: "assets/sprites/cat_pack/start.png", name: "start", through: [true], speed: 1 } as Cell},
		{nb: 1, cell: { image: "assets/sprites/cat_pack/end.png", name: "end", through: [true], speed: 1 } as Cell},
		{nb: 10, cell: { image: "assets/sprites/cat_pack/wall.png", name: "wall", through: [false], speed: 0 } as Cell},
		{nb: 10, cell: { image: "assets/sprites/cat_pack/slow1.png", name: "water", through: [true], speed: 2 } as Cell},
		{nb: 10, cell: { image: "assets/sprites/cat_pack/slow2.png", name: "squid", through: [true], speed: 3 } as Cell},
		{nb: 10, cell: { image: "assets/sprites/cat_pack/wall_switch_on.png", name: "spike_on", through: [false, true], "speed": 1 } as Cell},
		{nb: 10, cell: { image: "assets/sprites/cat_pack/wall_switch_off.png", name: "spike_off", through: [true, false], "speed": 1 } as Cell},
	  ];
	cellDrag: {cell: Cell, id: {X: number, Y: number} | {I: number} } | null = null;
	defaultCell: Cell  = {image: "assets/sprites/cat_pack/floor.png", name: "floor", through: [true], speed: 1 } as Cell;

	@ViewChild(HeroComponent) heroComponent: HeroComponent | undefined;
	@ViewChild(MapComponent) mapComponent: MapComponent | undefined;

	async getPath(path: Array<Spot> | null) {
		if (path == null) {
			console.log('No path found');
		}
		else {
			this.turns = 0;
			let index = 0;
			this.setStart(path[0]);
			path.shift();
			path.forEach(spot => {
				setTimeout(() => {
					this.heroComponent?.moveTo(spot.y, spot.x, spot.cell.speed);
				}, this.heroSpeed * index);
				for (let i = 0; i < spot.cell.speed; i++) {
					setTimeout(() => {
						this.turns++;
					}, this.heroSpeed * index);
					index++;
				}
			});
			setTimeout(() => {
				this.heroComponent?.updateAnimation('eat');
				this.turns++;
			}, this.heroSpeed * index);
		}
	}

	setStart(start: Spot) {
		this.heroComponent?.moveTo(start.y, start.x, 0);
		this.heroComponent?.updateAnimation('sleep');
	}

	setCellDrag( event: {cell: Cell, id: {X: number, Y: number} | {I: number}, clear: boolean } | {X: number, Y: number} | {I: number}) {
		if ('clear' in event && event.clear) {
			if (this.cellDrag != null && 'I' in this.cellDrag.id) {
				this.cellsType[this.cellDrag.id.I].nb--;
				this.cellsType.forEach((cellType, index) => {
					if (cellType.cell.name == event.cell.name) {
						this.cellsType[index].nb++;
						
						if (cellType.cell.name == 'start' && this.mapComponent){
							this.mapComponent.start = null;
						}
					}
				});
			}
			this.cellDrag = null;
		}
		else if ('cell' in event) {
			this.cellDrag = event;
		}
		else if ('I' in event) {
			this.cellDrag = {'cell': this.cellsType[event.I].cell, 'id': event};
		}
	}

	stockTiles(event: null) {
		if (this.cellDrag != null && 'X' in this.cellDrag.id) {
			this.cellsType.forEach((cellType, index) => {
				if (cellType.cell.name == this.cellDrag!.cell.name) {
					this.cellsType[index].nb++;
					if (this.cellDrag!.cell.name == 'start' && this.mapComponent){
						this.mapComponent.start = null;
					}
				}
			});
			this.mapComponent?.changeCell(this.cellDrag.id.X, this.cellDrag.id.Y, this.defaultCell);
		}
		this.cellDrag = null;
	}

}

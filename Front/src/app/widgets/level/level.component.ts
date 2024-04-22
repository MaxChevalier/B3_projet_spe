import { Component, ViewChild } from '@angular/core';
import { MapComponent } from './sub_widgets/map/map.component';
import { HeroComponent } from './sub_widgets/hero/hero.component';
import { Spot } from '../../scripts/spot';
import { set } from 'mongoose';

@Component({
	selector: 'app-level',
	standalone: true,
	imports: [
		MapComponent,
		HeroComponent
	],
	templateUrl: './level.component.html',
	styleUrl: './level.component.css'
})
export class LevelComponent {

	heroSpeed : number = 250;
	turns: number = 0;
	cellSize : string = 'calc(min(calc(95vh - 28px), calc(95vw - 28px)) / 15)'

	@ViewChild(HeroComponent) heroComponent: HeroComponent | undefined;

	constructor() { }

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
					this.heroComponent?.moveTo(spot.y, spot.x);
				}, this.heroSpeed * index);
				for (let i = 0; i < spot.speed; i++) {
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
		let tmpSpeed = this.heroSpeed;
		this.heroSpeed = 0;
		this.heroComponent?.moveTo(start.y, start.x);
		this.heroComponent?.updateAnimation('sleep');
		this.heroSpeed = tmpSpeed;
	}

}

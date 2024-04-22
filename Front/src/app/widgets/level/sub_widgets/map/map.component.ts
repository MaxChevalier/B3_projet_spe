import { NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CellComponent } from '../cell/cell.component';
import { Spot } from '../../../../scripts/spot';
import { Astar } from '../../../../scripts/astar';

@Component({
    selector: 'app-map',
    standalone: true,
    imports: [
        NgFor,
        CellComponent,
    ],
    templateUrl: './map.component.html',
    styleUrl: './map.component.css'
})
export class MapComponent {
    cells: Array<Array<any>>;
    hero: any;
    start: Spot;
    end: Spot;

    @Input({required: true}) cellSize: string = '10px';

    @Output() getPath: EventEmitter<Array<Spot>| null> = new EventEmitter();
    @Output() getStart: EventEmitter<Spot> = new EventEmitter();

    constructor() {
        const W = { "image": "assets/sprites/wall.png", "name": "wall", "through": [false], "speed": 0 };
        const F = { "image": "assets/sprites/grass.png", "name": "floor", "through": [true], "speed": 1 };
        const A = { "image": "assets/sprites/water.png", "name": "water", "through": [true], "speed": 2 };
        const S = { "image": "assets/sprites/squid.png", "name": "squid", "through": [true], "speed": 3 };
        const P = { "image": "assets/sprites/spike_on.png", "name": "spike_on", "through": [false, true], "speed": 1 };
        const O = { "image": "assets/sprites/spike_off.png", "name": "spike_off", "through": [true, false], "speed": 1 };
        const B = { "image": "assets/sprites/bed.png", "name": "bed", "through": [true], "speed": 1 };
        const G = { "image": "assets/sprites/food.png", "name": "food", "through": [true], "speed": 1 };

        this.cells = [
            [F, W, B, W, F, W, W, W, F, F, F, W, F, W, F],
            [P, W, F, F, F, F, F, F, F, W, F, W, F, W, A],
            [F, F, S, W, W, W, F, W, W, W, F, W, O, W, A],
            [A, W, F, W, F, W, F, W, A, A, F, F, F, S, A],
            [W, W, F, F, F, W, A, W, A, W, W, W, F, W, W],
            [F, W, P, W, F, W, A, W, A, F, F, F, F, P, F],
            [F, F, F, W, F, W, W, W, F, W, F, W, F, W, F],
            [W, W, W, W, O, W, F, F, F, W, F, W, F, W, F],
            [F, W, F, F, F, W, F, W, W, W, F, W, F, W, W],
            [F, W, W, W, F, F, F, W, S, A, A, W, S, S, F],
            [F, S, F, W, F, W, W, W, A, W, W, W, F, W, F],
            [W, W, F, W, F, F, F, W, F, W, P, W, F, W, F],
            [A, W, F, W, F, W, A, F, F, F, F, W, W, W, F],
            [A, W, O, W, P, A, S, W, W, W, F, F, F, W, F],
            [A, A, F, F, F, W, F, W, G, F, F, W, F, F, F],
        ]

        for (let i = 0; i < this.cells.length; i++) {
            for (let j = 0; j < this.cells[i].length; j++) {
                this.cells[i][j] = new Spot(i, j, this.cells[i][j].through, this.cells[i][j].speed, this.cells[i][j].image, this.cells[i][j].name);
            }
        }

        this.start = this.cells[0][2];
        this.end = this.cells[14][8];
    }

    ngAfterViewInit() {
        this.setStart();
    }

    findPath() {
        let astar = new Astar(this.cells, this.start, this.end);
        let path = astar.findPath();
        if (path != null) {
            path = path.reverse();
        }
        this.getPath.emit(path);
    }

    setStart() {
        this.getStart.emit(this.start);
    }
}

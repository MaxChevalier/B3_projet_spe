import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { CellComponent } from '../cell/cell.component';

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
    cells: Array<any>;
    hero: any;

    constructor() {
        this.hero = { "image": "assets/sprites/cat/sleep.gif", "name": "cat" };
        const W = { "image": "assets/sprites/wall.png", "name": "wall" };
        const F = { "image": "assets/sprites/grass.png", "name": "floor" };
        const A = { "image": "assets/sprites/water.png", "name": "water" };
        const S = { "image": "assets/sprites/squid.png", "name": "squid" };
        const P = { "image": "assets/sprites/spike_on.png", "name": "spike_on" };
        const O = { "image": "assets/sprites/spike_off.png", "name": "spike_off" };
        const B = { "image": "assets/sprites/bed.png", "name": "bed" };
        const G = { "image": "assets/sprites/food.png", "name": "food" };

        this.cells = [
            F, W, B, W, F, W, W, W, F, F, F, W, F, W, F,
            P, W, F, F, F, F, F, F, F, W, F, W, F, W, A,
            F, F, S, W, W, W, F, W, W, W, F, W, O, W, A,
            A, W, F, W, F, W, F, W, A, A, F, F, F, S, A,
            W, W, F, F, F, W, A, W, A, W, W, W, F, W, W,
            F, W, P, W, F, W, A, W, A, F, F, F, F, P, F,
            F, F, F, W, F, W, W, W, F, W, F, W, F, W, F,
            W, W, W, W, O, W, F, F, F, W, F, W, F, W, F,
            F, W, F, F, F, W, F, W, W, W, F, W, F, W, W,
            F, W, W, W, F, F, F, W, S, A, A, W, S, S, F,
            F, S, F, W, F, W, W, W, A, W, W, W, F, W, F,
            W, W, F, W, F, F, F, W, F, W, P, W, F, W, F,
            A, W, F, W, F, W, A, F, F, F, F, W, W, W, F,
            A, W, O, W, P, A, S, W, W, W, F, F, F, W, F,
            A, A, F, F, F, W, F, W, G, F, F, W, F, F, F,
        ]
    }
}

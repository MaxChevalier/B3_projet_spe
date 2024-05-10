import { Component } from '@angular/core';
import { LevelButtonComponent } from './sub_widgets/level-button/level-button.component';
import { Level } from '../../interfaces/level';
import { Cell } from '../../interfaces/cell';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-level-selector',
  standalone: true,
  imports: [
    LevelButtonComponent,
    NgFor,
  ],
  templateUrl: './level-selector.component.html',
  styleUrl: './level-selector.component.css'
})
export class LevelSelectorComponent {

  levels: Array<Level> = []

  constructor(private _router: Router) {
    // TODO: get levels from server with format below
    this.levels = [
      {
        name: 'Level 1',
        creator: 'Creator 1',
        creation_date: new Date(),
        modification_date: new Date(),
        size: { x: 15, y: 15 },
        cells: [
          { nb: 1, cell: { image: ["assets/sprites/cat_pack/start.png"], name: "start", through: [true], speed: 1 } as Cell },
          { nb: 1, cell: { image: ["assets/sprites/cat_pack/end.png"], name: "end", through: [true], speed: 1 } as Cell },
          { nb: 6, cell: { image: ["assets/sprites/cat_pack/wall.png"], name: "wall", through: [false], speed: 0 } as Cell },
          { nb: 4, cell: { image: ["assets/sprites/cat_pack/slow1.png"], name: "water", through: [true], speed: 2 } as Cell },
          { nb: 5, cell: { image: ["assets/sprites/cat_pack/slow2.png"], name: "squid", through: [true], speed: 3 } as Cell },
          { nb: 8, cell: { image: ["assets/sprites/cat_pack/wall_switch_on.png", "assets/sprites/cat_pack/wall_switch_off.png"], name: "spike_on", through: [false, true], "speed": 1 } as Cell },
          { nb: 5, cell: { image: ["assets/sprites/cat_pack/wall_switch_off.png", "assets/sprites/cat_pack/wall_switch_on.png"], name: "spike_off", through: [true, false], "speed": 1 } as Cell },
        ],
        defaultCell: { image: ["assets/sprites/cat_pack/floor.png"], name: "floor", through: [true], speed: 1 } as Cell,
        defaultLayout: []
      },
      {
        name: 'Level 2',
        creator: 'Creator 2',
        creation_date: new Date(),
        modification_date: new Date(),
        size: { x: 25, y: 10 },
        cells: [
          { nb: 1, cell: { image: ["assets/sprites/cat_pack/start.png"], name: "start", through: [true], speed: 1 } as Cell },
          { nb: 1, cell: { image: ["assets/sprites/cat_pack/end.png"], name: "end", through: [true], speed: 1 } as Cell },
          { nb: 3, cell: { image: ["assets/sprites/cat_pack/wall.png"], name: "wall", through: [false], speed: 0 } as Cell },
          { nb: 4, cell: { image: ["assets/sprites/cat_pack/slow1.png"], name: "water", through: [true], speed: 2 } as Cell },
          { nb: 0, cell: { image: ["assets/sprites/cat_pack/slow2.png"], name: "squid", through: [true], speed: 3 } as Cell },
          { nb: 6, cell: { image: ["assets/sprites/cat_pack/wall_switch_on.png", "assets/sprites/cat_pack/wall_switch_off.png"], name: "spike_on", through: [false, true], "speed": 1 } as Cell },
          { nb: 5, cell: { image: ["assets/sprites/cat_pack/wall_switch_off.png", "assets/sprites/cat_pack/wall_switch_on.png"], name: "spike_off", through: [true, false], "speed": 1 } as Cell },
        ],
        defaultCell: { image: ["assets/sprites/cat_pack/floor.png"], name: "floor", through: [true], speed: 1 } as Cell,
        defaultLayout: []
      },
      {
        name: 'Level 3',
        creator: 'Creator 3',
        creation_date: new Date(),
        modification_date: new Date(),
        size: { x: 10, y: 10 },
        cells: [
          { nb: 1, cell: { image: ["assets/sprites/cat_pack/start.png"], name: "start", through: [true], speed: 1 } as Cell },
          { nb: 1, cell: { image: ["assets/sprites/cat_pack/end.png"], name: "end", through: [true], speed: 1 } as Cell },
          { nb: 5, cell: { image: ["assets/sprites/cat_pack/wall.png"], name: "wall", through: [false], speed: 0 } as Cell },
          { nb: 3, cell: { image: ["assets/sprites/cat_pack/slow1.png"], name: "water", through: [true], speed: 2 } as Cell },
          { nb: 4, cell: { image: ["assets/sprites/cat_pack/slow2.png"], name: "squid", through: [true], speed: 3 } as Cell },
          { nb: 5, cell: { image: ["assets/sprites/cat_pack/wall_switch_on.png", "assets/sprites/cat_pack/wall_switch_off.png"], name: "spike_on", through: [false, true], "speed": 1 } as Cell },
          { nb: 8, cell: { image: ["assets/sprites/cat_pack/wall_switch_off.png", "assets/sprites/cat_pack/wall_switch_on.png"], name: "spike_off", through: [true, false], "speed": 1 } as Cell },
        ],
        defaultCell: { image: ["assets/sprites/cat_pack/floor.png"], name: "floor", through: [true], speed: 1 } as Cell,
        defaultLayout: []
      },
      {
        name: 'Level 4',
        creator: 'Creator 4',
        creation_date: new Date(),
        modification_date: new Date(),
        size: { x: 5, y: 5 },
        cells: [
          { nb: 5, cell: { image: ["assets/sprites/cat_pack/wall.png"], name: "wall", through: [false], speed: 0 } as Cell },
          { nb: 3, cell: { image: ["assets/sprites/cat_pack/slow1.png"], name: "water", through: [true], speed: 2 } as Cell },
          { nb: 4, cell: { image: ["assets/sprites/cat_pack/slow2.png"], name: "squid", through: [true], speed: 3 } as Cell },
          { nb: 5, cell: { image: ["assets/sprites/cat_pack/wall_switch_on.png", "assets/sprites/cat_pack/wall_switch_off.png"], name: "spike_on", through: [false, true], "speed": 1 } as Cell },
          { nb: 8, cell: { image: ["assets/sprites/cat_pack/wall_switch_off.png", "assets/sprites/cat_pack/wall_switch_on.png"], name: "spike_off", through: [true, false], "speed": 1 } as Cell },
        ],
        defaultCell: { image: ["assets/sprites/cat_pack/floor.png"], name: "floor", through: [true], speed: 1 } as Cell,
        defaultLayout: [{x: 1, y: 1, cell: { image: ["assets/sprites/cat_pack/start.png"], name: "start", through: [true], speed: 1 } as Cell}, {x: 3, y: 3, cell: { image: ["assets/sprites/cat_pack/end.png"], name: "end", through: [true], speed: 1 } as Cell }]
      },
      {
        name: 'Level 5',
        creator: 'Creator 5',
        creation_date: new Date(),
        modification_date: new Date(),
        size: { x: 20, y: 20 },
        cells: [
          { nb: 1, cell: { image: ["assets/sprites/cat_pack/start.png"], name: "start", through: [true], speed: 1 } as Cell },
          { nb: 1, cell: { image: ["assets/sprites/cat_pack/end.png"], name: "end", through: [true], speed: 1 } as Cell },
          { nb: 5, cell: { image: ["assets/sprites/cat_pack/wall.png"], name: "wall", through: [false], speed: 0 } as Cell },
          { nb: 3, cell: { image: ["assets/sprites/cat_pack/slow1.png"], name: "water", through: [true], speed: 2 } as Cell },
          { nb: 4, cell: { image: ["assets/sprites/cat_pack/slow2.png"], name: "squid", through: [true], speed: 3 } as Cell },
          { nb: 5, cell: { image: ["assets/sprites/cat_pack/wall_switch_on.png", "assets/sprites/cat_pack/wall_switch_off.png"], name: "spike_on", through: [false, true], "speed": 1 } as Cell },
          { nb: 8, cell: { image: ["assets/sprites/cat_pack/wall_switch_off.png", "assets/sprites/cat_pack/wall_switch_on.png"], name: "spike_off", through: [true, false], "speed": 1 } as Cell },
        ],
        defaultCell: { image: ["assets/sprites/cat_pack/floor.png"], name: "floor", through: [true], speed: 1 } as Cell,
        defaultLayout: []
      }
    ]
  }

  select($event: Level) {
    // go to level page and transfer the level data
    this._router.navigate(['level'], { state: { level: $event } });
  }

}

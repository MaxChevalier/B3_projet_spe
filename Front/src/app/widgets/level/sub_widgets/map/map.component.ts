import { NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CellComponent } from '../cell/cell.component';
import { Spot } from '../../../../scripts/spot';
import { Astar } from '../../../../scripts/astar';
import { Cell } from '../../../../interfaces/cell';

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
    cells: Array<Array<Spot>> = [];
    hero: any;
    start: Spot | null = null;
    end: Spot | null = null;

    @Input({required: true}) defaultCell: Cell = {image: "", name: "", through: [false], speed: 0 } as Cell;
    @Input({required: true}) cellSize: string = '10px';
    @Input({required: true}) cellDrag: {cell: Cell, id: {X: number, Y: number} | {I: number} } | null = null;
    @Input({required: false}) mapSize: {X: number, Y: number} = {X: 15, Y: 15};

    @Output() getPath: EventEmitter<Array<Spot>| null> = new EventEmitter();
    @Output() getStart: EventEmitter<Spot> = new EventEmitter();
    @Output() dropped: EventEmitter<{cell: Cell, id: {X: number, Y: number} | {I: number}, clear: boolean } | {X: number, Y: number} | {I: number}> = new EventEmitter();

    ngOnInit() {
        console.log(this.defaultCell);

        this.cells = new Array(this.mapSize.X);
        for (let i = 0; i < this.mapSize.X; i++) {
            this.cells[i] = new Array(this.mapSize.Y);
            for (let j = 0; j < this.mapSize.Y; j++) {
                this.cells[i][j] = new Spot(i, j, this.defaultCell);
            }
        }
    }

    findPath() {
        if (this.start == null || this.end == null) {
            return;
        }
        let astar = new Astar(this.cells, this.start, this.end);
        let path = astar.findPath();
        if (path != null) {
            path = path.reverse();
        }
        this.getPath.emit(path);
    }

    dragOver(event: any) {
        event.preventDefault();
        event.stopPropagation();
    }
    drop(event: any, X: number, Y: number) {
        event.preventDefault();
        event.stopPropagation();

        if (this.cellDrag == null) {
            return;
        }

        let tmpCell : Cell = this.cells[X][Y].cell;
        this.changeCell(X, Y, this.cellDrag.cell);
        if ('X' in this.cellDrag.id) {
            this.changeCell(this.cellDrag.id.X, this.cellDrag.id.Y, tmpCell);
        }

        this.dropped.emit({'cell' : tmpCell, 'id' : {X: X, Y: Y}, clear: true});
    }

    changeCell(X: number, Y: number, cell: Cell) {
        this.cells[X][Y].cell = cell;
        if (cell.name == "start") {
            this.start = this.cells[X][Y];
            this.getStart.emit(this.start);
        }
        else if (cell.name == "end") {
            this.end = this.cells[X][Y];
        }
    }

    cellDragId(event: {X: number, Y: number} | {I: number}) {
        if ('I' in event) {
            this.dropped.emit({'cell' : this.cells[event.I][0].cell, 'id' : event, clear: false});
        }
        else {
            this.dropped.emit({'cell' : this.cells[event.X][event.Y].cell, 'id' : event, clear: false});
        }
    }
}

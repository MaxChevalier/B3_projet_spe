import { Component, Input } from '@angular/core';
import { MiniCellComponent } from '../mini-cell/mini-cell.component';
import { NgFor } from '@angular/common';
import { Cell } from '../../../../../interfaces/cell';

@Component({
    selector: 'app-mini-map',
    standalone: true,
    imports: [
        MiniCellComponent,
        NgFor
    ],
    templateUrl: './mini-map.component.html',
    styleUrl: './mini-map.component.css'
})
export class MiniMapComponent {

    @Input() Size: { x: number, y: number } = { x: 0, y: 0 };
    @Input() DefaultCell: Cell = {} as Cell;
    @Input() DefaultLayout: Array<{ x: number, y: number, cell: Cell }> = [];

    cells: Array<Array<{ name: string, image: string }>> = []
    cellSize: string = '15px';

    ngOnInit() {
        for (let i = 0; i < this.Size.y; i++) {
            this.cells.push([]);
            for (let j = 0; j < this.Size.x; j++) {
                let tmp = this.DefaultLayout.find(cell => cell.x === j && cell.y === i)
                if (tmp) {
                    this.cells[i].push({ name: tmp.cell.name, image: tmp.cell.image[0] })
                } else {
                    this.cells[i].push({ name: this.DefaultCell.name, image: this.DefaultCell.image[0] })
                }
            }
        }
        this.cellSize = `calc(13rem / max(${this.Size.x}, ${this.Size.y}))`
    }
}

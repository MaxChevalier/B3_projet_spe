import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-mini-cell',
  standalone: true,
  imports: [],
  templateUrl: './mini-cell.component.html',
  styleUrl: './mini-cell.component.css'
})
export class MiniCellComponent {
  @Input({ required: true }) image: string = '';
  @Input({ required: true }) name: string = 'no data';
  @Input({required: true}) cellSize: string = '10px';
}

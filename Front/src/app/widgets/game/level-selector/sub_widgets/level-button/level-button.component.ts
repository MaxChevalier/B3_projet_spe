import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Level } from '../../../../../interfaces/level';
import { MiniMapComponent } from '../mini-map/mini-map.component';


@Component({
  selector: 'app-level-button',
  standalone: true,
  imports: [
    MiniMapComponent
  ],
  templateUrl: './level-button.component.html',
  styleUrl: './level-button.component.css'
})
export class LevelButtonComponent {

  @Input() level: Level = {} as Level;

  date: string = '';

  @Output() selectLevel : EventEmitter<Level> = new EventEmitter<Level>();

  ngOnInit() {
    let formattedDate: string;
    if (this.level.modification_date) {
      const modificationDate = new Date(this.level.modification_date);
      formattedDate = this.formatDate(modificationDate);
    } else {
      const creationDate = new Date(this.level.creation_date);
      formattedDate = this.formatDate(creationDate);
    }

    this.date = formattedDate;
  }

  formatDate(date: Date): string {
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  }

  select() {
    this.selectLevel.emit(this.level);
  }

}

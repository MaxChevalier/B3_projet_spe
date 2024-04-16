import { Component } from '@angular/core';
import { MapComponent } from './sub_widgets/map/map.component';

@Component({
  selector: 'app-level',
  standalone: true,
  imports: [
    MapComponent,
  ],
  templateUrl: './level.component.html',
  styleUrl: './level.component.css'
})
export class LevelComponent {

}

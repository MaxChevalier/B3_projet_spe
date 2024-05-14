import { Component } from '@angular/core';
import { LevelButtonComponent } from './sub_widgets/level-button/level-button.component';
import { Level } from '../../../interfaces/level';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { LevelServiceService } from '../../../service/levelService/level-service.service';
import { SubscriberController } from '../../../scripts/subscriberController';

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
export class LevelSelectorComponent extends SubscriberController {

  levels: Array<Level> = []

  constructor(private _router: Router, private _levelService: LevelServiceService) {
    super();
  }
  
  ngOnInit() {
		this.subscription["$GetLevel"] = this._levelService.getLevels().subscribe(
			{
				next: (res) => {
					this.levels = res
				},
				error: (err) => {
					console.error(err)
				}
			}
		)
	}

  select($event: Level) {
    // go to level page and transfer the level data
    this._router.navigate(['level'], { state: { level: $event } });
  }

}

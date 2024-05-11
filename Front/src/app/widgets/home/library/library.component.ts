import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Obstacle } from '../../../service/LibraryService/obstacle';
import { LibraryService } from '../../../service/LibraryService/library.service';

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './library.component.html',
  styleUrl: './library.component.css'
})
export class LibraryComponent {
  obstacles: Obstacle[] = [];
  constructor(private libraryService: LibraryService) {}

  ngOnInit(): void {
    this.getObstacles();
  }
  getObstacles(): void {
    this.libraryService.getObstaclInfo().subscribe(
      obstacles => {
        this.obstacles = obstacles;
      },
      error => {
        console.error('Une erreur est survenue lors de la récupération des obstacles :', error);
      }
    );
  }
  scroll(direction: number): void {
    const container = document.querySelector('.card-deck')!;
    container.scrollLeft += direction * 300;
  }
}

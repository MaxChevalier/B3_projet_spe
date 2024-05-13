import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, switchMap } from 'rxjs';
import { Level } from '../../interfaces/level';
import { Cell } from '../../interfaces/cell';

@Injectable({
  providedIn: 'root'
})
export class LevelServiceService {

  private apiRoutes = {
    "obstacle": "http://localhost:3000/api/obstacles/",
    "level": "http://localhost:3000/api/levels/",
    "test": "http://localhost:3000/api/levels/test/"
  }

  constructor(private http: HttpClient) { }

  getObstacles(): Observable<Cell[]> {
    return this.http.get(this.apiRoutes.obstacle).pipe(map(
      (res: any) => res as Cell[])
    )
  }

  getLevels(): Observable<Level[]> {
    return this.getObstacles().pipe(
      switchMap((cells: Cell[]) => {
        // Récupérer les niveaux depuis l'API
        return this.http.get(this.apiRoutes.level).pipe(
          map((res: any) => {
            // Adapter les données des niveaux
            const levels: any[] = res;
            return levels.map(level => {
              // Mapper les ID des cellules aux objets Cell
              const obstacles = this._setObstaclesLevel(level, cells)

              const defaultLayout = this._setDefaultLayout(level, cells)

              // Retourner le niveau adapté
              return {
                name: level.name,
                creator: level.creator,
                creation_date: new Date(level.creation_date),
                modification_date: new Date(level.modification_date),
                size_x: level.size_x,
                size_y: level.size_y,
                obstacles: obstacles,
                defaultObstacleId: cells.find(cell => cell.id === level.defaultObstacleId), // Trouver la cellule par ID
                defaultLayout: defaultLayout
              } as Level;
            });
          })
        );
      })
    );
  }

  setTestLevel(test: { id_level: number, date:number, score:number }, token: string): Observable<any>{
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('authorization', `${token}`);
    }
    const options = { headers: headers};
    return this.http.post(this.apiRoutes.test, test, options);
  }



  private _setObstaclesLevel(level: any, cells: Cell[]): { nb: number; cell: Cell }[]{
    return level.obstacles.map((obstacle: { nb: any; cell: number; }) => {
      return {
        nb: obstacle.nb,
        cell: cells.find(cell => cell.id === obstacle.cell) // Trouver la cellule correspondante
      };
    });
  }

  private _setDefaultLayout(level: any, cells: Cell[]): { x: number; y: number; cell: Cell }[]{
    return level.defaultLayout.map((layout: { x: any; y: any; cell: number; }) => {
      return {
        x: layout.x,
        y: layout.y,
        cell: cells.find(cell => cell.id === layout.cell) // Trouver la cellule correspondante
      };
    });
  }
}

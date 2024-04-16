import { Spot } from "./spot";

export class Astar{
    spots: Array<Array<Spot>>;
    openSet: Array<Spot>;
    closedSet: Array<Spot>;
    path: Array<Spot>;
    path_length: number;
    start: Spot;
    end: Spot;

    constructor(spots: Array<Array<Spot>>, start: Spot, end: Spot){
        this.spots = spots;
        this.start = start;
        this.end = end;
        this.openSet = [];
        this.closedSet = [];
        this.path = [];
        this.path_length = 0;
    }

    public findPath(): Array<Spot>|null{

        this.openSet.push(this.start);

        while (this.openSet.length > 0){
            let winner = 0;
            for (let i = 0; i < this.openSet.length; i++){
                if (this.openSet[i].f < this.openSet[winner].f){
                    winner = i;
                }
            }
            let current: Spot = this.openSet[winner];

            this.path = [];
            let temp = current;
            this.path.push(temp);
            while (temp.previous){
                this.path.push(temp.previous);
                temp = temp.previous;
            }
            this.path_length = 0;
            this.path.forEach(cell => {
                this.path_length += cell.speed;
            });

            if (current.equals(this.end)){
                console.log(this.path_length)
                return this.path;
            }

            this.openSet = this.openSet.filter(spot => !spot.equals(current));
            this.closedSet.push(current);

            if (current.neighbors.length == 0){
                current.addNeighbors(this.spots);
            }

            let neighbors = current.neighbors;
            neighbors.forEach(neighbor => {
                if (!this.closedSet.includes(neighbor) && neighbor.isThrough(this.path.length)){
                    let tempG = current.g + 1;
                    let newPath = false;

                    if (this.openSet.includes(neighbor)){
                        if (tempG < neighbor.g){
                            neighbor.g = tempG;
                            newPath = true;
                        }
                    } else {
                        neighbor.g = tempG;
                        newPath = true;
                        this.openSet.push(neighbor);
                    }

                    if (newPath){
                        neighbor.h = this.heuristic(neighbor, this.end);
                        neighbor.f = neighbor.g + neighbor.h + neighbor.speed;
                        neighbor.previous = current;
                    }
                }
            });
        }
        return null;
    }

    public heuristic(a: Spot, b: Spot): number{
        return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
    }

}
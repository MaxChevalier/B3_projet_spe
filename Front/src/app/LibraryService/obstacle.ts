export interface Obstacle {
    id: number;
    name: string;
    image: string[];
    type: string;
    through: boolean[];
    speed: number;
    description: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
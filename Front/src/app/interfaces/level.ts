import { Cell } from "./cell";

export interface Level {
    name: string;
    creator: string;
    creation_date: Date;
    modification_date: Date;
    size: { x: number, y: number };
    cells: Array<{ nb: number, cell: Cell }>;
    defaultCell: Cell;
    defaultLayout: Array<{ x: number, y: number, cell: Cell }>;
}
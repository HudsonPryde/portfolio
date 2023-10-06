import { ReactNode, Key } from "react";
export interface Node {
    x: number;
    y: number;
    neighbors: Node[];
    visited: boolean;
    weight: number;
    prev: Node|null;
    is(node: Node): boolean;
    addNeighbor(node: Node): void;
    getNeighbors(): Node[];
}
export class Node implements Node {
    x: number;
    y: number;
    neighbors: Node[] = [];
    prev: Node|null = null;
    visited: boolean = false;
    weight: number  = Math.floor(Math.random() * 1000);

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    is(node: Node): boolean {
        return this.x === node.x && this.y === node.y;
    }

    addNeighbor(node: Node): void {
        this.neighbors.push(node);
    }
    getNeighbors(): Node[] {
        return this.neighbors;
    }
}

const cardinal = [
    {x: +1, y: 0},
    {x: 0, y: +1},
    {x: -1, y: 0},
    {x: 0, y: -1},
]
const diagonals = [
    ...cardinal,
    {x: +1, y: +1},
    {x: -1, y: +1},
    {x: -1, y: +1},
    {x: +1, y: -1},
]

export class Grid {
    nodes: Node[][];
    constructor(nodes: Node[][]) {
        this.nodes = nodes;
    }

    get = (x: number, y: number): Node|null => {
        try {
            const node = this.nodes[x][y]
            return node
        } catch (error) {
            return null
        }
    }

    assignNeighbors = (diagonal: boolean): void => {
        this.nodes.forEach((row: Node[]) => {
            row.forEach((node: Node) => {
                // add all nodes directly beside current node as neighbors
                const direction = diagonal ? diagonals : cardinal
                direction.forEach((cord) => {
                    const neighbor = this.get(node.x + cord.x, node.y + cord.y)
                    if (neighbor) node.addNeighbor(neighbor)
                })
            })
        })
    }
}
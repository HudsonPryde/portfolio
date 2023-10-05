'use client';
import { create } from 'domain';
import {useState, useEffect, Key} from 'react';

class Node<Object> {
    x: number;
    y: number;
    neighbors: Node<Object>[];
    visited: boolean;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.neighbors = [];
        this.visited = false;
    }
}

export default function Pathing() {
    // grid is nested array of nodes
    const [grid, setGrid] = useState<Node<Object>[][]>();
    // start and end nodes defined by user
    const [start, setStart] = useState<Node<Object>>(new Node(0, 0));
    const [end, setEnd] = useState<Node<Object>>(new Node(5, 5));
    // final path to be displayed
    const [path, setPath] = useState<Node<Object>[]>();
    // size of grid - (size x size)
    const [size, setSize] = useState<number>(5);

    // create grid when size changes
    useEffect(() => {
        let grid = [];
        for (let i = 0; i < size; i++) {
            let row = [];
            for (let j = 0; j < size; j++) {
                row.push(new Node(i, j));
            }
            grid.push(row);
        }
        setGrid(grid);
    }, [size]);

    const square = (_node: Node<Object>) => {
        return (
            <div className='rounded-sm bg-slate-200 w-4 h-4 m-1'>

            </div>
        );
    };

    return (
        <main className='flex w-screen h-screen flex-col p-12 font-inter overflow-x-hidden'>
            {/* grid squares */}
            <div className='flex flex-1 flex-col justify-center items-center'>
                {grid?.map((row: Array<Node<Object>>, index: Key) => {
                    return (
                        <div key={index} className='flex flex-row'>
                            {row.map((_node: Node<Object>, index: Key) => {
                                return (
                                    <div key={index} className="flex flex-1">
                                        {square(_node)}
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        </main>
    );
}
'use client';
import { create } from 'domain';
import {useState, useEffect, Key, useReducer, useCallback} from 'react';
import { Node, Grid } from './Node';
import Dijkstra from './Dijkstra';

export default function Pathing() {
    const [reset, setReset] = useState<Boolean>(false);
    // grid is nested array of nodes
    const [grid, setGrid] = useState<Grid>();
    // start and end nodes defined by user
    const [start, setStart] = useState<Node>(new Node(0,0));
    const [end, setEnd] = useState<Node>(new Node(9,9));
    // final path to be displayed
    const [path, setPath] = useState<Node[]>([]);
    // walls are nodes that cannot be traversed
    const [walls, setWalls] = useState<Node[]>([]);
    // size of grid - (size x size)
    const [size, setSize] = useState<number>(10);

    const [settings, dispatch] = useReducer((state: any, action: any) => {
        switch (action.type) {
            case 'select':
                return {...state, select: action.payload};
            case 'size':
                return {...state, size: action.payload};
            default:
                return state;
        }
    }, {
        select: 'start',
        size: size
    });

    // create grid when size changes
    useEffect(() => {
        let acc = [];
        for (let i = 0; i < size; i++) {
            let row = [];
            for (let j = 0; j < size; j++) {
                row.push(new Node(i, j));
            }
            acc.push(row);
        }
        const grid = new Grid(acc);
        grid.assignNeighbors(false);
        setStart(grid.nodes[0][0])
        setEnd(grid.nodes[size-1][size-1])
        setGrid(grid);
    }, [size, reset]);

    const square = (_node: Node) => {
        const isStart = _node.is(start);
        const isEnd = _node.is(end);
        const isWall = walls.some((wall: Node) => wall.is(_node));
        const inPath = path?.includes(_node)
        const color = isStart ? 'bg-green-500' : isEnd ? 'bg-blue-500' : isWall ? 'bg-dark border border-slate-500' : inPath ? 'bg-amber-500' : 'bg-transparent'; 
        return (
            <button className={`rounded-md ${color} w-full h-full transition-all`}
            onClick={() => {
                if (settings.select === 'start' && !isWall) {
                    setStart(_node);
                } else if (settings.select === 'end' && !isWall) {
                    setEnd(_node);
                } else if (settings.select === 'wall') {
                    isWall ? setWalls((prev) => prev.filter((wall: Node) => !wall.is(_node))) : setWalls((prev) => [...prev, _node]);
                }
            }}/>
        );
    };

    // find path
    function findPath() {
        if(!start||!end||!walls||!grid) return
        const path = Dijkstra(start, end, walls, grid);
        if (!path) return
        showPath(path)
    }
    // animate path
    function showPath(path: Node[]) {
        path.forEach((node, index) => {
            setTimeout(() => {
                setPath((prev) => [...prev, node])
            }, 200*index)
        })
    }

    return (
        <main className='flex w-screen h-screen flex-col p-12 font-inter overflow-x-hidden justify-center items-center font-raleway font-semibold'>
            <div className='flex flex-row justify-center items-center bg-primary p-2 rounded-xl m-2'>
                    <button className={`rounded-full border-2 border-green-500 ${settings.select === 'start' ? 'bg-green-500 text-white' : 'text-green-500'} p-2 w-10 h-10 flex-row flex justify-center items-center`} onClick={() => dispatch({type: 'select', payload: 'start'})}><p className="text-md">S</p></button>
                    <button className={`rounded-full border-2 border-blue-500 ${settings.select === 'end' ? 'bg-blue-500 text-white' : 'text-blue-500'} p-2 w-10 h-10 flex-row flex justify-center items-center`} onClick={() => dispatch({type: 'select', payload: 'end'})}><p className="text-md">E</p></button>
                    <button className={`rounded-full border-2 border-black ${settings.select === 'wall' ? 'bg-black text-white' : 'text-black'} p-2 w-10 h-10 flex-row flex justify-center items-center`} onClick={() => dispatch({type: 'select', payload: 'wall'})}><p className="text-md">W</p></button>
                    <div className='flex flex-col justify-center items-start text-white text-sm'>
                        <div className="bg-dark rounded-full p-1 px-3 m-[1px]"><p>Set start/end node</p></div>
                        <div className="bg-dark rounded-full p-1 px-3 m-[1px]"><p>Place/erase walls to change pathing</p></div>
                    </div>
                    <button onClick={() => findPath()} className="bg-dark rounded-full p-1 px-3 m-[1px] text-white"><p>Find path</p></button>
                    <button onClick={() => {setReset(!reset); setPath([]); setWalls([])}} className="bg-dark rounded-full p-1 px-3 m-[1px] text-white"><p>Reset</p></button>
                </div>
            {/* grid squares */}
            <div className='flex flex-col justify-center items-center h-96 w-96'>
                {grid?.nodes.map((row: Array<Node>, index: Key) => {
                    return (
                        <div key={index} className='flex flex-1 flex-row w-full h-16'>
                            {row.map((_node: Node, index: Key) => {
                                return (
                                    <div key={index} 
                                    className='flex-1 flex-col flex m-1 transition-all rounded-md'
                                    style={{backgroundColor: `rgba(255, 255, 255, ${(_node.weight*-0.0101 + 10.10101)/10})`}}
                                    >
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
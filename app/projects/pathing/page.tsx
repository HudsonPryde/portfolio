'use client';
import { create } from 'domain';
import Image from 'next/image';
import {useState, useEffect, useRef, Key, useReducer, useCallback, MouseEvent} from 'react';
import { Node, Grid } from './Node';
import Dijkstra from './Dijkstra';

export default function Pathing() {
    const [reset, setReset] = useState<boolean>(false);
    // grid is nested array of nodes
    const [grid, setGrid] = useState<Grid>();
    // start and end nodes defined by user
    const [start, setStart] = useState<Node>(new Node(0,0));
    const [end, setEnd] = useState<Node>(new Node(9,9));
    // final path to be displayed
    const [path, setPath] = useState<Node[]>([]);
    const [pathing, setPathing] = useState<boolean>(false);
    // walls are nodes that cannot be traversed
    const [walls, setWalls] = useState<Node[]>([]);
    // size of grid - (size x size)
    const [size, setSize] = useState<number>(10);
    // refs for buttons to blur
    const resetButton = useRef<HTMLButtonElement | null>(null)

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

    const [animationQueue, dispatchQueue] = useReducer((state: any, action: any) => {
        switch (action.type) {
            case 'add':
                return [...state, action.payload];
            case 'clear':
                state.forEach((id: number) => clearTimeout(id))
                return [];
            default:
                return state;
        }
    }, []);

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

    function findPath() {
        setPath([])
        if(!start||!end||!walls||!grid) return
        const {path, search} = Dijkstra(start, end, walls, grid);
        if (!path) return
        showSearch(search, path)
    }

    function showSearch(search: Node[][], path: Node[]) {
        setPathing(true)
        search.forEach((set, index) => {
            if (index === search.length-1) {
                const id = setTimeout(() => {
                    setPath(set)
                    showPath(path)
                }, 100*index)
                dispatchQueue({action:'add', payload:id})
            } else {
                const id = setTimeout(() => {
                    console.log(pathing)
                    setPath(set)
                }, 100*index)
                dispatchQueue({action:'add', payload:id})
            }
        })
    }

    function showPath(path: Node[]) {
        setPath([])
        path.forEach((node, index) => {
            if (index === path.length-1) {
                const id = setTimeout(() => {
                    setPath((prev) => [...prev, node])
                    setPathing(false)
                }, 200*index)
                dispatchQueue({action:'add', payload:id})
            } else {
                const id = setTimeout(() => {
                    setPath((prev) => [...prev, node])
                }, 200*index)
                dispatchQueue({action:'add', payload:id})
            }
        })
    }

    // handle reset button
    function handleReset() {
        setReset(!reset);
        dispatchQueue({action: 'clear'})
        setPath([]); 
        setWalls([]);
        setPathing(false);
        // blur the button after animation is done so it can play again
        // without the user needing to blur it
        setTimeout(() => {resetButton.current?.blur()}, 500)
    }

    const selectButtonClass = 'rounded-full m-1 border-2 p-2 w-10 h-10 flex-row flex justify-center items-center disabled:opacity-50 transition-all'
    const pathButtonActiveClass = 'disabled:bg-gradient-to-tr disabled:from-emerald-500 disabled:via-emerald-200 disabled:to-emerald-500 disabled:animate-shimmer'

    return (
        <main className='flex flex-col p-12 pt-8 font-inter overflow-x-hidden justify-center items-center font-raleway font-semibold transition-all duration-500'>
            <div className='flex flex-row justify-center items-center bg-primary p-2 rounded-xl m-2'>
                    <button disabled={pathing} className={`${selectButtonClass} border-green-500 ${settings.select === 'start' ? 'bg-green-500 text-white' : 'text-green-500'}`} onClick={() => dispatch({type: 'select', payload: 'start'})}><p className="text-md">S</p></button>
                    <button disabled={pathing} className={`${selectButtonClass} border-blue-500 ${settings.select === 'end' ? 'bg-blue-500 text-white' : 'text-blue-500'}`} onClick={() => dispatch({type: 'select', payload: 'end'})}><p className="text-md">E</p></button>
                    <button disabled={pathing} className={`${selectButtonClass} border-black ${settings.select === 'wall' ? 'bg-black text-white' : 'text-black'}`} onClick={() => dispatch({type: 'select', payload: 'wall'})}><p className="text-md">W</p></button>
                    <div className='flex flex-col justify-center items-start text-white text-sm'>
                        <div className="bg-dark rounded-full p-1 px-3 m-[1px]"><p>Set start/end node</p></div>
                        <div className="bg-dark rounded-full p-1 px-3 m-[1px]"><p>Place/erase walls to change pathing</p></div>
                    </div>
                    <div className="flex flex-col items-center mx-1">
                    <button disabled={pathing} onClick={() => findPath()} style={{ backgroundSize: '600% 600%' }} className={`bg-emerald-500 ${pathButtonActiveClass} rounded-full p-2 m-[1px] text-white`}>
                        <Image src="../../path-icon.svg" width={30} height={30} alt="path" className="invert"/>
                    </button>
                    <p className="tracking-tighter text-sm">Find Path</p>
                    </div>
                    <div className="flex flex-col items-center mx-1">
                    <button ref={resetButton} onClick={() => handleReset()} className="bg-amber-500 rounded-full p-2 m-[1px] text-white focus:animate-shake">
                        <Image src="../../cached-icon.svg" width={30} height={30} alt="cached" className="invert"/>
                    </button>
                    <p className="tracking-tighter text-sm">Refresh</p>
                    </div>
                </div>
            {/* grid squares */}
            <div className='flex flex-col justify-center items-center h-96 w-96 bg-dark p-1 rounded-xl transition-all duration-500'>
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
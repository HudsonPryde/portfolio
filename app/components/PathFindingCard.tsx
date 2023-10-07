'use client'
import Image from 'next/image';
import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation';
import Pathing from '../projects/pathing/page';
import PathingTemplate from '../projects/pathing/template';
import { motion, LayoutGroup } from "framer-motion"

export default function PathFindingCard() {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [showContent, setShowContent] = useState<boolean>(false);
    function toggleCard() {
        startTransition(() => {
            setShowContent(!showContent);
        })
    }
    return (
        <motion.main layout className={`flex flex-col p-6 bg-[#eb3d00] m-2 rounded-2xl font-raleway justify-between ${showContent ? 'max-w-2xl' : 'max-w-sm'}`}>
            <LayoutGroup>
            {!showContent ? 
            <motion.div className='flex flex-col'>
            <div className='flex flex-1 flex-row justify-end items-center'>
                <div className="p-1 rounded-full border-[2px] border-black">
                    <Image src="./typescript-icon.svg" alt="typescript" height={24} width={24}/>
                </div>
            </div>
            <p className="font-semibold text-4xl">Pathfinding</p>
            <p className="font-semibold text-md">Simple grid based pathfinding complete with a user-friendly UI to visualize the algorithms in action.</p>
            <button type="button" onClick={() => toggleCard()} className="flex item-center justify-center flex-row p-2 rounded-full bg-dark space-x-4 hover:scale-110 hover:-translate-y-1 transition-all mt-4">
                <p className="text-white font-semibold text-xl">✨ Try it now </p>
                <Image src="./expand-icon.svg" alt="expand" height={30} width={30} className="invert" />
            </button>
            </motion.div>
            : 
            <motion.div>
                <PathingTemplate>
                    <button onClick={() => toggleCard()}className='flex flex-row self-start justify-start items-center pb-4'><Image src="../../collapse-icon.svg" alt="collapse" width={30} height={30}/><p className="text-lg">Close</p></button>
                    <Pathing />
                </PathingTemplate>
            </motion.div>
            }
            </LayoutGroup>
        </motion.main>
    );
}
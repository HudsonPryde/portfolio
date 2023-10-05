'use client'
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function PathFindingCard() {
    const router = useRouter();
    return (
        <main className="flex flex-1 flex-col p-6 bg-[#eb3d00] m-2 rounded-2xl font-raleway max-w-sm justify-between">
            <div className='flex flex-1 flex-row justify-end items-center'>
                <div className="p-1 rounded-full border-[2px] border-black">
                    <Image src="./typescript-icon.svg" alt="typescript" height={24} width={24}/>
                </div>
            </div>
            <p className="font-semibold text-4xl">Pathfinding</p>
            <p className="font-semibold text-md">Simple grid based pathfinding complete with a user-friendly UI to visualize the algorithms in action.</p>
            <button type="button" onClick={() => router.push('/projects/pathing')} className="flex item-center justify-center flex-row p-2 rounded-full bg-dark space-x-4 hover:scale-110 hover:-translate-y-1 transition-all mt-4">
                <p className="text-white font-semibold text-xl">✨ Try it now </p>
                <Image src="./east-icon.svg" alt="east" height={30} width={30} className="invert" />
            </button>
        </main>
    );
}
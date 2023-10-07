'use client'
import { useState } from "react";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import Image from 'next/image'
import { motion } from "framer-motion";

export default function StudyScribeCard() {
    const [videoUrl, setVideoUrl] = useState<undefined|string>(undefined);
    getDownloadURL(ref(storage, 'ss_demo_video_export.mp4'))
    .then((url) => {
        // `url` is the download URL for 'images/stars.jpg'
        setVideoUrl(url);
    })
    .catch((error) => {
        console.log(error);
    });
    return (
        <motion.main layout className="flex flex-1 flex-col p-6 bg-primary m-2 rounded-2xl font-raleway max-w-sm">
            <div className="flex flex-row space-x-1 justify-end">
                <Image src="./react-icon.svg" alt="React" width={34} height={34} className="border-[2px] border-[#149eca] rounded-full p-1"/>
                <Image src="./expo-icon.svg" alt="Expo" width={34} height={34} className="border-[2px] border-black rounded-full p-1"/>
                <Image src="./supabase-icon.svg" alt="supabase" width={34} height={34} className="border-[2px] border-emerald-600 rounded-full p-1"/>
                <Image src="./openai-icon.svg" alt="openai" width={34} height={34} className="border-[2px] border-black rounded-full p-1"/>
            </div>
            <div className="my-2">
                <p className="font-semibold tracking-tight text-xl">
                <span className="tracking-tighter text-4xl font-young mr-2">Study Scribe</span>
                is a passion project I made to help students who struggle reading dense text excel in demanding STEM fields. 
                Made using Expo and Supabase while leveraging OpenAI&apos;s LLM Study Scribe was an incredibly fulfilling project that I learned so much from.</p>
            </div>
            <div className="bg-dark rounded-xl h-96 w-72 self-center">
                <video controls src={videoUrl} poster="./ssdemo-poster.png" className="rounded-xl h-96 w-72"></video>
            </div>
            <div className="flex flex-1 flex-row justify-center mt-4">
                <a href="https://apps.apple.com/us/app/study-scribe/id6451150726" target='_blank' rel='noopener'><Image src="./Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg" alt="Download on the App Store" width={180} height={40} className="self-center"/></a>
            </div>
        </motion.main>
    );
}
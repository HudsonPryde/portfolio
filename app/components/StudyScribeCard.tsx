'use client'
import { useState } from "react";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";

export default function StudyScribeCard() {
    const [videoUrl, setVideoUrl] = useState('');
    getDownloadURL(ref(storage, 'ss_demo_video_export.mp4'))
    .then((url) => {
        // `url` is the download URL for 'images/stars.jpg'
        setVideoUrl(url);
    })
    .catch((error) => {
        console.log(error);
    });
    return (
        <main className="flex flex-1 justify-between flex-col p-12 bg-violet-200 m-2 rounded-2xl">
            <div className="text-6xl tracking-tighter font-semibold font-raleway">
                <p>Study</p>
                <p>Scribe</p>
            </div>
            <div className="bg-dark rounded-xl">
            <video controls src={videoUrl} poster="./ssdemo-poster.png" className="rounded-xl h-96 "></video>
            </div>
        </main>
    );
}
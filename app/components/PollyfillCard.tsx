"use client";
import { useState } from "react";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import Image from "next/image";
import { motion } from "framer-motion";

export default function PollyfillCard() {
  const [videoUrl, setVideoUrl] = useState<undefined | string>(undefined);
  getDownloadURL(ref(storage, "pollyfill-demo.mp4"))
    .then((url) => {
      // `url` is the download URL for 'images/stars.jpg'
      setVideoUrl(url);
    })
    .catch((error) => {
      console.log(error);
    });
  return (
    <motion.main
      layout
      className="flex flex-col p-6 bg-cyan-100 m-2 rounded-2xl font-raleway max-w-sm max-h-[625px]"
    >
      <div className="flex flex-row space-x-1 justify-end">
        <Image
          src="./react-icon.svg"
          alt="React"
          width={34}
          height={34}
          className="border-[2px] border-[#149eca] rounded-full p-1"
        />
        <Image
          src="./azure-ai.svg"
          alt="azureai"
          width={34}
          height={34}
          className="border-[2px] border-blue-400 rounded-full p-1"
        />
        <Image
          src="./typescript-icon.svg"
          alt="Ts"
          width={34}
          height={34}
          className="border-[2px] border-black rounded-full p-1"
        />
      </div>
      <div className="my-2">
        <p className="font-semibold tracking-tight text-xl">
          <span className="tracking-tighter text-4xl font-young mr-2">
            Pollyfill
          </span>
          was made for the 2023 Microsoft classroom AI hackathon with the goal
          of helping students create a detailed learning plan by breaking down
          complex topics into more digestible sub-topics. For more information
          <br />
          <a
            href="https://devpost.com/software/pollyfill"
            target="_blank"
            rel="noopener"
            className="text-blue-500 hover:text-blue-700"
          >
            click here
          </a>{" "}
          to see the devpost for this project.
        </p>
      </div>
      <div className="bg-dark rounded-xl self-center">
        <video controls src={videoUrl} className="rounded-xl h-76 w-80"></video>
      </div>
      <a
        className="flex bg-dark rounded-full text-white justify-start items-center px-2 py-2 m-4 mb-0 text-xl font-semibold"
        href="https://github.com/HudsonPryde/pollyfill"
        target="_blank"
        rel="noopener"
      >
        <Image
          className="mr-2"
          src="./github-mark-white.svg"
          alt="github"
          height={24}
          width={44}
        />
        Check it out on GitHub
      </a>
    </motion.main>
  );
}

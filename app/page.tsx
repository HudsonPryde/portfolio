'use client'
import Image from 'next/image' 
import StudyScribeCard from './components/StudyScribeCard'
import PathFindingCard from './components/PathFindingCard'
import { motion, LayoutGroup } from 'framer-motion'
export default function Home() {
  return (
    <main className="flex w-screen h-screen flex-col lg:p-12 p-6 font-inter overflow-x-hidden items-center">
      {/* header */}
      <div className="flex bg-primary w-full flex-row rounded-2xl justify-center m-2 flex-wrap items-center">
          <p className='lg:text-8xl text-6xl  font-semibold align-middle tracking-tighter pl-6 font-young'>Hudson Pryde</p>
          <div className=" max-w-xl flex flex-row flex-wrap justify-center items-center">
            <div className="border-[3px] border-black rounded-full h-12 w-54 flex flex-row justify-center m-2">
              <p style={{ backgroundSize: '600% 600%' }} className="text-xl tracking-tighter flex flex-1 flex-col justify-center bg-gradient-to-tr from-amber-300 via-red-400 to-amber-300 rounded-full p-4 m-1 font-semibold text-center animate-shimmer">Software Engineer</p>
            </div>
            <div className="border-[3px] border-black rounded-full h-12 w-54 flex flex-row justify-center m-2">
              <p style={{ backgroundSize: '600% 600%' }} className="text-xl tracking-tighter flex flex-1 flex-col justify-center bg-gradient-to-tr from-blue-300 via-violet-400 to-blue-300 rounded-full p-4 m-1 font-semibold text-center animate-shimmer">Full Stack Developer</p>
            </div>
            <div className="border-[3px] border-black rounded-full h-12 w-54 flex flex-row justify-center m-2">
              <p style={{ backgroundSize: '600% 600%' }} className="text-xl tracking-tighter flex flex-1 flex-col justify-center bg-gradient-to-tr from-emerald-300 via-lime-400 to-emerald-300 rounded-full p-4 m-1 font-semibold text-center animate-shimmer">AI Enthusiast</p>
            </div>
          </div>
          <div className='flex flex-1 justify-center space-x-2 self-start m-2'>
          <div className="flex flex-row flex-wrap justify-between items-center bg-dark rounded-full self-start">
            <div className="flex flex-1 flex-row justify-center items-center ml-6">
            <Image src="./link-icon.svg" alt="link icon" width={44} height={44} className='invert'/>
            <p className="lg:text-4xl text-xl tracking-tighter font-semibold text-white">Links</p>
            </div>
            <div className="flex flex-1 flex-row justify-end px-8 py-1 m-1 ml-4 rounded-full">
              <Image src="./east-icon.svg" alt="east icon" width={34} height={34} className='invert'/>
            </div> 
          </div>
            <div className=" bg-blue-900 rounded-full p-2 hover:scale-105">
              <a href='https://www.linkedin.com/in/hudsonpryde/' target='_blank' rel='noopener'><Image src="./linkedin.svg" alt="linkedin icon" width={34} height={34} className="invert"/></a>
            </div>
            <div className="bg-orange-600 rounded-full p-2 hover:scale-105">
              <a href='https://github.com/HudsonPryde' target='_blank' rel='noopener'><Image src="./github-mark-white.svg" alt="github icon" width={34} height={34}/></a>
            </div>
          </div>
        </div>
      {/* description */}
      <div className="bg-[#f7cdd8] flex flex-1 flex-row justify-center m-2 p-4 rounded-2xl">
        <p className="text-xl font-raleway font-semibold">
          Hi there! I&apos;m an undergraduate co-op student studying computer science at TMU, my interests include running 🏃, sci-fi 👽, AI 🤖, philosophy 📚, and software development 💻.
          I&apos;m always experimenting and trying new things so keep an eye on my GitHub for my latest projects. Feel free to checkout my LinkedIn linked at the top of the page for my resume and detailed work experience.
          I&apos;m very passionate about creating tools that help everyday people, so I&apos;m constantly striving to learn as much as I can in order to achieve my goals.
        </p>
      </div>
      {/* projects */}
      <motion.div layout className="flex flex-1 flex-col justify-center items-center">
        <motion.div layout className="flex flex-row justify-center flex-wrap">
            <StudyScribeCard/>
            <PathFindingCard/>
        </motion.div>
      </motion.div>
    </main>
  )
}

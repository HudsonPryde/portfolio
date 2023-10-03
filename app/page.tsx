import Image from 'next/image' 
export default function Home() {
  return (
    <main className="flex w-screen h-screen flex-col p-12">
      <div className="flex bg-primary w-full h-1/6 flex-col rounded-2xl justify-center">
        <div className="flex flex-row items-center">
          <p className=' text-9xl font-semibold align-middle tracking-tighter pl-6'>Hudson Pryde</p>
          <div className=" max-w-xl flex flex-row flex-wrap justify-center items-center">
            <div className="border-[3px] border-black rounded-full h-12 w-54 flex flex-row justify-center m-2">
              <p className="text-xl tracking-tighter flex flex-1 flex-col justify-center bg-amber-300 rounded-full p-4 m-1 font-semibold text-center">Software Engineer</p>
            </div>
            <div className="border-[3px] border-black rounded-full h-12 w-54 flex flex-row justify-center m-2">
              <p className="text-xl tracking-tighter flex flex-1 flex-col justify-center bg-sky-200 rounded-full p-4 m-1 font-semibold text-center">Full Stack Developer</p>
            </div>
            <div className="border-[3px] border-black rounded-full h-12 w-54 flex flex-row justify-center m-2">
              <p className="text-xl tracking-tighter flex flex-1 flex-col justify-center bg-emerald-200 rounded-full p-4 m-1 font-semibold text-center">AI Enthusiast</p>
            </div>
          </div>
          <div className="flex flex-1 flex-row flex-wrap justify-between items-center bg-black rounded-full">
            <div className="flex flex-row justify-center items-center ml-6">
            <Image src="./link_FILL0_wght400_GRAD0_opsz24.svg" alt="link icon" width={44} height={44} className='invert'/>
            <p className="text-4xl tracking-tighter font-semibold text-white">Links</p>
            </div>
            <div className="px-8 py-1 m-1 bg-rose-200 rounded-full">
              <Image src="./east_FILL0_wght400_GRAD0_opsz24.svg" alt="east icon" width={34} height={34} className=''/>
            </div>
            
          </div>
          <div className='flex flex-1 justify-center'>
            <div className="bg-black rounded-full p-2">
              <Image src="./linkedin.svg" alt="linkedin icon" width={44} height={44} className="invert"/>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

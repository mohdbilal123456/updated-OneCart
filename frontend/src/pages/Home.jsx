import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Background from '../component/Background'
import Hero from '../component/Hero'
import Collections from '../pages/Collections'
import LatestCollection from '../component/LatestCollection'
import BestSeller from '../component/BestSeller'
import OurPolicy from '../component/OurPolicy'
import NewLetterBox from '../component/NewLetterBox'
import Footer from '../component/Footer'


function Home() {

  let heroData = [
    {text : "30% OFF Limited Offer ",text2:"Style that"},
    {text : "Discover the Best of Bold Fashion ",text2:"Limited Time Only"},
    {text : "Explore Our Best Collection ",text2:"Shop Now"},
    {text : "Choose Your Perfect Fashion Fit ",text2:"Now on Sale!"},
  ] 

  let [heroCount,setHeroCount] = useState(0)

  useEffect(()=>{
    let interval = setInterval(()=>{
      setHeroCount((prev)=>prev===3 ? 0 : prev+1)
    },2000)
    return ()=> clearInterval(interval)
  },[])

  // bg-gradient-to-l from-[#141414] to-[#0c2025]
  return (
    <>

    <div className='w-full min-h-[100vh] '>
      <div className='w-full  overflow-hidden' >

          <Hero
              heroCount={heroCount}
              setHeroCount={setHeroCount}
              heroData={heroData[heroCount]}
            />
       
       
           <Background heroCount={heroCount} />
         
        </div>
        <LatestCollection/>
        <BestSeller/>
        <OurPolicy/>
        <NewLetterBox/>
       
        <Footer/>
      </div>
    </>
  )
}

export default Home

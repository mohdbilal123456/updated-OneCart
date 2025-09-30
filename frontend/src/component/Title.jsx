import React from 'react'

function Title({text1,text2,className}) {

  return (

    <>

      <div className={` ${className}  md:text-[40px] sm:text-[30px] xs:text-[24px]`} >
            <span className='text-blue-100'>{text1}</span>{" "}
            <span className='text-[#a5faf7]'>{text2}</span>
      </div>

    </>
  )
}

export default Title

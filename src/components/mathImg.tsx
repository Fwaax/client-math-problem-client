import React from 'react'

const MathImgQuestion = () => {


    return (
        <div>
            <div className='bg-gray-400 flex flex-col items-center gap-y-3'>
                <div>TITLE/UPLOADER + Date</div>
                <div className='w-[30rem] h-[20rem] bg-amber-500'>Img or text of math problem</div>
                <div className='cursor-pointer'>Submit answer</div>
            </div>
        </div>
    )
}
// img ANSWER

export default MathImgQuestion

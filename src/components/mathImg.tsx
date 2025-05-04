// import React from 'react'
// import {
//     ErrorComponent,
//     RouterProvider,
//     createRouter,
//     useNavigate,
// } from '@tanstack/react-router'
// import axios from 'axios';
// import ArrowUpTransparentSvg from '../svg/arrowUpTransparentSvg';
// import ArrowDownTransparentSvg from '../svg/arrowDownTransparentSvg';
// import VoteBox from './voteBox';


// const MathImgQuestion = () => {
//     const navigate = useNavigate();

//     function submitAnswerHandler() {
//         navigate({ to: '/submit-answer' });
//     }

//     const liked = true;


//     return (
//         <div>
//             <div className='bg-gray-400 flex flex-col items-center gap-y-3'>
//                 <div>TITLE/UPLOADER + Date</div>
//                 <div className='w-[30rem] h-[20rem] bg-amber-500'>Img or text of math problem</div>
//                 <div className='cursor-pointer' onClick={submitAnswerHandler}>Submit answer</div>
//                 <div>
//                     <VoteBox />
//                 </div>
//             </div>
//         </div>
//     )
// }
// // img ANSWER

// export default MathImgQuestion

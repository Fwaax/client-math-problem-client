import React from 'react'

interface ArrowUpColoredProps {
    className?: string;
    width: string;
    height: string;
}

const ArrowUpColoredSvg = (props: ArrowUpColoredProps) => {
    return (
        <svg className={props.className} width={props.width} height={props.height} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#000000" strokeWidth="1" strokeLinecap="round" strokeLinejoin="miter"><polygon points="3 14 12 3 21 14 16 14 16 22 8 22 8 14 3 14" fill="#3333FF" opacity="0.1" strokeWidth="0"></polygon><polygon points="3 14 12 3 21 14 16 14 16 22 8 22 8 14 3 14"></polygon></svg>
    )
}

export default ArrowUpColoredSvg

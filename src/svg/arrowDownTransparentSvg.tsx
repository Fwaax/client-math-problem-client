import React from 'react'

interface ArrowDownTransparentProps {
    className?: string;
    width: string;
    height: string;
}

const ArrowDownTransparentSvg = (props: ArrowDownTransparentProps) => {
    return (
        <svg className={props.className} width={props.width} height={props.height} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#000000" strokeWidth="1" strokeLinecap="round" strokeLinejoin="miter"><polygon points="21 10 12 21 3 10 8 10 8 2 16 2 16 10 21 10"></polygon></svg>
    )
}

export default ArrowDownTransparentSvg

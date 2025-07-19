import React, { FC } from 'react'
interface ButtonProps {
    onClick: () => void;
    title: string
}
const Button: FC<ButtonProps> = ({ onClick, title }) => {
    return (
        <button className='px-10 py-4 w-full bg-blue-600 text-white rounded-2xl mt-4 hover:bg-blue-900 cursor-pointer'
            onClick={onClick}
        >
            {title}
        </button>
    )
}

export default Button

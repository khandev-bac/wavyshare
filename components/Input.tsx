"use client"
import React, { FC, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

const Input: FC<InputProps> = ({ type = 'text', placeholder, ...props }) => {
    return (
        <input
            className="border-0 border-b border-slate-400 focus:outline-none focus:border-black px-2 py-1 w-full placeholder:text-sm"
            type={type}
            placeholder={placeholder}
            {...props}
        />
    );
};

export default Input;

"use client"
import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import Button from './Button'

function Feedback() {
    const [inputValue, setInputValue] = useState<string>('')
    const [msg, setMsg] = useState('')
    const feedback = async () => {
        try {
            const res = await axios.post("/api/feedback", {
                message: inputValue
            })
            setMsg(res.data.message)
            toast.success(res.data.message)
            setInputValue('')
        } catch (error) {
            console.error("failed to feedback: ", error)
            toast.error("something went wrong", {
                duration: 60000
            })
        }
    }
    return (
        <div className='w-fit py-4  shadow-lg space-y-2 px-4 rounded-lg'>
            <h1 className='text-2xl font-semibold'>Feedback</h1>
            <input
                className='px-10 py-2 border border-slate-500 focus:outline-none rounded-lg placeholder:text-sm '
                placeholder='Share you feedback'
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <div className='flex justify-end-safe '>
                <button className='btn' onClick={feedback}>Send</button>
            </div>
        </div>
    )
}

export default Feedback

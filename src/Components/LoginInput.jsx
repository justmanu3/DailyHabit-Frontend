import React, {useState} from 'react'
import {motion} from 'framer-motion'
import { fadeInOut } from '../Animations'

const LoginInput = ({placeHolder, inputState,inputStateFunc, type, isSignup}) => {
    const [isFocus, setisFocus] = useState(false)

  return (
    <motion.div {...fadeInOut}

    className={`flex items-center justify-center gap-4 bg-cardOverlay backdrop-blur-md rounded-md w-full px-4 py-2 ${isFocus ? "shadow-md shadow-red-400" : "shadow-none"}`}
    >
        <input type={type} placeholder={placeHolder}
         className='w-full h-full bg-transparent text-headingColor text-lg font-thint border-none outline-none'
         value={inputState}
         onChange={(e)=> inputStateFunc(e.target.value)}
         onFocus={()=>setisFocus(true)}
         onBlur={()=>setisFocus(false)}
        />
        
    </motion.div>
  )
}

export default LoginInput
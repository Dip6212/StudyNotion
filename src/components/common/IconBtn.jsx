import React from 'react'


const IconBtn = ({
    text,
    onclick,
    children,
    disabled,
    outline=false,
    customClasses,
    type,
}) => {
  return (
    <button 
    disabled={disabled}
    onClick={onclick}
    type={type}
    className='flex items-center py-[8px] px-[20px] rounded-lg bg-yellow-50 text-richblack-900 font-medium gap-1'>
        {
            children ? (
                <>
                    <span>
                        {text}
                    </span>
                    {children}
                </>
            ) : (text)
        }

       
    </button>
  )
}

export default IconBtn

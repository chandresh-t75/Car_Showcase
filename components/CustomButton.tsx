"use client"

import Image from "next/image"
import { CustomButtonProps } from "../app/types"

const CustomButton = ({title,containerStyles,handleClick,btnType,textStyles,righticon}:CustomButtonProps) => {
  return (
    <button
    disabled={false}
    type={btnType||"button"}
    className={`custom-btn ${containerStyles}`}
    onClick={handleClick}
    >
        <span className={`flex-1 ${textStyles}`}>
            {title}
            
        </span>
        {
                righticon && (
                    <div className="relative w-6 h-6">
                        <Image src={righticon} alt="" fill className="object-contain"/>

                    </div>
                )
            }

    </button>
  )
}

export default CustomButton
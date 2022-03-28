import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { IoIosArrowForward } from 'react-icons/io'

function ButtonAndIcon({
        title,
        to = '#',
        justify = "start",
        txtColor = "text-white",
        theme = 'white',
        scrollLink = false,
    }) {
    const [currentTheme, setTheme] = useState(theme)

    const themeList = {
        white: 'text-red-main bg-white',
        red: 'text-white bg-red-main',
    }


    useEffect(() => {
        switch (theme) {
            case 'white': return setTheme(themeList.white);
            case 'red': return setTheme(themeList.red);
            default: return setTheme(themeList.white)
        }
    }, [theme])

    return (
        <>
            {!scrollLink ?
                <Link href={to} passHref>
                    <div className={`flex cursor-pointer w-full justify-${justify} items-center`}>
                        <p className={`mr-4 ${txtColor}`}>{title}</p>
                        {/* <Image src="/assets/svg/button.svg" width={20} height={20} alt="test" className={`rotate-[${btnRotation}]`} /> */}
                        <div className={` ${currentTheme} w-[20px] h-[20px] grid place-items-center 
                rounded-full hover:scale-105 translate-all cursor-pointer`}>
                            <IoIosArrowForward />
                        </div>
                    </div>
                </Link>
                :
                <a href={`#${to}`}>
                    <div className={`flex cursor-pointer w-full justify-${justify} items-center`}>
                        <p className={`mr-4 ${txtColor}`}>{title}</p>
                        {/* <Image src="/assets/svg/button.svg" width={20} height={20} alt="test" className={`rotate-[${btnRotation}]`} /> */}
                        <div className={` ${currentTheme} w-[20px] h-[20px] grid place-items-center 
                rounded-full hover:scale-105 translate-all cursor-pointer`}>
                            <IoIosArrowForward />
                        </div>
                    </div>
                </a>
            }
        </>


    )
}

export default ButtonAndIcon
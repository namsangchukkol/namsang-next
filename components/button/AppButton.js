import Link from 'next/link'
import React from 'react'


export default function AppButton(
    {
        title,
        to = '#',
        bgColor = "red-main",
        txtColor = "white",
        Icon
    }
) {
    return (
        <Link href={to} passHref>
            <section className={`bg-${bgColor} text-${txtColor} hover:scale-105 w-32 h-10 flex justify-center items-center rounded-lg cursor-pointer transition-all`}>
                {title}
                {Icon &&
                    <Icon
                        color="white"
                        size={22}
                        className="ml-2" />
                }
            </section>
        </Link>
    )
}

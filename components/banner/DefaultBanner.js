import React from 'react'

export default function DefaultBanner({ children }) {
    return (
        <div className='relative bg-grey w-screen h-screen'>
            {children}
        </div>
    )
}

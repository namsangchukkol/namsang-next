import React from 'react'
import Social from '../badges/Social'

export default function SocialMediaContainer() {
    return (
        <aside className="w-20 flex flex-col fixed bottom-[10vh] right-[2vw] z-50">
            <Social />
            <Social />
            <Social />
            <Social />
        </aside>
    )
}
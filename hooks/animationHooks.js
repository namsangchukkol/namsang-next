import { useEffect, useState } from "react"

export const useScroll = () => {
    const [scrolled, setScrolled] = useState()
    useState
    const transition = () => {
        const currentYposition = window.pageYOffset
        currentYposition > 60 ? setScrolled(true) : setScrolled(false)
    }

    useEffect(() => {
        window.pageYOffset > 60 ? setScrolled(true) : setScrolled(false)
        window.addEventListener('scroll', transition)
        return () => { window.removeEventListener('scroll', transition) }
    })
    return scrolled
}

import SanityBlockContent from '@sanity/block-content-to-react'
import React from 'react'
import { defaultSettings, ourClientSettings, ourClientSlides } from '../../settings/carousel.settings'
import AppSlider from '../Slider/Slider'

export default function OurClient({ data }) {
    const { textField, slides, clientLogo } = data
    const { title, content } = textField
    return (
        <section className='w-[100vw] px-indent-sm lg:px-indent bg-dirty-white my-20 flex flex-col lg:flex-row py-10'>
            <aside className='relative w-full lg:w-1/2 pr-0 lg:pr-10'>
                <h2 className='text-title text-red-main'>{title}</h2>
                <SanityBlockContent blocks={content} />
                <br />
                <div className='w-auto '>
                    <AppSlider settings={ourClientSettings}>
                        <ClientLogo />
                        <ClientLogo />
                        <ClientLogo />
                        <ClientLogo />
                        <ClientLogo />
                        <ClientLogo />
                        <ClientLogo />
                        <ClientLogo />
                        <ClientLogo />
                        <ClientLogo />
                        <ClientLogo />
                        <ClientLogo />
                    </AppSlider>
                </div>
            </aside>
            <aside className='w-full lg:w-1/2 mt-10 pl-0 lg:pl-10 pt-10 lg:pt-0'>
                <AppSlider settings={ourClientSlides}>
                    {slides.map((text, index) => <Slide text={text} key={index} />)}
                </AppSlider>
            </aside>
        </section>
    )
}


function ClientLogo() {
    return (
        <div className='w-[80px] h-[80px] bg-gray-300 text-white grid place-items-center text-center rounded-lg m-2 mx-auto'>
            Client logo
        </div>
    )
}
function Slide({ text }) {
    return (
        <div className='w-full h-[200px] bg-red-200 text-2xl text-white grid place-items-center text-left rounded-lg p-5'>
            {text}
        </div>
    )
}
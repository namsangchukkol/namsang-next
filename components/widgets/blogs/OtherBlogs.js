import React from 'react'
import { otherBlogSettings } from '../../../settings/carousel.settings'
import AppSlider from '../../reusables/Slider'
import BlogCard from './BlogCard'

export default function OtherBlogs() {
    return (
        <aside className=''>
            <h2 className='text-title text-red-main my-20 text-center'>บทความอื่นๆ</h2>
            <AppSlider settings={otherBlogSettings}>
                <BlogCard />
                <BlogCard />
                <BlogCard />
                <BlogCard />
            </AppSlider>
        </aside>
    )
}

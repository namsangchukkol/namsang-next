import Image from 'next/image'
import React from 'react'
import { sanityImage } from '../../../helper/imageUrl'
import AppButton from '../../widgets/AppButton.jsx'

export default function FeaturedArticle({ article }) {
  const imgObj = sanityImage(article.singleImage.singleImage)
  return (
    <section className='relative w-full h-[500px] my-10'>
      <div className='absolute lg:w-[70%] h-[500px] w-full rounded-lg'>
        <Image
          {...imgObj}
          layout="fill"
          title={article.singleImage.title}
          alt={article.singleImage.alt}
          className="blur-sm lg:blur-none rounded-lg"
        />
      </div>
      <aside className='absolute top-1/2 -translate-y-1/2 lg:right-0 lg:translate-x-0 right-1/2 translate-x-1/2 border border-red-main lg:w-[60%] w-5/6 h-[280px] rounded-lg p-10 -ml-96 bg-white
        flex flex-col justify-around items-left z-50'>
        <h4 className='text-red-main font-extrabold lg:text-2xl text-lg '>{article.blogContent.title}</h4>
        <AppButton title="Read More" to={`/blog/${article.blogSlug.current}`} />
      </aside>
    </section>
  )
}

import Image from 'next/image'
import React from 'react'
import { sanityImage } from '../../../helper/imageUrl'
import AppButton from '../../widgets/AppButton'

export default function FeaturedArticle({ article }) {
  const imgObj = sanityImage(article.singleImage.singleImage)
  return (
    <section className='flex items-center justify-between my-20 mx-4'>
      <div className='relative  lg:w-[60%] h-[450px] rounded-lg'>
        <Image
          {...imgObj}
          layout="fill"
          title={article.singleImage.title}
          alt={article.singleImage.alt}
        />
      </div>
      <aside className='border border-red-main w-1/2 h-[280px] rounded-lg p-10 -ml-96 bg-white
        flex flex-col justify-around items-left z-50' >
        <h4 className='text-red-main font-extrabold text-2xl'>{article.blogContent.shortDesc}</h4>
        <AppButton title="Read More" to={`/blogs/${article.blogSlug.current}`} />
      </aside>
    </section>
  )
}

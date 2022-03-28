import SanityBlockContent from '@sanity/block-content-to-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { sanityImage } from '../../helper/imageUrl'
import ImageList from '../images/ImageList'


export default function ContentWithImages({ data }) {
    const { featuredImage, productGallery, textFieldBtn } = data?.content
    const { title, content, ctaButton } = textFieldBtn
    const objImg = sanityImage(featuredImage?.singleImage)


    return (
        <section className='pt-10'>
            <aside className='relative w-full h-full lg:h-[400px]'>
                <div className='absolute top-0 w-full h-[400px] hidden lg:grid'>
                    <Image {...objImg}
                        layout="fill"
                        objectFit='contain'
                        alt={featuredImage.alt}
                        title={featuredImage.title} />
                </div>
                <div className='relative lg:absolute z-10 px-indent-sm py-indent-sm lg:px-indent w-full lg:w-1/2'>
                    <br />
                    <h2 className=' text-title text-red-main'>{title}</h2>
                    <br />
                    <SanityBlockContent blocks={content} />
                    <Button
                        title={ctaButton?.title}
                        button={ctaButton?.ctaButtonSlug} />
                </div>
            </aside>
            <ImageList images={productGallery} basePath="products" />
        </section>
    )
}


function Button({ title, button }) {
    return (
        <Link href={button} passHref>
            <div className='flex my-5 cursor-pointer'>
                <p className='mr-4'>{title}</p>
                <Image
                    src="/assets/svg/button.svg"
                    width={20}
                    height={20}
                    alt="test"
                />
            </div>
        </Link>
    )
}
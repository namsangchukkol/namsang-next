import SanityBlockContent from '@sanity/block-content-to-react'
import Image from 'next/image'
import React from 'react'
import AppButton from '../../components/button/AppButton'
import AppSlider from '../../components/Slider/Slider'
import { sanityImage } from '../../helper/imageUrl'
import singleProduct, { productSlug } from '../../sanity/queries/singleProduct'
import client from '../../sanityClient/client'
import { singleProductCarousel } from '../../settings/carousel.settings'

export default function SingleProduct({ pageContent }) {
    const { imageGallery } = pageContent
    const p = pageContent
    return (
        <main className='mx-indent-sm lg:mx-indent text-grey'>
            <section className='flex flex-col lg:flex-row mt-indent'>
                <aside className='lg:w-1/2'>
                    <aside className='lg:w-[80%]'>
                        <AppSlider setting={singleProductCarousel}>
                            {imageGallery.map((image, index) => <MyImage image={image.singleImage} key={index} />)}
                        </AppSlider>
                    </aside>
                </aside>
                <aside className='flex flex-col lg:w-1/2 pt-10 lg:pt-0'>
                    <h2 className='text-title text-red-main font-bold'>{p.productContent.productTitle}</h2>
                    <br />
                    <p>Product Name:
                        <span className='font-bold text-xl ml-2'>{p.productName}</span>
                    </p>
                    <br />
                    <p>Product Code: {p.productCode} </p>
                    <br />
                    <p>Status: {p.productStatus.title}</p>
                    <br />
                    <p>Description:</p>
                    <br />
                    <SanityBlockContent blocks={p.productContent.productDescription} />
                    <br />
                    <AppButton
                        title="Contact Us"
                        to="/contact"
                    />
                </aside>
            </section>
            <section className='my-20'>
                <Highlights content={p.productHighlights} />
            </section>
        </main>
    )
}


const Highlights = ({ content }) => {
    return (
        <section className='flex flex-wrap w-full'>
            <aside className='lg:w-1/2'>
                <h2 className='text-title text-red-main font-bold'>ภาพรวมของสินค้า (จุดเด่น)</h2>
                <br />
                <aside className='lg:w-2/3'>
                    <SanityBlockContent blocks={content?.content} />
                </aside>
            </aside>
            <aside className='flex flex-col justify-center items-start my-10 lg:my-0' >
                {content?.highlights?.map((list, index) =>
                    <aside
                        key={index}
                        className='relative flex justify-center items-center my-5'
                    >
                        <Image
                            src='/assets/svg/correct_icon.svg'
                            width={30}
                            height={30}
                        />
                        <h2 className='text-xl ml-5'>
                            {list}
                        </h2>
                    </aside>
                )}
            </aside>
        </section>
    )
}

const MyImage = ({ image }) => {
    const { singleImage, alt, title } = image
    const imgObj = sanityImage(singleImage)
    return (
        <div className='relative w-[250px] h-[200px] lg:w-[400px] lg:h-[350px] mx-auto'>
            <Image {...imgObj} alt={alt} title={title} layout="fill" />
        </div>
    )
}


export async function getStaticPaths() {
    const _slugs = await client.fetch(productSlug)
    const paths = _slugs.map(res => {
        return {
            params: { product: res.slug.current }
        }
    })
    return {
        paths: paths,
        fallback: false
    }
}

export async function getStaticProps(context) {
    const { params } = context
    const slug = params.product
    const lang = context.locale
    const pageContent = await client.fetch(singleProduct, { lang, slug })
    return {
        props: {
            pageContent
        }
    }
}

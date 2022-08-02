import React, { useEffect, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Grid } from 'swiper';

import AppButton from '../../components/widgets/AppButton.jsx';
import FeaturedArticle from '../../components/widgets/blogs/FeaturedArticle';
import AppSlider from '../../components/reusables/Slider';
import { featuredArticles } from '../../settings/carousel.settings';
import style from '../../styles/Blogs.module.scss';
import blogsQuery from '../../sanity/queries/blogsPage';
import client from '../../sanityClient/client';
import { useFilterer } from '../../helper/dataFilterer';
import blogsListQuery from '../../sanity/queries/blogs';
import { sanityImage } from '../../helper/imageUrl';
import Link from 'next/link';
import SectionHead from '../../components/reusables/head.js';

export default function BlogsPage({ pageContent, blogsContent }) {
  const { metaData, body } = pageContent;
  const { slideList } = useFilterer(body, 'blogsSlideshow');

  return (
    <main className="lg:m-indent md:m-indent-sm m-indent-xsm md:mt-24 mt-24">
      <SectionHead {...metaData} />
      <section className="lg:grid lg:grid-cols-[1fr_3fr] justify-center items-center flex flex-col">
        <h2 className="text-3xl text-red-main lg:mb-0 mb-10">
          {pageContent.title}
        </h2>
        <SearchBox content={pageContent} />
      </section>
      <aside className="relative my-10">
        {/* <AppSlider settings={featuredArticles}> */}
        <Swiper
          slidesPerView={1}
          spaceBetween={5}
          modules={[Navigation, Pagination]}
          // navigation={{ clickable: true }}
          pagination={{ clickable: true }}
        >
          {slideList?.map((article, index) => (
            <SwiperSlide key={index}>
              <FeaturedArticle article={article} />
            </SwiperSlide>
          ))}
        </Swiper>
        {/* </AppSlider> */}
      </aside>
      <aside>
        <h2 className="text-title text-red-main my-20 text-center">
          บทความเด่น
        </h2>
        <div
          className={`${style.blog_slider} grid gap-4 grid-cols-2 grid-rows-3`}
        >
          {blogsContent?.map((blog, index) => (
            <Link href={`/blog/${blog.blogSlug.current}`} key={index} passHref>
              <aside
                className={`grid ${
                  index !== 0 && 'grid-cols-[1fr_2fr]'
                } active:scale-[0.98] transition-all duration-[240ms]  
                hover:shadow-md text-grey hover:text-white cursor-pointer 
                rounded-[28px] hover:bg-red-main hover:rounded-[28px] p-[3px]`}
              >
                <div
                  className={`${style.blog_image} w-[150px] h-[150px] relative rounded-2xl`}
                >
                  <Image
                    layout="fill"
                    objectFit="cover"
                    {...sanityImage(blog?.singleImage?.singleImage)}
                    title={blog?.singleImage?.title}
                    alt={blog?.singleImage?.alt}
                    className="rounded-3xl object-center"
                  />
                </div>
                <p
                  className={`${style.blog_title} blog_title grid text-base text-left font-thin`}
                >
                  {blog?.blogContent?.title}
                </p>
              </aside>
            </Link>
          ))}
          {/* <div className="w-[100vw] h-[800px]">
            <Swiper
              slidesPerView={4}
              spaceBetween={10}
              modules={[Navigation, Pagination, Grid]}
              // navigation={{ clickable: true }}
              grid={{
                rows: 3,
              }}
              pagination={{ clickable: true }}
              // className={`grid gap-4 grid-cols-2 grid-rows-3 w-[100vw] h-[800px]`}
            >
              {blogsContent?.map((blog, index) => (
                <SwiperSlide>
                  <Link
                    href={`/blog/${blog.blogSlug.current}`}
                    key={index}
                    passHref
                  >
                    <aside
                      className={`grid ${
                        index !== 0 && 'grid-cols-[1fr_2fr]'
                      } active:scale-[0.98] transition-all duration-[240ms]  
                hover:shadow-md text-grey hover:text-white cursor-pointer 
                rounded-[28px] hover:bg-red-main hover:rounded-[28px] hover:p-[3px]`}
                    >
                      <div
                        className={`w-[150px] h-[150px] relative rounded-2xl`}
                      >
                        <Image
                          layout="fill"
                          objectFit="cover"
                          {...sanityImage(blog?.singleImage?.singleImage)}
                          title={blog?.singleImage?.title}
                          alt={blog?.singleImage?.alt}
                          className="rounded-3xl object-center"
                        />
                      </div>
                      <p
                        className={`blog_title grid text-base text-left font-thin`}
                      >
                        {blog?.blogContent?.title}
                      </p>
                    </aside>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div> */}
        </div>
      </aside>
    </main>
  );
}

function SearchBox({ content }) {
  const { searchLabel, searchPlaceholder } = content;
  return (
    <aside className="flex w-full">
      <input
        placeholder={searchPlaceholder}
        className="w-full bg-grey-md -mr-2 rounded-lg pl-2 outline-red-main"
      />
      <AppButton title={searchLabel} Icon={AiOutlineSearch} />
    </aside>
  );
}

export async function getStaticProps(context) {
  const min = 0;
  const max = 4;
  const lang = context.locale;
  const pageContent = await client.fetch(blogsQuery, { lang });
  const blogsContent = await client.fetch(blogsListQuery, { lang, min, max });
  return {
    props: {
      pageContent,
      blogsContent,
    },
  };
}

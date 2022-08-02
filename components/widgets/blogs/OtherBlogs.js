import { useRouter } from 'next/router';
import React from 'react';
import useSWR from 'swr';
import fetcher from '../../../helper/fetcher';
import BlogCard from './BlogCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import { windowWidth } from '../../../hooks/windowSize';

export default function OtherBlogs({ toAvoid }) {
  const route = useRouter();
  const { data, error } = useSWR(
    `/api/other/other-blogs/?lang=${route.locale}&slug=${toAvoid}`,
    fetcher,
  );


  const breakpoints = {
    1181: {
      slidesPerView: 4
    },
    1080: {
      slidesPerView: 3
    },
    800: {
      slidesPerView: 2
    },
    340: {
      slidesPerView: 1
    }
  }
  return (
    <aside className="">
      <h2 className="text-title text-red-main my-20 text-center">
        บทความอื่นๆ
      </h2>
      <Swiper
        spaceBetween={5}
        modules={[Navigation, Pagination]}
        navigation={{
          clickable: true,
          // nextEl: '.swiper-button-next .other-blogs-next',
          // prevEl: '.swiper-button-prev .other-blogs-prev'
        }}
        pagination={{ clickable: true, }}
        breakpoints={breakpoints}

      >
        {data &&
          data?.map((blog, index) => (
            <SwiperSlide>
              <BlogCard
                key={index}
                title={blog.blogContent.title}
                image={blog.featuredImage}
                slug={blog.slug.current}
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </aside>
  );
}

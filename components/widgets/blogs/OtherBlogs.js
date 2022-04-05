import { useRouter } from 'next/router';
import React from 'react';
import useSWR from 'swr';
import fetcher from '../../../helper/fetcher';
import { otherBlogSettings } from '../../../settings/carousel.settings';
import AppSlider from '../../reusables/Slider';
import BlogCard from './BlogCard';

export default function OtherBlogs({ toAvoid }) {
  const route = useRouter();
  const { data, error } = useSWR(
    `/api/other/other-blogs/?lang=${route.locale}&slug=${toAvoid}`,
    fetcher,
  );
  return (
    <aside className="">
      <h2 className="text-title text-red-main my-20 text-center">
        บทความอื่นๆ
      </h2>
      <AppSlider settings={otherBlogSettings}>
        {data &&
          data?.map((blog, index) => (
            <BlogCard
              title={blog.blogContent.title}
              image={blog.featuredImage}
              slug={blog.slug.current}
            />
          ))}
      </AppSlider>
    </aside>
  );
}

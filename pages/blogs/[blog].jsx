import SanityBlockContent from '@sanity/block-content-to-react';
import React from 'react';
import OtherBlogs from '../../components/blogs/OtherBlogs';

export default function Blog() {
  return (
    <section className="mx-indent my-indent">
      <p>Blog / Highlight Article</p>
      <h2 className="text-title text-red-main w-2/3 my-4">
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
        nonummy nibh
      </h2>
      <aside className="w-full h-[400px] bg-gray-500 rounded-lg" />
      <SanityBlockContent blocks />
      <OtherBlogs />
    </section>
  );
}

import SanityBlockContent from '@sanity/block-content-to-react';
import React from 'react';
import OtherBlogs from '../../components/widgets/blogs/OtherBlogs';
import singleBlog from '../../sanity/queries/singleBlog';
import client from '../../sanityClient/client';
import serializer from '../../helper/serializer';
import Image from 'next/image';
import { sanityImage } from '../../helper/imageUrl';
import ImageList from '../../components/reusables/ImageList.jsx';

export default function Blog({ pageContent }) {
  const { blogContent, metaData, singleImage, blogSlug, imageGallery } =
    pageContent;
  const featuredImage = sanityImage(singleImage.singleImage);
  return (
    <section className="lg:mx-indent mx-indent-xsm my-indent">
      <p>Blog / {blogSlug?.current}</p>
      <h2 className="text-title text-red-main lg:w-2/3 my-4">
        {blogContent.title}
      </h2>
      <div className="relative w-full h-[400px] bg-gray-400 rounded-lg my-4">
        <Image
          {...featuredImage}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          title={singleImage.title}
          alt={singleImage.alt}
        />
      </div>
      <SanityBlockContent
        blocks={blogContent.content}
        serializers={serializer}
      />
      <ImageList images={imageGallery} simpleImage />
      <OtherBlogs toAvoid={blogSlug.current} />
    </section>
  );
}

export async function getStaticPaths({ locales }) {
  const slugs = await client.fetch(
    `*[_type == 'blogs']{"slug": blogSlug{current}}`,
  );

  const paths = slugs
    .map(blog => {
      return locales.map(locale => ({
        params: { blog: blog.slug.current },
        locale,
      }));
    })
    .flat();

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { params } = context;
  const slug = params.blog;
  const lang = context.locale;
  console.log(`lang: ${lang}, slug: ${slug}`);
  const pageContent = await client.fetch(singleBlog, { lang, slug });
  console.log(`page content: ${pageContent}`);

  if (!pageContent) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      pageContent,
    },
  };
}

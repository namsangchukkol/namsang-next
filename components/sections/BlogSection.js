import BlockContent from '@sanity/block-content-to-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { sanityImage } from '../../helper/imageUrl';
import AppButton from '../widgets/AppButton.jsx';
import style from '../../styles/BlogSection.module.css';

export default function BlogSection({ data }) {
  const { blogSection, textFieldBtn, singleImage } = data;
  return (
    <main
      className={`w-full flex flex-col px-indent-xsm py-12 ${style.maincontainer}`}
    >
      <FeaturedImage textField={textFieldBtn} image={singleImage} />
      <section className="grid place-items-center">
        {blogSection &&
          blogSection.map((list, index) => <Blog content={list} key={index} />)}
      </section>
    </main>
  );
}

function FeaturedImage({ textField, image }) {
  const { ctaButton, content, title } = textField;
  const { title: singleImageTitle, alt, singleImage } = image;
  const imgObj = sanityImage(singleImage);
  return (
    <section className="w-full justify-start items-center mr-5 ">
      <aside className="relative rounded-lg">
        <aside className="lg:grid hidden lg:w-2/3 md:w-full rounded-lg overflow-hidden">
          <Image
            {...imgObj}
            width={400}
            height={400}
            objectFit="cover"
            alt={alt}
            title={singleImageTitle}
          />
        </aside>
        <aside className={`${style.fibox} w-full relative mx-auto text-center`}>
          <h2 className="text-4xl my-5 text-center">{title}</h2>
          <div className="text-start">
            <BlockContent blocks={content} />
          </div>
          <br />
          <span className="hidden md:hidden lg:flex justify-center mx-auto w-full ">
            <AppButton
              title={ctaButton?.title}
              to={`/${ctaButton?.ctaButtonSlug}`}
            />
          </span>
        </aside>
      </aside>
    </section>
  );
}
function Blog({ content }) {
  const { singleImage, textField } = content;
  const imgObj = sanityImage(singleImage?.singleImage);
  return (
    <section
      className={`flex md:justify-around justify-between w-full ${style.blogcontainer}`}
    >
      <aside className="relative rounded-lg overflow-hidden">
        {imgObj && (
          <Image
            {...imgObj}
            width={200}
            height={120}
            objectFit="cover"
            alt={singleImage?.alt}
            title={singleImage?.title}
            className="rounded-lg"
          />
        )}
      </aside>
      <aside className="pl-6 flex flex-col justify-between">
        <BlockContent blocks={textField?.content} />
        <Link href="/" passHref>
          <p
            className="text-sm text-right cursor-pointer hidden lg:grid"
            href="/"
          >
            Read More &gt;
          </p>
        </Link>
      </aside>
    </section>
  );
}

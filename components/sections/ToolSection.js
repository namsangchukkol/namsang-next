import SanityBlockContent from '@sanity/block-content-to-react';
import Image from 'next/image';
import React from 'react';
import { sanityImage } from '../../helper/imageUrl';
import ButtonAndIcon from '../widgets/ButtonAndIcon';

export default function Tools({ content }) {
  const { singleImage, textFieldBtn } = content;
  const { content: desc, ctaButton, title } = textFieldBtn;
  const imgObj = sanityImage(singleImage.singleImage);
  return (
    <section className="relative px-indent lg:h-[350px] md:h-[350px] h-[400px] bg-gray-100">
      <Image
        {...imgObj}
        layout="fill"
        title={singleImage.title}
        alt={singleImage.alt}
      />
      <div className="absolute top-0 w-full h-full z-10" />
      <aside className="z-20 absolute transform top-1/2 -translate-y-1/2 lg:left-40 lg:-translate-x-0 left-1/2 -translate-x-1/2 bg-white lg:w-[500px] md:w-[500px] w-[300px] p-8">
        <h2 className="text-3xl text-red-main font-extrabold mb-4">{title}</h2>
        <div className="lg:w-full">
          <SanityBlockContent blocks={desc} />
        </div>
        <br />
        <ButtonAndIcon
          title={ctaButton?.title}
          txtColor="black"
          theme="red"
          to={`/${ctaButton?.ctaButtonSlug}`}
        />
      </aside>
    </section>
  );
}

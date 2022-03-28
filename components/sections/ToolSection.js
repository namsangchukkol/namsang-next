import SanityBlockContent from '@sanity/block-content-to-react';
import Image from 'next/image';
import React from 'react';
import { sanityImage } from '../../helper/imageUrl';
import ButtonAndIcon from '../button/ButtonAndIcon';

export default function Tools({ content }) {
  const { singleImage, textFieldBtn } = content;
  const { content: desc, ctaButton, title } = textFieldBtn;
  const imgObj = sanityImage(singleImage.singleImage);
  return (
    <section className="relative px-indent h-[350px] bg-gray-100">
      <Image
        {...imgObj}
        layout="fill"
        title={singleImage.title}
        alt={singleImage.alt}
      />
      <div className="absolute top-0 w-full h-full z-10" />
      <aside className="z-20 absolute transform top-1/2 -translate-y-1/2">
        <h2 className="text-3xl text-red-main font-extrabold mb-4">{title}</h2>
        <div className="lg:w-1/3">
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

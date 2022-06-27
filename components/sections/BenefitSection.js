import SanityBlockContent from '@sanity/block-content-to-react';
import Image from 'next/image';
import React from 'react';
import { sanityImage } from '../../helper/imageUrl';

export default function BenefitSection({ data, withPaddingTop = false }) {
  const { benefitImages, textField } = data;
  return (
    <section
      className={`p-indent-sm pt-5 lg:px-indent-lg w-screen text-left lg:text-center`}
      style={{ paddingTop: withPaddingTop && '8rem' }}
    >
      <h2 className="text-title text-red-main my-4 lg:w-1/2 lg:w-full">
        {textField.title}
      </h2>
      <SanityBlockContent blocks={textField.content} />
      <aside className="w-full flex flex-wrap items-center justify-between">
        {benefitImages &&
          benefitImages.map(image => (
            <BenefitImage image={image} key={image._key} />
          ))}
      </aside>
    </section>
  );
}

function BenefitImage({ image }) {
  const { title, alt, singleImage } = image;
  const imgObj = sanityImage(singleImage);
  return (
    <div className="flex flex-col justify-center items-center w-full lg:w-[200px] my-5">
      <div className="relative w-[250px] h-[200px]">
        <Image
          {...imgObj}
          layout="fill"
          objectFit="contain"
          alt={alt}
          title={title}
        />
      </div>
      <h2 className="text-center text-grey-extralight text-2xl">{title}</h2>
    </div>
  );
}

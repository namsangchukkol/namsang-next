import SanityBlockContent from '@sanity/block-content-to-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import BlockContent from '../../helper/blockContent';
import { sanityImage } from '../../helper/imageUrl';
import ImageList from './ImageList.jsx';

export default function ContentWithImages({ data }) {
  const { featuredImage, productGallery, textFieldBtn } = data?.content;
  const { title, content, ctaButton } = textFieldBtn;
  const objImg = sanityImage(featuredImage?.singleImage);

  return (
    <section className="relative py-5 m-0">
      <aside className="relative w-full h-auto bg-[#F8F8F8]">
        <div className="absolute top-0 right-0 w-[40rem] h-[400px] hidden lg:grid">
          {objImg && (
            <Image
              {...objImg}
              layout="fill"
              objectFit="contain"
              height={600}
              alt={featuredImage?.alt}
              title={featuredImage?.title}
            />
          )}
        </div>
        <div
          className={`relative z-10 px-indent-sm py-indent-sm lg:px-indent w-full 
          ${objImg ? 'lg:w-[60%]' : 'lg:w-full'} h-auto`}
        >
          <br />
          <h2 className=" text-title text-red-main">{title}</h2>
          <br />
          {/* <SanityBlockContent blocks={content} /> */}
          <BlockContent blocks={content} />
          {ctaButton.ctaButtonSlug && (
            <Button
              title={ctaButton?.title}
              button={ctaButton?.ctaButtonSlug}
            />
          )}
        </div>
      </aside>
      <div className="px-indent-sm lg:px-indent">
        <ImageList images={productGallery} basePath="products" />
      </div>
    </section>
  );
}

function Button({ title, button }) {
  return (
    <Link href={button} passHref>
      <div className="flex my-5 cursor-pointer">
        <p className="mr-4">{title}</p>
        <Image src="/assets/svg/button.svg" width={20} height={20} alt="test" />
      </div>
    </Link>
  );
}

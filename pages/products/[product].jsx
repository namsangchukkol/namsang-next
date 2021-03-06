import SanityBlockContent from '@sanity/block-content-to-react';
import Image from 'next/image';
import React from 'react';
import AppButton from '../../components/widgets/AppButton.jsx';
import AppSlider from '../../components/reusables/Slider';
import { sanityImage } from '../../helper/imageUrl';
import singleProduct, { productSlug } from '../../sanity/queries/singleProduct';
import client from '../../sanityClient/client';
import { singleProductCarousel } from '../../settings/carousel.settings';
import BlockContent from '../../helper/blockContent';
import SectionHead from '../../components/reusables/head.js';

export default function SingleProduct({ pageContent }) {
  const { imageGallery, metadata } = pageContent;
  const p = pageContent;
  console.log(metadata);
  return (
    <main className="mx-indent-sm lg:mx-indent text-grey mt-20 lg:mt-0">
      <SectionHead {...metadata} />
      <section className="flex flex-col lg:flex-row mt-indent">
        <aside className="lg:w-1/2">
          <aside className="lg:w-[80%]">
            <AppSlider setting={singleProductCarousel}>
              {imageGallery.map((image, index) => (
                <MyImage image={image.singleImage} key={index} />
              ))}
            </AppSlider>
          </aside>
        </aside>
        <aside className="flex flex-col lg:w-1/2 pt-10 lg:pt-0">
          <h2 className="text-title text-red-main font-bold">
            {p?.productContent.productTitle}
          </h2>
          <br />
          <p>
            Product Name:
            <span className="font-bold text-lg ml-2">{p?.productName}</span>
          </p>
          {/* <p>Product Code: {p?.productCode} </p> */}
          <p>Status: {p?.productStatus.title}</p>
          <br />
          <p>Description:</p>
          <BlockContent blocks={p?.productContent.productDescription} />
          <br />
          <AppButton title="Contact Us" to="/contact" />
        </aside>
      </section>
      <section className="my-20">
        <Highlights content={p?.productHighlights} />
      </section>
    </main>
  );
}

function Highlights({ content }) {
  return (
    <section className="flex flex-wrap w-full">
      <aside className="lg:w-1/2">
        <h2 className="text-title text-red-main font-bold">
          ????????????????????????????????????????????? (?????????????????????)
        </h2>
        <br />
        <aside className="lg:w-2/3">
          <BlockContent blocks={content?.content} />
        </aside>
      </aside>
      <aside className="flex flex-col justify-center items-start my-10 lg:my-0">
        {content?.highlights?.map((list, index) => (
          <aside
            key={index}
            className="relative flex justify-center items-center my-5"
          >
            <Image src="/assets/svg/correct_icon.svg" width={30} height={30} />
            <h2 className="text-xl ml-5">{list}</h2>
          </aside>
        ))}
      </aside>
    </section>
  );
}

function MyImage({ image }) {
  const { singleImage, alt, title } = image;
  const imgObj = sanityImage(singleImage);
  return (
    <div className="relative w-[250px] h-[200px] lg:w-[400px] lg:h-[350px] mx-auto">
      <Image {...imgObj} alt={alt} title={title} layout="fill" />
    </div>
  );
}

export async function getStaticPaths() {
  const slugs = await client.fetch(productSlug);
  const paths = slugs.map(res => ({
    params: { product: res.slug.current },
  }));
  return {
    paths,
    fallback: 'blocking',
  };
}

export async function getStaticProps(context) {
  const { params } = context;
  const slug = params.product;
  const lang = context.locale;
  const pageContent = await client.fetch(singleProduct, { lang, slug });
  return {
    props: {
      pageContent,
    },
  };
}

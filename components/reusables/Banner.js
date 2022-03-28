import BlockContent from "@sanity/block-content-to-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { sanityImage } from "../../helper/imageUrl";
import AppButton from "../widgets/AppButton";
import SimpleInput from "../reusables/SimpleInput";
import ContactForm from './Form'

export default function Banner({ content, textColor }) {
  const { banner } = content
  const { bannerTemplate1, bannerTemplate2 } = banner?.banner
  const {
    title,
    inputOne,
    inputTwo,
    bannerPrice,
    bannerPriceTitle,
    ctaButton,
    singleImage
  } = banner
  const image = sanityImage(singleImage.singleImage)

  function BannerTemplate() {
    switch (banner?.banner.template) {
      case 'default': return <TextField content={bannerTemplate1} textColor={textColor} />;
      case 'contactForm': return <Form content={bannerTemplate2} />
      default: return <p>Nothing</p>
    }
  }
  return (
    <>
      <section className="relative bg-gray-300 w-screen lg:h-screen h-[80vh] overflow-x-hidden">
        <Image {...image} objectFit="cover" layout="fill" />
        <BannerTemplate />
      </section>

      {/* Input field */}
      {banner?.withAddSec &&
        <section
          className="lg:absolute md:absolute relative 
                lg:bottom-0 lg:left-1/2 transform lg:-translate-x-1/2 lg:translate-y-1/2
                md:bottom-0 md:left-0 md:-translate-x-0 md:translate-y-0
                translate-x-0 translate-y-0
              bg-red-main lg:w-[75vw] w-[100vw] lg:h-40 md:h-auto h-auto lg:rounded-lg rounded-none text-white lg:pl-10 md:pl-2 pl-0 
                flex lg:flex-row md:flex-row flex-col justify-between items-center py-4 px-4 overflow-hidden
                "
        >
          <aside>
            <h4 className="text-xl mb-5">{title}</h4>
            <div className="flex lg:flex-row md:flex-row flex-col">
              <SimpleInput label={inputOne} />
              <span className="mx-2" />
              <SimpleInput label={inputTwo} />
            </div>
          </aside>

          <aside className="relative lg:w-2/5 md:w-2/5 w-[80vw] h-full border border-white lg:border-l md:border-l border-none lg:pl-5 md:pl-2 pl-0">
            <div className="hidden lg:grid absolute transform top-1/2 -translate-y-1/2 -left-2 my-auto mx-auto w-[1px] bg-white h-[120px]" />
            <h4 >{bannerPriceTitle}</h4>
            <h2 className="text-6xl py-4">{bannerPrice}.-</h2>
            <Link href='/tools' passHref>
              <p
                className="text-sm text-right cursor-pointer"
                href="">
                {ctaButton.title} &gt;
              </p>
            </Link>
          </aside>
        </section>}
    </>
  );
}

function TextField({ content, textColor = "white" }) {
  const { title, ctaButtonSlug } = content.content.ctaButton
  return (
    <aside className={`absolute top-1/2 transform lg:-translate-y-1/2 -translate-y-3/4 lg:ml-indent md:ml-indent lg:mr-0 ml-indent-xsm mr-indent-xsm text-${textColor}`}>
      <h2 className="lg:text-6xl text-4xl font-medium mb-4">{content?.content.title}</h2>
      <div className="lg:w-[450px] md:w-[450px] sm:w-[80vw]">
        <BlockContent blocks={content?.content.content} />
      </div>
      <br />
      <AppButton
        title={title}
        to={`/${ctaButtonSlug}`}
      />
    </aside>
  )
}


function Form({ content }) {
  return (
    <div className="absolute top-20 xl:top-1/2 xl:-translate-y-1/2 lg:top-28 left-1/2 lg:left-20 transform -translate-x-1/2 lg:-translate-x-0 bg-white w-[90vw] lg:w-[35vw] mx-auto
      rounded-md lg:px-10 p-4 py-8 shadow-lg">
      <div className="relative">
        <ContactForm content={content} />
      </div>
    </div>
  )
}
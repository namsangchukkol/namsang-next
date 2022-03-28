import BlockContent from "@sanity/block-content-to-react";
import Image from "next/image";
import React from "react";
import { sanityImage } from "../../helper/imageUrl";
import { defaultSettings } from "../../settings/carousel.settings";
import AppButton from "../widgets/AppButton";
import AppSlider from "../reusables/Slider";

export default function WorkSection({ data }) {
  const { textFieldBtn, bgImage, imageGallery } = data;
  const { title, content, ctaButton } = textFieldBtn

  return (
    <main className="relative bg-grey-light h-screen flex items-center justify-start text-grey px-indent">
      <section className="lg:flex hidden bg-grey-light w-full h-[60vh]" />
      <section className="lg:w-2/3 w-full">
        <section className="text-start mb-10">
          <h2 className="text-4xl my-5">{title}</h2>
          <div className="text-start lg:w-[450px] w-full">
            <BlockContent blocks={content} />
          </div>
          <br />
          <AppButton
            title={ctaButton?.title}
            to={`/${ctaButton?.ctaButtonSlug}`}
          />
        </section>
        <section className="w-full rounded-lg ">
          <AppSlider settings={defaultSettings}>
            {imageGallery && imageGallery.map(image =>
              <WorkImage image={image} key={image._key} />
            )}
          </AppSlider>
        </section>
      </section>
    </main>
  );
}

function WorkImage({ image }) {
  const { alt, title } = image
  const imgObj = sanityImage(image.singleImage)
  return (
    <div className="relative w-[95%] h-[250px] mx-auto rounded-lg overflow-hidden">
      <Image  {...imgObj} layout='fill' objectFit="cover" alt={alt} title={title} />
    </div>
  )
}

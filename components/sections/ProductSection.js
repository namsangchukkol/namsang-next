import BlockContent from "@sanity/block-content-to-react";
import Image from "next/image";
import React from "react";
import { useFilterer } from "../../helper/dataFilterer";
import { sanityImage } from "../../helper/imageUrl";
import { defaultSettings } from "../../settings/carousel.settings";
import AppButton from "../widgets/AppButton.jsx";
import AppSlider from "../reusables/Slider";


export default function ProductSection({ data }) {
  const { title, content, ctaButton } = data?.textFieldBtn
  const { productsImages } = data


  function ProductImage({ image }) {
    const imgUrl = sanityImage(image?.singleImage)
    return (
      <div className="relative m-2">
        <Image {...imgUrl} layout="fixed" width={300} height={300} alt={image?.alt} />
      </div>
    )
  }

  function ProductImageSlider({ image }) {
    const imgUrl = sanityImage(image.singleImage)
    return (
      <div className="relative flex justify-center items-center m-auto w-[95vw] h-[50vh] rounded-lg overflow-hidden">
        <Image {...imgUrl} layout="fill" objectFit="cover" alt={image.alt} />
      </div>
    )
  }
  return (
    <main className="flex lg:flex-row flex-col items-start text-grey lg:mx-indent md:mx-indent-sm mx-indent-xsm lg:mt-indent mt-4">

      {/* mobile screen */}
      <section className="">
        <h2 className="text-4xl my-5">{title}</h2>
        <div className="lg:hidden md:hidden w-[95vw] mx-auto h-auto my-14">
          <AppSlider settings={defaultSettings}>
            {productsImages?.map(image => <ProductImageSlider image={image} key={image._key} />)}
          </AppSlider>
        </div>
        <div className="lg:w-[450px] w-full">
          <BlockContent blocks={content} />
        </div>
        <div className="lg:m-10 m-5" />
        <AppButton
          title={ctaButton?.title}
          to={ctaButton?.ctaButtonSlug}
        />
      </section>

      {/* large screen */}
      <section className="relative hidden lg:flex md:flex justify-center items-center w-full lg:ml-4 ml-0 rounded-lg lg:mt-0 md:mt-10">
        <aside className="flex flex-col -mt-20">
          <ProductImage index={1} image={productsImages[0]} />
          <ProductImage index={2} image={productsImages[1]} />
        </aside>
        <aside className="flex flex-col mt-20">
          <ProductImage index={3} image={productsImages[2]} />
          <ProductImage index={4} image={productsImages[3]} />
        </aside>
      </section>

    </main>
  );
}

import BlockContent from "@sanity/block-content-to-react";
import Image from "next/image";
import React from "react";
import { defaultSettings } from "../../settings/carousel.settings";
import AppSlider from "../Slider/Slider";
import { sanityImage } from "../../helper/imageUrl";

export default function MachineSection({ data }) {
  const { textField, machineImages } = data;
  return (
    <main className="flex flex-col items-start  text-grey lg:mx-indent mx-indent-xsm my-indent-sm">
      <section className="lg:text-center md:text-center text-left lg:mb-20 mb-5">
        <h2 className="text-4xl my-5">{textField.title}</h2>
        <div className="lg:text-center md:text-center text-left lg:mx-10 mx-0">
          <BlockContent blocks={textField?.content} />
        </div>
      </section>
      <section className="w-full h-[60vh] rounded-lg justify-between items-center mb-10">
        <AppSlider settings={defaultSettings}>
          {machineImages && machineImages.map((obj, index) =>
            <MachineImage product={obj.imageGallery[0]} key={index} />
          )}
        </AppSlider>
      </section>
    </main>
  );
}

function MachineImage({ product }) {
  const { singleImage } = product
  const imageObj = sanityImage(singleImage?.singleImage)
  return (
    <div className="relative lg:w-[80%] md:w-[80%] w-full h-[400px] m-2 mx-auto rounded-lg overflow-hidden">
      {imageObj && <Image {...imageObj} layout='fill'
        objectFit="contain"
        alt={singleImage?.alt}
        title={singleImage?.title} />}
    </div>
  )
}
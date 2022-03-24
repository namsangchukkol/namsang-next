import SanityBlockContent from "@sanity/block-content-to-react";
import Image from "next/image";
import { sanityImage } from "../../helper/imageUrl";

export default function OurServices({ content }) {
    const { description, title, services } = content
    return (
        <section className="my-14 lg:mx-super-indent md:mx-indent-sm mx-indent-sm">
            <h2 className="text-title text-red-main font-bold text-center mb-8">{title}</h2>
            <SanityBlockContent blocks={description} />
            <br />
            <aside className="flex flex-wrap items-center justify-center">
                {services.map((service, index) =>
                    <div key={index} className="w-[300px] grid place-items-center mb-10">
                        <div className="relative w-[80px] h-[80px] flex items-center justify-center mb-5">
                            <Image
                                {...sanityImage(service?.singleImage?.singleImage)}
                                layout="fill"
                                objectFit="cover"
                                title={service.singleImage.title}
                                alt={service.singleImage.alt}
                            />
                        </div>
                        <h4 className="text-center">{service.singleImage.title}</h4>
                    </div>
                )}
            </aside>
        </section>
    )
}

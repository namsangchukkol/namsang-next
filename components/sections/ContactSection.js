import Image from 'next/image';
import { sanityImage } from '../../helper/imageUrl';
import AppButton from '../widgets/AppButton.jsx';

export default function ContactSection({ data, opacity = 1 }) {
  const color = data?.color;
  const { title, ctaButton } = data;
  const imgObj = sanityImage(data?.featuredImage?.singleImage);
  return (
    <section className="relative w-full lg:w-[95vw] mx-auto h-[450px] my-10 rounded-none lg:rounded-lg overflow-hidden">
      <aside className="hidden md:grid lg:grid">
        {data?.featuredImage && (
          <Image
            {...imgObj}
            layout="fill"
            objectFit="cover"
            alt={data?.featuredImage?.alt}
            title={data?.featuredImage?.imageTitle}
          />
        )}
      </aside>
      <div
        className={`w-full h-full absolute top-0 left-0 bg-red-main opacity-100`}
        style={{ backgroundColor: color, opacity: opacity }}
      />
      <aside className="absolute top-1/2 -translate-y-1/2 mx-indent-xsm z-10">
        <div className="text-white text-2xl lg:text-3xl w-full lg:w-2/3">
          <h2 className="text-4xl font-bold leading-relaxed">{title}</h2>
        </div>
        <br />
        <AppButton
          title={ctaButton?.title}
          to={`/${ctaButton?.ctaButtonSlug}`}
          bgColor="white"
          txtColor="#BE1E2D"
        />
      </aside>
    </section>
  );
}

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { sanityImage } from '../../helper/imageUrl';

export default function ImageList({
  images,
  basePath = '',
  simpleImage = false,
}) {
  return (
    <section className="flex flex-wrap lg:justify-between justify-center items-center w-full my-14">
      {images &&
        images?.map((image, index) => (
          <ImageCard
            image={image}
            slug={image.slug}
            key={index}
            name={image.name}
            basePath={basePath}
            simpleImage={simpleImage}
          />
        ))}
    </section>
  );
}

function ImageCard({ image, slug, name, basePath, simpleImage }) {
  const [showText, setText] = useState(false);
  const { singleImage, alt, title } = image;
  let imgObj = null;
  try {
    imgObj = sanityImage(singleImage);
  } catch {
    imgObj = sanityImage(singleImage.singleImage);
  }

  function Type({ children }) {
    if (!simpleImage) {
      return (
        <Link href={`/${basePath}/${slug}`} passHref>
          {children}
        </Link>
      );
    }
    return <aside>{children}</aside>;
  }

  return (
    <Type>
      <div className="flex flex-col justify-center items-center w-[full] lg:w-[300px] my-10 cursor-pointer hover:scale-[1.02] transition-all duration-[200ms]">
        <div className="relative w-[80vw]  h-[300px] lg:w-[300px] lg:h-[300px] rounded-lg overflow-hidden shadow-md">
          {imgObj && (
            <Image
              {...imgObj}
              layout="fill"
              objectFit="contain"
              alt={alt}
              title={title}
            />
          )}
          {!simpleImage && (
            <div
              className="absolute top-0 left-0 w-full h-full z-10 hover:bg-red-main opacity-[0.8]
                                    grid place-items-center"
              onMouseEnter={() => setText(true)}
              onMouseLeave={() => setText(false)}
            >
              {showText && <p className="text-white">View Detail {'>'}</p>}
            </div>
          )}
        </div>
        <br />
        {name && <h4 className="text-center">{name || title}</h4>}
      </div>
    </Type>
  );
}

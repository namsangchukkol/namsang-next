import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { sanityImage } from '../../../helper/imageUrl';
import { commonData } from '../../../recoil/atoms';

export default function ProductGalleryList(props) {
  const { title, more = true, moreButton } = props;
  const data = useRecoilValue(commonData);
  const products = data.otherProducts;
  console.log(moreButton);
  return (
    <>
      {title && (
        <h2 className="text-title text-red-main text-left lg:text-center mx-indent">
          {title}
        </h2>
      )}
      <section className="px-indent-sm lg:px-indent flex flex-wrap justify-between items-center w-full ">
        {products &&
          products?.map((product, index) => (
            <ImageCard
              slug={product?.slug}
              image={product?.image.singleImage}
              name={product?.name}
              key={index}
            />
          ))}
      </section>
      {more && (
        <Link href="/products/" passHref>
          <p className="text-center cursor-pointer hover:underline">
            {moreButton || 'See more'} {'>'}
          </p>
        </Link>
      )}
    </>
  );
}

function ImageCard({ image, slug, name }) {
  const [showText, setText] = useState(false);
  const { singleImage, alt, title } = image;
  const imgObj = sanityImage(singleImage);
  return (
    <Link href={`/products/${slug || ''}`} passHref>
      <div className="flex flex-col justify-center items-center w-full lg:w-[300px] my-10 cursor-pointer hover:scale-[1.02] transition-all duration-[200ms]">
        <div className="relative w-[80vw] h-[300px] lg:w-[350px] lg:h-[300px] rounded-lg overflow-hidden">
          {imgObj && (
            <Image
              {...imgObj}
              layout="fill"
              objectFit="cover"
              alt={alt}
              title={title}
            />
          )}
          <div
            className="absolute top-0 left-0 w-full h-full z-10 hover:bg-red-main opacity-[0.8] grid place-items-center"
            onMouseEnter={() => setText(true)}
            onMouseLeave={() => setText(false)}
          >
            {showText && <p className="text-white">View Detail {'>'}</p>}
          </div>
        </div>
        <br />
        <h4 className="text-center">{name}</h4>
      </div>
    </Link>
  );
}

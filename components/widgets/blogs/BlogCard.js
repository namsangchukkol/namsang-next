import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { sanityImage } from '../../../helper/imageUrl';

export default function SingleBlog({ title, image, slug = '#' }) {
  return (
    <Link href={slug} passHref>
      <section className="m-2 hover:scale-[1.02] active:scale-[1] transition-all cursor-pointer">
        <Link href={`/blog/${slug}`} passHref>
          <aside>
            <div className="relative bg-gray-400 w-full h-[250px] rounded-lg mb-5">
              {image && (
                <Image
                  {...sanityImage(image.singleImage)}
                  layout="fill"
                  objectFit="cover"
                  alt={image?.alt}
                  title={image?.alt}
                  className="rounded-md"
                />
              )}
            </div>
            <p>{title}</p>
            {/* <p className="mt-2">Read More {'>'}</p> */}
          </aside>
        </Link>
      </section>
    </Link>
  );
}

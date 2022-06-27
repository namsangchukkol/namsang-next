import SanityBlockContent from '@sanity/block-content-to-react';
import Image from 'next/image';
import { sanityImage } from '../../helper/imageUrl';
import serializers from '../../helper/serializer';

export default function OurHistory({ content }) {
  const histories = content?.historyContent;
  return (
    <section className="bg-dirty-white py-10 px-indent">
      {histories.map((history, index) => (
        <aside
          key={index}
          className={`history_container flex my-10 
                    lg:even:flex-row-reverse lg:flex-row flex-col`}
        >
          <div>
            <div
              className={`history_text lg:w-2/3 mb-10
                                            ${index % 2 ? 'lg:pl-10' : 'pl-0'}`}
            >
              <SanityBlockContent
                blocks={history.blockContent}
                serializers={serializers}
              />
            </div>
          </div>
          <div className="relative w-full h-[400px] overflow-hidden shadow-sm">
            {history.singleImage?.singleImage && (
              <Image
                {...sanityImage(history.singleImage.singleImage)}
                layout="fill"
                objectFit="cover"
                title={history.singleImage.title}
                alt={history.singleImage.alt}
                className="rounded-lg"
              />
            )}
          </div>
        </aside>
      ))}
    </section>
  );
}

import React, { useEffect, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import Image from 'next/image';
import AppButton from '../../components/widgets/AppButton.jsx';
import FeaturedArticle from '../../components/widgets/blogs/FeaturedArticle';
import AppSlider from '../../components/reusables/Slider';
import { featuredArticles } from '../../settings/carousel.settings';
import style from '../../styles/Blogs.module.scss';
import blogsQuery from '../../sanity/queries/blogsPage';
import client from '../../sanityClient/client';
import { useFilterer } from '../../helper/dataFilterer';
import blogsListQuery from '../../sanity/queries/blogs';
import { sanityImage } from '../../helper/imageUrl';

export default function BlogsPage({ pageContent, blogsContent }) {
  const { metaData, body } = pageContent;
  const { slideList } = useFilterer(body, 'blogsSlideshow');
  const [blogsLength, setBlogsLength] = useState(1);

  const [gridConfig, setGrid] = useState({
    container: {
      grid_cols: 2,
    },
    card: {
      grid_cols: 'grid-cols-[1fr_3fr]',
      imazeSize: 'w-[150px] h-[140px]',
    },
  });

  useEffect(() => {
    setBlogsLength(blogsContent.length);
  }, [blogsContent]);

  useEffect(() => {
    switch (blogsLength) {
      case 1:
        setGrid({
          container: {
            grid_cols: 1,
          },
          card: {
            grid_cols: 'grid-cols-1',
            imazeSize: 'w-full h-[310px]',
          },
        });
        break;
      default:
        setGrid({
          container: {
            grid_cols: 2,
          },
          card: {
            grid_cols: 'grid-cols-[1fr_3fr]',
            imazeSize: 'w-[150px] h-[140px]',
          },
        });
    }
  }, [blogsContent]);

  return (
    <main className="lg:m-indent md:m-indent-sm  m-indent-xsm">
      <section className="grid grid-cols-[1fr_3fr] justify-center items-center">
        <h2 className="text-3xl text-red-main">{pageContent.title}</h2>
        <SearchBox content={pageContent} />
      </section>
      <aside>
        <AppSlider settings={featuredArticles}>
          {slideList?.map((article, index) => (
            <FeaturedArticle article={article} key={index} />
          ))}
        </AppSlider>
      </aside>
      <aside>
        <h2 className="text-title text-red-main my-20 text-center">
          บทความเด่น
        </h2>
        <div
          className={`${style.blog_slider} grid grid-cols-${gridConfig.container.grid_cols} gap-4`}
        >
          {blogsContent?.map((blog, index) => (
            <aside
              key={index}
              className={`grid col-span-1 first:grid-cols-1 first:row-span-3 row-span-${
                3 / (blogsLength - 1)
              } sm:grid-cols-${
                blogsLength < 3 ? 1 : 2
              } xl:grid-cols-[2fr_3fr] first:h-full h-[200px] 
                                             sm:grid-col-${
                                               gridConfig.card.grid_cols
                                             } gap-3
                                            `}
            >
              <div
                className={`w-full ${style?.blog_image1} ${gridConfig.card.imazeSize1} 
                                                 relative rounded-2xl grid place-items-center h-full w-full`}
              >
                <Image
                  layout="fill"
                  {...sanityImage(blog?.singleImage?.singleImage)}
                  title={blog?.singleImage?.title}
                  alt={blog?.singleImage?.alt}
                  className="rounded-3xl object-center"
                />
              </div>
              <p className="text-base text-left font-thin">
                {blog?.blogContent?.shortDesc}
              </p>
            </aside>
          ))}
        </div>
      </aside>
    </main>
  );
}

function SearchBox({ content }) {
  const { searchLabel, searchPlaceholder } = content;
  return (
    <aside className="flex w-full">
      <input
        placeholder={searchPlaceholder}
        className="w-full bg-grey-md -mr-2 rounded-lg pl-2 outline-red-main"
      />
      <AppButton title={searchLabel} Icon={AiOutlineSearch} />
    </aside>
  );
}

export async function getStaticProps(context) {
  const min = 0;
  const max = 4;
  const lang = context.locale;
  const pageContent = await client.fetch(blogsQuery, { lang });
  const blogsContent = await client.fetch(blogsListQuery, { lang, min, max });
  return {
    props: {
      pageContent,
      blogsContent,
    },
  };
}

import React from 'react';
import Banner from '../components/reusables/banner.jsx';
import ImageList from '../components/reusables/ImageList.jsx';
import CalculationSection from '../components/sections/CalculationSection';
import ToolSection from '../components/sections/ToolSection';
import { useFilterer } from '../helper/dataFilterer';
import client from '../sanityClient/client';

export default function Tools({ pageContent }) {
  const { metaData, body } = pageContent;
  return (
    <main>
      <Banner content={useFilterer(body, 'bannerTemplate')} textColor="grey" />
      <ToolSection content={useFilterer(body, 'introToCalculation')} />
      <CalculationSection content={useFilterer(body, 'calculationSection')} />
      <div className="lg:px-indent px-indent-xsm">
        <ImageList
          images={useFilterer(body, 'imageGallery').imageGallery}
          simpleImage
        />
      </div>
    </main>
  );
}

export async function getStaticProps(context) {
  const lang = context.locale;
  const pageContent = await client.fetch(
    `*[_type == 'toolsPage' && metaData.language->.shortLanguage == $lang][0]`,
    { lang },
  );

  return {
    props: {
      pageContent,
    },
  };
}

import React from 'react';
import Banner from '../../components/reusables/Banner';
import BenefitSection from '../../components/sections/BenefitSection';
import ContactSection from '../../components/sections/ContactSection';
import OurClient from '../../components/sections/OurClient';
import ContentWithImages from '../../components/reusables/ContentWithImages';
import ProductGalleryList from '../../components/widgets/products/ProductGalleryList';
import { useFilterer } from '../../helper/dataFilterer';
import productPage from '../../sanity/queries/productPage';
import client from '../../sanityClient/client';
import SectionHead from '../../components/reusables/head';

export default function Product({ pageContent }) {
  const { body, metaData } = pageContent;

  const MappingContent = () => {
    return body?.map((section, index) => {
      const type = section._type;
      if (!type) return <></>;
      switch (type) {
        case 'bannerTemplate':
          return <Banner content={section} />;
        case 'benefitSection':
          return <BenefitSection data={section} withPaddingTop />;
        case 'generatorShowcase':
          return <ContentWithImages data={section} />;
        case 'usedMachineShowcase':
          return <ContentWithImages data={section} />;
        case 'contactSection':
          return <ContactSection data={section} opacity={0.5} />;
        case 'ourClient':
          return <OurClient data={section} />;
        default:
          return;
      }
    });
  };

  return (
    <div>
      <SectionHead {...metaData} />
      <MappingContent />
      <ProductGalleryList title="สินค้าอื่นๆ" />
    </div>
  );
}

export async function getStaticProps(context) {
  const lang = context.locale;
  const pageContent = await client.fetch(productPage, { lang });
  return {
    props: {
      pageContent,
    },
  };
}

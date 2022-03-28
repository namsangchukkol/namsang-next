import React from 'react';
import Banner from '../../components/banner/Banner';
import BenefitSection from '../../components/sections/BenefitSection';
import ContactSection from '../../components/sections/ContactSection';
import OurClient from '../../components/sections/OurClient';
import ContentWithImages from '../../components/templates/ContentWithImages';
import ProductGalleryList from '../../components/templates/ProductGalleryList';
import { useFilterer } from '../../helper/dataFilterer';
import productPage from '../../sanity/queries/productPage';
import client from '../../sanityClient/client';

export default function Product({ pageContent }) {
  const { body, metaData } = pageContent;

  return (
    <div>
      <Banner content={useFilterer(body, 'bannerTemplate')} />
      <BenefitSection
        data={useFilterer(body, 'benefitSection')}
        withPaddingTop
      />
      <ContentWithImages data={useFilterer(body, 'generatorShowcase')} />
      <ContactSection
        data={useFilterer(body, 'contactSection')}
        opacity={0.5}
      />
      <ContentWithImages data={useFilterer(body, 'usedMachineShowcase')} />
      <OurClient data={useFilterer(body, 'ourClient')} />
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

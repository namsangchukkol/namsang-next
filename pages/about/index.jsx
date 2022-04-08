import aboutQuery from '../../sanity/queries/aboutPage';
import client from '../../sanityClient/client';
import Banner from '../../components/reusables/Banner';
import { useFilterer } from '../../helper/dataFilterer';
import OurServices from '../../components/sections/OurServices';
import OurHistory from '../../components/sections/OurHistory';
import ContactSection from '../../components/sections/ContactSection';
import BenefitSection from '../../components/sections/BenefitSection';
import ProductGalleryList from '../../components/widgets/products/ProductGalleryList';

export default function About({ pageContent }) {
  const { metaData, body } = pageContent;
  const { title, moreButton } = useFilterer(body, 'otherProductsSection');
  return (
    <main className="bg-white">
      <Banner content={useFilterer(body, 'bannerTemplate')} textColor="grey" />
      <OurServices content={useFilterer(body, 'mainServices')} />
      <OurHistory content={useFilterer(body, 'ourHistory')} />
      <ContactSection data={useFilterer(body, 'contactSection')} opacity={1} />
      <BenefitSection data={useFilterer(body, 'benefitSection')} />
      <ProductGalleryList title={title} moreButton={moreButton} />
    </main>
  );
}

export async function getStaticProps(context) {
  const lang = context.locale;
  const pageContent = await client.fetch(aboutQuery, { lang });
  return {
    props: {
      pageContent,
    },
  };
}

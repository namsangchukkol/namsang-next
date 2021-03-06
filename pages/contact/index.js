import { MdPhoneInTalk } from 'react-icons/md';
import { FaFax } from 'react-icons/fa';
import { useRecoilValue } from 'recoil';
import MapSection from '../../components/sections/MapSection.js';
import Banner from '../../components/reusables/Banner';
import { commonData } from '../../recoil/atoms';
import contactPage from '../../sanity/queries/contactPage';
import client from '../../sanityClient/client';
import { useFilterer } from '../../helper/dataFilterer';
import { ContactIcon } from '../../components/reusables/ContactIcon';
import SectionHead from '../../components/reusables/head.js';


function ContactComponent({ content }) {
  return (
    <section>
      <h2 className="text-title text-red-main">{content?.name}</h2>
      <p>{content?.description}</p>
      <aside>
        <ContactIcon Icon={MdPhoneInTalk} value={content?.mobile} />
        <ContactIcon Icon={FaFax} value={content?.fixedPhone} />
      </aside>
    </section>
  );
}

export default function Contact({ pageContent }) {
  const { body, metaData } = pageContent;

  const data = useRecoilValue(commonData);
  const { map } = data;
  const locations = map?.locations;
  return (
    <section>
      <SectionHead {...metaData} />
      <Banner content={useFilterer(body, 'bannerTemplate')} />
      <MapSection />
      <aside className="px-indent grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-y-10 gap-x-5 py-20 bg-dirty-white">
        {locations?.map((location, index) => (
          <ContactComponent key={index} content={location?.contactDetail} />
        ))}
      </aside>
    </section>
  );
}

export async function getStaticProps(context) {
  const lang = context.locale;
  const pageContent = await client.fetch(contactPage, { lang });
  return {
    props: {
      pageContent,
    },
  };
}

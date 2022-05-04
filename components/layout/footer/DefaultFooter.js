import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { commonData } from '../../../recoil/atoms';
import { ContactIcon } from '../../reusables/ContactIcon';
import FormSection from '../../sections/FormSection.js';
import AppButton from '../../widgets/AppButton';
import { MdPhoneInTalk } from 'react-icons/md';
import { FaFax } from 'react-icons/fa';
import { AiOutlineMail, AiOutlineSearch } from 'react-icons/ai';

export default function Footer() {
  const data = useRecoilValue(commonData);
  const formContent = data && data?.contactForm;
  const { header, siteSettings } = data;
  const route = useRouter();
  const hiddenList = [''];
  const currentPathname = route.pathname.split('/')[1];

  const runThroughList = lists => {
    const toFind = lists.filter(list => list === currentPathname)[0];
    if (toFind === undefined) return true;
    return false;
  };

  console.log(route)

  return (
    <>
      <section className="lg:mx-indent-super-xsm my-10">
        {formContent && runThroughList(hiddenList) && (
          <FormSection content={formContent[0]} labelColor="white" />
        )}
      </section>
      <footer className=" w-full bg-white pt-5">
        <aside
          className="grid lg:grid-cols-[1.5fr_1.6fr_2fr_0.8fr] md:grid-cols-2 grid-cols-1 lg:mx-indent mx-indent-xsm gap-8
            border-b border-red-main pb-10"
        >
          <section>
            <div className="relative w-44 h-[55px]">
              {data?.siteSettings && (
                <Link href="/" passHref>
                  <Image
                    src={siteSettings?.logo.singleImage.asset.url}
                    layout="fill"
                    objectFit="contain"
                    className="hover:cursor-pointer"
                  />
                </Link>
              )}
            </div>
            <br />
            <AppButton title="Contact Us" to="/contact" />
          </section>
          <section>
            <h2>277 ถนนเพชรเกษม แขวงหนองค้างพลู เขตหนองแขม กรุงเทพฯ 10160</h2>
            <aside>
              <ContactIcon Icon={MdPhoneInTalk} value="02-809-7033" />
              <ContactIcon Icon={FaFax} value="02-809-7033" />
              <ContactIcon
                Icon={AiOutlineMail}
                type="mailto"
                value="Info@namsang.co.th"
              />
              <ContactIcon type="mailto" value="Servicensc@namsang.co.th" />
            </aside>
          </section>
          <section>
            <h2>Menu</h2>
            <br />
            <aside className="grid grid-cols-3 gap-1">
              {header?.menuList.map((list, index) => (
                <Link
                  href={`/${list?.slug === 'home' ? '' : list?.slug}`}
                  passHref
                  key={index}
                >
                  <p className=" text-grey normal-case w-[20px]">
                    {list?.menuLabel}
                  </p>
                </Link>
              ))}
            </aside>
          </section>
          <div className="flex items-start justify-between gap-2">
            <AiOutlineSearch size={25} color="#BE1E2D" />
            <SocialIcon type="line" />
            <SocialIcon type="facebook" />
            <SocialIcon type="twitter" />
          </div>
        </aside>
        <p className="text-center py-2 text-[0.7rem]">
          Copyright © 2022 บริษัท นำแสง จักรกล จำกัด All rights reserved.
        </p>
      </footer>
    </>
  );
}

const SocialIcon = ({ type }) => {
  return (
    <div className="relative w-6 h-6 rounded-lg grid place-items-center">
      <Image
        src={`/assets/svg/${type}.svg`}
        layout="fill"
        objectFit="contain"
      />
    </div>
  );
};

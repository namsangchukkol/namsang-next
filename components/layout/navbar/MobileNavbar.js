import Hamburger from 'hamburger-react';
import Image from 'next/image';
import { useState } from 'react';
import { useScroll } from '../../../hooks/animationHooks';
import { GrLanguage } from 'react-icons/gr';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { toUpperCase } from '../../../helper/functions';
import { IoIosArrowDown } from 'react-icons/io';

export default function MobileNavbar({ data, lang }) {
  const router = useRouter();
  const scrolled = useScroll();
  const [isOpen, setOpen] = useState(false);
  return (
    <nav
      className={`lg:hidden w-screen fixed top-0 left-0 z-50 h-14 
        ${
          scrolled ? 'bg-white shadow-sm' : 'bg-transparent'
        } flex justify-between items-center px-5 transition-all`}
    >
      <div className="z-50 relative w-[40px] h-[40px] mx-2 flex items-center justify-center ">
        {!isOpen && data?.siteSettings?.favicon ? (
          <Image
            src={data?.siteSettings?.favicon?.asset?.url}
            layout="fill"
            objectFit="contain"
          />
        ) : (
          <Link href={router.asPath} locale={lang} passHref>
            <div className="text-black z-50 ml-20 flex items-center justify-center">
              <GrLanguage size={20} />
              <p className="ml-2 underline">{toUpperCase(lang)}</p>
            </div>
          </Link>
        )}
      </div>
      <Menu data={data} navOpen={isOpen} setOpen={setOpen} />
      {/* Burger menu */}
      <aside className="z-50">
        <Hamburger
          toggled={isOpen}
          toggle={setOpen}
          size={30}
          color={scrolled ? 'red' : '#3B3B3B'}
          duration={0.2}
        />
      </aside>
      <aside
        className={`${
          !isOpen && 'hidden'
        } absolute top-0 left-0  w-screen bg-white pt-20 flex flex-col items-start`}
        style={{ height: isOpen ? '100vh' : 'auto' }}
      ></aside>
    </nav>
  );
}

const Menu = ({ data, navOpen, setOpen }) => {
  if (navOpen) {
    return (
      <div className="absolute top-20 left-14 mx-auto z-50">
        {data?.header?.menuList.map((list, index) => (
          <SingleList data={data} list={list} key={index} setOpen={setOpen} />
        ))}
      </div>
    );
  }
  return null;
};

const SingleList = ({ list, setOpen }) => {
  const [arrowOpen, setArrowOpen] = useState(false);
  return (
    <>
      <div className="flex justify-between items-center transition-all h-auto">
        <Link href={`/${list?.slug === 'home' ? '' : list?.slug}`} passHref>
          <p
            className="text-grey normal-case mx-5 py-4 text-xl hover:underline cursor-pointer"
            onClick={() => setOpen(false)}
          >
            {list?.menuLabel}
          </p>
        </Link>
        {list?.subMenuList && (
          <IoIosArrowDown
            size={20}
            className={`hover:text-red-main cursor-pointer ${
              arrowOpen && 'rotate-180'
            } transition-all`}
            onClick={() => setArrowOpen(!arrowOpen)}
          />
        )}
      </div>
      {list?.subMenuList && arrowOpen && (
        <aside className="mt-[-12px]">
          {list?.subMenuList.map((submenu, index) => (
            <Link
              href={`/${list.slug}/${submenu?.subMenu?.current}`}
              passHref
              key={index}
            >
              <p
                className="ml-8 my-2 hover:underline cursor-pointer"
                onClick={() => setOpen(false)}
              >
                {submenu?.subMenuLabel}
              </p>
            </Link>
          ))}
        </aside>
      )}
    </>
  );
};

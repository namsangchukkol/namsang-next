import Hamburger from 'hamburger-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useScroll } from '../../../hooks/animationHooks';
import { MdOutlineLanguage } from 'react-icons/md';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function MobileNavbar({ data }) {
  const scrolled = useScroll();
  const [isOpen, setOpen] = useState(false);
  const router = useRouter();
  const [currentRoute, setCurrentRoute] = useState(router.basePath);
  const [currentLocale, setCurrentLocale] = useState(router.locale);

  useEffect(() => {
    console.log('router changed');
    console.log(`pathname: ${router.pathname}`);
    setCurrentRoute(router.pathname);
    setCurrentLocale(router.locale);
    console.log(`locale: ${router.locale}`);
  }, [router]);

  return (
    <nav
      className={`lg:hidden w-screen fixed top-0 left-0 z-50 h-14 
        ${
          scrolled ? 'bg-white shadow-sm' : 'bg-transparent'
        } flex justify-between items-center px-5 transition-all`}
    >
      <div className="z-50 relative w-full h-[40px] flex items-center justify-center ">
        {!isOpen && data?.siteSettings?.favicon ? (
          <Image
            src={data?.siteSettings?.favicon?.asset?.url}
            layout="fill"
            objectFit="contain"
          />
        ) : (
          <Link
            href={currentRoute || '/'}
            locale={currentLocale === 'th' ? 'en' : 'th'}
            passHref
          >
            <a className="w-full text-grey z-50 flex items-center justify-center">
              <MdOutlineLanguage size={25} color={'#be1e2d'} />
              <p className="ml-2">{currentLocale === 'th' ? 'EN' : 'TH'}</p>
            </a>
          </Link>
        )}
      </div>

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
      >
        <div className={`mx-auto`} onClick={() => setOpen(false)}>
          {data?.header?.menuList.map((list, index) => (
            <Link
              href={`/${list?.slug === 'home' ? '' : list?.slug}`}
              passHref
              key={index}
            >
              <a className="block text-grey normal-case mx-5 py-4 text-xl cursor-pointer text-center">
                {list?.menuLabel}
              </a>
            </Link>
          ))}
        </div>
      </aside>
    </nav>
  );
}

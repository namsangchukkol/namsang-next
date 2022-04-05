import Hamburger from 'hamburger-react';
import Image from 'next/image';
import { useState } from 'react';
import { useScroll } from '../../../hooks/animationHooks';
import { GrLanguage } from 'react-icons/gr';
import Link from 'next/link';

export default function MobileNavbar({ data }) {
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
          <Link href="" locale="th" passHref>
            <div className="text-black z-50 ml-20 flex items-center justify-center">
              <GrLanguage size={20} />
              <p className="ml-2">TH</p>
            </div>
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
              <p className="text-grey normal-case mx-5 py-4 text-xl cursor-pointer">
                {list?.menuLabel}
              </p>
            </Link>
          ))}
        </div>
      </aside>
    </nav>
  );
}

import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { commonData } from '../../../recoil/atoms';
import AppButton from '../../widgets/AppButton.jsx';
import { windowWidth } from '../../../hooks/windowSize';
import MobileNavbar from './MobileNavbar';
import { useScroll } from '../../../hooks/animationHooks';
import Image from 'next/image';
import { GrLanguage } from 'react-icons/gr';
import { toUpperCase } from '../../../helper/functions';

export default function Navbar() {
  const router = useRouter();
  const currentLang = router.locale;
  const scrolled = useScroll();
  const data = useRecoilValue(commonData);
  const { header, siteSettings } = data;
  let lang = router.locales.filter(lang => lang !== currentLang)[0];
  return (
    <>
      {windowWidth() > 1030 ? (
        <nav
          className={`fixed top-0 left-0 z-50 w-full 
                       ${scrolled
              ? 'bg-white shadow-sm py-2'
              : 'bg-transparent py-4'
            } 
                        transition-all px-indent-super-xsm`}
        >
          <div className="grid grid-cols-[1fr_3fr_1fr] justify-between items-center">
            <div className="relative w-44 h-[55px] px-2 mx-2">
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
            <div className="w-full px-2 mx-2 lg:flex items-center justify-center">
              {header?.menuList?.map((list, index) => (
                <div className="dropdown dropdown-hover" key={index}>
                  <Link
                    href={`/${list?.slug === 'home' ? '' : list?.slug}`}
                    passHref
                    className="btn"
                  >
                    <p tabIndex="0" className={`${router.locale !== 'en' ? 'text-[14px]' : 'text-[15px]'} btn btn-ghost btn-sm rounded-btn text-grey normal-case mx-5`}>
                      {list?.menuLabel}
                    </p>
                  </Link>

                  {list?.subMenuList &&
                    <ul tabIndex="0" className="dropdown-content menu p-2 shadow bg-white rounded-box w-40">
                      {list?.subMenuList.map((submenu, index) => (
                        <li className="cursor-pointer" key={index}>
                          <Link
                            href={`/${list.slug}/${submenu?.subMenu?.current}`}
                            passHref
                          >
                            <p tabIndex="0" className="text-grey text-sm mx-auto hover:bg-red-main w-full h-10 rounded-xl grid place-items-center hover:text-white">
                              {submenu?.subMenuLabel}
                            </p>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  }
                </div>
              ))}

            </div>
            <div className="flex">
              <Link href={router.asPath} locale={lang} passHref>
                <div className="text-black z-50 ml-20 flex items-center justify-center mr-8 cursor-pointer">
                  <GrLanguage size={16} />
                  <p className="ml-3 underline">{toUpperCase(lang)}</p>
                </div>
              </Link>
              <AppButton title="Contact Us" to="/contact" />
            </div>
          </div>
        </nav>
      ) : (
        <MobileNavbar data={data} lang={lang} />
      )}
    </>
  );
}

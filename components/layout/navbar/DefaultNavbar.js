import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { commonData } from '../../../recoil/atoms';
import AppButton from '../../widgets/AppButton.jsx';
import { windowWidth } from '../../../hooks/windowSize';
import MobileNavbar from './MobileNavbar';
import { useScroll } from '../../../hooks/animationHooks';
import Image from 'next/image';
import LanguageSwitcher from './LanguageSwitcher';
import { useState, useEffect } from 'react';

export default function Navbar(context) {
  // const router = useRouter();
  const scrolled = useScroll();
  const data = useRecoilValue(commonData);
  const { header, siteSettings } = data;

  const router = useRouter();
  const [currentRoute, setCurrentRoute] = useState(router.asPath);
  const [currentLocale, setCurrentLocale] = useState(router.locale);

  useEffect(() => {
    setCurrentRoute(router.asPath);
    setCurrentLocale(router.locale);
    console.log(`locale: ${router.locale}`);
  }, [router]);

  return (
    <>
      {windowWidth() > 1030 ? (
        <nav
          className={`fixed top-0 left-0 z-50 w-full 
                       ${scrolled
              ? 'bg-white shadow-sm py-2'
              : 'bg-white bg-opacity-[85%] py-4 text-white'
            } 
            transition-all px-indent-super-xsm hover:bg-white hover:py-3
            `}
        >
          <div className="flex justify-between items-center">
            <div className="relative w-44 h-[55px] px-2 mx-2">
              {data?.siteSettings && (
                <Link href="/" passHref>
                  <a>
                    <Image
                      src={siteSettings?.logo.singleImage.asset.url}
                      layout="fill"
                      objectFit="contain"
                      className="hover:cursor-pointer"
                    />
                  </a>
                </Link>
              )}
            </div>
            <div className="w-[80%] px-2 mx-2 lg:flex items-center justify-center">
              {header?.menuList.map((list, index) => (
                <Link
                  href={`/${list?.slug === 'home' ? '' : list?.slug}`}
                  passHref
                  key={index}
                >
                  <a className="btn btn-ghost btn-sm rounded-btn text-grey normal-case mx-5">
                    {list?.menuLabel}
                  </a>
                </Link>
              ))}
              <LanguageSwitcher
                currentRoute={currentRoute}
                currentLocale={currentLocale}
              />
            </div>

            <div>
              <AppButton title="Contact Us" to="/contact" />
            </div>
          </div>
        </nav>
      ) : (
        <MobileNavbar data={data} />
      )}
    </>
  );
}

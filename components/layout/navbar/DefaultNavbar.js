import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { commonData } from '../../../recoil/atoms';
import AppButton from '../../widgets/AppButton.jsx';
import { windowWidth } from '../../../hooks/windowSize';
import MobileNavbar from './MobileNavbar';
import { useScroll } from '../../../hooks/animationHooks';
import Image from 'next/image';
import { GrLanguage } from 'react-icons/gr';

export default function Navbar(context) {
  const router = useRouter();
  const scrolled = useScroll();
  const data = useRecoilValue(commonData);
  const { header, siteSettings } = data;
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
                <Link href='/' passHref>
                  <Image
                    src={siteSettings?.logo.singleImage.asset.url}
                    layout="fill"
                    objectFit="contain"
                    className='hover:cursor-pointer'
                  />
                </Link>
              )}
            </div>
            <div className="w-full px-2 mx-2 lg:flex items-center justify-center">
              {header?.menuList.map((list, index) => (
                <Link
                  href={`/${list?.slug === 'home' ? '' : list?.slug}`}
                  passHref
                  key={index}
                >
                  <p className="btn btn-ghost btn-sm rounded-btn text-grey normal-case mx-5">
                    {list?.menuLabel}
                  </p>
                </Link>
              ))}
            </div>
            <div className='flex'>
              <Link href="/" locale="th" passHref>
                <div className="text-black z-50 ml-20 flex items-center justify-center mr-8">
                  <GrLanguage size={16} />
                  <p className="ml-3 underline">TH</p>
                </div>
              </Link>
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

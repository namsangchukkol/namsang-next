import { useEffect } from "react"
import Link from "next/link"
import { useRouter } from 'next/router'
import { useRecoilValue } from "recoil"
import { commonData } from "../../../recoil/atoms"
import AppButton from "../../button/AppButton"
import { windowWidth } from "../../../hooks/windowSize"
import MobileNavbar from "./MobileNavbar"
import { useScroll } from "../../../hooks/animationHooks"

export default function Navbar(context) {
  const router = useRouter()
  const scrolled = useScroll()
  const path = router.asPath
  const data = useRecoilValue(commonData)
  const {header} = data
  const languageOptions = router.locales.map(locale => <Link href={path} locale={locale} key={locale}><span classNameNameName="mx-5 cursor-pointer">{locale}</span></Link>)

  return (
    <>
      {windowWidth() > 1030 ?
        <nav className={`fixed top-0 left-0 z-50 w-full 
                       ${scrolled ? 'bg-white shadow-sm' : 'bg-transparent py-4'} 
                        transition-all px-indent-super-xsm`}>
          <div className="flex justify-between items-center p-3">
            <div className="px-2 mx-2">
              <span className="text-lg font-bold">
                Namsang
              </span>
            </div>
            <div className="w-[80%] px-2 mx-2 lg:flex items-center justify-center">
              {header?.menuList.map((list, index) => (
                <Link
                  href={`/${list?.slug === 'home' ? '' : list?.slug}`}
                  passHref
                  key={index}>
                  <p className="btn btn-ghost btn-sm rounded-btn text-grey normal-case mx-5">
                    {list?.menuLabel}
                  </p>
                </Link>
              ))}
            </div>
            <div>
              <AppButton
                title="Contact Us"
                to="contact" />
            </div>
          </div>
        </nav> :
        <MobileNavbar />}
    </>
  )
}
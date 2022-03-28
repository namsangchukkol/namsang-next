import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { commonData } from "../../../recoil/atoms";
import FormSection from "../../sections/FormSection";

export default function Footer() {
  const data = useRecoilValue(commonData)
  const formContent = data && data?.contactForm
  const route = useRouter()
  const hiddenList = ['']
  const currentPathname = route.pathname.split('/')[1]


  const runThroughList = (lists) => {
    const toFind = lists.filter(list => list === currentPathname)[0]
    if (toFind === undefined) return true
    return false
  }

  return (
    <>
      <section className="lg:mx-indent-super-xsm my-10">
        {formContent && runThroughList(hiddenList) &&
          <FormSection content={formContent[0]} labelColor='white' />}
      </section>
      <footer>
        This is the footer
      </footer>
    </>
  )
}
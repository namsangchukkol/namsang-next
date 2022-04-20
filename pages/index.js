import Banner from '../components/reusables/Banner'
import MetaData from '../components/reusables/MetaData'
import BlogSection from '../components/sections/BlogSection'
import MachineSection from '../components/sections/MachineSection.js'
import MapSection from '../components/sections/MapSection.js'
import ProductSection from '../components/sections/ProductSection'
import WorkSection from '../components/sections/WorkSection'
import { useFilterer } from '../helper/dataFilterer'
import homeQuery from '../sanity/queries/homePage'
import sanityClient from '../sanityClient/client'

export default function Home({ pageContent }) {
  const { metaData, body } = pageContent
  return (
    <div>
      <MetaData {...metaData} />
      <Banner content={useFilterer(body, 'bannerTemplate')} />
      <ProductSection data={useFilterer(body, 'productSection')} />
      <MachineSection data={useFilterer(body, 'machineSection')} />
      <WorkSection data={useFilterer(body, 'workSection')} />
      <BlogSection data={useFilterer(body, 'blogSection')} />
      <MapSection />
    </div>
  )
}

export async function getStaticProps(context) {
  const lang = context.locale
  const pageContent = await sanityClient.fetch(homeQuery, { lang })

  return {
    props: {
      pageContent,
    }
  }
}

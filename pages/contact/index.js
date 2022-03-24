import Banner from '../../components/banner/Banner'
import { MdPhoneInTalk } from 'react-icons/md'
import { FaFax } from 'react-icons/fa'
import MapSection from '../../components/sections/MapSection'
import { useRecoilValue } from 'recoil'
import { commonData } from '../../recoil/atoms'
import contactPage from '../../sanity/queries/contactPage'
import client from '../../sanityClient/client'
import { useFilterer } from '../../helper/dataFilterer'


export default function Contact({ pageContent }) {
  const { body, metaData } = pageContent

  const data = useRecoilValue(commonData)
  const map = data['map']
  const locations = map?.locations
  return (
    <section>
      <Banner content={useFilterer(body, 'bannerTemplate')} />
      <MapSection />
      <aside className='px-indent grid grid-cols-4 gap-y-10 gap-x-5 py-20 bg-dirty-white'>
        {locations?.map((location, index) =>
          <ContactComponent key={index} content={location?.contactDetail} />
        )}
      </aside>
    </section>
  )
}



const ContactComponent = ({ content }) => {
  return (
    <section>
      <h2 className='text-title text-red-main'>{content?.name}</h2>
      <p>{content?.description}</p>
      <aside>
        <Icon Icon={MdPhoneInTalk} number={content?.mobile} />
        <Icon Icon={FaFax} number={content?.fixedPhone} />
      </aside>
    </section>
  )
}

export const Icon = ({ Icon, number }) => {
  return (
    <div className='flex my-4'>
      <div className='bg-red-main w-[25px] h-[25px] grid place-items-center rounded-md'>
        <Icon color='white' />
      </div>
      <a href={`tel:${number}`} className='ml-4'>{number}</a>
    </div>
  )
}


export async function getStaticProps(context) {
  const lang = context.locale
  const pageContent = await client.fetch(contactPage, { lang })
  return {
    props: {
      pageContent,
    }
  }
}
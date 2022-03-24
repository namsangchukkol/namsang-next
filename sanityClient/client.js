import sanityClient from '@sanity/client'

export default sanityClient({
  projectId: 'k1265eyp',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2021-08-31'
})
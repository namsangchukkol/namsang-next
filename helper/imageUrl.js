import imageUrlBuilder from '@sanity/image-url'
import sanityClient from '../sanityClient/client'
import { useNextSanityImage } from 'next-sanity-image';

// image builder
export const imageBuilder = imageUrlBuilder(sanityClient)
export const imageUrl = (source) => {
  if (!source) return
  return imageBuilder.image(source)
}


//sanity image 
export const sanityImage = (image) => {
  if (!image) return undefined
  const si = useNextSanityImage(
    sanityClient,
    image
  )
  delete si.height
  delete si.width
  return si
}


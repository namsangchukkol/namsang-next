import SanityBlockContent from '@sanity/block-content-to-react'
import Image from 'next/image'
import React from 'react'
import { imageUrl } from '../helper/imageUrl'
import serializers from './serializer'

function BlockContent({ blocks }) {
    return (
        <SanityBlockContent
            blocks={blocks}
            projectId="k1265eyp"
            dataset="production"
            serializers={serializers}
        />
    )
}

export default BlockContent

const NextImage = ({ node: { asset } }) => {
    return (
        <Image
            src={imageUrl(asset).url()}
            width={1280}
            objectFit="fill"
            height={900}
            quality={90}
            format="auto"
            fit="fill"
            objectPosition="center"
            alt={asset.alt || ''}
        />
    )
}

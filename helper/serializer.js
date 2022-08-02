import Image from 'next/image';
import { useState } from 'react';
import { imageUrl } from './imageUrl';

const BlockContent = require('@sanity/block-content-to-react');


const NextImage = ({ node: { asset } }) => {
  const [hidden, setHidden] = useState(false)
  return (
    <>
      <div className='relative my-4 w-full h-full'>
        <Image
          src={imageUrl(asset).url()}
          width={1280}
          height={600}
          objectFit="contain"
          alt={asset.alt || ''}
          onClick={() => setHidden(!hidden)}
        />
      </div>
      <div className={`absolute ${!hidden && 'hidden'} flex justify-center items-center bg-black left-0 top-20 w-[100vw] h-[100vh] z-50`}>
        <div className='relative w-[100vw] h-[100vh] top-0 left-0 -scale-50'>
          <img
            src={imageUrl(asset).url()}
            // width={1280}
            // height={600}
            // objectFit="cover"
            alignContent="center"

            // layout='fill'
            alt={asset.alt || ''}
            className="blur-md"
            onClick={() => setHidden(!hidden)}
            style={{
              alignContent: 'center',
              objectPosition: 'center'
            }}
          />
        </div>
      </div>
    </>
  )
}


const serializers = {
  types: {
    block: props => {
      const { style = 'normal' } = props.node;

      if (style === 'normal') {
        return (
          <p className={`lg:text-base font-extralight`}>
            {props.children}
          </p>
        );
      }
      if (style === 'h1') {
        return (
          <h1 className="text-3xl text-black-light leading-loose py-3 font-extralight">
            {props.children}
          </h1>
        );
      }
      if (style === 'h2') {
        return (
          <h2 className="text-3xl text-red-main mb-5 leading-5 font-semibold">
            {props.children}
          </h2>
        );
      }
      if (style === 'h3') {
        return (
          <h3 className="text-xl text-red-main leading-[3px] font-bold">
            {props.children}
          </h3>
        );
      }
      if (style === 'h4') {
        return (
          <h4 className="text-lg text-red-main leading-[2px] font-bold py-2">
            {props.children}
          </h4>
        );
      }

      // Fall back to default handling
      return BlockContent.defaultSerializers.types.block(props);
    },
    code: props => (
      <pre data-language={props.node.language}>
        <code className="leading-normal">{props.node.code}</code>
      </pre>
    ),
    image: NextImage,

  },
  list: props =>
    props.type === 'bullet' ? (
      <ul>{props.children}</ul>
    ) : (
      <ol>{props.children}</ol>
    ),
  listItem: props =>
    props.type === 'bullet' ? (
      <li>{props.children}</li>
    ) : (
      <li>{props.children}</li>
    ),
  marks: {
    strong: props => <strong>{props.children}</strong>,
    em: props => <em>{props.children}</em>,
    code: props => <code>{props.children}</code>,
    link: props => (
      <a className="text-base text-purple" href={props.mark.href}>
        {props.children}
      </a>
    ),
    span: props => <span className="text-base text-red">{props.children}</span>,
  },

  container: ({ children }) => children,
};


export default serializers;


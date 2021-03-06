import BlockContent from '@sanity/block-content-to-react';
import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { MdPhoneInTalk } from 'react-icons/md';
import { FaFax } from 'react-icons/fa';
import { commonData } from '../../recoil/atoms';
import AppButton from '../widgets/AppButton.jsx';
import { ContactIcon } from '../reusables/ContactIcon';

export default function MapSection() {
  const data = useRecoilValue(commonData);
  const { map } = data;
  const text = map?.textFieldBtn;
  const [currentField, setField] = useState(null);
  const [currentIndex, setIndex] = useState(-1);
  function onChoosingLocation(index, location) {
    setField(location.contactDetail);
    setIndex(index);
  }

  console.log(currentField)
  return (
    <section className="relative bg-grey-light lg:h-[92vh] h-full w-screen">
      {/* Outside box */}
      <aside className="z-50 w-full text-center bg-white p-5 lg:hidden md:hidden grid">
        <h2 className="text-4xl my-5">{text?.title}</h2>
        <div className="text-start">
          {/* <BlockContent blocks={text?.content} /> */}
        </div>
        <br />
        <div className="flex justify-center">
          <AppButton
            title={text?.ctaButton.title}
            to={text?.ctaButton?.ctaButtonSlug}
          />
        </div>

        <br />
      </aside>

      {/* Locations */}
      <aside className="md:absolute top-4 right-0 px-4 h-auto lg:w-[75vw] w-[100vw] bg-white flex justify-around items-center rounded-tl-lg rounded-bl-lg">
        <p className="mr-4">{map?.ourLocationTitle}</p>
        <div className="overflow-x-scroll flex flex-auto justify-start ">
          {map?.locations?.map((location, index) => (
            <div
              key={index}
              className={`m-2 p-2 lg:p-2 md:w-auto sm:w-[20rem] hover:bg-red-main text-white border-none rounded-xl cursor-pointer text-left flex justify-center items-start`}
              style={{
                backgroundColor: currentIndex === index ? '#BE1E2D' : '#D0D0D0',
              }}
              onClick={() => onChoosingLocation(index, location)}
            >
              {location.contactDetail.name}
            </div>
          ))}
        </div>
      </aside>

      {/* map */}
      <iframe
        title={currentField?.url || 'Google Map'}
        src={
          currentField?.url ||
          'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62029.819385792944!2d100.58150050437015!3d13.666050043054742!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e2a00bb218f43d%3A0x30100b25de25070!2sBang%20Na%2C%20Bangkok!5e0!3m2!1sen!2sth!4v1647601807711!5m2!1sen!2sth'
        }
        loading="lazy"
        className="w-full lg:h-full h-[70vh]"
      />

      {/* Inside box */}
      <aside className="absolute left-10 bottom-10 z-10 w-[500px] bg-white p-5 hidden lg:grid md:grid rounded-lg ">
        <h2 className="text-4xl mb-5">{currentField?.name || text?.title}</h2>
        <div className="text-start">
          {currentField ? (
            <p>{currentField?.description}</p>
          ) : (
            text?.content && <BlockContent blocks={text?.content} />
          )}
        </div>
        <br />
        {currentField ? (
          <aside className="grid grid-cols-2 mx-10">
            <ContactIcon Icon={MdPhoneInTalk} number={`${currentField.mobile}`} type='tel' />
            <ContactIcon Icon={FaFax} number={`${currentField.fixedPhone}`} type='tel' />
          </aside>
        ) : (
          <AppButton
            title={text?.ctaButton.title}
            to={`/${text?.ctaButton?.ctaButtonSlug}`}
          />
        )}
      </aside>
    </section>
  );
}

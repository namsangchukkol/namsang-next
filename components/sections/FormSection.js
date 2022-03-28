import React from 'react'
import AppButton from '../widgets/AppButton'
import FormInput from '../widgets/FormInput'

export default function FormSection({ content, labelColor }) {
  const { formList, formTitle, formSubmit } = content

  return (
    <section className='px-indent-xsm lg:flex lg:px-indent py-10 bg-red-main rounded-lg'>
      <h2 className="mb-4 text-title font-extrabold text-white lg:w-1/3 lg:pr-24">{formTitle.title}</h2>
      <aside className='lg:w-2/3'>
        <form className='formStyle'>
          {formList.map((i, index) =>
            <FormInput key={index}
              id={i.contactType}
              type={i.contactType}
              label={i.contactLanguage.label}
              bgColor='bg-grey-md'
              labelColor={labelColor} />)}
        </form>
        <br />
        <aside className='flex justify-center items-center'>
          <AppButton title={formSubmit.label} to='#' bgColor='white' txtColor='red-main' />
        </aside>
      </aside>

      <style jsx>{`
          .formStyle {
              display:grid;
              grid-template-columns: 1fr 1fr;
              justify-items: start;
              align-items: center;
              grid-gap: 10px;

          }
          @media only screen and (max-width: 500px ){
            .formStyle {
              display: flex;
              flex-direction: column;
              justify-items: center;
              align-items: center;
              grid-gap: 10px;
          }
          }
    `}

      </style>
    </section>
  )
}

import React from 'react'
import AppButton from '../widgets/AppButton'
import FormInput from '../widgets/FormInput'

export default function Form({ content }) {
  const { formList, formTitle, formSubmit } = content

  return (
    <section>
      <h2 className="text-title font-extrabold text-red-main mb-4">{formTitle.title}</h2>
      <aside>
        <form className='formStyle'>
          {formList.map((i, index) =>
            <FormInput
              key={index}
              id={i.contactType}
              type={i.contactType}
              label={i.contactLanguage?.label}
              bgColor='bg-grey-md'
            />)}
        </form>
        <aside className='mt-4'>
          <AppButton
            title={formSubmit.label}
            to='#' />
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

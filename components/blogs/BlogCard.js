import Link from 'next/link'
import React from 'react'

export default function SingleBlog() {
  return (
    <section className='m-2'>
      <div className='bg-gray-400 w-full h-[250px] rounded-lg mb-5'></div>
      <p>Lorem ipsum dolor sit amet, consec tetuer adipiscing elit, sed Lorem ipsum dolor sit amet,</p>
      <Link href="#">
        <p className='mt-2'>Read More {'>'}</p>
      </Link>
    </section>
  )
}

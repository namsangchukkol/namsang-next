import Link from 'next/link';
import React from 'react';

export default function AppButton({
  title,
  to = '#',
  bgColor = '#BE1E2D',
  txtColor = 'white',
  Icon,
}) {
  return (
    <Link href={to} passHref>
      <section
        className={`hover:scale-105 w-32 h-10 flex justify-center items-center rounded-lg cursor-pointer transition-all`}
        style={{ color: txtColor, backgroundColor: bgColor }}
      >
        {title}
        {Icon && <Icon color="white" size={22} className="ml-2" />}
      </section>
    </Link>
  );
}

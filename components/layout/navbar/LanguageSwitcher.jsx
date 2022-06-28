import Link from 'next/link';
import { MdOutlineLanguage } from 'react-icons/md';

const LanguageSwitcher = props => {
  return (
    <Link
      href={props.currentRoute || '/'}
      locale={props.currentLocale === 'th' ? 'en' : 'th'}
      passHref
    >
      <a className=" text-grey z-50 flex items-center justify-center">
        <MdOutlineLanguage size={25} color={'#be1e2d'} />
        <p className="ml-2">{props.currentLocale === 'th' ? 'EN' : 'TH'}</p>
      </a>
    </Link>
  );
};

export default LanguageSwitcher;

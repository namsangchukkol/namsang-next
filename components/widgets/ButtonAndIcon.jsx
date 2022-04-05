import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { IoIosArrowForward } from 'react-icons/io';

const ButtonAndIcon = ({
  title,
  to = '#',
  justify = 'start',
  txtColor = 'text-white',
  theme = 'white',
  scrollLink = false,
}) => {
  const [currentTheme, setTheme] = useState({});

  const themeList = {
    white: {
      color: '#BE1E2D',
      backgroundColor: 'white',
    },
    red: {
      color: 'white',
      backgroundColor: '#BE1E2D',
    },
  };

  useEffect(() => {
    switch (theme) {
      case 'white':
        return setTheme(themeList.white);
      case 'red':
        return setTheme(themeList.red);
      default:
        return setTheme(themeList.white);
    }
  }, [theme]);

  console.log(currentTheme);

  return (
    <>
      {!scrollLink ? (
        <Link href={to} passHref>
          <div
            className={`flex cursor-pointer w-full items-center`}
            style={{ justifyContent: justify }}
          >
            <p className="mr-4" style={{ color: txtColor }}>
              {title}
            </p>
            <div
              className={`w-[20px] h-[20px] grid place-items-center 
                rounded-full hover:scale-105 translate-all cursor-pointer`}
              style={currentTheme}
            >
              <IoIosArrowForward />
            </div>
          </div>
        </Link>
      ) : (
        <a href={`#${to}`}>
          <div
            className={`flex cursor-pointer w-full items-center`}
            style={{ justifyContent: justify }}
          >
            <p className={`mr-4`} style={{ color: txtColor }}>
              {title}
            </p>
            <div
              className={` w-[20px] h-[20px] grid place-items-center 
                rounded-full hover:scale-105 translate-all cursor-pointer`}
              style={currentTheme}
            >
              <IoIosArrowForward />
            </div>
          </div>
        </a>
      )}
    </>
  );
};

export default ButtonAndIcon;

import { useState } from 'react';
import { useEffect } from 'react';

export function ContactIcon({ Icon, value, type = 'tel' }) {
  const [_value, setValue] = useState(value);
  const [_type, setType] = useState(type);
  // useEffect(() => {
  //   setType(type);
  //   setValue(value);
  // }, [_type, _value]);
  return (
    <div className="flex my-4">
      <div
        className={`${
          Icon && 'bg-red-main'
        } w-[25px] h-[25px] grid place-items-center rounded-md`}
      >
        {Icon && <Icon color="white" stroke="white" />}
      </div>
      <a href={`${type}:${value}`} className="ml-4 text-red-main">
        <p>{value}</p>
        {/* <p>{value}</p> */}
      </a>
    </div>
  );
}

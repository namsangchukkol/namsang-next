export function ContactIcon({ Icon, value, type = 'tel' }) {
  return (
    <div className="flex my-4">
      <div
        className={`${
          Icon && 'bg-red-main'
        } w-[25px] h-[25px] grid place-items-center rounded-md`}
      >
        {Icon && <Icon color="white" stroke="white" />}
      </div>
      <a href={`${type}:${value}`} className="ml-4">
        {value}
      </a>
    </div>
  );
}

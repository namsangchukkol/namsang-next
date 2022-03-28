export function ContactIcon({ Icon, number }) {
  return (
    <div className="flex my-4">
      <div className="bg-red-main w-[25px] h-[25px] grid place-items-center rounded-md">
        <Icon color="white" />
      </div>
      <a href={`tel:${number}`} className="ml-4">
        {number}
      </a>
    </div>
  );
}

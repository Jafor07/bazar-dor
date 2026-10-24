type AvatarProps = {
  name?: string | null;
  image?: string | null;
  className?: string; 
};

export default function Avatar({
  name,
  image,
  className = "h-8 w-8",
}: AvatarProps) {
  if (image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={image}
        alt={name ?? "User"}
        referrerPolicy="no-referrer"
        className={`${className} rounded-lg object-cover`}
      />
    );
  }

  return (
    <span
      className={`${className} flex items-center justify-center rounded-lg bg-brand font-semibold text-white`}
    >
      {name?.charAt(0) || "U"}
    </span>
  );
}
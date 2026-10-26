type AvatarProps = {
  name?: string | null;
  image?: string | null;
  className?: string; // size, shape and text size, e.g. "h-8 w-8 rounded-lg"
};

export default function Avatar({
  name,
  image,
  className = "h-8 w-8 rounded-lg",
}: AvatarProps) {
  if (image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={image}
        alt={name ?? "User"}
        referrerPolicy="no-referrer"
        className={`${className} object-cover`}
      />
    );
  }

  return (
    <span
      className={`${className} flex items-center justify-center bg-brand font-semibold text-white`}
    >
      {name?.charAt(0) || "U"}
    </span>
  );
}
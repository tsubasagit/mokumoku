"use client";

interface AvatarProps {
  name: string;
  color: string;
  size?: number;
  photoURL?: string;
}

export function Avatar({ name, color, size = 40, photoURL }: AvatarProps) {
  const initial = name.charAt(0).toUpperCase();
  const fontSize = size * 0.45;

  if (photoURL) {
    return (
      <img
        src={photoURL}
        alt={name}
        className="rounded-full object-cover"
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <div
      className="rounded-full flex items-center justify-center text-white font-bold shadow-md"
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        fontSize,
      }}
    >
      {initial}
    </div>
  );
}

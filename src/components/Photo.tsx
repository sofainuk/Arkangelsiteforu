import Image from "next/image";
import { photos, type PhotoKey } from "@/lib/photos";

type Props = {
  name: PhotoKey;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
};

/** Responsive, lazy-loaded photo with a soft placeholder background. */
export function Photo({ name, alt, sizes, className = "", priority = false }: Props) {
  return (
    <div className={`ph ${className}`.trim()}>
      <Image src={photos[name]} alt={alt} fill sizes={sizes} priority={priority} quality={72} />
    </div>
  );
}

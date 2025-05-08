import { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  children: ReactNode;
  href: string;
}

export function ProductCard({ children, href }: ProductCardProps) {
  return (
    <Link
      href={href}
      className="group relative bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
    >
      {children}
    </Link>
  );
}

interface ProductCardImageProps {
  src: string;
  alt: string;
}

ProductCard.Image = function ProductCardImage({
  src,
  alt,
}: ProductCardImageProps) {
  return (
    <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-t-lg bg-gray-200">
      <Image
        src={src}
        alt={alt}
        width={500}
        height={500}
        className="h-full w-full object-cover object-center group-hover:opacity-75"
      />
    </div>
  );
};

interface ProductCardContentProps {
  children: ReactNode;
}

ProductCard.Content = function ProductCardContent({
  children,
}: ProductCardContentProps) {
  return <div className="p-4">{children}</div>;
};

interface ProductCardTitleProps {
  children: ReactNode;
}

ProductCard.Title = function ProductCardTitle({
  children,
}: ProductCardTitleProps) {
  return (
    <h3 className="text-sm font-medium text-gray-900 group-hover:text-indigo-600">
      {children}
    </h3>
  );
};

interface ProductCardPriceProps {
  children: ReactNode;
}

ProductCard.Price = function ProductCardPrice({
  children,
}: ProductCardPriceProps) {
  return <p className="mt-1 text-lg font-medium text-gray-900">{children}</p>;
};

interface ProductCardDescriptionProps {
  children: ReactNode;
}

ProductCard.Description = function ProductCardDescription({
  children,
}: ProductCardDescriptionProps) {
  return <p className="mt-1 text-sm text-gray-500">{children}</p>;
};

"use client";

import React, { memo, useMemo } from "react";
import { default as NextImage, ImageProps as NextImageProps } from "next/image";
import { VariantProps, cva } from "class-variance-authority";

// ui
import ButtonPrimitive, { ButtonProps } from "@/ui/button";
import Text, { TextProps } from "@/ui/text";
import { StarIcon, WishlistIcon } from "@/ui/assets/svg";

// lib
import { cn, formatCurrency, formatRating } from "@/lib/utils";

// hooks
import {
  ProductCardProvider,
  useProductCardContext,
} from "@/hooks/productCardContext";

export type ProductDataProps = {
  data: {
    id: number;
    image: {
      src: string;
      alt: string;
    };
    name: string;
    rating: number;
    price: number;
    description: string;
  };
};

interface RootProps
  extends React.HTMLAttributes<HTMLDivElement>,
    ProductDataProps {}

const Root: React.FC<RootProps> = ({ data, className, children, ...props }) => {
  return (
    <ProductCardProvider data={data}>
      <div className={cn("grid grid-cols-1 gap-3", className)} {...props}>
        {children}
      </div>
    </ProductCardProvider>
  );
};

type ThumbnailProps = React.PropsWithChildren<{ className?: string }>;

const Thumbnail: React.FC<ThumbnailProps> = memo(({ className, children }) => {
  return (
    <div
      className={cn(
        "group relative flex h-[308px] w-full flex-col justify-between overflow-hidden bg-[#F3F5F7] p-3.5",
        className,
      )}
    >
      {children}
    </div>
  );
});

Thumbnail.displayName = "Thumbnail";

const ThumbnailBadge: React.FC<React.PropsWithChildren> = memo(({ children }) => {
  return (
    <div className="z-10 flex items-start justify-between">{children}</div>
  );
});

ThumbnailBadge.displayName = "ThumbnailBadge";

type BadgeVariants = VariantProps<typeof badgeVariants>;

const badgeVariants = cva(
  "w-fit rounded px-3.5 py-1 font-inter text-base font-bold uppercase",
  {
    variants: {
      intent: {
        default: "bg-white text-black",
        discount: "bg-[#38CB89] text-[#FEFEFE]",
      },
    },
    defaultVariants: {
      intent: "default",
    },
  },
);

interface BadgeProps
  extends BadgeVariants,
    React.HTMLAttributes<HTMLDivElement> {}

const Badge: React.FC<BadgeProps> = memo(({
  intent,
  className,
  children,
  ...props
}) => {
  return (
    <div className={cn(badgeVariants({ intent, className }))} {...props}>
      {children}
    </div>
  );
});

Badge.displayName = "Badge";

type WishlistButtonProps = React.HTMLAttributes<HTMLButtonElement>;

const WishlistButton: React.FC<WishlistButtonProps> = memo(({
  className,
  ...props
}) => {
  return (
    <button
      className={cn(
        "shadow-[rgba(15, 15, 15, 0.12)] flex h-8 w-8 items-center justify-center rounded-full bg-white opacity-0 shadow-md transition-opacity duration-100 ease-out group-hover:opacity-100",
        className,
      )}
      {...props}
    >
      <WishlistIcon className="h-5 w-5" />
    </button>
  );
});

WishlistButton.displayName = "WishlistButton";

const Button: React.FC<ButtonProps> = memo(({ children, ...props }) => {
  return <ButtonPrimitive {...props}>{children}</ButtonPrimitive>;
});

Button.displayName = "Button";

type ImageProps = Omit<NextImageProps, "src" | "alt">;

const Image: React.FC<ImageProps> = memo(({
  width = 231,
  height = 308,
  className,
  ...props
}) => {
  const { data } = useProductCardContext();

  if (!data?.image) {
    console.error("Image data is missing in ProductCard context");
    return null;
  }

  return (
    <NextImage
      src={data.image.src}
      width={width}
      height={height}
      alt={data.image.alt}
      priority={priority}
      placeholder="blur"
      className={cn(
        "absolute left-0 top-0 z-0 h-full w-full object-cover",
        className,
      )}
      {...props}
    />
  );
});

Image.displayName = "Image";

const Content: React.FC<React.HTMLAttributes<HTMLDivElement>> = memo(({
  className,
  children,
  ...props
}) => {
  return (
    <div className={cn("space-y-1", className)} {...props}>
      {children}
    </div>
  );
});

Content.displayName = "Content";

type RatingsProps = {
  className?: string;
};

const Ratings: React.FC<RatingsProps> = memo(({ className }) => {
  const { data } = useProductCardContext();
  
  const stars = useMemo(() => {
    if (!data?.rating) {
      return [];
    }
    return formatRating(data.rating);
  }, [data?.rating]);

  if (!data?.rating) {
    console.error("Rating data is missing in ProductCard context");
    return null;
  }

  return (
    <div className="flex gap-0.5">
      {stars.map((rating) => (
        <StarIcon key={rating} className={cn("h-4 w-4", className)} />
      ))}
    </div>
  );
});

Ratings.displayName = "Ratings";

type NameProps = Omit<TextProps, "children">;

const Name: React.FC<NameProps> = memo(({ className, ...props }) => {
  const { data } = useProductCardContext();

  if (!data?.name) {
    console.error("Name data is missing in ProductCard context");
    return null;
  }

  return (
    <Text
      weight={600}
      color="black/800"
      className={cn("line-clamp-1", className)}
      {...props}
    >
      {data.name}
    </Text>
  );
});

Name.displayName = "Name";

type PriceProps = Omit<TextProps, "children">;

const Price: React.FC<PriceProps> = memo(({ className, ...props }) => {
  const { data } = useProductCardContext();

  const formattedPrice = useMemo(() => {
    if (!data?.price) {
      return "";
    }
    return formatCurrency(data.price);
  }, [data?.price]);

  if (!data?.price) {
    console.error("Price data is missing in ProductCard context");
    return null;
  }

  return (
    <Text
      size="sm"
      weight={600}
      color="black/800"
      className={cn("line-clamp-1", className)}
      {...props}
    >
      {formattedPrice}
    </Text>
  );
});

Price.displayName = "Price";

type DescriptionProps = Omit<TextProps, "children">;

const Description: React.FC<DescriptionProps> = memo(({ className, ...props }) => {
  const { data } = useProductCardContext();

  if (!data?.description) {
    console.error("Description data is missing in ProductCard context");
    return null;
  }

  return (
    <Text
      size="xs"
      weight={400}
      color="gray"
      className={cn(className)}
      {...props}
    >
      {data.description}
    </Text>
  );
});

Description.displayName = "Description";

export {
  Root,
  Thumbnail,
  ThumbnailBadge,
  Badge,
  WishlistButton,
  Image,
  Button,
  Content,
  Ratings,
  Name,
  Price,
  Description,
};

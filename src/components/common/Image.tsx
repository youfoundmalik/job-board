import NextImage, { ImageProps } from 'next/image';

export function OptimizedImage({ src, alt, ...props }: ImageProps) {
  return (
    <NextImage
      src={src}
      alt={alt}
      loading="lazy"
      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRg..."
      {...props}
    />
  );
} 
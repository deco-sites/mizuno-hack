import Image from "deco-sites/std/components/Image.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import Title from "$store/components/ui/Title.tsx";

export interface Product {
  image: LiveImage;
  alt: string;
  url: string;
}

export interface Props {
  title: string;
  products: Product[];
}

function Item({ image, alt, url }: Product) {
  return (
    <a
      class="relative lg:hover:opacity-80 lg:transition-opacity lg:duration-200"
      href={url}
    >
      <Image
        class="w-full"
        src={image}
        alt={alt}
        width={200}
        height={200}
      />

      <span class="w-[calc(100%-38%)] h-8 bg-primary text-white text-2xs font-bold uppercase flex justify-center items-center absolute top-full left-1/2 -translate-1/2 md:h-10 md:text-xs">
        Ver cores
      </span>

      {/* CORNERS */}
      <div class="w-[15%] h-[15%] border-t-2 border-l-2 rounded-tl-3xl border-secondary absolute top-0 left-0" />
      <div class="w-[15%] h-[15%] border-t-2 border-r-2 rounded-tr-3xl border-secondary absolute top-0 right-0" />
      <div class="w-[15%] h-[15%] border-b-2 border-l-2 rounded-bl-3xl border-secondary absolute bottom-0 left-0" />
      <div class="w-[15%] h-[15%] border-b-2 border-r-2 rounded-br-3xl border-secondary absolute bottom-0 right-0" />
    </a>
  );
}

export default function ProductBanner({ title, products }: Props) {
  if (!products) return null;

  return (
    <section class="py-11 grid gap-10">
      <Title title={title} />

      <div class="px-6 grid grid-cols-2 gap-x-6 gap-y-11 md:grid-cols-4 lg:max-w-screen-lg lg:p-0 lg:mx-auto lg:gap-x-8">
        {products.map((product) => <Item {...product} />)}
      </div>
    </section>
  );
}

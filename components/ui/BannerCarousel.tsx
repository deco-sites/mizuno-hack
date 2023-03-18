import Icon from "$store/components/ui/Icon.tsx";
import Button from "$store/components/ui/Button.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderControllerJS from "$store/islands/SliderJS.tsx";
import { Picture, Source } from "deco-sites/std/components/Picture.tsx";
import { useId } from "preact/hooks";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";

export interface Banner {
  /** @description desktop otimized image */
  desktop: LiveImage;
  /** @description tablet otimized image */
  tablet: LiveImage;
  /** @description phone otimized image */
  phone: LiveImage;
  /** @description Image's alt text */
  alt: string;
  /** @description when user clicks on the image, go to this link */
  href?: string;
}

export interface Props {
  images?: Banner[];
  /**
   * @description Check this option when this banner is the biggest image on the screen for image optimizations
   */
  preload?: boolean;
  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: number;
}

function BannerItem({ image, lcp }: { image: Banner; lcp?: boolean }) {
  const {
    alt,
    desktop,
    tablet,
    phone,
    href,
  } = image;

  return (
    <div class="min-w-[100vw] overflow-y-hidden relative">
      <a href={href ?? "#"}>
        <Picture class="w-full" preload={lcp}>
          <Source
            media="(max-width: 639px)"
            fetchPriority={lcp ? "high" : "auto"}
            src={phone}
            width={256}
            height={320}
          />

          <Source
            media="(max-width: 1023px)"
            fetchPriority={lcp ? "high" : "auto"}
            src={tablet}
            width={960}
            height={350}
          />

          <Source
            media="(min-width: 1024px)"
            fetchPriority={lcp ? "high" : "auto"}
            src={desktop}
            width={1370}
            height={500}
          />

          <Source
            media="(min-width: 1920px)"
            fetchPriority={lcp ? "high" : "auto"}
            src={desktop}
            width={1920}
            height={700}
          />

          <img
            class="w-full object-cover sm:max-h-[700px] 3xl:max-h-[1000px]"
            loading={lcp ? "eager" : "lazy"}
            src={desktop}
            alt={alt}
          />
        </Picture>
      </a>
    </div>
  );
}

function Dots({ images }: Props) {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @property --dot-progress {
            syntax: '<percentage>';
            inherits: false;
            initial-value: 0%;
          }`,
        }}
      >
      </style>

      <ol class="pt-4 flex justify-center col-span-full gap-3 sm:hidden">
        {images?.map((_, index) => (
          <li class="leading-[0]">
            <button
              class="w-3 h-3 bg-black opacity-75 rounded-full focus:outline-none disabled:opacity-100"
              data-dot={index}
              aria-label={`go to slider item ${index}`}
            />
          </li>
        ))}
      </ol>
    </>
  );
}

function Controls() {
  return (
    <>
      <div class="hidden sm:opacity-40 sm:flex sm:items-center sm:justify-center sm:col-start-1 sm:row-start-2 sm:z-10 sm:hover:opacity-100">
        <Button
          variant="slider"
          data-slide="prev"
          aria-label="Previous item"
        >
          <Icon
            size={30}
            id="ChevronLeft"
            strokeWidth={3}
          />
        </Button>
      </div>

      <div class="hidden sm:opacity-40 sm:flex sm:items-center sm:justify-center sm:col-start-3 sm:row-start-2 sm:z-10 sm:hover:opacity-100">
        <Button
          variant="slider"
          data-slide="next"
          aria-label="Next item"
        >
          <Icon
            size={30}
            id="ChevronRight"
            strokeWidth={3}
          />
        </Button>
      </div>
    </>
  );
}

function BannerCarousel({ images, preload, interval }: Props) {
  const id = useId();

  return (
    <div
      id={id}
      class="grid sm:grid-cols-[50px_1fr_50px] sm:grid-rows-[1fr_50px_1fr]"
    >
      <Slider class="col-span-full row-span-full scrollbar-none gap-6">
        {images?.map((image, index) => (
          <BannerItem image={image} lcp={index === 0 && preload} />
        ))}
      </Slider>

      <Controls />

      <Dots images={images} interval={interval} />

      <SliderControllerJS rootId={id} interval={interval && interval * 1e3} />
    </div>
  );
}

export default BannerCarousel;

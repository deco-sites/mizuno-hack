import Text from "$store/components/ui/Text.tsx";
import SliderControllerJS from "$store/islands/SliderJS.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import { useId } from "preact/hooks";
import type { HTML } from "deco-sites/std/components/types.ts";

export interface AlertMessage {
  html: HTML;
}

export interface Props {
  alerts: AlertMessage[];
  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: number;
}

function Alert({ alerts = [], interval = 5 }: Props) {
  const id = useId();

  return (
    <div id={id}>
      <Slider class="bg-black gap-6 scrollbar-none">
        {alerts.map(({ html }) => (
          <Text
            class="flex justify-center items-center w-screen h-[54px] text-base md:font-black md:h-[48px] md:p-inline"
            variant="caption"
            tone="default-inverse"
          >
            <span
              class="header-alert text-center"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </Text>
        ))}
      </Slider>

      <SliderControllerJS rootId={id} interval={interval && interval * 1e3} />
    </div>
  );
}

export default Alert;

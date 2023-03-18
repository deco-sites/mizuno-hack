import Icon from "$store/components/ui/Icon.tsx";
import Text from "$store/components/ui/Text.tsx";
import Button from "$store/components/ui/Button.tsx";
import { useSignal } from "@preact/signals";
import type { INavItem } from "./NavItem.tsx";

export interface Props {
  items: INavItem[];
}

function MenuItem({ item, level = 0 }: { item: INavItem; level?: number }) {
  const open = useSignal(false);
  const hasChildren = Array.isArray(item.children) && item.children.length > 0;

  const title = (
    <Text
      class={`flex-grow min-h-[40px] flex items-center justify-start select-none
      ${level === 0 ? "text-uppercase" : ""}`}
      variant={level === 0 ? "menu" : "caption"}
    >
      {item.label}
    </Text>
  );

  return (
    <li>
      <div
        class={`transition-colors duration-300 overflow-hidden ${level === 0 ? `${open.value ? "bg-light-gray" : "bg-white"} px-4` : ""}`}
      >
        <div
          class={`flex justify-between items-center w-full py-2 text-md font-bold ${
            level > 0 ? `pl-${level * 3}` : ""
          }`}
          onClick={() => {
            if (hasChildren) open.value = !open.value;
          }}
        >
          {hasChildren
            ? title
            : (
              <a class="w-full inline-block select-none" href={item.href}>
                {title}
              </a>
            )}

          {hasChildren && (
            <Button variant="icon">
              <Icon
                class={open.value === true ? "hidden" : "block"}
                id="Plus"
                height={20}
                width={20}
                strokeWidth={1.5}
              />
              <Icon
                class={open.value === true ? "block" : "hidden"}
                id="Minus"
                height={20}
                width={20}
                strokeWidth={1.5}
              />
            </Button>
          )}
        </div>

        {hasChildren && (
          <ul class={`flex-col flex transition-all duration-300 ${open.value === true ? "max-h-[400px]" : "max-h-0"}`}>
            <li>
              <a href={item.href} class={`w-full py-1 inline-block ${level > 0 ? `pl-${level * 3}` : ""}`}>
                <Text class="underline text-secondary text-base font-medium" variant="caption">
                  Ver todos
                </Text>
              </a>
            </li>
            {item.children!.map((node) => (
              <MenuItem
                item={node}
                level={level + 1}
              />
            ))}
          </ul>
        )}
      </div>
    </li>
  );
}

function Menu({ items }: Props) {
  return (
    <ul class="flex-grow flex flex-col divide-y divide-default bg-gray">
      {items.map((item) => <MenuItem item={item} />)}
    </ul>
  );
}

export default Menu;

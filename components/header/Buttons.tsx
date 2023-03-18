import Icon from "$store/components/ui/Icon.tsx";
import Button from "$store/components/ui/Button.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import { useCart } from "deco-sites/std/commerce/vtex/hooks/useCart.ts";

function SearchButton() {
  const { displaySearchbar } = useUI();

  return (
    <Button
      variant="icon"
      aria-label="search icon button"
      onClick={() => {
        displaySearchbar.value = !displaySearchbar.peek();
      }}
    >
      <Icon id="MagnifyingGlass" width={20} height={20} strokeWidth={0.1} />
    </Button>
  );
}

function MenuButton() {
  const { displayMenu } = useUI();

  return (
    <Button
      variant="icon"
      aria-label="open menu"
      onClick={() => {
        displayMenu.value = true;
      }}
      class="w-[48px] h-[48px]"
    >
      <div class="w-[30px] h-[20px] flex flex-col justify-between items-center">
        <i class="w-[100%] h-[2px] bg-secondary" />
        <i class="w-[100%] h-[2px] bg-secondary" />
        <i class="w-[100%] h-[2px] bg-secondary" />
      </div>
      {/* <Icon id="Bars3" width={20} height={20} strokeWidth={0.01} /> */}
    </Button>
  );
}

function CartButton() {
  const { displayCart } = useUI();
  const { loading, cart } = useCart();
  const totalItems = cart.value?.items.length || null;

  return (
    <Button
      variant="icon"
      class="relative"
      aria-label="open cart"
      disabled={loading.value}
      onClick={() => {
        displayCart.value = true;
      }}
    >
      <Icon
        class="lg:hidden"
        id="ShoppingCart"
        width={38}
        height={38}
      />
      <Icon
        class="hidden lg:block"
        id="ShoppingCart"
        width={28}
        height={28}
      />
      <span class="absolute text-xs right-0 top-0 rounded-full bg-secondary text-white w-5 h-5 flex items-center justify-center">
        {totalItems ?? 0}
      </span>
    </Button>
  );
}

function HeaderButton({ variant }: { variant: "cart" | "search" | "menu" }) {
  if (variant === "cart") {
    return <CartButton />;
  }

  if (variant === "search") {
    return <SearchButton />;
  }

  if (variant === "menu") {
    return <MenuButton />;
  }

  return null;
}

export default HeaderButton;

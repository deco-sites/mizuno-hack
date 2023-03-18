import type { Product, Suggestion } from "deco-sites/std/commerce/types.ts";
import type { ClientConfigVTEX } from "deco-sites/std/functions/vtexConfig.ts";
import useAutocomplete from "deco-sites/std/commerce/vtex/hooks/useAutocomplete.ts";
import { useEffect, useRef } from "preact/hooks";
import Icon from "$store/components/ui/Icon.tsx";
import Text from "$store/components/ui/Text.tsx";
import Button from "$store/components/ui/Button.tsx";

// Editable props
export interface EditableProps {
  /**
   * @title Placeholder
   * @description Search bar default placeholder message
   * @default What are you looking for?
   */
  placeholder?: string;
  /**
   * @title Page path
   * @description When user clicks on the search button, navigate it to
   * @default /s
   */
  action?: string;
  /**
   * @title Term name
   * @description Querystring param used when navigating the user
   * @default q
   */
  name?: string;
  /**
   * TODO: Receive querystring from parameter in the server-side
   */
  query?: string;
}

export type Props = EditableProps & {
  /**
   * @title Product suggestions
   * @description Product suggestions displayed on searchs
   */
  products?: Product[] | null;
  suggestions?: Suggestion | null;

  /** used for autocomplete */
  configVTEX?: ClientConfigVTEX;

  variant?: "desktop" | "mobile";
};

export default function SearchInput({
  placeholder = "What are you looking for?",
  action = "/s",
  name = "q",
  query,
  products,
  suggestions: _suggestions,
  configVTEX,
  variant = "mobile",
}: Props) {
  const searches = _suggestions?.searches;
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { setSearch, suggestions } = useAutocomplete({
    configVTEX,
  });

  useEffect(() => {
    if (!searchInputRef.current) {
      return;
    }

    searchInputRef.current.focus();
  }, []);

  // const hasSuggestions = !!suggestions.value;
  // const emptySuggestions = suggestions.value?.searches?.length === 0;
  // const _products = suggestions.value?.products &&
  //     suggestions.value?.products?.length !== 0
  //   ? suggestions.value.products
  //   : products;

  return (
    <form
      id="searchbar"
      action={action}
      class="lg:(border-b-2 border-secondary px-[0px] py-[5px]) flex-grow flex px-5"
    >
      <input
        ref={searchInputRef}
        id="search-input"
        class="flex-grow outline-none bg-transparent text-primary placeholder-secondary text-[14px] font-medium lg:(h-4 text-xs)"
        name={name}
        defaultValue={query}
        onInput={(e) => {
          const value = e.currentTarget.value;

          setSearch(value);
        }}
        placeholder={placeholder}
        role="combobox"
        aria-controls="search-suggestion"
        autocomplete="off"
      />

      {/* <button
        type="button"
        aria-label="Clean search"
        class="focus:outline-none"
        tabIndex={-1}
        onClick={(e) => {
          e.stopPropagation();
          if (searchInputRef.current === null) return;

          searchInputRef.current.value = "";
          setSearch("");
        }}
      >
        <Text variant="caption" tone="default">limpar</Text>
      </button> */}
    
      <Button
        variant="icon"
        aria-label="Search"
        htmlFor="searchbar"
        tabIndex={-1}
        class="lg:w-[18px] lg:h-[18px] w-[20px] h-[20px] p-0"
      >
        <Icon
          class="text-secondary lg:hidden"
          id="MagnifyingGlass"
          width={20}
          height={20}
        />
        <Icon
          class="text-secondary hidden lg:block"
          id="MagnifyingGlass"
          width={18}
          height={18}
        />
      </Button>
    </form>
  );
}

import { lazy, Suspense } from "preact/compat";

import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import Loading from "$store/components/ui/Loading.tsx";

const SearchInput = lazy(() =>
  import("$store/components/search/SearchInput.tsx")
);

interface Props {
  searchbar: SearchbarProps;
}

export default function HeaderSearchInput({ searchbar }: Props) {
  return (
    <div
      class={`bg-gray-300 h-[38px] lg:(h-[30px] bg-white w-[158px])`}
    >
      {!!window?.location && (
        <Suspense fallback={<Loading />}>
          <SearchInput {...searchbar} />
        </Suspense>
      )}
    </div>
  );
}

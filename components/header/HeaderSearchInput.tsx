import type { Props as SearchInputProps } from '$store/components/search/SearchInput.tsx'

import SearchInput from '$store/components/search/SearchInput.tsx'

interface Props {
	searchbar: SearchInputProps
}

export default function HeaderSearchInput({ searchbar }: Props) {
	return (
		<div
			class={`bg-gray-300 h-[38px] lg:(h-full bg-white w-[158px])`}
		>
			<SearchInput {...searchbar} />
		</div>
	)
}

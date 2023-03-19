import type { Product } from 'deco-sites/std/commerce/types.ts'
import type { ClientConfigVTEX } from 'deco-sites/std/functions/vtexConfig.ts'
import Icon from '$store/components/ui/Icon.tsx'
import Button from '$store/components/ui/Button.tsx'

export interface Suggestion {
	term?: string
	href?: string
}

// Editable props
export interface EditableProps {
	/**
	 * @title Placeholder
	 * @description Search bar default placeholder message
	 * @default What are you looking for?
	 */
	placeholder?: string
	/**
	 * @title Page path
	 * @description When user clicks on the search button, navigate it to
	 * @default /s
	 */
	action?: string
	/**
	 * @title Term name
	 * @description Querystring param used when navigating the user
	 * @default q
	 */
	name?: string
	/**
	 * TODO: Receive querystring from parameter in the server-side
	 */
	query?: string

	/**
	 * @title Suggestions
	 */
	suggestions?: Suggestion[]
}

export type Props = EditableProps & {
	/**
	 * @title Product suggestions
	 * @description Product suggestions displayed on searchs
	 */
	products?: Product[] | null

	/** used for autocomplete */
	configVTEX?: ClientConfigVTEX

	variant?: 'desktop' | 'mobile'
}

export default function SearchInput({
	placeholder = 'What are you looking for?',
	action = '/s',
	name = 'q',
	query,
	products,
	suggestions,
	configVTEX,
	variant = 'mobile',
}: Props) {
	return (
		<div class='flex relative group lg:(h-full items-center)'>
			<form
				id='searchbar'
				action={action}
				class='lg:(border-b-2 border-secondary px-[0px] py-[5px] h-[30px]) flex-grow flex px-5'
			>
				<Icon
					id='Mic'
					width={14}
					height={14}
					class="text-secondary mr-1 h-full cursor-pointer"
					strokeWidth={0}
				/>
				<input
					id='search-input'
					class='lg:(h-4 text-xs) flex-grow outline-none bg-transparent text-primary placeholder-secondary text-[14px] font-medium'
					name={name}
					defaultValue={query}
					// onInput={(e) => {
					// 	const value = e.currentTarget.value

					// 	setSearch(value)
					// }}
					placeholder={placeholder}
					role='combobox'
					aria-controls='search-suggestion'
					autocomplete='off'
				/>

				<Button
					variant='icon'
					aria-label='Search'
					htmlFor='searchbar'
					tabIndex={-1}
					class='lg:w-[18px] lg:h-[18px] w-[20px] h-[20px] p-0'
				>
					<Icon
						class='text-secondary lg:hidden'
						id='MagnifyingGlass'
						width={20}
						height={20}
					/>
					<Icon
						class='text-secondary hidden lg:block'
						id='MagnifyingGlass'
						width={18}
						height={18}
					/>
				</Button>
			</form>
			{!!suggestions?.length && (
				<div class='invisible p-2 flex flex-col opacity-0 transition-opacity duration-300 group-hover:(visible opacity-100) absolute top-full left-0 bg-white z-50 w-full border-1 border-gray-300'>
					<h4 class='text-sm text-uppercase font-bold mb-2'>Mais buscados</h4>
					<ul class='flex flex-col gap-3'>
						{suggestions.map(({ href, term }, index) => (
							<li class='flex group-x' key={term}>
								<a class='flex gap-2 items-center' href={href}>
									<div class='bg-gray-200 flex items-center justify-center w-8 h-8 rounded group-x-hover:bg-gray-300 transition-colors duration-300'>
										{index + 1}
									</div>
									{term}
								</a>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	)
}

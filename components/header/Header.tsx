import Modals from '$store/islands/HeaderModals.tsx'
import type { Image } from 'deco-sites/std/components/types.ts'
import type {
	EditableProps as SearchInputProps,
	Suggestion,
} from '$store/components/search/SearchInput.tsx'
import type { LoaderReturnType } from '$live/types.ts'
import type { Product } from 'deco-sites/std/commerce/types.ts'
import type { ClientConfigVTEX } from 'deco-sites/std/functions/vtexConfig.ts'

import Alert, { AlertMessage } from './Alert.tsx'
import Navbar, { LogoProps } from './Navbar.tsx'
import { headerHeight, mobileHeaderHeight } from './constants.ts'

export interface NavItem {
	label: string
	href: string
	children?: Array<{
		label: string
		href: string
		children?: Array<{
			label: string
			href: string
		}>
	}>
	image?: {
		src?: Image
		alt?: string
	}
}

export interface Props {
	alerts: AlertMessage[]

	/** @title Search Bar */
	searchbar?: SearchInputProps

	/**
	 * @title Navigation items
	 * @description Navigation items used both on mobile and desktop menus
	 */
	navItems?: NavItem[]

	/**
	 * @title Product suggestions
	 * @description Product suggestions displayed on search
	 */
	products?: LoaderReturnType<Product[] | null>

	/**
	 * @description vtex config used for search autocompletion;
	 */
	configVTEX?: LoaderReturnType<ClientConfigVTEX>

	/**
	 * @description Logo
	 */
	logo: LogoProps
}

function Header(
	{
		alerts,
		searchbar: _searchbar,
		products,
		navItems = [],
		configVTEX,
		logo,
	}: Props,
) {
	const searchbar = { ..._searchbar, products, configVTEX }
	return (
		<header class={`lg:h-[${headerHeight}] h-[${mobileHeaderHeight}]`}>
			<div class='bg-white fixed w-full z-50'>
				<Alert alerts={alerts} />
				<Navbar items={navItems} searchbar={searchbar} logo={logo} />
			</div>

			<Modals
				menu={{ items: navItems }}
			/>
		</header>
	)
}

export default Header

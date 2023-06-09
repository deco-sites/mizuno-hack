import HeaderButton from '$store/islands/HeaderButton.tsx'
import Icon from '$store/components/ui/Icon.tsx'
import Button from '$store/components/ui/Button.tsx'

import NavItem from './NavItem.tsx'
import { navbarHeight } from './constants.ts'
import type { INavItem } from './NavItem.tsx'
import HeaderSearchInput from '$store/islands/HeaderSearchInput.tsx'
import type { Props as SearchInputProps } from '$store/components/search/SearchInput.tsx'
import Image from 'deco-sites/std/components/Image.tsx'
import type { Image as ImageType } from 'deco-sites/std/components/types.ts'
import Container from '$store/components/ui/Container.tsx'

export interface LogoImage {
	device: 'desktop' | 'mobile'
	src: ImageType
	width: number
	height: number
}

export interface LogoProps {
	devices: LogoImage[]
	alt: string
}

export interface NavbarProps {
	logo: LogoProps
	items: INavItem[]
	searchbar: SearchInputProps
}

function Navbar({ items, searchbar, logo }: NavbarProps) {
	const mobileLogo = logo.devices.find((device) => device.device === 'mobile')
	const desktopLogo = logo.devices.find((device) => device.device === 'desktop')

	return (
		<>
			{/* Mobile Version */}
			<div class='lg:hidden flex flex-col'>
				<div
					class={`flex flex-row justify-between items-center bg-white h-[${navbarHeight}] border-b-1 border-default w-full px-2 gap-2`}
				>
					<HeaderButton variant='menu' />

					<a
						href='/'
						class={`flex-grow justify-center inline-flex items-center min-h-[${navbarHeight}]`}
						aria-label='Store logo'
					>
						{/* <Icon id="Logo" width={126} height={16} /> */}
						{mobileLogo && (
							<Image
								src={mobileLogo.src}
								alt={logo.alt}
								width={mobileLogo.width}
								height={mobileLogo.height}
								preload
							/>
						)}
					</a>

					<HeaderButton variant='cart' />
				</div>
				<HeaderSearchInput searchbar={searchbar} />
			</div>

			{/* Desktop Version */}
			<div class='hidden lg:flex h-[66px] bg-white border-b-1 border-default w-full'>
				<Container class='flex flex-row justify-between items-center w-full'>
					<div
						class={`flex-none ${
							desktopLogo?.width ? `w-[${desktopLogo?.width}px]` : ''
						}`}
					>
						<a href='/' aria-label='Store logo' class='absolute top-0'>
							{/* <Icon id="Logo" width={126} height={16} /> */}
							{desktopLogo && (
								<Image
									src={desktopLogo.src}
									alt={logo.alt}
									width={desktopLogo.width}
									height={desktopLogo.height}
									preload
								/>
							)}
						</a>
					</div>
					<ul
						class={`flex-auto grid h-full ${
							items.length > 4 ? `grid-cols-${items.length}` : 'grid-cols-5'
						}`}
					>
						{items.map((item) => <NavItem item={item} />)}
					</ul>
					<div class='flex-none flex items-center justify-end h-full'>
						<HeaderSearchInput searchbar={searchbar} />
						<Button
							as='a'
							variant='icon'
							href='/favoritos'
							aria-label='Favoritos'
							class='text-black ml-5'
						>
							<Icon
								id='Heart'
								width={32}
								height={32}
								fill='white'
								stroke='black'
								strokeWidth={2.5}
							/>
						</Button>
						<Button
							as='a'
							variant='icon'
							href='/login'
							aria-label='Log in'
							class='text-black'
						>
							<Icon id='User' width={28} height={28} />
						</Button>
						<HeaderButton variant='cart' />
					</div>
				</Container>
			</div>
		</>
	)
}

export default Navbar

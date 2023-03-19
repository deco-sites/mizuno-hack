import Text from '$store/components/ui/Text.tsx'
import Image from 'deco-sites/std/components/Image.tsx'
// HEAD
//
import { headerHeight } from './constants.ts'
//feat/product-card
export interface INavItem {
	label: string
	href: string
	children?: INavItem[]
	image?: { src?: string; alt?: string }
}

function NavItem({ item }: { item: INavItem }) {
	const { href, label, children, image } = item

	return (
		<li
			class={`group flex items-center justify-center relative border-l-1 border-gray-300 hover:bg-gray-300 transition-colors duration-300`}
		>
			<a href={href} class={`px-4 py-3 text-[1.1rem] font-black text-uppercase`}>
				<Text // class='group-hover:border-black border-solid border-b border-white'
				variant='menu'>
					{label}
				</Text>
			</a>

			{children && children.length > 0 &&
				(
					<div
						class={`absolute max-w-[58vw] group-hover:(visible opacity-100) w-max top-full left-0 invisible opacity-0 transition-opacity duration-300 bg-white z-50 flex items-start justify-center gap-6 border-1 border-gray-300`}
					>
						<ul class='flex items-start justify-center gap-6'>
							{children.map((node) => (
								<li class='p-6'>
									<a class='hover:underline' href={node.href}>
										<Text
											variant='menu'
											class='text-uppercase font-bold text-primary'
										>
											{node.label}
										</Text>
									</a>

									<ul class='flex flex-col gap-1 mt-4'>
										{node.children?.map((leaf) => (
											<li>
												<a class='hover:underline' href={leaf.href}>
													<Text variant='caption' class='text-primary'>
														{leaf.label}
													</Text>
												</a>
											</li>
										))}
									</ul>
								</li>
							))}
						</ul>

						{image?.src && (
							<Image
								class='p-6'
								src={image.src}
								alt={image.alt}
								width={300}
								height={332}
								loading='lazy'
							/>
						)}
					</div>
				)}
		</li>
	)
}

export default NavItem

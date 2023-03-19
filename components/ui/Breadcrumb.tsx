import Text from '$store/components/ui/Text.tsx'
import Icon from '$store/components/ui/Icon.tsx'
import type { BreadcrumbList } from 'deco-sites/std/commerce/types.ts'

interface Props {
	itemListElement: BreadcrumbList['itemListElement']
}

function Item({ name, item }: { name?: string; item?: string }) {
	if (!name || !item) {
		return null
	}

	return (
		<li class='leading-none whitespace-nowrap overflow-hidden overflow-ellipsis last-child:font-bold'>
			<a href={item} class='text-primary text-xs lg:hover:underline'>
				{name}
			</a>
		</li>
	)
}

function Breadcrumb({ itemListElement = [] }: Props) {
	return (
		<ul class='flex flex-row gap-1 items-center w-full'>
			<Item name='Home' item='/' />
			{itemListElement.map((item) => (
				<>
					<li class='mt-0.5 text-primary text-xs leading-none'>
						/
					</li>
					<Item {...item} />
				</>
			))}
		</ul>
	)
}

export default Breadcrumb

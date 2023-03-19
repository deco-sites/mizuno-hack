import Text from '$store/components/ui/Text.tsx'
import Icon from '$store/components/ui/Icon.tsx'
import type { BreadcrumbList } from 'deco-sites/std/commerce/types.ts'

interface Props {
	itemListElement: BreadcrumbList['itemListElement']
}

function Item(
	{ name, item, class: _class = '' }: { name?: string; item?: string; class?: string },
) {
	if (!name || !item) {
		return null
	}

	return (
		<li class='whitespace-nowrap overflow-hidden overflow-ellipsis'>
			<a href={item} class='hover:underline'>
				<Text variant='caption' class={'text-primary text-[12px] ' + _class}>
					{name}
				</Text>
			</a>
		</li>
	)
}

function Breadcrumb({ itemListElement = [] }: Props) {
	return (
		<ul class='flex flex-row gap-2 items-center w-full'>
			<Item name='Home' item='/' />
			{itemListElement.map((item, index) => (
				<>
					<li
						class={`mt-0.5 text-[12px] ${
							index === itemListElement.length - 1 ? 'font-bold' : ''
						}`}
					>
						/
					</li>
					<Item
						{...item}
						class={index === itemListElement.length - 1 ? 'font-bold' : ''}
					/>
				</>
			))}
		</ul>
	)
}

export default Breadcrumb

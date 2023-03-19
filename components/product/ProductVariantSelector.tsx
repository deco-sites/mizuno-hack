import Text from '$store/components/ui/Text.tsx'
import Avatar from '$store/components/ui/Avatar.tsx'
import { useVariantPossibilities } from '$store/sdk/useVariantPossiblities.ts'
import type { Product } from 'deco-sites/std/commerce/types.ts'

interface Props {
	product: Product
}

const NAME_TO_TITLE_DICT = {
	'Tamanho': 'Selecione um tamanho',
}

const getTitle = (name: string, quantity?: number) => {
	if (name !== 'Cor') {
		return NAME_TO_TITLE_DICT[name as keyof typeof NAME_TO_TITLE_DICT]
	}

	if (quantity && quantity > 1) {
		return `${quantity} cores disponíveis`
	}

	return `1 cor disponível`
}

function VariantSelector({ product }: Props) {
	const possibilities = useVariantPossibilities(product)
	const { url: currentUrl } = product

	return (
		<ul class='flex flex-col gap-4 '>
			{Object.keys(possibilities).map((name) => (
				<li class='flex flex-col gap-2'>
					<Text variant='caption' class={`text-sm text-uppercase ${name === 'Cor' ? 'font-bold' : 'text-[0.8rem]'}`}>
						{getTitle(name, Object.keys(possibilities[name]).length)}
					</Text>
					<ul class={`flex flex-row w-full ${name !== 'Cor' ? 'gap-3 flex-wrap max-w-[350px]' : 'gap-2 overflow-y-auto'}`}>
						{Object.entries(possibilities[name]).map(([url, value]) => (
							<li>
								<a href={url}>
									<Avatar
										// deno-lint-ignore no-explicit-any
										content={value as any}
										disabled={url === currentUrl}
										variant={name.toLowerCase() === 'cor'
											? 'color'
											: 'abbreviation'}
										imageSrc={product.image?.[0].url} // Missing image for each SKU :/
									/>
								</a>
							</li>
						))}
					</ul>
				</li>
			))}
		</ul>
	)
}

export default VariantSelector

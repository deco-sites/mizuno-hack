import Image from 'deco-sites/std/components/Image.tsx'
import { useOffer } from '$store/sdk/useOffer.ts'
import { formatPrice } from '$store/sdk/format.ts'
import Icon from '$store/components/ui/Icon.tsx'
import { useVariantPossibilities } from '$store/sdk/useVariantPossiblities.ts'
import type { Product } from 'deco-sites/std/commerce/types.ts'

interface Props {
	product: Product
	/** Preload card image */
	preload?: boolean
}

function ProductCard({ product, preload }: Props) {
	const {
		url,
		productID,
		name,
		image: images,
		offers,
	} = product
	const [front] = images ?? []
	const { listPrice, price, installments, discount } = useOffer(offers)

	const possibilities = useVariantPossibilities(product)
	const options = Object.entries(
		possibilities['COR'] ?? possibilities['Cor'] ?? {},
	)

	const moreColorsQuantity = options.length - 1

	return (
		<a
			id={`product-card-${productID}`}
			class='w-full'
			href={url}
			aria-label='product link'
		>
			<div class='w-full mb-10 relative'>
				{discount > 0 && (
					<strong class='w-28 h-7 bg-primary text-white text-sm uppercase flex justify-center items-center absolute -top-7 -left-2 z-10 sm:h-6 sm:text-xs sm:-top-2 sm:left-0'>
						{discount}% Off
					</strong>
				)}

				<Image
					class='w-full'
					src={front.url!}
					alt={front.alternateName}
					width={150}
					height={150}
					preload={preload}
					loading={preload ? 'eager' : 'lazy'}
					sizes='(max-width: 640px) 50vw, 20vw'
				/>

				<button class='absolute -top-2 right-0.5 z-10'>
					<Icon
						id='Heart'
						fill='transparent'
						stroke='#009bdb'
						width={20}
						height={20}
						strokeWidth={2}
					/>
				</button>
			</div>

			<div>
				<div class='h-11 mb-2'>
					<h3 class='text-gray-800 text-xs leading-tight font-semibold line-clamp sm:text-sm'>
						{name}
					</h3>
				</div>

				<div class='h-9 grid content-end'>
					{listPrice !== price && (
						<p class='text-gray-700 text-2xs leading-none'>
							de{' '}
							<span class='line-through'>
								{formatPrice(listPrice, offers!.priceCurrency!)}
							</span>
						</p>
					)}

					<strong class='text-xs font-semibold'>
						{listPrice !== price && 'por '}
						{formatPrice(price, offers!.priceCurrency!)}
					</strong>
				</div>

				<p class='h-3 mb-3 text-secondary text-xs leading-none font-semibold'>
					{installments}
				</p>

				{moreColorsQuantity > 1 && (
					<span class='w-max min-w-[5rem] px-1.5 h-6 bg-gray-400 text-gray-600 text-xs font-medium flex items-center capitalize'>
						+{options.length - 1} {moreColorsQuantity > 1 ? 'cores' : 'cor'}
					</span>
				)}
			</div>
		</a>
	)
}

export default ProductCard

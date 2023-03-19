import { asset } from '$fresh/runtime.ts'
import type { LoaderReturnType } from '$live/types.ts'
import Slider from '$store/components/ui/Slider.tsx'
import SliderControllerJS from '$store/islands/SliderJS.tsx'
import Breadcrumb from '$store/components/ui/Breadcrumb.tsx'
import Button from '$store/components/ui/Button.tsx'
import Container from '$store/components/ui/Container.tsx'
import Icon from '$store/components/ui/Icon.tsx'
import Text from '$store/components/ui/Text.tsx'
import AddToCartButton from '$store/islands/AddToCartButton.tsx'
import { formatPrice } from '$store/sdk/format.ts'
import { useOffer } from '$store/sdk/useOffer.ts'
import type { ProductDetailsPage } from 'deco-sites/std/commerce/types.ts'
import { useId } from 'preact/hooks'

import ProductSelector from './ProductVariantSelector.tsx'
import BannerCarousel from '../ui/BannerCarousel.tsx'

export interface Props {
	page: LoaderReturnType<ProductDetailsPage | null>
}

function NotFound() {
	return (
		<div class='w-full flex justify-center items-center py-28'>
			<div class='flex flex-col items-center justify-center gap-6'>
				<Text variant='heading-2'>Página não encontrada</Text>
				<a href='/'>
					<Button>Voltar à página inicial</Button>
				</a>
			</div>
		</div>
	)
}

function Details({ page }: { page: ProductDetailsPage }) {
	const {
		breadcrumbList,
		product,
	} = page
	const {
		description,
		productID,
		offers,
		image: images = [],
		name,
		gtin,
	} = product
	const { price, listPrice, seller, installments, discount } = useOffer(offers)
	const id = useId()

	return (
		<Container class='py-6 px-3'>
			<Breadcrumb
				itemListElement={breadcrumbList?.itemListElement.slice(0, -1)}
			/>

			<div class='md:hidden'>
				<h1 class='text-xl text-primary text-center font-black mt-10'>
					{name}
				</h1>
				<img src={asset('/images/stars.png')} class='w-[126px] mx-auto' />
			</div>

			<div class='flex flex-col gap-4 sm:flex-row sm:gap-10'>
				{discount > 0 && (
					<strong class='w-28 h-7 bg-primary text-white text-sm uppercase flex justify-center items-center absolute -top-7 -left-2 z-10 sm:h-6 sm:text-xs sm:-top-2 sm:left-0'>
						{discount}% Off
					</strong>
				)}

				<div class='flex overflow-x-scroll max-w-[472px] h-[450px] mx-auto'>
					{(images.map((i) => i.url).filter(Boolean) as string[]).map((i) => (
						<img
							src={i}
							alt={name ?? ''}
						/>
					))}
				</div>

				{/* Product Info */}
				<div class='flex-auto px-4 sm:px-0'>
					{/* Code and name */}
					<div class='mt-4 sm:mt-8'>
						<div>
							<Text tone='subdued' variant='caption'>
								Cod. {gtin}
							</Text>
						</div>
					</div>
					{/* Prices */}
					<div class='mt-4'>
						<div class='flex flex-row gap-2 items-center'>
							<Text
								class='line-through'
								tone='subdued'
								variant='list-price'
							>
								{formatPrice(listPrice, offers!.priceCurrency!)}
							</Text>
							<Text tone='price' variant='heading-3'>
								{formatPrice(price, offers!.priceCurrency!)}
							</Text>
						</div>
						<Text tone='subdued' variant='caption'>
							{installments}
						</Text>
					</div>
					{/* Sku Selector */}
					<div class='mt-4 sm:mt-6'>
						<ProductSelector product={product} />
					</div>
					{/* Add to Cart and Favorites button */}
					<div class='mt-4 sm:mt-10 flex flex-col gap-2'>
						{seller && (
							<AddToCartButton
								skuId={productID}
								sellerId={seller}
							/>
						)}
						<Button variant='secondary'>
							<Icon id='Heart' width={20} height={20} strokeWidth={2} /> Favoritar
						</Button>
					</div>
					{/* Description card */}
					<div class='mt-4 sm:mt-6'>
						<Text variant='caption'>
							{description && (
								<details>
									<summary class='cursor-pointer'>Descrição</summary>
									<div class='ml-2 mt-2'>{description}</div>
								</details>
							)}
						</Text>
					</div>
				</div>
			</div>
		</Container>
	)
}

function ProductDetails({ page }: Props) {
	if (page) {
		return <Details page={page} />
	}

	return <NotFound />
}

export default ProductDetails

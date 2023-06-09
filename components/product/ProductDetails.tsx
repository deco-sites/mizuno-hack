import { asset } from '$fresh/runtime.ts'
import type { LoaderReturnType } from '$live/types.ts'
import Breadcrumb from '$store/components/ui/Breadcrumb.tsx'
import Button from '$store/components/ui/Button.tsx'
import Icon from '$store/components/ui/Icon.tsx'
import Text from '$store/components/ui/Text.tsx'
import AddToCartButton from '$store/islands/AddToCartButton.tsx'
import { formatPrice } from '$store/sdk/format.ts'
import { useOffer } from '$store/sdk/useOffer.ts'
import type { ProductDetailsPage } from 'deco-sites/std/commerce/types.ts'
import Image from 'deco-sites/std/components/Image.tsx'

import ProductSelector from './ProductVariantSelector.tsx'

export interface Props {
	page: LoaderReturnType<ProductDetailsPage | null>
	badge?: string
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

function Details({ page, badge }: { page: ProductDetailsPage; badge?: string }) {
	const {
		breadcrumbList,
		product,
	} = page
	const {
		productID,
		offers,
		image: images = [],
		name,
		gtin,
	} = product
	const { price, listPrice, seller, fullInstallments: installments, discount } = useOffer(offers)

	return (
		<div class='py-0 sm:py-10 mb-16 max-w-6xl mx-auto'>
			<div class='pt-6 px-4'>
				<Breadcrumb
					itemListElement={breadcrumbList?.itemListElement.slice(0, -1)}
				/>
			</div>

			<div class='md:hidden'>
				<h1 class='text-xl text-primary text-center font-black mt-10'>
					{name}
				</h1>
				<img
					src={asset('/images/stars.png')}
					alt='Nota do produto'
					width={126}
					height={30}
					class='mx-auto'
				/>
			</div>

			<div class='flex flex-col gap-4 sm:flex-row sm:gap-10'>
				<div class='max-w-[500px] max-h-[475px] m-auto relative'>
					{discount > 0 && (
						<strong class='w-32 h-8 bg-primary text-white text-sm uppercase flex justify-center items-center absolute -left-2 z-10 sm:h-6 sm:text-xs sm:left-0 absolute'>
							{discount}% Off
						</strong>
					)}

					<div class='flex overflow-x-auto'>
						{(images.map((i) => i.url).filter(Boolean) as string[]).map((i) => (
							<img
								src={i}
								alt={name ?? ''}
							/>
						))}
					</div>
				</div>

				{/* Product Info */}
				<div class='flex-auto px-6 sm:px-0 max-w-sm'>
					{/* Desktop info */}
					<div class='hidden lg:flex flex-col'>
						{/* Name */}
						<div class='mt-4 sm:mt-8'>
							<h1>
								<Text
									variant='heading-3'
									class='text-primary text-lg block leading-[1.2] font-black'
								>
									{name}
								</Text>
							</h1>
						</div>
						{/* Reviews & Ref code */}
						<div class='flex justify-between'>
							<div />
							<Text tone='subdued' variant='caption'>
								Cod. {gtin}
							</Text>
						</div>
					</div>
					{/* Prices */}
					<div class='mt-4'>
						<div class='flex flex-col'>
							<Text
								class='line-through text-base font-bold block leading-[1] mb-[6px]'
								tone='subdued'
								variant='list-price'
							>
								De {formatPrice(listPrice, offers!.priceCurrency!)}
							</Text>
							<Text
								class='text-2xl text-primary font-bold block leading-[1] mb-4'
								tone='price'
								variant='heading-3'
							>
								por {formatPrice(price, offers!.priceCurrency!)}
							</Text>
							<Text
								class='text-xs font-bold block leading-[1]'
								tone='subdued'
								variant='caption'
							>
								{installments}
							</Text>
						</div>
					</div>
					<Text class='bg-lighter-blue font-bold text-primary w-[fit-content] mt-2 mb-1 p-1 text-xs block leading-[1]'>
						{badge}
					</Text>
					{/* Sku Selector */}
					<div class='mt-2 sm:mt-6'>
						<ProductSelector product={product} />
					</div>
					{/* Newsletter modal */}
					{
						/* <Button class="h-[58px] flex bg-[#F5F5F5]">
						<div class="bg-primary py-[10px] px-[20px] text-secondary">
							<Icon id='Mail' width={32} height={32} />
						</div>
						<span class="flex border-1 border-[#cec8c8] border-l-0 text-black">
							Cadastre-se agora e <strong class="text-primary">GANHE 10% OFF</strong> na primeira compra.
						</span>
					</Button> */
					}

					{/* Add to Cart and Favorites button */}
					<div class='mt-4 sm:mt-10 flex gap-4'>
						{seller && (
							<AddToCartButton
								skuId={productID}
								sellerId={seller}
								class='flex-1 bg-primary text-uppercase text-white py-3 font-medium h-[48px] font-[1.1rem] tracking-wider hover:text-white'
							/>
						)}
						<Button
							variant='secondary'
							class='bg-white border-primary border-2 text-uppercase py-3 font-medium h-[48px] font-[1.1rem] tracking-wider'
						>
							<Icon
								id='Heart'
								width={28}
								height={28}
								fill='white'
								stroke='#001489'
								strokeWidth={2.5}
							/>
						</Button>
					</div>

					{
						/* <div class='flex mt-10 h-8'>
						<Icon id='Coin' width={26} height={26} strokeWidth={0} />
						<span class='flex-1'>
							Compre e receba R$ 70,00 de bônus para sua próxima compra.{' '}
							<a href='https://www.mizuno.com.br/politica-de-promocoes'>
								Veja as regras.
							</a>
						</span>
					</div> */
					}
				</div>
			</div>
		</div>
	)
}

function ProductDetails({ page, ...rest }: Props) {
	if (page) {
		return <Details page={page} {...rest} />
	}

	return <NotFound />
}

export default ProductDetails

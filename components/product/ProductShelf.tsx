import ProductCard from '$store/components/product/ProductCard.tsx'
import Container from '$store/components/ui/Container.tsx'
import Text from '$store/components/ui/Text.tsx'
import Slider from '$store/components/ui/Slider.tsx'
import SliderControllerJS from '$store/islands/SliderJS.tsx'
import Button from '$store/components/ui/Button.tsx'
import Icon from '$store/components/ui/Icon.tsx'
import { useId } from 'preact/hooks'
import type { LoaderReturnType } from '$live/types.ts'
import type { Product } from 'deco-sites/std/commerce/types.ts'

export interface Props {
	title: string
	products: LoaderReturnType<Product[] | null>
	itemsPerPage?: number
}

function ProductShelf({
	title,
	products,
}: Props) {
	const id = useId()

	if (!products || products.length === 0) {
		return null
	}

	return (
		<Container
			id={id}
			class='px-5 grid grid-cols-[50px_1fr_50px] grid-rows-[50px_1fr_50px_1fr] py-10 lg:max-w-lg lg:mx-auto'
		>
			<h2 class='text-primary text-lg font-bold text-center uppercase row-start-1 col-span-full'>
				{title}
			</h2>

			<Slider
				class='py-10 gap-6 col-span-full row-start-2 row-end-5'
				snap='snap-center sm:snap-start block first:ml-6 sm:first:ml-0 last:mr-6 sm:last:mr-0'
			>
				{products?.map((product) => (
					<div class='min-w-[180px] max-w-[180px]'>
						<ProductCard product={product} />
					</div>
				))}
			</Slider>

			<div class='relative sm:block z-10 col-start-1 row-start-3'>
				<div class='absolute right-1/2 rounded border-default border'>
					<Button
						class='w-10 h-10 bg-gray-100 rounded'
						variant='icon'
						data-slide='prev'
						aria-label='Previous item'
					>
						<Icon size={20} id='ChevronLeft' strokeWidth={3} />
					</Button>
				</div>
			</div>

			<div class='relative sm:block z-10 col-start-3 row-start-3'>
				<div class='absolute left-1/2 rounded border-default border'>
					<Button
						class='w-10 h-10 bg-gray-100 rounded'
						variant='icon'
						data-slide='next'
						aria-label='Next item'
					>
						<Icon size={20} id='ChevronRight' strokeWidth={3} />
					</Button>
				</div>
			</div>

			<SliderControllerJS rootId={id} />
		</Container>
	)
}

export default ProductShelf

import ProductCard from '$store/components/product/ProductCard.tsx'
import Button from '$store/components/ui/Button.tsx'
import Text from '$store/components/ui/Text.tsx'
import Icon from '$store/components/ui/Icon.tsx'
import type { LoaderReturnType } from '$live/types.ts'
import type { ProductListingPage } from 'deco-sites/std/commerce/types.ts'

export interface Props {
	page: LoaderReturnType<ProductListingPage | null>
}

function NotFound() {
	return (
		<div class='w-full flex justify-center items-center py-10'>
			<Text>Not Found!</Text>
		</div>
	)
}

function Gallery({ page }: { page: ProductListingPage }) {
	return (
		<div class='px-5 lg:max-w-lg lg:mx-auto'>
			<div class='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4'>
				{page.products.map((product, index) => (
					<ProductCard product={product} preload={index === 0} />
				))}
			</div>

			<div class='my-4 flex flex-row items-center justify-center gap-2'>
				<a rel='prev' href={page.pageInfo.previousPage ?? '#'}>
					<Button disabled={!page.pageInfo.previousPage} variant='icon'>
						<Icon id='ChevronLeft' width={20} height={20} strokeWidth={2} />
					</Button>
				</a>

				<p>
					{page.pageInfo.currentPage + 1}
				</p>

				<a rel='next' href={page.pageInfo.nextPage ?? '#'}>
					<Button disabled={!page.pageInfo.nextPage} variant='icon'>
						<Icon id='ChevronRight' width={20} height={20} strokeWidth={2} />
					</Button>
				</a>
			</div>
		</div>
	)
}

function ProductGallery({ page }: Props) {
	if (!page) {
		return <NotFound />
	}

	return <Gallery page={page} />
}

export default ProductGallery

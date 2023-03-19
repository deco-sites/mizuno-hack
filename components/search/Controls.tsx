import Icon from '$store/components/ui/Icon.tsx'
import Filters from '$store/components/search/Filters.tsx'
import Sort from '$store/components/search/Sort.tsx'
import Modal from '$store/components/ui/Modal.tsx'
import Breadcrumb from '$store/components/ui/Breadcrumb.tsx'
import { useSignal } from '@preact/signals'
import type { ProductListingPage } from 'deco-sites/std/commerce/types.ts'
import type { LoaderReturnType } from '$live/types.ts'

export interface Props {
	page: LoaderReturnType<ProductListingPage | null>
}

function NotFound() {
	return <div />
}

function Controls({ page }: { page: ProductListingPage }) {
	const open = useSignal(false)
	const filters = page?.filters
	const breadcrumb = page?.breadcrumb
	const pageTitle = breadcrumb.itemListElement[breadcrumb.itemListElement.length - 1]?.name

	return (
		<div class='p-5 grid lg:max-w-lg lg:mx-auto'>
			<Breadcrumb itemListElement={breadcrumb?.itemListElement} />

			<div class='mt-4 flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center'>
				<h2 class='text-sm font-black uppercase sm:text-md'>{pageTitle}</h2>

				<div class='flex flex-row items-center justify-between sm:gap-2'>
					<button
						class='p-2 bg-tertiary text-white text-xs font-bold uppercase flex flex-shrink-0 justify-center items-center gap-2'
						onClick={() => {
							open.value = true
						}}
					>
						Filtrar por
						<Icon id='FilterList' width={16} height={16} />
					</button>

					<Sort />
				</div>
			</div>

			<Modal
				title='Filtrar'
				mode='sidebar-right'
				open={open.value}
				onClose={() => {
					open.value = false
				}}
			>
				<Filters filters={filters} />
			</Modal>
		</div>
	)
}

function SearchControls({ page }: Props) {
	if (!page || !page.filters || page.filters.length === 0) {
		return <NotFound />
	}

	return <Controls page={page} />
}

export default SearchControls

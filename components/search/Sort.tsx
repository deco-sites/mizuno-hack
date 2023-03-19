import { useMemo } from 'preact/hooks'
import Icon from '$store/components/ui/Icon.tsx'
import type { JSX } from 'preact'

const SORT_QUERY_PARAM = 'sort'

// TODO: The search query should also be from a commerce schema
const options = [
	{ value: '', label: 'Relevância' },
	{ value: 'price:desc', label: 'Maior Preço' },
	{ value: 'price:asc', label: 'Menor Preço' },
	{ value: 'orders:desc', label: 'Mais Pedidos' },
	{ value: 'name:asc', label: 'Nome (A -> Z)' },
	{ value: 'name:desc', label: 'Nome (Z -> A)' },
	{ value: 'release:desc', label: 'Lançamentos' },
	{ value: 'discount:desc', label: 'Maior Desconto' },
]

const useSort = () =>
	useMemo(() => {
		const urlSearchParams = new URLSearchParams(window.location?.search)
		return urlSearchParams.get(SORT_QUERY_PARAM) ?? ''
	}, [])

// TODO: Replace with "search utils"
const applySort = (e: JSX.TargetedEvent<HTMLSelectElement, Event>) => {
	const urlSearchParams = new URLSearchParams(window.location.search)

	console.log(e.currentTarget.value)

	urlSearchParams.set(SORT_QUERY_PARAM, e.currentTarget.value)
	window.location.search = urlSearchParams.toString()
}

function Sort() {
	const sort = useSort()

	return (
		<label class='relative' htmlFor='#sort'>
			<Icon
				id='ChevronDown'
				class='-translate-y-1/2 absolute top-1/2 right-2'
				width={16}
				height={16}
				strokeWidth={3}
			/>

			<select
				id='sort'
				class='w-48 p-2 bg-gray-300 text-gray-800 text-xs font-bold uppercase flex justify-center items-center gap-2 appearance-none'
				name='sort'
				onInput={applySort}
			>
				{options.map(({ value, label }) => (
					<option key={value} value={value} selected={value === sort}>
						<p>{label}</p>
					</option>
				))}
			</select>
		</label>
	)
}

export default Sort

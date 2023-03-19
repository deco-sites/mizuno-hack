import Image from 'deco-sites/std/components/Image.tsx'
import Icon from '$store/components/ui/Icon.tsx'
import Text from '$store/components/ui/Text.tsx'
import Button from '$store/components/ui/Button.tsx'
import QuantitySelector from '$store/components/ui/QuantitySelector.tsx'
import { useCart } from 'deco-sites/std/commerce/vtex/hooks/useCart.ts'
import { formatPrice } from '$store/sdk/format.ts'

interface Props {
	index: number
}

function CartItem({ index }: Props) {
	const { loading, cart, updateItems } = useCart()
	const item = cart.value!.items[index]
	const locale = cart.value?.clientPreferencesData.locale
	const currencyCode = cart.value?.storePreferencesData.currencyCode
	const {
		imageUrl,
		skuName,
		sellingPrice,
		listPrice,
		name,
		quantity,
	} = item

	const isGift = sellingPrice < 0.01

	return (
		<div class='flex flex-row justify-between items-start gap-4'>
			<Image
				src={imageUrl}
				alt={skuName}
				width={70}
				height={70}
				class='object-cover object-center'
			/>
			<div class='flex-grow'>
				<Text variant='body' class='font-bold text-secondary text-base block leading-4'>
					{name}
				</Text>
				<div class='mt-2 mb-4 max-w-min flex items-center'>
					<Text class='text-sm text-uppercase'>
						Quantidade:
					</Text>
					<QuantitySelector
						disabled={loading.value || isGift}
						quantity={quantity}
						onChange={(quantity) => updateItems({ orderItems: [{ index, quantity }] })}
					/>
				</div>
				<div class='flex flex-col gap-1'>
					<Text
						class='line-through text-xs leading-[1] block'
						tone='subdued'
						variant='list-price'
					>
						de {formatPrice(listPrice / 100, currencyCode!, locale)}
					</Text>
					<Text
						tone='price'
						class='text-[1.1rem] font-black leading-[1] block'
						variant='caption'
					>
						{isGift
							? 'Grátis'
							: `por ${formatPrice(sellingPrice / 100, currencyCode!, locale)}`}
					</Text>
				</div>
			</div>
			<Button
				onClick={() => updateItems({ orderItems: [{ index, quantity: 0 }] })}
				disabled={loading.value || isGift}
				loading={loading.value}
				variant='icon'
				class='w-6 h-6 p-0'
			>
				<Icon id='Trash' width={18} height={18} />
			</Button>
		</div>
	)
}

export default CartItem

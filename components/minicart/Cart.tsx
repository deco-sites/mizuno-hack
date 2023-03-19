import { useCart } from 'deco-sites/std/commerce/vtex/hooks/useCart.ts'
import { formatPrice } from '$store/sdk/format.ts'
import Button from '$store/components/ui/Button.tsx'
import Text from '$store/components/ui/Text.tsx'

import { useUI } from '../../sdk/useUI.ts'
import CartItem from './CartItem.tsx'
import Coupon from './Coupon.tsx'

const CHECKOUT_URL = 'https://mizunobr.vtexcommercestable.com.br/checkout'

function Cart() {
	const { displayCart } = useUI()
	const { cart, loading } = useCart()
	const isCartEmpty = cart.value?.items.length === 0
	const total = cart.value?.totalizers.find((item) => item.id === 'Items')
	const discounts = cart.value?.totalizers.find((item) => item.id === 'Discounts')
	const locale = cart.value?.clientPreferencesData.locale
	const currencyCode = cart.value?.storePreferencesData.currencyCode

	if (cart.value === null) {
		return null
	}

	// Empty State
	if (isCartEmpty) {
		return (
			<div class='flex flex-col justify-center items-center gap-6'>
				<div class='mt-12 pb-5 border-b-1 border-gray-300 w-full flex justify-center'>
					<Text variant='heading-2' class='text-uppercase'>
						Seu carrinho está vazio!
					</Text>
				</div>
				<div class='px-8 w-full'>
					<Button
						variant='secondary'
						class='text-uppercase w-full py-3 font-medium h-12 font-[1.1rem] tracking-wider border-black'
						onClick={() => {
							displayCart.value = false
						}}
					>
						Continuar comprando
					</Button>
				</div>
			</div>
		)
	}

	return (
		<>
			{/* Cart Items */}
			<ul
				role='list'
				class='mt-6 px-8 flex-grow-1 overflow-y-auto flex flex-col gap-6'
			>
				{cart.value.items.map((_, index) => (
					<li>
						<CartItem index={index} key={index} />
					</li>
				))}
			</ul>

			{/* Cart Footer */}
			<footer>
				{/* Subtotal */}
				<div class='border-t-1 border-default py-4 flex flex-col gap-4'>
					{discounts?.value && (
						<div class='flex justify-between items-center px-4'>
							<Text variant='caption'>Descontos</Text>
							<Text variant='caption'>
								{formatPrice(discounts.value / 100, currencyCode!, locale)}
							</Text>
						</div>
					)}
					<Coupon />
				</div>
				{/* Total */}
				{total?.value && (
					<div class='border-t-1 border-default pt-4 flex flex-col justify-end items-center gap-2 px-8'>
						<div class='flex justify-between items-center w-full text-primary text-uppercase'>
							<Text variant='body' class="text-secondary font-black">Total</Text>
							<Text variant='heading-3' class="text-secondary font-black">
								{formatPrice(total.value / 100, currencyCode!, locale)}
							</Text>
						</div>
						<Text tone='subdued' variant='caption' class="text-xs">
							Taxas e fretes serão calculados no checkout
						</Text>
					</div>
				)}
				<div class='flex flex-col py-4 px-8 gap-4'>
					<a
						class='inline-block w-full '
						target='_blank'
						href={`${CHECKOUT_URL}?orderFormId=${cart.value!.orderFormId}`}
					>
						<Button
							class='w-full bg-primary text-uppercase py-3 font-medium h-[48px] font-[1.1rem] tracking-wider'
							disabled={loading.value || cart.value.items.length === 0}
						>
							Finalizar Compra
						</Button>
					</a>
          
					<Button
						variant='secondary'
						class='text-uppercase w-full py-3 font-medium h-[48px] font-[1.1rem] tracking-wider border-black'
						onClick={() => {
							displayCart.value = false
						}}
					>
						Continuar comprando
					</Button>
				</div>
			</footer>
		</>
	)
}

export default Cart

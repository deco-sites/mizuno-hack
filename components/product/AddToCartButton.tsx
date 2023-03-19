import Button from '$store/components/ui/Button.tsx'
import { useAddToCart } from '$store/sdk/useAddToCart.ts'

interface Props {
	skuId: string
	sellerId: string
	class?: string
}

function AddToCartButton({ skuId, sellerId, class: _class }: Props) {
	const props = useAddToCart({
		skuId,
		sellerId,
	})

	return (
		<Button {...props} class={`w-full ${_class}`}>
			Comprar
		</Button>
	)
}

export default AddToCartButton

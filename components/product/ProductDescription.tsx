import type { LoaderReturnType } from '$live/types.ts'
import type { ProductDetailsPage } from 'deco-sites/std/commerce/types.ts'
import Text from '$store/components/ui/Text.tsx'
import Image from 'deco-sites/std/components/Image.tsx'
import Container from '$store/components/ui/Container.tsx'

export interface Props {
	page: LoaderReturnType<ProductDetailsPage | null>
}

function ProductDescription({ page }: Props) {
	if (!page) {
		return null
	}

	const {
		product,
	} = page

	const {
		description,
	} = product

	return (
		<div class='flex flex-col bg-primary p-8 relative pb-20 mb-16'>
			<Container class='flex flex-col'>
				<Text class='text-uppercase text-secondary font-bold text-xl mb-3' as='h2'>
					Detalhes do produto
				</Text>
				<Text class='text-white text-sm'>{description}</Text>

				{/* Mock */}
				<div class='flex flex-col gap-2'>
					<Text class='text-uppercase text-secondary font-bold text-xl mb-3 mt-6' as='h2'>
						Informações técnicas
					</Text>
					<Text class='text-white text-sm' as='p'>
						<strong>Pisada:</strong> NEUTRA
					</Text>
					<Text class='text-white text-sm' as='p'>
						<strong>Indicado Para:</strong> Corrida
					</Text>
					<Text class='text-white text-sm' as='p'>
						<strong>Linha:</strong> Corrida
					</Text>
					<Text class='text-white text-sm' as='p'>
						<strong>Fechamento:</strong> Cadarço
					</Text>
					<Text class='text-white text-sm' as='p'>
						<strong>Origem:</strong> Nacional
					</Text>
					<Text class='text-white text-sm' as='p'>
						<strong>Garantia do Fabricante:</strong> Contra defeito de fabricação
					</Text>
				</div>
			</Container>

			<Image
				src='https://www.mizuno.com.br/arquivos/mizuno-reach-beyond-lettering.png'
				width={708}
				height={79}
				loading='lazy'
				class='w-full absolute right-0 bottom-0 h-10 md:h-[60px] object-right object-contain'
			/>
		</div>
	)
}

export default ProductDescription

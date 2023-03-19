import { Picture, Source } from 'deco-sites/std/components/Picture.tsx'
import type { Image as LiveImage } from 'deco-sites/std/components/types.ts'

export interface Props {
	image: {
		desktop: LiveImage
		tablet: LiveImage
		phone: LiveImage
	}
	alt: string
	href?: string
}

export default function BannerFull({ image, alt, href }: Props) {
	return (
		<a class='mt-12 block' href={href ?? '#'}>
			<Picture class='w-full' loading='lazy'>
				<Source
					media='(max-width: 640px)'
					src={image.phone}
					width={360}
					height={450}
					loading='lazy'
				/>

				<Source
					media='(max-width: 1024px)'
					src={image.tablet}
					width={960}
					height={426}
					loading='lazy'
				/>

				<Source
					media='(min-width: 1024px)'
					src={image.desktop}
					width={690}
					height={450}
					loading='lazy'
				/>

				<img
					class='w-full'
					src={image.desktop}
					alt={alt}
					decoding='async'
					loading='lazy'
				/>
			</Picture>
		</a>
	)
}

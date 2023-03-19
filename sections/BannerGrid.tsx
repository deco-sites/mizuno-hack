import { Picture, Source } from 'deco-sites/std/components/Picture.tsx'
import type { Image as LiveImage } from 'deco-sites/std/components/types.ts'

export interface Banner {
	image: {
		desktop: LiveImage
		mobile: LiveImage
	}
	/**
	 * @description Image alt text
	 */
	alt: string
	/**
	 * @description When you click you go to
	 */
	href?: string
}

export interface Props {
	banners: Banner[]
	itemsPerRow: {
		desktop: number
		tablet: number
		phone: number
	}
}

export default function BannerGrid({ banners, itemsPerRow }: Props) {
	return (
		<div
			class={`mt-12 grid grid-cols-${itemsPerRow.phone} gap-12 sm:px-6 sm:grid-cols-${itemsPerRow.tablet} sm:gap-6 lg:max-w-lg lg:p-0 lg:mx-auto lg:grid-cols-${itemsPerRow.desktop}`}
		>
			{banners.map((banner) => (
				<a href={banner.href ?? '#'}>
					<Picture class='w-full'>
						<Source
							media='(max-width: 640px)'
							src={banner.image.mobile}
							width={360}
							height={450}
						/>

						<Source
							media='(max-width: 1024px)'
							src={banner.image.mobile}
							width={640}
							height={800}
						/>

						<Source
							media='(min-width: 1024px)'
							src={banner.image.desktop}
							width={690}
							height={450}
						/>

						<img
							class='w-full'
							src={banner.image.desktop}
							alt={banner.alt}
							decoding='async'
							loading='lazy'
						/>
					</Picture>
				</a>
			))}
		</div>
	)
}

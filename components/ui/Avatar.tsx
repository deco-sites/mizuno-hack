import Button from '$store/components/ui/Button.tsx'
import Image from 'deco-sites/std/components/Image.tsx'
import type { JSX } from 'preact'

/**
 * This component renders the filter and selectors for skus.
 * TODO: Figure out a better name for this component.
 */

interface Abbreviation {
	variant: 'abbreviation'
	content: string
  available?: boolean
	imageSrc?: string
}

interface Color {
	variant: 'color'
	content: string
  available?: boolean
	imageSrc?: string
}

interface Idempotent {
	variant: 'idempotent'
	content: string
  available?: boolean
	imageSrc?: string
}

type Props =
	& JSX.IntrinsicElements['button']
	& (Abbreviation | Color | Idempotent)

function Avatar({ variant, content, imageSrc, class: _class = '', available = true, ...btnProps }: Props) {
	if (variant === 'color') {
		return (
			<button
				{...btnProps}
				class={`rounded-[5px] border border-default w-16 h-16 ${!available ? 'brightness-50' : ''} ${_class}`}
			>
				{imageSrc
					? <Image src={imageSrc} alt={content} title={content} width={64} height={64} />
					: content}
			</button>
		)
	}

	if (variant === 'abbreviation') {
		return (
			<button
				{...btnProps}
				class={`${!available ? 'brightness-50' : ''} text-sm font-medium border border-black w-8 h-8 flex justify-center items-center hover:bg-bg-200 transition-colors duration-300 disabled:bg-black disabled:text-white ${_class}`}
			>
				{content.substring(0, 2)}
			</button>
		)
	}

	return <button {...btnProps} class={_class}>{content}</button>
}

export default Avatar

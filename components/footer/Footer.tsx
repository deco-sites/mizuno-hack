import Icon from '$store/components/ui/Icon.tsx'
import Image from 'deco-sites/std/components/Image.tsx'
import { useSignal } from '@preact/signals'
import type { HTML } from 'deco-sites/std/components/types.ts'
import Newsletter from './Newsletter.tsx'
import type { Image as LiveImage } from 'deco-sites/std/components/types.ts'
export interface Link {
	title: string
	link: string
}

export interface Section {
	title: string
	items: {
		title: string
		link?: string
	}[]
}

export interface Props {
	leftLinks: Link[]
	sections: Section[]
	copyright: HTML
	newsletter: {
		image: LiveImage
	}
}

function Dropdown({ title, items }: Section) {
	const open = useSignal(false)

	return (
		<div class='flex flex-col border-b-2 border-white'>
			<button
				type='button'
				onClick={() => open.value = !open.value}
				class='font-black w-full px-6 py-4 flex items-center justify-between bg-bg-200 text-uppercase outline-none text-dark-blue focus:outline-none'
			>
				{title}
				<Icon
					id='ArrowDown'
					width={27}
					height={27}
					class={`${open.value === true ? 'transform rotate-180' : ''}`}
				/>
			</button>
			<div>
				{open.value
					? (
						<ul class='p-6 pt-0 flex flex-col justify-between bg-bg-200'>
							{items.map(({ title, link }) => (
								<li>
									{link
										? (
											<a href={link} class='text-footer-link'>
												{title}
											</a>
										)
										: <span class='text-footer-link'>{title}</span>}
								</li>
							))}
						</ul>
					)
					: null}
			</div>
		</div>
	)
}

function Mobile({ sections, copyright }: Pick<Props, 'sections' | 'copyright'>) {
	return (
		<div class='divide-bg-100 xl:hidden bg-bg-200'>
			{sections.map((section) => <Dropdown {...section} />)}
			<div class='flex flex-col mt-6 pb-3 border-none gap-y-8'>
				<div class='flex justify-center gap-x-7'>
					<Icon id='FooterFacebook' width={52} height={52} />
					<Icon id='FooterInstagram' width={52} height={52} />
				</div>
				<div class='flex justify-center items-center gap-x-2'>
					<Icon id='FooterVisa' width={42} height={25} />
					<Icon id='FooterAmericanExpress' width={42} height={25} />
					<Icon id='FooterMastercard' width={42} height={25} />
					<Icon id='FooterElo' width={42} height={25} />
					<Icon id='FooterExpressClub' width={42} height={25} />
					<Icon id='FooterPicpay' width={42} height={14} />
					<Icon id='FooterPix' width={42} height={14} />
				</div>
				<div class='flex justify-center items-center gap-x-2'>
					<Image
						src='https://mizunobr.vteximg.com.br/arquivos/logo-lets-encrypt.png'
						alt="Certificado Let's Encript"
						width={80}
						height={27}
					/>
					<Image
						src='https://files.catbox.moe/cd4csd.png'
						alt='Bom, reclame aqui'
						width={80}
						height={80}
					/>
				</div>
				<div class='flex justify-center items-center gap-x-2'>
					<Icon
						id='FooterVitrio'
						width={80}
						height={80}
					/>
					<Icon
						id='FooterVtex'
						width={80}
						height={80}
					/>
				</div>
			</div>
			<link
				href='https://cdn.quilljs.com/1.3.6/quill.snow.css'
				rel='stylesheet'
			>
			</link>
			<div
				class='bg-black text-[10px] text-center text-center py-2'
				dangerouslySetInnerHTML={{ __html: copyright }}
			/>
		</div>
	)
}

function Desktop({ leftLinks, sections, copyright }: Omit<Props, 'newsletter'>) {
	return (
		<div class='hidden xl:block bg-bg-200 '>
			<div class='w-full max-w-6xl mx-auto py-5'>
				<div class='flex space-x-12'>
					<ul>
						{leftLinks.map(({ title, link }) => (
							<li>
								<a
									href={link}
									class='text(footer-link dark-blue uppercase dark-blue [11px]) font-black'
								>
									{title}
								</a>
							</li>
						))}
					</ul>

					{sections.slice(0, 2).map(({ title, items }) => (
						<div class='flex flex-col bg-bg-200'>
							<h3 class='text(footer-link dark-blue uppercase dark-blue [11px]) font-black'>
								{title}
							</h3>
							<ul>
								{items.map(({ title, link }) => (
									<li>
										{link
											? (
												<a href={link} class='text-[11px]'>
													{title}
												</a>
											)
											: <span class='text-[11px]'>{title}</span>}
									</li>
								))}
							</ul>
						</div>
					))}

					<div class='flex flex-col gap-y-2'>
						{sections.slice(2).map(({ title, items }) => (
							<div class='flex flex-col bg-bg-200'>
								<h3 class='text(footer-link dark-blue uppercase dark-blue [11px]) font-black'>
									{title}
								</h3>
								<ul>
									{items.map(({ title, link }) => (
										<li>
											{link
												? (
													<a href={link} class='text-[11px] '>
														{title}
													</a>
												)
												: <span class='text-[11px]'>{title}</span>}
										</li>
									))}
								</ul>
							</div>
						))}
					</div>

					<div class='flex flex-col gap-y-5 max-w-[154px]'>
						<div>
							<h3 class='text(footer-link dark-blue uppercase dark-blue [11px]) font-black mb-3'>
								Siga a mizuno
							</h3>
							<div class='flex gap-x-7'>
								<Icon id='FooterFacebook' width={32} height={32} />
								<Icon id='FooterInstagram' width={32} height={32} />
							</div>
						</div>
						<div>
							<h3 class='text(footer-link dark-blue uppercase dark-blue [11px]) font-black mb-3'>
								Formas de pagamento
							</h3>
							<div class='flex flex-wrap gap-x-2 gap-y-3'>
								<Icon id='FooterVisa' width={42} height={25} />
								<Icon id='FooterAmericanExpress' width={42} height={25} />
								<Icon id='FooterMastercard' width={42} height={25} />
								<Icon id='FooterElo' width={42} height={25} />
								<Icon id='FooterExpressClub' width={42} height={25} />
								<Icon id='FooterPicpay' width={42} height={14} />
								<Icon id='FooterPix' width={42} height={14} />
							</div>
						</div>
					</div>

					<div class='flex flex-col max-w-[154px]'>
						<h3 class='text(footer-link dark-blue uppercase dark-blue [11px]) font-black mb-3'>
							Segurança
						</h3>
						<div class='flex flex-col gap-y-2'>
							<Image
								src='https://mizunobr.vteximg.com.br/arquivos/logo-lets-encrypt.png'
								alt="Certificado Let's Encript"
								width={80}
								height={27}
							/>
							<Image
								src='https://files.catbox.moe/cd4csd.png'
								alt='Bom, reclame aqui'
								width={80}
								height={80}
							/>
						</div>
						<div class='flex justify-center items-center gap-x-2'>
							<Icon
								id='FooterVitrio'
								width={80}
								height={80}
							/>
							<Icon
								id='FooterVtex'
								width={80}
								height={80}
							/>
						</div>
					</div>
				</div>
			</div>
			<div
				class='bg-black text-[13px] text-center text-center py-4'
				dangerouslySetInnerHTML={{ __html: copyright }}
			/>
		</div>
	)
}

export default function Footer({ leftLinks = [], sections = [], copyright, newsletter }: Props) {
	return (
		<div class='font-roboto'>
			<Newsletter image={newsletter.image} />
			<Desktop leftLinks={leftLinks} sections={sections} copyright={copyright} />
			<Mobile
				sections={sections}
				copyright={copyright}
			/>
		</div>
	)
}

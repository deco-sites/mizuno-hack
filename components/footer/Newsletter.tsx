import Image from 'deco-sites/std/components/Image.tsx'
interface Props {
	image: string
}

function Newsletter({ image = '' }: Props) {
	return (
		<div class='py-10 bg-bg-300 font-roboto'>
			<form class='mx-auto w-full grid grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] grid-rows-3 max-w-[430px] gap-2.5 text-sm xl:(flex justify-center items-center max-w-7xl)'>
				<Image
					src={image}
					width={320}
					height={40}
					class='col-span-2 xl:mr-4'
				/>

				<input
					type='text'
					placeholder='Digite aqui seu nome'
					class='h-11 px-4 bg-bg-200 text-input-text text-[.82rem] w-full outline-none placeholder::text-input-text xl:(w-[220px] h-8 text-[10px])'
				/>
				<input
					type='email'
					placeholder='Digite aqui seu email'
					class='row-start-3 h-11 px-4 bg-bg-200 text-input-text text-[.82rem] outline-none placeholder::text-input-text xl:(w-[220px] h-8 text-[10px])'
				/>
				<select class='h-11 px-4 bg-bg-200 text-input-text max-w-[174px] text-[.82rem] w-full outline-none xl:(w-[160px] h-8 text-[10px])'>
					<option disabled selected>Selecione seu gênero</option>
					<option>Masculino</option>
					<option>Feminino</option>
					<option>Prefiro não dizer</option>
				</select>
				<button
					type='button'
					class='bg-light-blue h-11 px-4 font-black text(white uppercase sm) max-w-[174px] text-[.82rem] w-full xl:(w-[154px] text-[10px] h-8)'
				>
					Receber novidades
				</button>
			</form>
		</div>
	)
}

export default Newsletter

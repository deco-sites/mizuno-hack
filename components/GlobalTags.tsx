import { asset, Head } from '$fresh/runtime.ts'

function GlobalTags() {
	return (
		<Head>
			{/* Icons */}
			<link
				rel='icon'
				type='image/png'
				sizes='32x32'
				href={asset('/favicon-32x32.png')}
			/>
			<link
				rel='icon'
				type='image/png'
				sizes='16x16'
				href={asset('/favicon-16x16.png')}
			/>
			<link
				rel='shortcut icon'
				type='image/x-icon'
				href={asset('/favicon-32x32.png')}
			/>

			{/* Web Manifest */}
			<link rel='manifest' href={asset('/site.webmanifest')} />
			<meta name='theme-color' content='#221E1F' />
			<meta name='msapplication-TileColor' content='#221E1F' />

			{
				/*
				 * Include fonts
				 * tip: It's always better copy fonts to the `/static/fonts` folder than serving from another
				 * domain since DNS resolution times can really affect performance.
				 */
			}
			<style
				dangerouslySetInnerHTML={{
					__html: `@font-face {
            font-family: 'Roboto';
            src: url('${asset('/fonts/roboto/Roboto-Medium.woff2')}') format('woff2'),
                url('${asset('/fonts/roboto/Roboto-Medium.woff')}') format('woff');
            font-weight: 500;
            font-style: normal;
            font-display: swap;
        }
        
        @font-face {
            font-family: 'Roboto';
            src: url('${asset('/fonts/roboto/Roboto-Regular.woff2')}') format('woff2'),
                url('${asset('/fonts/roboto/Roboto-Regular.woff')}') format('woff');
            font-weight: normal;
            font-style: normal;
            font-display: swap;
        }
        
        @font-face {
            font-family: 'Roboto';
            src: url('${asset('/fonts/roboto/Roboto-Bold.woff2')}') format('woff2'),
                url('${asset('/fonts/roboto/Roboto-Bold.woff')}') format('woff');
            font-weight: bold;
            font-style: normal;
            font-display: swap;
        }
				
				@font-face {
            font-family: 'Roboto';
            src: url('${asset('/fonts/roboto/Roboto-Bold.woff2')}') format('woff2'),
                url('${asset('/fonts/roboto/Roboto-Bold.woff')}') format('woff');
            font-weight: bold;
            font-style: normal;
            font-display: swap;
        }
				
				@font-face {
					font-family: 'Roboto';
					src: url('${asset('/fonts/roboto/Roboto-Black.woff2')}') format('woff2'),
							url('${asset('/fonts/roboto/Roboto-Black.woff')}') format('woff');
					font-weight: bold;
					font-style: normal;
					font-display: swap;
				}`,
				}}
			/>
		</Head>
	)
}

export default GlobalTags

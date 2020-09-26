<script>
	import Button from './common/Button.svelte';
	import Flex from './common/Flex.svelte';
</script>

<style lang="scss">
	.header {
		height: 80%;
		padding-top: 5%;
	}

	.hero {
		padding: 0 10%;
	}
	.awards {
		height: 20%;

		img {
			filter: grayscale(1);
			mix-blend-mode: multiply;
			max-height: 100px;
			height: 100%;
			padding: 20px 0;
		}
	}

	img {
		@apply h-full;
	}
</style>

<div class="w-full min-h-screen bg-gray-200 lg:h-screen md:h-auto hero">
	<Flex cols="true" justify="evenly" classes="w-full min-h-screen">
		<div class="header">
			<Flex wrap="true" align="center" classes="header md:auto lg:h-full">
				<div class="h-full md:w-full lg:w-1/3">
					<Flex justify="center" align="center" classes="w-full h-full">
						<div class="w-full">
							<h2 class="font-black text-blue-900">Städtisches Louise Schroeder Gymnasium München</h2>
							<p class="my-4 text-sm">
								Naturwissenschaftlich- technologisches und sprachliches Gymnasium
							</p>
							<Button buttonText="Aktuelle Termine" classes="w-56" />
							<p class="my-4 text-xs text-gray-800">Referenzschule der TU München</p>
						</div>
					</Flex>
				</div>
				<div class="h-full py-4 md:w-full lg:w-2/3 right lg:pl-10">
					<Flex justify="center" align="center" classes="w-full h-full overflow-hidden shadow-2xl rounded-lg">
						<img src="https://wallpaperaccess.com/full/14229.jpg" class="object-cover" alt="" />
					</Flex>
				</div>
			</Flex>
		</div>
		<div class="awards">
			<Flex wrap="true" justify="between" align="center" classes="w-full awards h-full">
				<img src="https://lsg.musin.de/homepage/images/LOGOsorsmc_SCREEN_80mm_RGB_mini.jpg" alt="" />
				<img src="https://lsg.musin.de/homepage/images/delf.jpg" alt="" />
				<img src="https://lsg.musin.de/homepage/images/cae.png" alt="" />
				<img src="https://lsg.musin.de/homepage/images/cils.png" alt="" />
				<img src="https://lsg.musin.de/homepage/images/KombiLogo.png" alt="" />
			</Flex>
		</div>
	</Flex>
</div>

<script>
	import { onMount } from 'svelte';
	import Flex from '../atoms/Flex.svelte';
	import Logo from '../atoms/Logo.svelte';
	import Section from '../atoms/Section.svelte';

	export const blueprint = {};

	function setListener() {
		const tags = document.querySelectorAll('.dropdown a');
		Object.keys(tags).forEach((key) => {
			tags[key].addEventListener('click', () => {
				const inputs = document.querySelectorAll('nav input[type = checkbox]');
				Object.keys(inputs).forEach((box) => {
					inputs[box].checked = false;
				});
			});
		});
	}

	onMount(() => {
		setListener();
	});
</script>

<style lang="scss">
	input {
		@apply hidden;
	}

	$expand-trans-duration: 0.3s;
	nav {
		word-break: normal;
		word-wrap: normal;

		@apply py-2;
		.menu-wrp {
			//mobile
			@apply opacity-0 top-0 w-full left-0 z-50 absolute pointer-events-none  bg-white rounded-lg shadow-equal-xl;
			//normal styling
			@apply lg:opacity-100 lg:w-auto lg:relative lg:z-auto lg:pointer-events-auto lg:rounded-none lg:shadow-none lg:bg-transparent;
			.menu {
				//mobile
				@apply flex-col flex relative;
				//normal styling
				@apply lg:flex-row align-middle;
			}
		}
		#nav-open:checked ~ .menu-wrp {
			@apply opacity-100 pointer-events-auto;
		}
	}

	.burger {
		height: 2px;
		width: 20px;

		&::after,
		&::before {
			content: '';
			width: 100%;
			height: 2px;
			@apply bg-black left-0 absolute;
		}

		&::before {
			top: -5px;
		}

		&::after {
			bottom: -5px;
		}
	}
</style>

<Section classes="dashedBottomBorder z-30">
	<nav class="w-full" id="nav">
		<Flex align="center" justify="between" classes="relative w-full">
			<Logo classes="mr-5" />
			<input id="nav-open" type="checkbox" />
			<div class="menu-wrp" id="menu-wrap">
				<div class="menu" id="menu">
					<label
						for="nav-open"
						class="absolute right-0 z-50 visible block w-10 h-10 p-2 cursor-pointer lg:hidden">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							enable-background="new 0 0 24 24"
							class="w-full h-full"
							viewBox="0 0 24 24"><g>
								<path d="M0,0h24v24H0V0z" fill="none"></path>
							</g>
							<g>
								<g>
									<path
										d="M18.3,5.71L18.3,5.71c-0.39-0.39-1.02-0.39-1.41,0L12,10.59L7.11,5.7c-0.39-0.39-1.02-0.39-1.41,0l0,0 c-0.39,0.39-0.39,1.02,0,1.41L10.59,12L5.7,16.89c-0.39,0.39-0.39,1.02,0,1.41l0,0c0.39,0.39,1.02,0.39,1.41,0L12,13.41l4.89,4.89 c0.39,0.39,1.02,0.39,1.41,0l0,0c0.39-0.39,0.39-1.02,0-1.41L13.41,12l4.89-4.89C18.68,6.73,18.68,6.09,18.3,5.71z"></path>
								</g>
							</g>
						</svg>
					</label>
					<slot />
				</div>
			</div>
			<label
				class="visible px-2.5 py-3.5 bg-gray-200 z-40 cursor-pointer rounded-2xl lg:hidden burger-wrp"
				for="nav-open">
				<div class="relative bg-black burger"></div>
			</label>
		</Flex>
	</nav>
</Section>

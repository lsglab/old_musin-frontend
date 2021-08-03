<script>
	export let title = 'Test';
	export let href = 'https://example.com';

	export let blueprint = {};

	export let component = {};

	function menuHover(e) {
		const event = new CustomEvent('menuHovered', { detail: { menu: component, target: e.target } });
		document.getElementById('nav').dispatchEvent(event);
	}
</script>

<style lang="scss">
	$expand-trans-duration: 0.3s;

	.dropdown {
		@apply relative cursor-pointer;

		p,
		a {
			@apply whitespace-nowrap;
		}

		p,
		> a {
			font-size: 0.65rem;
			@apply p-3 lg:text-xs lg:normal-case uppercase lg:font-normal font-bold;
		}

		> a {
			@apply lg:text-black w-3/4 text-gray-700 block;
		}

		label {
			@apply relative cursor-pointer flex flex-row items-center justify-between;
			> p {
				@apply lg:text-black text-gray-400;
			}

			> svg {
				@apply text-gray-400 fill-current block lg:hidden mr-20;
				transform: rotate(0deg);
				transition: $expand-trans-duration ease;
			}
		}

		> .items {
			@apply shadow-none max-h-0 overflow-hidden transition duration-300  bg-white;
			top: 95%;
			transition: $expand-trans-duration ease;
		}

		input:checked ~ .items {
			max-height: 1000px;
		}

		input:checked ~ label > svg {
			transform: rotate(90deg);
		}
	}
</style>

<div id="dropdown" class="dropdown">
	{#if component.initialized === false || (component.children && component.children.length > 0)}
		<input id="t-{component.id}" type="checkbox" class="hidden" />
		<label for="t-{component.id}" id="label" type="checkbox">
			<p
				link-content="{component.children.length > 0 ? 'true' : null}"
				on:mousemove="{component.children.length > 0 ? (e) => menuHover(e) : undefined}">
				{title}
			</p>
			<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path
					d="M0 0h24v24H0V0z"
					fill="none"></path>
				<path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"></path></svg>
		</label>
		<div class="items lg:hidden">
			<slot />
		</div>
	{:else}<a href="{href}">{title}</a>{/if}
</div>

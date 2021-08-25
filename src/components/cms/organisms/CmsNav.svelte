<script>
	import { onMount } from 'svelte';
	import Flex from '../../both/atoms/Flex.svelte';
	import Loading from '../atoms/Loading.svelte';
	import Logo from '../../both/atoms/Logo.svelte';
	import request from '../../../cms/Utils/requests';

	let groups;

	onMount(async () => {
		if (groups !== undefined) {
			return;
		}

		const token = sessionStorage.getItem('token') || localStorage.getItem('token');

		if (token === null) {
			window.location.replace('/auth/login');
		} else {
			sessionStorage.setItem('token', token);

			const res = await request(`${process.globals.apiUrl}/groups`, 'get', {}, true);
			groups = res.data.groups;
		}
	});
</script>

<style>
	.padding-x {
		@apply px-4;
	}
</style>

<div class="relative z-10 w-1/6 h-full shadow-lg">
	<div class="flex flex-row items-center w-full bg-gray-100 top-nav-height padding-x">
		<Logo link="/cms" />
	</div>
	{#if groups !== undefined}
		<div class="pt-4">
			{#each groups as group}
				{#if Object.keys(group.tables).length > 0}
					<div class="py-4">
						<p class="text-xs font-bold padding-x">{group.title}</p>
						<Flex cols="true">
							{#each Object.keys(group.tables) as key}
								<a
									sapper:prefetch
									class="text-black capitalize transition duration-75 padding-x text-xss hover:bg-gray-100 hover:border-l-1 border-cmsBtnColor"
									href="cms{group.links[key]}">{group.tables[key].table}</a>
							{/each}
						</Flex>
					</div>
				{/if}
			{/each}
		</div>
	{:else}
		<Flex classes="w-full h-full" justify="center" align="center">
			<Loading />
		</Flex>
	{/if}
</div>

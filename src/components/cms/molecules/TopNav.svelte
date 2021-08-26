<script>
	import { onMount } from 'svelte';
	import Button from '../atoms/Button.svelte';
	import Flex from '../../both/atoms/Flex.svelte';
	import Loading from '../atoms/Loading.svelte';
	import request from '../../../cms/Utils/requests';

	let user;

	let domLoaded = false;

	onMount(async () => {
		const storageUser = sessionStorage.getItem('user');

		if (storageUser === 'undefined' || storageUser == null || storageUser === undefined) {
			const res = await request('http://localhost:8000/api/auth/user', 'get', {}, true);

			if (!res.error) {
				user = res.data.user;
				sessionStorage.setItem('user', JSON.stringify(user));
			}
		}

		user = JSON.parse(sessionStorage.getItem('user'));
	});

	async function logOut() {
		const res = await request('http://localhost:8000/api/auth/logout', 'get', {}, true);

		if (!res.error) {
			localStorage.clear();
			sessionStorage.clear();
			window.location.replace('/auth/login');
		}
	}

	onMount(() => {
		domLoaded = true;
	});
</script>

<style>
	.margin-right {
		@apply mr-4;
	}
</style>

<Flex classes="top-nav-height shadow-md bg-white pl-4 pr-6 relative z-10" justify="between" align="center">
	<Flex classes="h-full py-3 w-3/4" align="center" justify="between">
		<slot />
	</Flex>
	<Flex classes="h-full" align="center" justify="center">
		<div class="margin-right">
			<a class="material-icons" href="{domLoaded ? window.location.href : '#'}">refresh</a>
		</div>
		{#if user !== undefined}
			<p class="text-xs margin-right">{user.name}</p>
			<Button color="bg-cmsErrorRed" buttonFunction="{logOut}">Logout</Button>
		{:else}
			<Loading diameter="8" />
		{/if}
	</Flex>
</Flex>

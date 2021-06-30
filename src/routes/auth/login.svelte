<script>
	import { onMount } from 'svelte';
	import Flex from '../../components/both/atoms/Flex.svelte';
	import Form from '../../components/both/molecules/Form.svelte';
	import Input from '../../components/both/molecules/Input.svelte';
	import Section from '../../components/frontend/atoms/Section.svelte';
	import request from '../../cms/Utils/requests';

	let error = '';
	let inputError = false;

	async function login() {
		const response = await request(
			`${process.globals.apiUrl}/auth/login`,
			'post',
			new FormData(document.getElementById('login-form'))
		);

		if (response.status === 400) {
			error = response.data.message;

			if (error === 'invalid_credentials') {
				error = '';
				inputError = 'Ungültige email Adresse oder Password';
			}
		} else {
			error = '';
			inputError = false;
			sessionStorage.clear();
			localStorage.clear();

			// save the token to local storage
			window.sessionStorage.setItem('token', response.data.token);
			window.sessionStorage.setItem('user', JSON.stringify(response.data.user));

			if (document.getElementById('remember').checked === true) {
				window.localStorage.setItem('token', response.data.token);
				window.localStorage.setItem('user', JSON.stringify(response.data.user));
			}

			// redirect to the cms page
			window.location.replace('/cms');
		}
	}

	onMount(() => {
		document.getElementById('login-form').addEventListener('submit', (e) => {
			e.preventDefault();
			login();
		});
	});
</script>

<a href="/cms" class="hidden" alt="">cms</a>
<Section classes="h-full">
	<Flex justify="center" align="center" classes="h-full">
		<Form classes="w-64" id="login-form" header="Login" subHeader="Bittle melden sie sich an" error="{error}">
			<Input
				error="{inputError}"
				classes="mb-3"
				placeholder="max.mustermann@gmail.com"
				type="email"
				id="email"
				name="email">
				Email
			</Input>
			<Input error="{inputError}" classes="mb-3" type="password" id="password" name="password">Passwort</Input>
			<Input
				type="radio"
				id="remember"
				classes="my-3"
				inputClasses="w-8 h-4"
				name="remember"
				labelPos="right"
				required="{false}">
				Eingeloggt bleiben
			</Input>
		</Form>
	</Flex>
</Section>

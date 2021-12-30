import ErrorDialog from '../components/cms/molecules/ErrorDialog.svelte';
import axios from 'axios';

export async function request(url, method, data, token) {
	axios.defaults.withCredentials = true;

	const config = {
		data,
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
		method,
		url,
	};

	if (token) {
		const bearer = sessionStorage.getItem('token');
		config.headers.Authorization = `Bearer ${bearer}`;
	}

	let error = false;
	let resData = {};
	let status;
	let res;

	try {
		res = await axios(config);

		if (token) {
			// set a new token when the current was refreshed by the server
			const currentToken = sessionStorage.getItem('token');
			const newToken = res.headers.authorization.split('Bearer ').pop();
			if (currentToken !== newToken) {
				sessionStorage.setItem('token', newToken);
			}
		}

		resData = res.data;
		status = 200;
	} catch (e) {
		error = true;
		// e.reponse is undefined if the error occured on this machine
		if (e.response) {
			status = e.response.status;
			resData = e.response.data;
		} else {
			resData = e;
		}
	}

	// temporary fix for laravel sending php notices with response.
	if (typeof resData === 'string') {
		const split = resData.split('>');
		resData = JSON.parse(split[split.length - 1]);
	}

	return {
		data: resData,
		error,
		status,
	};
}

export async function errorRequest(url, method, data, token, window) {
	const res = await request(url, method, data, token);

	if (res.status !== 200) {
		// eslint-disable-next-line no-new
		new ErrorDialog({
			props: {
				res,
			},
			target: window.document.getElementsByTagName('body')[0],
		});
	}

	return res;
}

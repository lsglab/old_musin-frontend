import axios from 'axios';

export default async function request(url, method, data, token) {
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

	const error = false;
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

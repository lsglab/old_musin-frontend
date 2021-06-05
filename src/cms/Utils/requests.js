import axios from 'axios';

export default async function request(url, method, data, token) {
	axios.defaults.withCredentials = true;

	const config = {
		data,
		headers: {
			'Content-Type': 'application/json',
		},
		method,
		url,
	};

	if (token) {
		const bearer = sessionStorage.getItem('token');
		config.headers.Authorization = `Bearer ${bearer}`;
	}

	try {
		const res = await axios(config);

		if (token) {
			const newToken = res.headers.authorization.split('Bearer ').pop();
			sessionStorage.setItem('token', newToken);
		}

		return {
			data: res.data,
			error: false,
			status: res.status,
		};
	} catch (e) {
		let status;
		let edata;
		// e.reponse is undefined if the error occured on this machine
		if (e.response) {
			status = e.response.status;
			edata = e.response.data;
		} else {
			edata = e;
		}

		return {
			data: edata,
			error: true,
			status,
		};
	}
}

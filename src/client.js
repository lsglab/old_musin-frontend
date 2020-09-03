// eslint-disable-next-line import/no-extraneous-dependencies
import * as sapper from '@sapper/app';
import './assets/styles/tailwind.css';

sapper.start({
	target: document.querySelector('#app'),
});

// eslint-disable-next-line import/no-extraneous-dependencies
import * as sapper from '@sapper/app';

sapper.start({
	target: document.querySelector('#app'),
});

window.addEventListener('load', () =>
	document.querySelectorAll('a[href^="http"]').forEach((el) => {
		el.setAttribute('target', '_blank');
	})
);

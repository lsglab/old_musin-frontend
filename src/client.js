// eslint-disable-next-line import/no-extraneous-dependencies
import * as sapper from '@sapper/app';
import smoothscroll from 'smoothscroll-polyfill';

sapper.start({
	target: document.querySelector('#app'),
});

smoothscroll.polyfill();

import * as sapper from '@sapper/app';
import smoothscroll from 'smoothscroll-polyfill';

sapper.start({
	target: document.querySelector('#app'),
});

// Polyfill the smooth-scroll css value for old browsers
smoothscroll.polyfill();

// Load SystemJS for polyfilled/legacy scripts
if (!window.Promise || ![].includes || !Object.assign || !window.Map || !window.fetch) {
	const systemjsScript = document.createElement('script');
	systemjsScript.crossOrigin = 'anonymous';
	systemjsScript.src = 'https://unpkg.com/systemjs/dist/s.min.js';
	document.head.appendChild(systemjsScript);
}

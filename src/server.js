import * as sapper from '@sapper/server';
import compression from 'compression';
import globals from './globals';
import polka from 'polka';
import sirv from 'sirv';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

polka()
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware({
			session: () => ({
				globals,
			}),
		})
	)
	.listen(PORT, (err) => {
		if (err) console.log('error', err);
	});

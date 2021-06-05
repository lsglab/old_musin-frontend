import Base from './Base';

export default class Img extends Base {
	constructor(placeholder = 'https://www2.tuhh.de/zll/wp-content/uploads/placeholder.png') {
		super(placeholder);
		this.type = 'img';
	}
}

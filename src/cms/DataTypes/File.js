import Base from '../Base';

export default class File extends Base {
	constructor(object) {
		super();
		this.assign(object, 'id');
		this.assign(object, 'description');
		this.assign(object, 'name');
		this.assign(object, 'path');
		this.assign(object, 'type');
		this.assign(object, 'size');
		this.assign(object, 'created_by');
		this.assign(object, 'created_at');
		this.assign(object, 'updated_at');
		this.assign(object, 'file');
	}
}

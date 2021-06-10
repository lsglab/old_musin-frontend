import Column from './column';

export default class Relation extends Column {
	constructor(object) {
		super(object);
		this.assign(object, 'foreignTable');
		this.assign(object, 'relationType');
		this.assign(object, 'functionName');
		this.assign(object, 'baseType');
	}
}

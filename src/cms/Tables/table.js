import Base from '../Base';
import Column from './Columns/column';
import Relation from './Columns/relation';

export default class Table extends Base {
	constructor(object) {
		super();
		this.assign(object, 'name');
		this.assign(object, 'plural');
		this.assign(object, 'table');
		this.assign(object, 'parent');
		this.assign(object, 'children');
		this.assign(object, 'permissions');
		this.createColumns(object.columns);
		this.createRelations(object.relations);
	}

	createColumns(columns) {
		this.columns = [];
		columns.forEach((element) => {
			this.columns.push(new Column(element));
		});
	}

	createRelations(relations) {
		this.relations = [];
		relations.forEach((element) => {
			this.relations.push(new Relation(element));
		});
	}

	getAll() {
		return this.columns.concat(this.relations);
	}

	arrayIsNull(array) {
		if (array === undefined) {
			return this.getAll();
		}
		return array;
	}

	getVisible(array) {
		const data = this.arrayIsNull(array);
		return data.filter((ele) => ele.hidden === false);
	}

	getHidden(array) {
		const data = this.arrayIsNull(array);
		return data.filter((ele) => ele.hidden === true);
	}

	getFillable(array) {
		const data = this.arrayIsNull(array);
		return data.filter((ele) => ele.fillable === true);
	}

	getIdentifiers(array) {
		const data = this.arrayIsNull(array);
		return data.filter((ele) => ele.identifier === true);
	}

	getTableColumns(array) {
		const data = this.arrayIsNull(array);
		return data.filter((ele) => {
			if (ele.type === 'relation') {
				return ele.baseType === 'belongs_to';
			}
			return true;
		});
	}

	getNoDefaults(array) {
		const data = this.arrayIsNull(array);
		return data.filter((ele) => {
			return ele.type !== 'timestamp' && ele.type !== 'id' && ele.name !== 'creator_id';
		});
	}

	getDisplayValue(array) {
		const data = this.arrayIsNull(array);
		const find = data.find((ele) => ele.isDisplayValue === true);
		if (find === undefined) {
			return 'id';
		}
		return find.name;
	}

	getPermissions(ID) {
		function getSelfPermission(permission, id) {
			if (permission === false) {
				return false;
			}
			if (id === undefined) {
				return true;
			}
			return permission.includes(id);
		}

		let id = ID;

		if (id !== undefined) id = parseInt(id, 10);

		const read =
			getSelfPermission(this.permissions.read, id) || getSelfPermission(this.permissions['read-self'], id);
		const edit =
			getSelfPermission(this.permissions.edit, id) || getSelfPermission(this.permissions['edit-self'], id);
		const canDelete =
			getSelfPermission(this.permissions.delete, id) || getSelfPermission(this.permissions['delete-self'], id);
		const { create } = this.permissions;

		const data = { create, delete: canDelete, edit, read };
		return data;
	}

	getReadOnly(id) {
		const permissions = this.getPermissions(id);

		if (id === 'new') {
			return !permissions.create;
		}
		return !permissions.edit;
	}

	modifyData(ele) {
		let data = ele;
		this.getAll().forEach((column) => {
			data = column.modifyData(data);
		});
		return data;
	}
}

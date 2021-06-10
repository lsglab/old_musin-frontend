export default class Base {
	assign(object, key) {
		if (key in object) {
			this[key] = object[key];
		}
	}
}

/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
import _ from 'lodash';

function changes(object, base) {
	return _.transform(object, (result, value, key) => {
		if (!_.isEqual(value, base[key])) {
			result[key] = _.isObject(value) && _.isObject(base[key]) ? changes(value, base[key]) : value;
		}
	});
}

export function difference(object, base) {
	return changes(object, base);
}

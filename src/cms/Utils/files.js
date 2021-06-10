export default function sizeToString(size) {
	const kilobyte = 1000;
	const megabyte = 1000000;
	const gigabyte = 1000000000;

	if (size / kilobyte >= 1) {
		return `${(size / kilobyte).toFixed(2)} KB`;
	}
	if (size / megabyte >= 1) {
		return `${(size / megabyte).toFixed(2)} MB`;
	}

	if (size / gigabyte >= 1) {
		return `${(size / megabyte).toFixed(2)} GB`;
	}

	return '';
}

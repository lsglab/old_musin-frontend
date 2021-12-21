<script>
	export let href = 'https://example.com';
	export let title = 'Item Test';

	export const blueprint = {};
</script>

<style lang="scss">
	* {
		@apply px-3 py-2 lg:py-1.5 lg:px-2;
	}

	a {
		@apply w-full block text-xs lg:text-xsss text-gray-800;
		text-decoration: none;
		transition: 0.2s ease;
		&:nth-child(even) {
			@apply bg-gray-50 lg:bg-white;
		}

		&:hover {
			@apply bg-gray-200;
		}
	}
</style>

<a href="{href}">{title}</a>

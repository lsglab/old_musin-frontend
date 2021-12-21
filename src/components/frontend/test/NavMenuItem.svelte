<script>
	export let href = 'https://example.com';
	export let title = 'Item Test';

	export const blueprint = {};
</script>

<style lang="scss">
	* {
		@apply px-3 py-2;
	}

	a {
		@apply w-full block text-xs text-gray-800;
		text-decoration: none;
		transition: 0.2s ease;
		&:nth-child(even) {
			@apply bg-gray-50;
		}
	}
</style>

<a href="{href}">{title}</a>

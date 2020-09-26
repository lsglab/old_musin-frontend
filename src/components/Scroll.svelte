<script>
	export let target = '';
	export let classes = '';
</script>

<style lang="scss">
	a {
		top: calc(100vh - (100vh - 100%) * 0.75);
	}
</style>

<a href="#{target}" class="absolute left-1/2 {classes}">
	<svg
		class="w-6 h-6 text-gray-100 animate-bounce"
		fill="none"
		stroke-linecap="round"
		stroke-linejoin="round"
		stroke-width="2"
		viewBox="0 0 24 24"
		stroke="currentColor">
		<path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
	</svg>
</a>

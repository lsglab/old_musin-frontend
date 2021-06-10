<script>
	export let classes = '';
	export let background = 'cmsBtnColor';
	export let title = '';
	export let optFunction = () => {};
</script>

<div
	title="{title}"
	on:click="{optFunction}"
	class="{classes} relative duration-75 hover:bg-{background} w-5 z-10 h-5 m-0.5 leading-5 text-center bg-white rounded-sm cursor-pointer material-icons text-xss">
	<slot />
</div>

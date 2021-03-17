<script>
	import SearchBox from '../atoms/searchBox.svelte';

	export let placeholder;
	export let id = 'id';
</script>

<SearchBox classes="w-40">
	<input
		id="{id}"
		class="w-full mx-2 text-xs text-gray-500 outline-none date-picker md:text-xss"
		type="text"
		onfocus="(this.type='date')"
		onblur="(this.type='text')"
		placeholder="{placeholder}" />
	<div class="flex items-center h-full pl-2 pr-1 border-l border-gray-200 border-solid">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="fill-current text-btnBlue"
			height="24"
			viewBox="0 0 24 24"
			width="24"><path d="M0 0h24v24H0z" fill="none"></path>
			<path
				d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V8h16v13z"></path></svg>
	</div>
</SearchBox>

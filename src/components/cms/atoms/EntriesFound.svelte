<script>
	export let tableName;
	export let length = 0;
	export let classes = '';
</script>

<div class="{classes}">
	<h5 class="capitalize">{tableName}</h5>
	<p class="m-0 text-gray-600 text-xss">{length} Einträge gefunden</p>
</div>

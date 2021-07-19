<script>
	import DialogButton from '../components/cms/molecules/DialogButton.svelte';
</script>

<DialogButton
	dialogText="Test test l;schensdfj;alskdfj;alskdjaf;lkajsdf"
	buttonFunction="{() => {
		console.log('Confirmed');
	}}">
	<div slot="button" class="text-xss">Löschen</div>
</DialogButton>

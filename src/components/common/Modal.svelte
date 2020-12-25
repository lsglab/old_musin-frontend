<script>
	export let id;
	export let title;
	// footer text
	export let footer;
</script>

<!--
	@component
	Provides an animated modal with header, content and footer sections.
-->
<style lang="scss">
	.modal {
		display: none;
		position: fixed;
	}
	.modal-header div:hover {
		cursor: pointer;
	}
	.modal-content {
		position: relative;
		overflow: auto;
		display: block;
	}
	hr {
		border: 2px solid;
		opacity: 0.3;
	}
</style>

<div id="{id}" class="modal w-full h-full">
	<div class="modal-header">
		<p>{title}</p>
		<div><i class="fa fa-times container" aria-hidden="true"></i></div>
	</div>
	<hr />
	<div class="modal-content">
		<slot />
	</div>
	<hr />
	<div class="modal-footer">
		<p>{footer}</p>
	</div>
</div>

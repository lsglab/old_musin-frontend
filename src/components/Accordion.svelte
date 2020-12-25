<script>
	export let title;
	export let id;
</script>

<!--
	@component
	Provides an animated accordion with title.
-->
<style lang="scss">
	.accordion {
		transition: 0.2;
	}

	.accordion input[type='checkbox'] {
		display: none;
	}

	.accordion-content {
		max-height: 0;
		overflow: hidden;
	}

	.accordion input:checked ~ .accordion-content {
		animation-name: accordion-extend;
		animation-duration: 1s;
		animation-fill-mode: forwards;
	}

	@keyframes accordion-extend {
		0% {
			max-height: 0;
		}
		99% {
			max-height: 100vh;
		}
		100% {
			max-height: none;
		}
	}
	hr {
		border: 2px solid;
		opacity: 0.3;
	}

	label {
		cursor: pointer;
	}
</style>

<div class="accordion m-2">
	<input id="accordion-{id}" type="checkbox" />
	<label for="accordion-{id}">{title}</label>
	<hr />
	<div class="accordion-content">
		<slot />
	</div>
</div>

<script>
	export let name = '';
	export let id;

	export let typeAction;
	export let configAction;
	// a start value
	export let value;
	export let classes = '';
	export let autocomplete = '';
	export let readonly = false;
</script>

<style lang="scss">
	.switch {
		& > .slider::before {
			width: 42%;
			height: 80%;
			transform: translateY(-50%);
			content: '';
			border-radius: 50%;
			top: 50%;
			left: 8%;
			@apply duration-100 bg-white absolute;
		}

		& > input {
			height: 0;
			width: 0;
			opacity: 0;

			&:checked + .slider {
				@apply bg-btnBlue;
			}

			&:focus + .slider {
				box-shadow: 0 0 1px #2196f3;
			}

			&:checked + .slider::before {
				-webkit-transform: translate(100%, -50%);
				-ms-transform: translate(100%, -50%);
				transform: translate(100%, -50%);
			}
		}
	}

	.readonly {
		@apply pointer-events-none;
	}

	.visible {
		@apply pointer-events-auto opacity-100;
	}
</style>

<label for="{id}" class="relative inline-block {classes} cursor-pointer switch {readonly ? 'input-readonly' : ''}">
	<input
		use:typeAction
		use:configAction
		type="checkbox"
		id="{id}"
		on:blur
		on:input
		bind:checked="{value}"
		name="{name}"
		autocomplete="{autocomplete}" />
	<span class="absolute inset-0 bg-gray-200 rounded-2xl slider transition-100"></span>
</label>

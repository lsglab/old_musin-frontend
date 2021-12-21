<script>
	export let classes = '';
	export let diameter = '12';
	export let color = 'black';
</script>

<style lang="scss">
	/* stylelint-disable at-rule-no-unknown -- Styleint cant deal with for syntax in scss */
	.object {
		@apply w-full h-full absolute inset-0 m-auto rounded-full;
		border: 0.2rem solid transparent;
		border-top-color: var(--color);
		animation: spin 1s ease infinite;

		@for $i from 1 through 5 {
			&:nth-child(#{$i}) {
				opacity: calc(0.2 * #{$i});
				animation-delay: calc(0.4s - 0.1s * #{$i});
			}
		}
	}

	@keyframes spin {
		100% {
			transform: rotate(360deg);
		}
	}
</style>

<div class="loading relative {classes} h-{diameter} w-{diameter}" style="--color: {color};">
	<span class="object"></span>
	<span class="object"></span>
	<span class="object"></span>
	<span class="object"></span>
	<span class="object"></span>
</div>

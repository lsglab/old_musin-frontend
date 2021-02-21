<script>
	export let html;
</script>

<style lang="scss">
	.dynamic-html {
		:global(li) {
			font-size: 1rem;
			padding: 4px;
			line-height: 1.36;
		}

		:global(figure) {
			margin: 50px auto;
		}

		:global(img) {
			max-width: 100%;
		}

		:global(table) {
			border-collapse: collapse;
		}
		:global(th) {
			word-break: keep-all;
			hyphens: none;
			background-color: #f5f8fd;
			font-weight: 600;
		}

		:global(td, th) {
			border: 1px solid black;
			text-align: center;
			vertical-align: middle;
			@apply p-2;
		}

		:global(blockquote) {
			border-left: 5px #ccc solid;
			margin: 0;
			padding-left: 20px;
		}

		@media (max-width: 500px) {
			:global(th) {
				hyphens: auto;
				word-break: break-word;
			}
		}
	}
</style>

<!--
	@component
	Provides styling for long text passages with images, tables etc..
-->
<div class="dynamic-html">
	{@html html}
</div>

<script>
	export let html;
</script>

<style lang="scss">
	// div :global(div) {
	// 	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell',
	// 		'Open Sans', 'Helvetica Neue', sans-serif;
	// }

	div {
		:global(a) {
			text-decoration: none;
		}
		:global(p) {
			font-weight: 400;
			letter-spacing: normal;
			font-size: 1rem;
			line-height: 1.56;
		}

		:global(h2) {
			font-weight: 400;
		}

		:global(h3) {
			font-weight: 400;
		}

		:global(h4) {
			font-weight: 400;
		}

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

		:global(td) {
			border: 1px solid black;
			text-align: center;
			vertical-align: middle;
			padding: 10px;
		}
		:global(th) {
			word-break: keep-all;
			hyphens: none;
			border: 1px solid black;
			background-color: #f5f8fd;
			font-weight: 600;
			text-align: center;
			vertical-align: middle;
			padding: 10px;
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
<div>
	{@html html}
</div>

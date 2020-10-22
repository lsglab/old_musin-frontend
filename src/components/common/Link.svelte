<script>
	/** The URL that the hyperlink points to :O */
	export let href = '#';
	export let content = 'fallback';
	const regex = /^(?:https?:\/\/)?[0-9A-Za-z-]{2,65}(?!\.html)(?:\.[a-z]{1,10}){1,2}\/?.*/; // matches most outgoing http urls
	const outgoing = regex.test(href);
</script>

<!--
	@component
	A Uniform Resource Locator (URL) is a reference to a web resource that specifies its location on a computer network and a mechanism for retrieving it.
	The <a> tag defines a hyperlink, which can be used to link from one web page to another.
-->
<a
	href="{href}"
	class="{outgoing ? '' : 'arrow'} emphasize"
	target="{outgoing ? '_blank' : '_self'}"
	rel="{outgoing ? 'external noopener noreferrer' : 'prefetch'}">
	<slot>{content}</slot>
</a>

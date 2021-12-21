<script>
	/** The URL that the hyperlink points to :O */
	export let id = '';
	export let href = '#';
	export let classes = '';
	export let noArrow = false;

	const regex = /^(?:https?:\/\/)?[0-9A-Za-z-]{2,65}(?!\.html)(?:\.[a-z]{1,10}){1,2}\/?.*/; // matches most outgoing http urls
	const outgoing = regex.test(href);
</script>

<!--
	@component
	A Uniform Resource Locator (URL) is a reference to a web resource that specifies its location on a computer network and a mechanism for retrieving it.
	The <a> tag defines a hyperlink, which can be used to link from one web page to another.
-->
<a
	id='{id}'
	href="{href}"
	class="{!outgoing && noArrow === false ? 'arrow' : ''} relative emphasize text-sm {classes}"
	target="{outgoing ? '_blank' : '_self'}"
	rel="{outgoing ? 'external noopener noreferrer' : 'prefetch'}">
	<slot></slot>
</a>

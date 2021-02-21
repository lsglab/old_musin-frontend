<script>
	import Button from '../components/atoms/Button.svelte';
	import Section from '../components/atoms/Section.svelte';

	function getFontSize() {
		const style = window.getComputedStyle(document.getElementById('text')).fontSize;

		console.log('style', style);
	}
</script>

<Section classes="py-40">
	<p id="text">
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, error? Ex laborum consequatur ullam, molestias
		nobis deserunt commodi omnis illum rerum. Optio neque ipsum quod ipsam minus voluptates sed consectetur?
	</p>
	<Button buttonText="Get font size" buttonFunction="{getFontSize}" />
</Section>

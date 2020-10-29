<script>
	/** Additional classes to pass in */
	export let classes;
</script>

<!--
    @component
    Provides a responsive multi-purpose universal card container with three sections.
-->

<div class="overflow-hidden bg-gray-300 shadow-lg rounded-md px-2 {classes}">	
	<!--Card header section-->
	<slot name="header"/>
	<!--Card body section--> 
	<slot name="body"/>
	<!--Card footer section-->
	<slot name="footer"/>
</div>

<script>
	/** Additional classes to pass in */
	export let classes;
</script>

<!--
    @component
    Provides a resonsive multi-purpose card container with variable number of segments.
-->

<div class="overflow-hidden bg-gray-300 shadow-lg rounded-md p-1  {classes}">	
	<!--Card header section-->
	<slot name="header"/>

	<!--Card body section--> 
	<slot name="body"/>
	<!--Card footer section-->
	<slot name="footer"/>
</div>

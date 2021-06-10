<script>
	import Calender from '../components/frontend/molecules/Calender.svelte';
	import DatePicker from '../components/both/atoms/datePicker.svelte';
	import Flex from '../components/both/atoms/Flex.svelte';
	import SearchBox from '../components/frontend/atoms/searchBox.svelte';
	import Section from '../components/frontend/atoms/Section.svelte';
</script>

<div style="margin-top: -80px; padding-top:80px; margin-bottom:80px">
	<Section classes="py-10" fullscreen="true">
		<Flex wrap="true">
			<SearchBox classes="w-60">
				<div>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="w-5 h-5 text-gray-500 fill-current"
						height="24"
						viewBox="0 0 24 24"
						width="24"><path d="M0 0h24v24H0z" fill="none"></path>
						<path
							d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></svg>
				</div>
				<input
					class="w-full ml-2 text-xs text-gray-500 outline-none md:text-xss"
					type="text"
					placeholder="Search by title" />
			</SearchBox>
			<DatePicker placeholder="Startdatum wählen" id="start" />
			<DatePicker placeholder="Enddatum wählen" id="end" />
		</Flex>
		<Calender classes="w-full" />
	</Section>
</div>

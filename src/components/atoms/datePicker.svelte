<script>
	import { createEventDispatcher, onMount } from 'svelte';
	import Flex from './Flex.svelte';
	import SearchBox from './searchBox.svelte';

	const dispatch = createEventDispatcher();
	// placeholder of the input. Default Value is: Datum wählen
	export let placeholder = 'Datum wählen';
	// id of the date picker. must be provided
	export let id;

	let inputContainer;
	let datePicker;
	const datePickerId = `datepicker-${id}`;

	let visible = false;
	// the actual text in the input
	let text = placeholder;

	let today = new Date();
	// get the current year and month
	let year = today.getFullYear();
	let current = today.getMonth();
	today = new Date(year, current, today.getDate());

	let months;
	// default value of selected is -1 --> nothing is selected
	let selected = -1;

	const weekdays = [];

	function calculateWeekDayNames() {
		for (let i = 1; i < 8; i += 1) {
			const name = new Date(2021, 2, i).toLocaleString('default', { weekday: 'narrow' });

			weekdays.push(name);
		}
	}

	function calculateMonths() {
		months = [];
		// loop through all 12 months and save their max date and name in an object
		for (let i = 1; i <= 12; i += 1) {
			const month = new Date(year, i, 0);
			const name = month.toLocaleString('default', { month: 'long' });
			const max = month.getDate();

			months.push({ max, name });
		}
		months.forEach((ele, i) => {
			months[i].days = [];
			// get which day of the week the first day of the current month is
			let day = new Date(year, i, 1).getDay();
			// set the date value of sunday to 7 (default is 0)
			day = day === 0 ? 7 : day;
			// get how many days are between monday and the first day of the month
			const difference = Math.abs(1 - day);
			// the previous month
			const previous = i - 1 < 0 ? months.length - 1 : i - 1;
			// add dates from the previous month till monday is reached
			for (let j = months[previous].max; j > months[previous].max - difference; j -= 1) {
				months[i].days.unshift({ date: j, month: previous });
			}
			// add all the days from the current month
			for (let j = 1; j <= months[i].max; j += 1) {
				months[i].days.push({ date: j, month: i });
			}

			let date = 1;
			// get the next month
			const next = i + 1 > 11 ? 0 : i + 1;
			// add dates to till the list length is 42 (42 days per month is the minimun amount needed)
			while (months[i].days.length < 42) {
				months[i].days.push({ date, month: next });
				date += 1;
			}
			// now add the id parameter to every object. It is just the time of this day in milliseconds
			months[i].days.forEach((_, j) => {
				months[i].days[j].id = new Date(year, months[i].days[j].month, months[i].days[j].date).getTime();
			});
		});
	}

	function changeCurrent(change) {
		if (current + change > months.length - 1 || current + change < 0) {
			// increase or decrease in year --> recalculate everything
			year += change;
			calculateMonths();
			// set the current month
			current = Math.abs(current - 11);
		} else {
			current += change;
		}
	}

	function select(eleId) {
		// if one date was clicked twice set selected to -1 (nothing)
		selected = selected === eleId ? -1 : eleId;
		// if it is -1 the text of the input is the given default placeholder
		if (selected === -1) {
			text = placeholder;
			// else it is the selected date as date string
		} else {
			text = new Date(selected).toLocaleDateString();
		}
		// dispatch the on:select event that includes the selected date (in milliseconds)
		dispatch('select', {
			date: selected,
		});

		visible = false;
	}

	function changeVisibility() {
		visible = !visible;
	}

	calculateMonths();
	calculateWeekDayNames();

	function mouseclick(e) {
		// if the mousclick was not on the input or the date picker, set the visibility to false
		if (!e.composedPath().includes(datePicker) && !e.composedPath().includes(inputContainer)) {
			visible = false;
		}
	}

	let x0;
	let touched;
	function lock(e) {
		x0 = e.clientX || e.touches[0].clientX;

		console.log('x0', x0);

		touched = true;
	}

	// function drag(e) {}

	function move(e) {
		if (touched) {
			const x1 = e.clientX || e.changedTouches[0].clientX;

			if (Math.abs(x1 - x0) > 80) {
				if (x1 > x0) {
					changeCurrent(-1);
				} else {
					changeCurrent(1);
				}
			}

			touched = false;
		}
	}

	function addListeners() {
		const picker = document.getElementById(datePickerId);

		picker.addEventListener('mousedown', lock, false);
		picker.addEventListener('touchstart', lock, false);

		picker.addEventListener('mouseup', move, false);
		picker.addEventListener('touchend', move, false);
	}

	onMount(() => {
		addListeners();
	});
</script>

<style lang="scss">
	.arrow {
		@apply bg-arrowIcon h-6 w-6 bg-no-repeat bg-cover bg-center cursor-pointer;
	}

	#left {
		transform: rotate(180deg);
	}

	.visible {
		@apply pointer-events-auto opacity-100;
	}

	.box {
		.body {
			p {
				@apply text-xs font-bold rounded-md;
			}

			.days p,
			.container {
				@apply w-8 h-8;
			}

			.container {
				transition: 0.2s;

				p {
					@apply inline-block align-middle leading-normal;
				}
			}

			.not-selected:hover {
				background-color: #d6eefb;
			}

			.days p {
				@apply uppercase text-lightBlue text-center;
			}

			.gray {
				@apply text-gray-400;
			}
		}
	}
</style>

<svelte:window on:click="{mouseclick}" />

<div class="relative w-auto">
	<div bind:this="{inputContainer}" on:click="{changeVisibility}">
		<SearchBox classes="w-10/12 sm:w-40">
			<input
				id="{id}"
				class="w-full mx-2 text-xs text-gray-500 outline-none date-picker md:text-xss"
				type="text"
				readonly
				placeholder="{text}" />
			<div class="flex items-center h-full pl-2 pr-1 border-l border-gray-200 border-solid">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="cursor-pointer fill-current text-btnBlue"
					height="24"
					viewBox="0 0 24 24"
					width="24"><path d="M0 0h24v24H0z" fill="none"></path>
					<path
						d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V8h16v13z"></path></svg>
			</div>
		</SearchBox>
	</div>

	<div
		bind:this="{datePicker}"
		class="absolute z-40 p-3 bg-white rounded-lg opacity-0 pointer-events-none inset-top-full box shadow-equal-xl"
		id="{datePickerId}"
		class:visible>
		<Flex justify="between">
			<div
				id="left"
				class="arrow"
				on:click="{() => {
					changeCurrent(-1);
				}}"></div>
			<p id="month" class="font-bold">{months[current].name} {year}</p>
			<div
				id="right"
				class="arrow"
				on:click="{() => {
					changeCurrent(1);
				}}"></div>
		</Flex>
		<div class="mt-2 body">
			<div class="mt-4 -mb-2 days">
				<Flex>
					{#each weekdays as weekday}
						<p>{weekday}</p>
					{/each}
				</Flex>
			</div>
			<div>
				{#each Array(months[current].days.length / 7) as _, i}
					<Flex>
						{#each Array(7) as _, j}
							<div
								class="container text-center rounded-md cursor-pointer {selected === months[current].days[i * 7 + j].id ? 'bg-lightBlue text-white' : 'not-selected'} {today.getTime() === months[current].days[i * 7 + j].id ? 'bg-gray-200' : ''}"
								on:click="{() => {
									select(months[current].days[i * 7 + j].id);
								}}">
								<p
									class="{months[current].days[i * 7 + j].month !== current ? 'gray' : ''} cursor-pointer ">
									{months[current].days[i * 7 + j].date}
								</p>
							</div>
						{/each}
					</Flex>
				{/each}
			</div>
		</div>
	</div>
</div>

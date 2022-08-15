<script lang="ts">
	import { InputType } from '$lib/enums/input-type';
	import { stations } from '$lib/irail-service';
	import { clickOutside } from '../directives/click-outside';

	export let title: string;
	export let placeholder: string;
	export let forIdName: string;
	export let type: InputType;

	export let value: string;

	let isFocused: boolean = false;

	let input: HTMLInputElement;

	function focus() {
		isFocused = true;
	}
	function blur() {
		isFocused = false;
		//properly remove focus if perform drag and drop from the text input
		input?.blur();
	}

	$: filteredstations = $stations?.station
		?.filter(
			(s) =>
				s.name.toLowerCase().startsWith(value.toLowerCase()) ||
				s.name.toLowerCase().includes(value.toLowerCase())
		)
		.sort(
			(a, b) =>
				+b.name.toLowerCase().startsWith(value.toLowerCase()) -
				+a.name.toLowerCase().startsWith(value.toLowerCase())
		);
	/*.filter((s) => s.name.startsWith(value.charAt(0).toUpperCase() + value.slice(1)))
		.sort()
		.concat(
			$stations?.station?.filter((s) => s.name.toLowerCase().includes(value.toLowerCase())).sort()
		);*/
</script>

<div
	class=" p-2 border-b-2 mt-1 {isFocused
		? 'bg-white border-gray-300 rounded-t-md'
		: 'border-[#ddf1fa] rounded-none'}"
>
	<label
		class="block text-sm {isFocused ? 'text-[#38b6ff]' : 'text-[#ddf1fa]'}"
		for={forIdName}
		use:clickOutside={() => {
			blur();
		}}
	>
		{title}

		{#if type === InputType.Text}
			<input
				class="text-lg w-full bg-transparent {isFocused
					? 'text-[#3a3a3a] placeholder:text-gray-300 outline-none'
					: 'text-[#ddf1fa] placeholder:text-[#ddf1fa]'}"
				id={forIdName}
				name={forIdName}
				type="text"
				{placeholder}
				on:focus={() => {
					focus();
				}}
				bind:this={input}
				bind:value
			/>
			{#if isFocused && filteredstations}
				<div
					class="p-2 bg-white divide-y-2 border-gray-300 text-[#3a3a3a] text-lg max-h-28 overflow-auto rounded-b-lg"
				>
					{#each filteredstations as station}
						<button
							class=" block w-full text-left"
							on:click|preventDefault={() => {
								value = station.name;
								blur();
							}}
						>
							{station.name}
						</button>
					{/each}
				</div>
			{/if}
		{:else if type === InputType.Date}
			<input
				class="text-lg w-full bg-transparent focus:text-[#3a3a3a] focus:placeholder:text-gray-300 focus:outline-none
				text-[#ddf1fa] placeholder:text-[#ddf1fa]"
				id={forIdName}
				name={forIdName}
				type="date"
				{placeholder}
				on:focus={focus}
				on:blur={blur}
				bind:value
				bind:this={input}
			/>
		{:else if type === InputType.Time}
			<input
				class="text-lg w-full bg-transparent focus:text-[#3a3a3a] focus:placeholder:text-gray-300 focus:outline-none
				text-[#ddf1fa] placeholder:text-[#ddf1fa]"
				id={forIdName}
				name={forIdName}
				type="time"
				{placeholder}
				on:focus={focus}
				on:blur={blur}
				bind:value
				bind:this={input}
			/>
		{/if}
	</label>
</div>

<style>
	input[type='date']::-webkit-calendar-picker-indicator {
		background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' %3F%3E%3Csvg style='fill:rgb(221, 241, 250);' width='35px' height='35px' viewBox='0 0 35 35' data-name='Layer 2' id='a866a81f-2948-4418-8bd5-1a5193c5f74e' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M29.545 34.75H5.455a5.211 5.211 0 0 1-5.2-5.2V8.56a5.21 5.21 0 0 1 5.205-5.2h24.09a5.21 5.21 0 0 1 5.2 5.205V29.545A5.211 5.211 0 0 1 29.545 34.75ZM5.455 5.855A2.708 2.708 0 0 0 2.75 8.56V29.545a2.709 2.709 0 0 0 2.705 2.7h24.09a2.708 2.708 0 0 0 2.7-2.7V8.56a2.707 2.707 0 0 0-2.7-2.7Z'/%3E%3Cpath d='M33.5 17.331H1.541a1.25 1.25 0 0 1 0-2.5H33.5a1.25 1.25 0 0 1 0 2.5Z'/%3E%3Cpath d='M9.459 9.155a1.249 1.249 0 0 1-1.25-1.25V1.5a1.25 1.25 0 0 1 2.5 0V7.905A1.25 1.25 0 0 1 9.459 9.155Z'/%3E%3Cpath d='M25.542 9.155a1.249 1.249 0 0 1-1.25-1.25V1.5a1.25 1.25 0 0 1 2.5 0V7.905A1.25 1.25 0 0 1 25.542 9.155Z'/%3E%3C/svg%3E");
	}
	input[type='time']::-webkit-calendar-picker-indicator {
		background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' %3F%3E%3Csvg style='fill:rgb(221, 241, 250);' width='35px' height='35px' viewBox='0 0 35 35' data-name='Layer 2' id='Layer_2' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M17.5 34.75A17.25 17.25 0 1 1 34.75 17.5 17.27 17.27 0 0 1 17.5 34.75Zm0-32A14.75 14.75 0 1 0 32.25 17.5 14.77 14.77 0 0 0 17.5 2.75Z'/%3E%3Cpath d='M23.37 18.75H17.5a1.25 1.25 0 0 1-1.25-1.25V10.58a1.25 1.25 0 1 1 2.5 0v5.67h4.62a1.25 1.25 0 1 1 0 2.5Z'/%3E%3C/svg%3E");
	}
</style>

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

	$: filteredstations = $stations?.station?.filter((s) =>
		s.name.startsWith(value.charAt(0).toUpperCase() + value.slice(1))
	);
</script>

<div
	class="font-semibold p-2 border-b-2 mt-1 {isFocused
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

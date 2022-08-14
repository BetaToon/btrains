<script lang="ts">
	import { toIsoString } from '$lib/date-helper';
	import { connections, showConnections, stations } from '$lib/irail-service';
	import { InputType } from '$lib/enums/input-type';
	import { register, init, getLocaleFromNavigator, isLoading, _, locale } from 'svelte-i18n';
	import Input from '$lib/components/Input.svelte';
	import Connections from '$lib/components/Connections.svelte';
	import Arrow from '$lib/components/svgs/Arrow.svelte';

	register('en', () => import('../i18n/en.json'));
	register('fr', () => import('../i18n/fr.json'));
	register('nl', () => import('../i18n/nl.json'));

	init({
		fallbackLocale: 'en',
		initialLocale: getLocaleFromNavigator()?.slice(0, 2)
	});
	locale.subscribe((l) => stations.get(l ?? 'en'));

	const dateNow: Date = new Date();

	let from: string = '';
	let to: string = '';
	let date: string = toIsoString(dateNow).slice(0, 10);
	let time: string = `${dateNow.getHours().toString().padStart(2, '0')}:${dateNow
		.getMinutes()
		.toString()
		.padStart(2, '0')}`;
	let timesel: string = 'departure';

	let canSubmit: boolean;
	$: canSubmit = from && to && date ? true : false;

	function handleSubmit() {
		connections.get(from, to, new Date(date), time.replace(':', ''), timesel);
	}
</script>

{#if $isLoading == false}
	<header class="h-20 flex flex-col justify-center bg-white">
		<h1 class="inline-block  align-middle text-center text-5xl italic text-[#38b6ff]">BTRAINS</h1>
	</header>

	<div class="overflow-hidden md:text-center">
		<form
			on:submit|preventDefault={handleSubmit}
			class="mx-2 h-full md:w-[23rem] md:my-2.5 md:mx-0 md:inline-block md:text-left md:align-top"
		>
			<Input
				title="{$_('From')}:"
				placeholder={$_('Departure')}
				forIdName="from"
				bind:value={from}
				type={InputType.Text}
			/>
			<Input
				title="{$_('To')}:"
				placeholder={$_('Destination')}
				forIdName="to"
				bind:value={to}
				type={InputType.Text}
			/>
			<div class="w-40 inline-block">
				<Input
					title="{$_('Date')}:"
					placeholder=""
					forIdName="date"
					bind:value={date}
					type={InputType.Date}
				/>
			</div>
			<div class="w-30 inline-block">
				<Input
					title="{$_('Time')}:"
					placeholder=""
					forIdName="time"
					bind:value={time}
					type={InputType.Time}
				/>
			</div>
			<div class="w-full">
				<!--<Input title="" placeholder="" forIdName="" bind:value={timesel} type={InputType.Radio} />-->

				<label class="text-lg  text-[#ddf1fa] p-2 inline-block">
					<input
						class="appearance-none rounded-full w-4 h-4 border-4 border-[#ddf1fa] bg-[#ddf1fa] ease-out duration-300 checked:bg-[#38b6ff]"
						type="radio"
						bind:group={timesel}
						name="timesel"
						value={'departure'}
					/>
					{$_('Departure')}
				</label>
				<label class="text-lg  text-[#ddf1fa] p-2 inline-block">
					<input
						class="appearance-none rounded-full w-4 h-4 border-4 border-[#ddf1fa] bg-[#ddf1fa] ease-out duration-300 checked:bg-[#38b6ff]"
						type="radio"
						bind:group={timesel}
						name="timesel"
						value={'arrival'}
					/>
					{$_('Arrival')}
				</label>
			</div>

			<button
				class="block bg-white rounded-lg px-10 py-2 mx-auto mt-8 mb-1 disabled:opacity-50 text-[#38b6ff] stroke-[#38b6ff] fill-[#38b6ff] enabled:hover:text-[#21678f] enabled:hover:stroke-[#21678f] enabled:hover:fill-[#21678f] enabled:hover:shadow-sm enabled:hover:shadow-black enabled:active:translate-y-1 enabled:active:shadow-none"
				disabled={!canSubmit}
			>
				<span class="text-lg  ">{$_('Plan_my_journey')}</span>
				<Arrow css="inline stroke-10 ml-2" />
			</button>
		</form>
		<Connections />
	</div>
{/if}

<style>
	* {
		font-family: 'open sans', Helvetica, sans-serif;
	}
</style>

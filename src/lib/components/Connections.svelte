<script lang="ts">
	import { getDuration } from '$lib/date-helper';
	import { connections, showConnections } from '$lib/irail-service';
	import { _ } from 'svelte-i18n';
	import Cross from './svgs/Cross.svelte';

	let open: boolean = false;

	$: firstConnDate = $connections?.connection?.length
		? new Date(+$connections.connection[0].departure.time * 1000)
		: null;

	showConnections.subscribe((x) => {
		open = x;
	});
</script>

<aside
	class="text-left fixed w-full h-full top-0 ease-in-out duration-300 bg-white
	md:relative md:h-auto md:inline-block md:my-2.5 md:bg-transparent
	{open ? 'right-0 md:w-[23rem]' : '-right-full md:w-0'}"
>
	<div class="text-right bg-[#38b6ff] text-[#ddf1fa] text-m">
		<button class="mt-2.5 mx-2.5 pb-1" on:click={() => showConnections.set(false)}>
			{$_('Close')}
			<Cross css="h-2.5 inline fill-[#ddf1fa] stroke-[#ddf1fa] stroke-7" />
		</button>

		{#if firstConnDate}
			<p class="text-center">
				{firstConnDate.toLocaleDateString('be', {
					month: '2-digit',
					day: '2-digit'
				})}
			</p>
		{/if}
	</div>

	<div class="px-4 py-2.5 divide-y-2 space-y-2 bg-white rounded-lg">
		{#if $connections?.connection}
			{#each $connections.connection as conn, i}
				<div>
					<div class="text-lg">
						<!--check if day changed-->
						{#if i != 0 && new Date(+$connections.connection[i - 1].departure.time * 1000).getDate() != new Date(+conn?.departure?.time * 1000).getDate()}
							<p class="text-center text-base bg-[#38b6ff] text-[#ddf1fa]">
								{new Date(+conn?.departure?.time * 1000).toLocaleDateString('be', {
									month: '2-digit',
									day: '2-digit'
								})}
							</p>
						{/if}
						{new Date(+conn?.departure?.time * 1000).toLocaleTimeString('be', {
							timeStyle: 'short'
						})}
						<span class="float-right">
							{new Date(+conn?.arrival?.time * 1000).toLocaleTimeString('be', {
								timeStyle: 'short'
							})}
						</span>
					</div>
					<div class="text-sm text-gray-400 italic">
						<span>{$_('Platform')} {conn?.departure?.platform}</span>
						<span class="float-right">
							<span>{getDuration(+conn?.duration)}</span>
							{#if conn?.vias}
								<span
									>, {conn.vias.number} {+conn.vias.number > 1 ? $_('Changes') : $_('Change')}</span
								>
							{/if}
						</span>
					</div>
				</div>
			{/each}
		{:else}
			<p class="text-center">{$_('NotFoundConnections')}</p>
		{/if}
	</div>
</aside>

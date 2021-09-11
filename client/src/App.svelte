<script>
  import { onMount } from "svelte";
  import io from "socket.io-client";
  import LargeTourneyField from "./lib/LargeTourneyField.svelte";
  import SeatCard from "./lib/SeatCard.svelte";
  import { tourneySlug } from "./lib/Stores/Store";
  import TourneyField from "./lib/TourneyField.svelte";
  import TourneyTitle from "./lib/TourneyTitle.svelte";
  import { set_store_value } from "svelte/internal";
  let tourneyName = "";
  const ws = io(`http://localhost:4000`);
  let data;

  console.log("mounted");
  tourneySlug.subscribe((i) => {
    tourneyName = i;
    ws.emit("tourneydata", i);
  });

  ws.on("tourneydata", (w1) => {
    if (w1) {
      data = w1.tournament;
      console.log(data);
    }
  });

  ws.on("disconnect", () =>{
    ws.disconnect()
  })
</script>

{#if data}
  <TourneyTitle title={data.name} location={data.city} />

  <div class="flex flex-wrap justify-around content-around">
    {#each data.events[0].sets.nodes as i}
      <div class="p-4">
        {#if i.stream}
        <SeatCard
          matchinfo={i.fullRoundText}
          station={"Stream"}
          player1={i.slots[0].entrant.name}
          player2={i.slots[1].entrant.name}
        />
        {:else}
        <SeatCard
          matchinfo={i.fullRoundText}
          station={i.station ? i.station.number : "No Station"}
          player1={i.slots[0].entrant.name}
          player2={i.slots[1].entrant.name}
        />
        {/if}
      </div>
    {/each}
  </div>

  <TourneyField />
{:else}
  <LargeTourneyField />
{/if}

<style>
  :global(body) {
    @apply bg-gray-300;
    @apply m-3;
  }
</style>

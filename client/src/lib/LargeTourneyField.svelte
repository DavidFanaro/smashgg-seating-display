<script lang="ts">
  import { tourneySlug } from "./Stores/Store";

  let t = "";
  function writeToStore(e: Event) {
    if (t === "") {
      return;
    } else {
      tourneySlug.set(t);
    }
  }
</script>

<div class="flex justify-center items-center">
  <div class="text-6xl">Enter Tourney slug</div>
</div>

<div class="flex justify-center items-center pt-9 space-x-2">
  <input
    type="text"
    class="rounded-md w-4/5 h-12 text-2xl pl-2"
    bind:value={t}
  />
  <button
    on:click={writeToStore}
    class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-3 px-4 border border-blue-500 hover:border-transparent rounded item"
  >
    Enter</button
  >
</div>

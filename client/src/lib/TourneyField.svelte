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

<div class="flex fixed bottom-3 right-5 space-x-1">
  <input
    type="text"
    class="rounded-md w-72 h-12 text-2xl pl-2"
    bind:value={t}
  />
  <button
    on:click={writeToStore}
    class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
  >
    Enter</button
  >
</div>

<div class="max-w-md py-4 px-8 shadow-lg rounded-lg my-20 bg-blue-300">
  
  <div class="text-center pb-3">
    {matchinfo}
  </div>

  <div class="text-center pb-2">
    Station: {station}
  </div>
  
  <div class="flex justify-evenly">
    <div class="mx-3 text-blue-800">
      {player1}
    </div>
    <div class="text-red-500">
      {player2}
    </div>
  </div>
</div>

<script lang="ts">
  export let player1 = "loading"
  export let player2 = "loading"
  export let station = "loading"
  export let matchinfo = "loading"

</script>
<template>
  <div class="card" style="transition: opacity 0.3s ease-out 0s, transform 0.3s ease-out 0s; opacity: 1; transform-origin: center top;">
    <div class="card-image">
      <span class="image is-7by3">
        <img class="fill" src="@/assets/404.svg" alt="你对我一无所知" title="你对我一无所知">
      </span>
    </div>

  </div>
</template>
<script>
export default {
  name: 'AboutMeNotFound',
}
</script>
<style scoped>
.fill {
  object-fit: contain;
}
</style>
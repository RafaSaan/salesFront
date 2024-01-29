<template>
  <div class="profile-card" :style="{width: width + 'px', height: height + 'px'}">
  </div>
</template>

<script setup lang="ts">
export interface Props {
  width?: number
  height?: number
}
withDefaults(defineProps<Props>(), {
  width: 200,
  height: 50,
})

</script>

<style scoped>
@keyframes pulse-bg {
  0% {
    background-color: #ddd;
  }
  50% {
    background-color: #d0d0d0;
  }
  100% {
    background-color: #ddd;
  }
}
.profile-card {
  border-radius: 14px;
  animation: pulse-bg 1s infinite;
}
</style>
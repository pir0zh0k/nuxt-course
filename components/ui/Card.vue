<script lang="ts" setup>
interface Props {
  title?: string;
}

defineProps<Props>();
</script>

<template>
  <div class="card">
    <div v-if="title" class="card__head">
      <h2 class="card__title">{{ title }}</h2>
    </div>
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.card {
  display: inline-block;
  padding: 15px;
  border: 1px solid $slate-700;
  border-radius: 8px;

  &__head {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 30px;
  }

  &__title {
    @include Text-2xl;
  }
}
</style>

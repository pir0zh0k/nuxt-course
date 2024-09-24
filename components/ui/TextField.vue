<script lang="ts" setup>
interface Props {
  type?: string;
  placeholder?: string;
  disabled?: boolean;
}

defineProps<Props>();

const value = defineModel();
</script>

<template>
  <input
    class="input"
    :type="type"
    v-model="value"
    :placeholder="placeholder"
  />
</template>

<style lang="scss" scoped>
.input {
  @include Text-base;
  display: block;
  border: 1px solid $slate-800;
  padding: 5px 10px;
  border-radius: 5px;
  width: 100%;

  &::placeholder {
    color: $slate-50;
  }
}
</style>

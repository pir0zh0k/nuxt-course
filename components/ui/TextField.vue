<script lang="ts" setup>
interface Props {
  type?: string;
  placeholder?: string;
  disabled?: boolean;
}

withDefaults(defineProps<Props>(), {
  type: "text",
});

const value = defineModel();
</script>

<template>
  <textarea
    v-if="type == 'textarea'"
    class="input _textarea"
    :placeholder="placeholder"
    v-model="value"
  ></textarea>
  <input
    v-else
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

  &._textarea {
    resize: none;
    width: 100%;
    min-height: 200px;
  }
}
</style>

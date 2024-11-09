<script lang="ts" setup>
interface Props {
  files?: File[];
  multiple?: boolean;
  accept?: string;
  title?: string;
}

const props = defineProps<Props>();

defineEmits(["update-file", "remove-file"]);
</script>

<template>
  <div class="files">
    <h3 class="files__title">{{ title }}</h3>
    <div v-if="files?.length > 0" class="file-list">
      <div class="file-list__item" v-for="(file, index) in files" :key="index">
        <p>{{ file.name }}</p>
        <Icon
          @click="$emit('remove-file')"
          class="file-list__icon"
          name="fa6-solid:trash-can"
        />
      </div>
    </div>
    <label v-else class="upload">
      <Icon name="fa6-solid:cloud-arrow-down" size="62" />
      <span class="upload__text">
        <b>Выберите файл</b> или перетащите его сюда
      </span>
      <input
        @input="(e) => $emit('update-file', e)"
        class="upload__input"
        type="file"
        :multiple="multiple"
        :accept="accept"
      />
    </label>
  </div>
</template>

<style lang="scss" scoped>
.files {
  width: 500px;

  &__title {
    @include Text-2xl;
    margin-bottom: 10px;
  }
}

.upload {
  height: 350px;
  border: 1px dashed $slate-700;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  position: relative;

  &__text {
    @include Text-sm;
  }

  &__input {
    position: absolute;
    opacity: 0;
  }
}

.file-list {
  margin-top: 20px;

  &__item {
    padding: 10px;
    background: $slate-800;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__icon {
    cursor: pointer;
  }
}
</style>

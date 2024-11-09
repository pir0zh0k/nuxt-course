<script setup lang="ts">
import FileUpload from "~/components/ui/FileUpload.vue";
import TextField from "~/components/ui/TextField.vue";
import AdvancedButton from "~/components/ui/AdvancedButton.vue";

useSeoMeta({
  title: "Добавить видео",
});

definePageMeta({
  layout: "admin",
  middleware: ["admin"],
});

const formData = reactive({
  title: "",
  description: "",
  formError: false,
});

const { handleFileInput: handleVideo, files: video } = useFileStorage();
const { handleFileInput: handlePoster, files: poster } = useFileStorage();

const sendData = async () => {
  if (
    formData.title.length <= 0 ||
    formData.description.length <= 0 ||
    video.value.length <= 0 ||
    poster.value.length <= 0
  ) {
    return (formData.formError = true);
  } else {
    const { status, error, data } = await useFetch("/api/video", {
      method: "POST",
      body: {
        video: video.value[0],
        poster: poster.value[0],
        title: formData.title,
        description: formData.description,
      },
    });

    if (status.value == "success") {
      await navigateTo("/admin/video");
    }
  }
};
</script>

<template>
  <div class="add-video">
    <div class="add-video__inner">
      <div class="add-video__head">
        <h2 class="add-video__title">Новое видео</h2>
      </div>
      <form
        @submit.prevent="sendData"
        class="add-video__form"
        enctype="multipart/form-data"
      >
        <div v-if="video.length > 0" class="video-wrapper">
          <div class="video-wrapper__head">
            <h4 class="video-wrapper__title">{{ video[0].name }}</h4>
            <div class="video-wrapper__delete">
              <Icon name="fa6-solid:x" size="18" @click="video = []" />
            </div>
          </div>
          <video width="800" :src="video[0].content" controls></video>
        </div>
        <FileUpload
          v-else
          title="Видео"
          @update-file="handleVideo"
          :files="video"
          accept="video/*"
        />

        <div v-if="poster.length > 0" class="poster-wrapper">
          <span class="poster-wrapper__delete">
            <Icon name="fa6-solid:x" size="18" @click="poster = []" />
          </span>
          <img :src="poster[0].content" :alt="poster[0].name" />
        </div>
        <FileUpload
          v-else
          title="Постер"
          @update-file="handlePoster"
          :files="poster"
          accept="image/*"
        />

        <TextField v-model="formData.title" placeholder="Название видео..." />
        <TextField
          v-model="formData.description"
          placeholder="Описание видео..."
          type="textarea"
        />
        <AdvancedButton>Сохранить</AdvancedButton>
        <span class="error" v-if="formData.formError">
          Вы заполнили не все поля
        </span>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.add-video {
  &__inner {
    padding: 30px 0;
  }

  &__title {
    @include Text-4xl;
    margin-bottom: 20px;
  }

  &__form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    max-width: 500px;

    .video-wrapper {
      position: relative;
      display: inline-block;
      width: 100%;

      video {
        width: 100%;
      }

      &__head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px;
        position: absolute;
        width: 100%;
        top: 0;
        left: 0;
        right: 0;
        z-index: 100;
        background: $slate-950-50;
      }

      &__title {
        @include Text-sm;
      }

      &__delete {
        cursor: pointer;
      }
    }

    .poster-wrapper {
      width: 100%;
      position: relative;

      &__delete {
        position: absolute;
        top: 10px;
        right: 10px;
        cursor: pointer;
      }

      img {
        width: 100%;
      }
    }
  }

  .error {
    @include Text-sm;
    color: $error;
  }
}
</style>

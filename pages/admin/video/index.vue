<script lang="ts" setup>
import AdvancedButton from "~/components/ui/AdvancedButton.vue";
import Link from "~/components/ui/Link.vue";
import dayjs from "dayjs";

useSeoMeta({
  title: "Управление видео",
});

definePageMeta({
  layout: "admin",
  middleware: ["admin"],
});

const router = useRouter();

const addVideo = async () => {
  await router.push({ path: "/admin/video/add" });
};

const { data: videoList, refresh } = await useFetch("/api/video");

const deleteVideo = async (id: number) => {
  await $fetch("/api/video/delete", {
    method: "POST",
    body: {
      id: id,
    },
  });

  await refresh();
};
</script>

<template>
  <div class="video">
    <div class="video__inner">
      <div class="video__head">
        <h2 class="video__title">Управление видео</h2>
        <AdvancedButton icon="fa6-solid:plus" @click="addVideo">
          Добавить видео
        </AdvancedButton>
      </div>
      <div class="video__body">
        <table class="video-table">
          <thead class="video-table__head">
            <tr>
              <th>Видео</th>
              <th>Дата загрузки</th>
              <th>Автор</th>
              <th></th>
            </tr>
          </thead>
          <tbody class="video-table__body" v-if="videoList">
            <tr v-for="videoListItem in videoList">
              <th>
                <div class="video-info">
                  <div class="video-info__preview">
                    <img
                      :src="`/files/poster/${videoListItem.video.posterFileName}`"
                      :alt="videoListItem.video.title"
                    />
                  </div>
                  <div class="video-info__content">
                    <h2 class="video-info__title">
                      {{ videoListItem.video.title }}
                    </h2>
                    <p class="video-info__description">
                      {{ videoListItem.video.description }}
                    </p>
                  </div>
                </div>
              </th>
              <th>
                <div class="video-table__inner">
                  <Icon size="20" name="fa6-solid:calendar" />
                  <span>
                    {{
                      dayjs(videoListItem.video.createdAt).format(
                        "DD/MM/YYYY HH:mm",
                      )
                    }}
                  </span>
                </div>
              </th>
              <th>
                <div class="video-table__inner">
                  <Icon size="20" name="fa6-solid:user-large" />
                  <span>{{ videoListItem.user.username }}</span>
                </div>
              </th>
              <th>
                <div class="video-table__inner">
                  <Link :to="`/admin/video/edit/${videoListItem.video.id}`">
                    <Icon size="20" name="fa6-solid:pen" />
                  </Link>
                  <div @click="deleteVideo(videoListItem.video.id)">
                    <Icon size="20" name="fa6-solid:trash" />
                  </div>
                </div>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.video {
  &__inner {
    padding: 30px 0;
  }

  &__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 50px;
  }

  &__title {
    @include Text-4xl;
  }
}

.video-table {
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    padding: 20px 10px;
    border: 1px solid $slate-800;
  }

  &__head {
    th {
      @include Text-lg;
      text-align: start;
    }
  }

  &__body {
    th {
      @include Text-base;
    }
  }

  &__inner {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;

    a {
      display: block;
      margin: 0 15px;
    }
  }
}

.video-info {
  display: flex;
  gap: 30px;
  text-align: start;
  justify-content: flex-start;
  align-items: flex-start;

  &__title {
    @include Text-2xl;
  }

  &__preview {
    width: 200px;
    aspect-ratio: 16/9;
    position: relative;
    border-radius: 8px;
    overflow: hidden;

    img {
      width: 100%;
    }
  }

  &__content {
    max-width: 400px;
  }

  &__description {
    @include Text-sm;
    margin-top: 15px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    overflow: hidden;
    height: 60px;
  }
}
</style>

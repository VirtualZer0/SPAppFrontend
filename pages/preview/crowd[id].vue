<template>
  <div class="main starter-service">
    <div
      v-if="company?.data"
      class="preview-card"
    >
      <img
        :src="companyPreview"
        class="bg"
      />
      <div class="top">
        <h1 class="left">{{ company.data.title }}</h1>
        <div class="right flex-line">
          <img
            src="/img/starter/logo-dark.svg"
            height="48"
          />
          <h2>Starter</h2>
        </div>
      </div>
      <div class="images">
        <img
          v-for="(img, num) in company.data.images"
          :key="num"
          :style="{ width: `${company.data.images.length > 1 ? 85 / company.data.images.length : 50}%` }"
          :src="getUploadedFile(img)"
        />
      </div>
      <div
        v-if="!company.data.isOver"
        class="bar"
      >
        <div
          class="bar-value"
          :style="{ width: `${(company.data.currentAmount / company.data.goal) * 100}%` }"
        />
      </div>
      <div
        v-if="!company.data.isOver"
        class="bottom"
      >
        <h2 class="flex-line">
          Собрано {{ company.data.currentAmount }} из {{ company.data.goal }}
          <img
            src="/img/icons/diamond.svg"
            height="36"
          />
        </h2>
        <h2>
          Завершится
          {{ $dayjs(company.data.endDate + 'Z').format('DD.MM.YYYY') }}
        </h2>
      </div>
      <div
        v-else
        class="over"
      >
        <h1>Сбор {{ company.data.goal > company.data.currentAmount ? 'отменен' : 'завершен' }}</h1>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useApi } from '~/api/useApi';
import { getUploadedFile } from '~/utils/getUploadedFile';

const id = parseInt(useRoute().params.id);
const api = useApi().crowd;

const { data: company } = await useAsyncData(() => api.getCompany(id));
const companyPreview = getUploadedFile(company.value?.data?.preview, '/img/starter/company-placeholder.svg');

definePageMeta({
  layout: 'empty'
});

onMounted(() => {
  document.body.style.backgroundColor = 'transparent';
});
</script>
<style lang="scss" scoped>
.main {
  background: transparent;
  width: 1280px;
  height: 640px;
  padding: 10px;

  .preview-card {
    height: 100%;
    background: var(--bg-color);
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    border-radius: 8px;
  }

  .bg {
    position: absolute;
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
    border-radius: 12px;
    object-fit: cover;
    z-index: 0;
    opacity: 0.6;
  }

  h1,
  h2,
  h3 {
    padding: 0;
    margin: 0;
  }

  .top {
    display: flex;
    justify-content: space-between;
    position: relative;
    background-color: var(--bg-color);
    padding: 12px 14px;
  }

  .images {
    display: flex;
    justify-content: center;
    gap: 32px;
    align-items: center;
    position: relative;
    height: 300px;
    margin: 0 32px;

    img {
      object-fit: cover;
      border-radius: 8px;
      height: 100%;
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
      background-color: var(--bg-color);
    }
  }

  .bar {
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 12px;
    bottom: 52px;
    background: var(--bg-overlay-color);

    &-value {
      height: 12px;
      background: var(--p1-color);
    }
  }

  .bottom {
    position: relative;
    background: var(--bg-color);
    padding: 8px 10px;
    display: flex;
    justify-content: space-between;
  }

  .over {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--p1-color);
    height: 58px;
  }
}
</style>

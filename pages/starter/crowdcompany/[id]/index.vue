<template>
  <section
    v-if="company"
    class="page crowdcompany-page"
  >
    <div class="flex-line-l">
      <UserTag :user="company.user" />
      <span class="end-date flex-line">
        <span class="pi pi-clock" />
        Осталось
        {{ ($dayjs as any).duration($dayjs(company.endDate + 'Z').diff()).format('D дней H часов') }}
      </span>
    </div>
    <h1 class="title">
      <BackButton />
      {{ company.title }}
    </h1>
    <FiveImagesGallery
      v-if="images.length > 0"
      :images="images"
    />
    <p>{{ company.shortDescription }}</p>
    <div class="main">
      <div
        v-if="safeContent"
        class="content"
        v-html="safeContent"
      />
      <div class="goal">
        <div class="goal-top flex-line text-xl">
          <div class="flex-line">
            Собрано {{ company.currentAmount }} из {{ company.goal }}
            <img
              src="/img/icons/diamond.svg"
              lazy
              height="28"
              width="28"
              alt="АРы"
            />
          </div>
          <div>{{ Math.floor(((company.currentAmount ?? 0) / (company.goal ?? 1)) * 100) }} %</div>
        </div>
        <ProgressBar
          :value="Math.floor(((company.currentAmount ?? 0) / (company.goal ?? 1)) * 100)"
          :show-value="(company.currentAmount ?? 0) / (company.goal ?? 1) <= 1"
        />
        <div class="actions">
          <Button
            v-if="!company.isOver && company.user.id !== mainStore.user.id"
            label="Поддержать"
            icon="pi pi-thumbs-up-fill"
            @click="supportCompany"
          />
          <NuxtLink
            v-else-if="!company.isOver && company.user.id == mainStore.user.id"
            :to="`/starter/crowdcompany/${company.id}/edit`"
            @click.stop
          >
            <Button
              icon="pi pi-pencil"
              label="Редактировать"
            />
          </NuxtLink>
        </div>
      </div>
    </div>
    <Comments
      :id="id"
      api-part="crowd"
    />
  </section>
</template>
<script lang="ts" setup>
import ProgressBar from 'primevue/progressbar';
import Button from 'primevue/button';
import { useApi } from '~/api/useApi';
import { sanitizeContent } from '~/utils/sanitizeContent';
import { getUploadedFile } from '~/utils/getUploadedFile';
import { getPreview } from '~/utils/getPreview';
import { useCrowdfundSupport } from '~/composables/useCorwdfundSupport';
import { useMainStore } from '~/store/main';

import FiveImagesGallery from '~/components/blocks/media/FiveImagesGallery.vue';
import BackButton from '~/components/blocks/nav/BackButton.vue';
import Comments from '~/components/blocks/other/Comments.vue';
import UserTag from '~/components/special/UserTag.vue';

definePageMeta({
  layout: 'starter'
});

const api = useApi().crowd;
const support = useCrowdfundSupport();
const user = ref<MainDto.UserInfoDto | null>(null);
const id = parseInt(useRoute().params.id);
const mainStore = useMainStore();

const safeContent = computed(() => sanitizeContent(company.value?.content));

const loadCompany = async () => {
  const apiRes = await api.getCompany(id);
  if (apiRes.data) {
    return apiRes.data;
  }
};

const { data: company, refresh } = await useAsyncData(() => loadCompany());
user.value = company.value?.user;

const images = computed(() => {
  const imgs: string[] = [];
  if (!company.value) {
    return imgs;
  }

  if (company.value?.preview) {
    imgs.push(getUploadedFile(company.value.preview));
  }

  company.value.images.forEach((element) => {
    imgs.push(getUploadedFile(element));
  });

  return imgs;
});

if (company.value) {
  useSeoMeta({
    title: company.value.title,
    ogTitle: company.value.title,
    description: company.value.shortDescription,
    ogDescription: company.value.shortDescription,
    ogImage: getPreview('crowd', company.value.id, company.value.updatedAt),
    twitterCard: 'summary_large_image'
  });
}

watch(
  () => useRoute().query.mode,
  () => useRouter().replace('/starter')
);

const supportCompany = async () => {
  if (!company.value) {
    return;
  }
  const res = await support.openSupportWindow(company.value.id, company.value.goal - company.value.currentAmount);

  if (res) {
    await refresh();
  }
};
</script>
<style lang="scss" scoped>
.crowdcompany-page {
  .author {
    color: var(--p1-color);
    font-weight: bold;
  }
  .end-date {
    opacity: 0.6;
  }

  .content {
    width: calc(100% - 480px);
    flex: 1;
    min-width: 960px;
    &:deep(a) {
      color: #00b2ff;
    }
  }

  .main {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 24px;
    margin-top: 48px;
    margin-bottom: 48px;

    @media (max-width: 1024px) {
      flex-direction: column;
      .content {
        width: auto;
        min-width: auto;
      }
    }
  }

  .images {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 32px;
    padding-bottom: 4px;
  }

  .goal {
    color: var(--p1-color);
    min-width: 360px;
    font-weight: bold;
    margin-bottom: 16px;
    flex: 1;

    &-top {
      display: flex;
      justify-content: space-between;
      margin-bottom: 12px;
    }

    .actions {
      margin-top: 18px;
    }
  }
}
</style>

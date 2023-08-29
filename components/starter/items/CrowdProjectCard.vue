<template>
  <Card
    class="crowd-project-card"
    :class="{ 'is-over': company.isOver }"
    @click.stop="openCompany"
  >
    <template #header>
      <div class="preview-container">
        <img
          class="preview"
          lazy
          height="256"
          :src="companyPreview"
          alt="Превью"
        />
        <div
          class="user flex-line"
          @click.stop="openSPWorldsProfile(user.userName)"
        >
          <img
            :src="getMinecraftAvatar(user.minecraftUuid, 'face', 32)"
            lazy
            alt="Аватар"
            height="32"
            width="32"
          />
          <span>{{ user.userName }}</span>
        </div>
      </div>
    </template>
    <template #title> {{ company.title }}</template>
    <template #subtitle>
      <div class="date flex-line">
        <span class="pi pi-clock" />
        Осталось
        {{ ($dayjs as any).duration($dayjs(company.endDate + 'Z').diff()).format('D дней H часов') }}
      </div>
    </template>
    <template #content>
      <div class="content">
        <div class="description">
          {{ company.shortDescription }}
        </div>
      </div>
      <div class="goal">
        <div class="amount text-xl flex-line">
          Собрано {{ company.currentAmount }} из {{ company.goal }}
          <img
            src="/img/icons/diamond.svg"
            lazy
            alt="АРы"
            height="28"
            width="28"
          />
        </div>
        <ProgressBar
          :value="Math.floor((company.currentAmount / company.goal) * 100)"
          :show-value="(company?.currentAmount ?? 0) / (company?.goal ?? 1) <= 1"
        />
      </div>
    </template>
    <template #footer>
      <div class="actions">
        <Button
          v-if="!company.isOver && company.user.id != mainStore.user.id"
          icon="pi pi-thumbs-up-fill"
          label="Поддержать"
          @click.stop="supportCompany"
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
        <div
          v-else-if="company.isOver"
          class="over text-l"
        >
          {{ company.currentAmount > company.goal ? 'Завершена' : 'Отменена' }}
        </div>
        <NuxtLink
          class="comments"
          :to="`/starter/crowdcompany/${company.id}#comments`"
          @click.stop
        >
          <span class="pi pi-comment" />
          {{ company.commentCount }}
        </NuxtLink>
      </div>
    </template>
  </Card>
</template>
<script lang="ts" setup>
import Card from 'primevue/card';
import ProgressBar from 'primevue/progressbar';
import Button from 'primevue/button';
import { PropType } from 'nuxt/dist/app/compat/capi';
import { getUploadedFile } from '~/utils/getUploadedFile';
import { getMinecraftAvatar } from '~/utils/thirdparty/getMinecraftAvatar';
import { openSPWorldsProfile } from '~/utils/thirdparty/openSPWorldsProfile';
import { useCrowdfundSupport } from '~/composables/useCorwdfundSupport';
import { useMainStore } from '~/store/main';

const mainStore = useMainStore();

const props = defineProps({
  company: {
    type: Object as PropType<CrowdfundingDto.CrowdfundCompanyItemDto>,
    required: true
  }
});

const emits = defineEmits(['supported']);

const support = useCrowdfundSupport();

const user = props.company.user as MainDto.UserInfoDto;
const companyPreview = getUploadedFile(props.company.preview, '/img/starter/company-placeholder.svg');

const openCompany = () => {
  useRouter().push(`/starter/crowdcompany/${props.company.id}`);
};

const supportCompany = async () => {
  const res = await support.openSupportWindow(props.company.id, props.company.goal - props.company.currentAmount);
  if (res) {
    emits('supported');
  }
};
</script>
<style lang="scss" scoped>
.crowd-project-card {
  overflow: hidden;
  cursor: pointer;
  .content {
    display: flex;
    gap: 16px;
    margin-bottom: 32px;
  }

  &:hover {
    .preview {
      transform: scale(1.1);
    }
  }

  .preview {
    object-fit: cover;
    width: 100%;
    height: 256px;
    transition: transform ease-out 0.3s;

    &-container {
      position: relative;
      max-height: 256px;
      overflow: hidden;

      .user {
        position: absolute;
        top: 10px;
        left: 10px;
        background: var(--bg-color);
        padding: 4px;
        padding-right: 10px;
        border-radius: 8px;
      }
    }
  }

  .goal {
    text-align: right;

    .amount {
      justify-content: flex-end;
      margin-bottom: 12px;
      font-weight: bold;
      color: var(--p1-color);
    }
  }

  .description {
    min-height: 64px;
  }

  .actions {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .comments {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 1.2rem;
      color: var(--p1-color);
      font-weight: bold;

      .pi {
        font-size: 1.4rem;
        font-weight: bold;
      }
    }
  }

  &.is-over {
    .amount,
    .comments {
      color: var(--p2-color);
    }

    &:deep(.p-progressbar-value) {
      background: var(--p2-color);
    }
  }

  .over {
    color: var(--p2-color);
    font-weight: bold;
  }

  @media (max-width: 640px) {
    .preview {
      height: 148px;
    }
  }
}
</style>

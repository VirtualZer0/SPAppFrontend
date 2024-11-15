<template>
  <section class="crowdfund-editor">
    <div
      v-if="editMode && !curCompany.isOver"
      class="flex-line"
    >
      <Button
        label="Отменить сбор"
        icon="pi pi-ban"
        @click="cancelCompany"
      />
      <Button
        label="Завершить сбор"
        icon="pi pi-check"
        :disabled="curCompany.goal <= curCompany.currentAmount && !mainStore.isAdmin"
        @click="acceptCompany"
      />
    </div>
    <form @submit.prevent="editMode ? editCompany() : createCompany()">
      <div class="form-item">
        <label for="crowdfund-name">Заголовок компании<sup class="required" /></label>
        <InputText
          id="crowdfund-name"
          v-model="company.title"
          placeholder="Краткое название вашего сбора"
          required
          maxlength="48"
        />
      </div>
      <div class="form-item">
        <label for="crowdfund-short-description">Краткое описание<sup class="required" /></label>
        <Textarea
          id="crowdfund-short-description"
          v-model="company.shortDescription"
          rows="5"
          maxlength="512"
        />
      </div>
      <div class="form-item">
        <label for="crowdfund-goal">Цель сбора<sup class="required" /></label>
        <InputNumber
          id="crowdfund-goal"
          v-model="company.goal"
          :disabled="editMode && !mainStore.isAdmin"
          show-buttons
          :step="32"
          suffix=" АР"
          button-layout="horizontal"
          increment-button-icon="pi pi-plus"
          decrement-button-icon="pi pi-minus"
          :min="64"
          :max="100000"
          style="min-width: 250px; width: 30%"
        />
        <small class="hint">Цель сбора нельзя будет изменить после создания</small>
      </div>
      <div class="form-item">
        <label for="crowdfund-date">Дата завершения сбора<sup class="required" /></label>
        <Calendar
          id="crowdfund-date"
          :disabled="editMode && !mainStore.isAdmin"
          date-format="До dd.mm.yy"
          show-icon
          style="min-width: 250px; width: 30%"
          :model-value="new Date(company.endDate)"
          :min-date="dayjs().add(1, 'day').toDate()"
          :max-date="dayjs().add(3, 'month').toDate()"
          @update:model-value="company.endDate = new Date($event).toISOString()"
        />
        <small class="hint">Дату завершения сбора нельзя будет изменить после создания</small>
      </div>
      <div class="form-item">
        <label for="crowdfund-image">Основное изображение</label>
        <ImageUploader
          :default-preview="typeof mainImage == 'string' ? mainImage : undefined"
          @selected="mainImage = $event"
          @removed="mainImage = null"
        />
        <small class="hint">Не больше 5 Мб на один файл. Рекомендуемый размер - 1280x640</small>
      </div>
      <div class="form-item">
        <label for="crowdfund-image">Дополнительные изображения</label>
        <MultiImageUploader :images="additionalImages" />
        <small class="hint">Не больше 5 Мб на один файл</small>
      </div>
      <div class="form-item">
        <label for="crowdfund-content">Подробное описание</label>
        <ClientOnly>
          <RichEditor
            id="crowdfund-content"
            v-model="company.content"
          />
        </ClientOnly>
      </div>
      <h3
        v-if="editMode && curCompany.isOver"
        class="flex-line"
      >
        <span class="pi pi-exclamation-triangle text-xl" />
        Вы больше не можете редактировать этот сбор, поскольку он был завершен
      </h3>
      <div class="actions">
        <ButtonPrice
          :price="4"
          :hide="editMode"
        >
          <Button
            size="large"
            type="submit"
            class="text-l"
            :disabled="isLoading || (editMode && curCompany.isOver)"
            :loading="isLoading"
            :label="editMode ? 'Сохранить' : 'Создать'"
          />
        </ButtonPrice>
        <Button
          size="large"
          class="text-l"
          :disabled="isLoading"
          label="Отмена"
          @click="emits('cancel')"
        />
      </div>
    </form>
  </section>
</template>
<script lang="ts" setup>
import Calendar from 'primevue/calendar';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Textarea from 'primevue/textarea';
import Button from 'primevue/button';
import dayjs from 'dayjs';
import { PropType } from 'nuxt/dist/app/compat/capi';
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';
import RichEditor from '~/components/special/RichEditor.vue';
import ImageUploader from '~/components/forms/ImageUploader.vue';
import MultiImageUploader from '~/components/forms/MultiImageUploader.vue';
import ButtonPrice from '~/components/special/ButtonPrice.vue';
import { useApi } from '~/api/useApi';
import { getUploadedFile } from '~/utils/getUploadedFile';
import { extractUuidFromUploadedFile } from '~/utils/extractUuidFromUploadedFile';
import { useMainStore } from '~/store/main';

const mainImage = ref<File | string | null>(null);
const additionalImages = ref<Array<File | string | null>>([]);
const isLoading = ref(false);

const mainStore = useMainStore();
const confirm = useConfirm();
const toast = useToast();

const props = defineProps({
  editMode: {
    type: Boolean,
    default: false
  },

  curCompany: {
    type: Object as PropType<CrowdfundingDto.CrowdfundCompanyItemDto>,
    required: false,
    default: null
  }
});

const emits = defineEmits(['cancel']);

const getEmptyDto = (): CrowdfundingDto.CreateCrowdfundCompanyDto => ({
  title: '',
  content: '',
  endDate: dayjs().add(14, 'day').toISOString(),
  goal: 128,
  images: [],
  preview: undefined,
  shortDescription: ''
});

const company = ref(props.editMode ? { ...props.curCompany } : getEmptyDto());
if (props.editMode) {
  mainImage.value = getUploadedFile(props.curCompany.preview);
  additionalImages.value = props.curCompany.images.map((img) => getUploadedFile(img));
}

const createCompany = async () => {
  const { tryRequestPayment } = usePayment();
  if (!(await tryRequestPayment(10))) {
    return;
  }

  const { uploader } = useMassFileUploader();
  const fRes = await uploader(additionalImages.value);
  if (fRes && !fRes.error && fRes.data) {
    company.value.images = fRes.data.map((f) => f.id);
  } else if (fRes) {
    return;
  }

  if (mainImage.value && typeof mainImage.value !== 'string') {
    const pRes = await uploader([mainImage.value]);
    if (pRes && !pRes.error && pRes.data) {
      company.value.preview = pRes.data[0].id;
    } else if (pRes) {
      return;
    }
  }

  const cRes = await useApi().crowd.createCompany(company.value);

  if (!cRes.error && cRes.data) {
    useRouter().push(`/starter/crowdcompany/${cRes.data.id}`);
  }
};

const editCompany = async () => {
  if (mainStore.user.id !== (props.curCompany.user as MainDto.UserInfoDto).id && !mainStore.isAdmin) {
    return;
  }

  const { uploader } = useMassFileUploader();
  company.value.images = additionalImages.value.filter((f) => typeof f === 'string').map((f) => extractUuidFromUploadedFile(f as string));
  const fRes = await uploader(additionalImages.value);
  if (fRes && !fRes.error && fRes.data) {
    company.value.images = [...company.value.images, ...fRes.data.map((f) => f.id)];
  } else if (fRes) {
    return;
  }

  if (mainImage.value && typeof mainImage.value !== 'string') {
    const pRes = await uploader([mainImage.value]);
    if (pRes && !pRes.error && pRes.data) {
      company.value.preview = pRes.data[0].id;
    } else if (pRes) {
      return;
    }
  } else if (typeof mainImage.value === 'string') {
    company.value.preview = extractUuidFromUploadedFile(mainImage.value);
  } else {
    company.value.preview = undefined;
  }

  const cRes = await useApi().crowd.editCompany(props.curCompany.id, company.value);

  if (!cRes.error) {
    useRouter().push(`/starter/crowdcompany/${props.curCompany.id}`);
  }
};

const cancelCompany = () => {
  confirm.require({
    header: 'Отмена сбора',
    message: 'При отмене сбора все средства будут возвращены донатерам, а сам сбор будет закрыт. Продолжить?',
    acceptLabel: 'Да',
    rejectLabel: 'Нет',
    accept: async () => {
      const res = await useApi().crowd.cancelCompany(props.curCompany.id);
      if (!res.error) {
        toast.add({
          summary: 'Сбор закрыт',
          detail: 'Сбор был успешно отменен. Все средства возвращены донатерам.'
        });
        useRouter().push(`/starter/crowdcompany/${props.curCompany.id}`);
      }
    }
  });
};

const acceptCompany = () => {
  confirm.require({
    header: 'Завершение сбора',
    message: 'Вы можете досрочно завершить сбор. Все средства буду немедленно переведены на ваш счет SP App. Продолжить?',
    acceptLabel: 'Да',
    rejectLabel: 'Нет',
    accept: async () => {
      const res = await useApi().crowd.acceptCompany(props.curCompany.id);
      if (!res.error) {
        toast.add({
          severity: 'success',
          summary: 'Сбор закрыт',
          detail: 'Сбор был досрочно завершен. Средства отправлены на ваш счет.'
        });
        await mainStore.loadProfile();
        useRouter().push(`/starter/crowdcompany/${props.curCompany.id}`);
      }
    }
  });
};
</script>
<style lang="scss" scoped>
.crowdfund-editor {
  display: flex;
  flex-direction: column;
  gap: 28px;

  form {
    display: flex;
    flex-direction: column;
    gap: 28px;
  }

  .p-float-label {
    width: 100%;
  }

  .p-inputtext {
    width: 100%;
  }

  .actions {
    display: flex;
    justify-content: center;
    gap: 32px;
  }
}
</style>

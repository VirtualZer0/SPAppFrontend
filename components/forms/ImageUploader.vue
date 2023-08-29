<template>
  <label class="image-uploader">
    <input
      ref="input"
      type="file"
      class="file-input"
      accept="image/*"
      @change="selectFile"
    />
    <div
      v-if="!selectedFile && !defaultPreview"
      class="pi pi-plus"
    />
    <div
      v-else
      class="preview"
    >
      <Button
        icon="pi pi-times"
        size="small"
        rounded
        class="remove"
        @click.prevent="remove"
      />
      <img
        :src="preview || defaultPreview"
        width="180"
        height="180"
        alt="Превью"
        :style="{ imageRendering: renderingType as any }"
      />
    </div>
  </label>
</template>
<script lang="ts" setup>
import { PropType } from 'nuxt/dist/app/compat/capi';
import Button from 'primevue/button';
import { useToast } from 'primevue/usetoast';

const input = ref<HTMLInputElement>();
const selectedFile = ref<File | null>(null);
const preview = ref('');
const renderingType = ref('auto');
const toast = useToast();

const props = defineProps({
  defaultPreview: {
    type: String,
    default: ''
  }
});

const emits = defineEmits(['selected', 'removed']);

const selectFile = (e: Event) => {
  const el = e.target as HTMLInputElement;
  if (!el.files || !el.files.length) {
    return;
  }

  if (preview.value) {
    URL.revokeObjectURL(preview.value);
  }

  if (el.files[0].size > 5 * 1024 * 1024) {
    toast.add({
      summary: 'Файл слишком большой',
      detail: `Файл не должен быть больше 5 Мб. Выбранный вами файл имеет размер ${(el.files[0].size / 1024 / 1024).toFixed(2)} Мб`,
      severity: 'error',
      life: 5000,
      closable: true
    });
    remove();
    return;
  }

  selectedFile.value = el.files[0];
  preview.value = URL.createObjectURL(selectedFile.value);
  const img = new Image();
  img.onload = () => {
    if (img.width < 180 && img.height < 180) {
      renderingType.value = 'pixelated';
    } else {
      renderingType.value = 'auto';
    }
  };
  img.src = preview.value;
  emits('selected', selectedFile.value);
};

const remove = () => {
  selectedFile.value = null;

  if (input.value) {
    input.value.value = '';
  }

  emits('removed');
};
</script>
<style lang="scss" scoped>
.image-uploader {
  margin-top: 4px;
  width: 200px;
  height: 200px;
  border: 3px dashed var(--bg-overlay-color);
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: var(--bg-overlay-color);
  transition: all 0.3s ease;

  .pi {
    font-size: 72px;
  }

  &:hover {
    border-color: var(--p1-color);
    color: var(--p1-color);
  }

  .file-input {
    display: none;
  }

  .preview {
    display: flex;
    align-items: center;
    position: relative;

    .remove {
      position: absolute;
      padding: 0;
      right: -17px;
      top: -17px;
      width: 32px;
      height: 32px;
    }
  }

  img {
    object-fit: contain;
    border-radius: 8px;
  }
}
</style>

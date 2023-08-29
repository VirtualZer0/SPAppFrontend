<template>
  <Editor
    style="height: 600px"
    :init="{
      skin: false,
      plugins: ['lists', 'table', 'link', 'fullscreen'],
      toolbar: 'undo redo | blocks | bold italic | alignleft aligncenter alignright | link | indent outdent | bullist numlist | table',
      content_style: mainStyle,
      content_css: false,
      body_class: theme,
      language: 'ru',
      language_url: '/other/rich-editor-locale/ru.js'
    }"
    :model-value="modelValue"
    @update:model-value="emits('update:modelValue', $event)"
  />
</template>
<script lang="ts" setup>
import mainStyle from '~/assets/style/themes/rich-editor-content.scss?inline';
/* Default icons are required for TinyMCE 5.3 or above */
import 'tinymce/tinymce';
import 'tinymce/icons/default';

/* A theme is also required */
import 'tinymce/themes/silver';

/* Import the skin */
import '~/assets/style/themes/rich-editor.css';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/table';
import 'tinymce/plugins/link';
import 'tinymce/plugins/fullscreen';

import 'tinymce/models/dom';

import Editor from '@tinymce/tinymce-vue';
import { useMainStore } from '~/store/main';
defineProps({
  modelValue: {
    type: String,
    default: ''
  }
});

const emits = defineEmits(['update:modelValue']);

const theme = `${useMainStore().server.currentService}-service`;
</script>

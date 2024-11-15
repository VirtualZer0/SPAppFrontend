<template>
  <div class="share">
    <canvas
      ref="canvas"
      width="256"
      height="256"
    />
    <div class="link">
      <InputText
        ref="copyText"
        v-model="url"
        readonly
      />
      <Button
        icon="pi pi-copy"
        class="copy"
        @click="copyUrl"
      />
    </div>
    <div class="actions">
      <Button
        label="Схематика QR-кода"
        icon="pi pi-download"
        class="download-scheme"
        :loading="generationInProgress"
        @click="generateSchematic"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Buffer } from 'buffer';
import { toCanvas, toString } from 'qrcode';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { encode, decode, Byte, Short, Int, Float } from 'nbt-ts';

const props = defineProps({
  link: {
    type: String,
    default: undefined
  }
});

const canvas = ref<HTMLElement>();
const copyText = ref<any>();
const url = ref('');
const generationInProgress = ref(false);

onMounted(() => {
  url.value = props.link ? `${window.location.protocol}//${window.location.host}${props.link}` : window.location.href;
  toCanvas(canvas.value, url.value, {
    width: 256
  });
});

const copyUrl = () => {
  copyText.value?.$el?.select();

  navigator?.permissions?.query({ name: 'clipboard-write' as any }).then((result) => {
    if (result.state === 'granted' || result.state === 'prompt') {
      navigator?.clipboard?.writeText?.(url.value);
    }
  });

  navigator?.clipboard?.writeText?.(url.value);
  document.execCommand?.('copy');
};

const generateSchematic = () => {
  generationInProgress.value = true;

  // Hack for client-side buffer
  window.Buffer = Buffer;
  const offCanvas = new OffscreenCanvas(128, 128);
  const ctx = offCanvas.getContext('2d', { willReadFrequently: true });
  toCanvas(offCanvas, url.value, { width: 128 });

  const blocks = [];

  for (let x = 0; x < 128; x++) {
    for (let y = 0; y < 128; y++) {
      blocks.push({
        pos: [new Int(x), new Int(0), new Int(y)],
        state: new Int(ctx?.getImageData(x, y, 1, 1).data[0] === 0 ? 0 : 1)
      });
    }
  }

  const compound = encode('', {
    DataVersion: new Int(3465),
    blocks,
    entities: [],
    palette: [{ Name: 'minecraft:black_concrete' }, { Name: 'minecraft:white_concrete' }],
    size: [new Int(128), new Int(1), new Int(128)]
  });

  const blob = new Blob([compound]);
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'Схематика_QR.nbt';
  generationInProgress.value = false;
  link.click();
};
</script>
<style lang="scss" scoped>
.share {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 256px;

  .link {
    display: flex;
    position: relative;

    .copy {
      position: absolute;
      right: 0;
    }
  }

  .download-scheme {
    width: 100%;
  }
}
</style>

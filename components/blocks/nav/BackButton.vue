<template>
  <div
    class="back-button"
    @click="back"
  >
    <span class="pi pi-angle-left text-xl" />
  </div>
</template>
<script lang="ts" setup>
import { getServiceRootByLayout } from '~/utils/getServiceRootByUrl';

const props = defineProps({
  to: {
    type: String,
    required: false,
    default: undefined
  }
});

const back = () => {
  const router = useRouter();
  if (props.to) {
    router.push(props.to);
    return;
  }

  if (window.history.state.back) {
    router.go(-1);
  } else {
    router.push(getServiceRootByLayout(useRoute().meta.layout));
  }
};
</script>
<style lang="scss" scoped>
.back-button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background: var(--bg-overlay-color);
  height: 2.4rem;
  width: 2.4rem;
  margin-right: 8px;
  border-radius: 100%;
  padding-right: 3px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    filter: brightness(1.3);
    transform: translateX(-2px);
  }
}
</style>

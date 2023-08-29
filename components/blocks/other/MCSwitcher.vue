<template>
  <div class="mcswitcher">
    <div
      v-tooltip.bottom="!isSP ? 'Переключить на СП' : ''"
      class="item sp"
      :class="{ active: isSP }"
      @click="changeServer(MCServer.SP)"
    >
      СП
    </div>
    <div
      v-tooltip.bottom="!isSPM ? 'Переключить на СПм' : ''"
      class="item spm"
      :class="{ active: isSPM }"
      @click="changeServer(MCServer.SPM)"
    >
      СПм
    </div>
    <div
      class="pointer"
      :style="pointerStyle"
    />
  </div>
</template>
<script lang="ts" setup>
import { MCServer } from '~/api/enums';
import { useMainStore } from '~/store/main';

const mainStore = useMainStore();

const isSP = computed(() => mainStore.server.selectedMCServer === MCServer.SP);
const isSPM = computed(() => mainStore.server.selectedMCServer === MCServer.SPM);

const pointerStyle = computed(() => ({
  transform: `translateX(${mainStore.server.selectedMCServer === MCServer.SP ? '0%' : '100%'})`,
  backgroundColor: `var(--p${mainStore.server.selectedMCServer}-color)`
}));

const changeServer = (serv: MCServer) => {
  mainStore.switchMCServer(serv);
};
</script>
<style lang="scss" scoped>
.mcswitcher {
  background: var(--bg-second-color);
  position: relative;
  display: flex;
  align-items: center;
  height: 40px;
  padding: 2px;
  width: 160px;
  border-radius: 12px;
  border: var(--bg-second-color) 2px solid;
  overflow: hidden;

  .item {
    user-select: none;
    z-index: 1;
    font-weight: bold;
    width: 50%;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--fg-color);
    cursor: pointer;

    &.active {
      //color: var(--bg-color);
      text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.3);
    }
  }

  .pointer {
    border-radius: 8px;
    z-index: 0;
    position: absolute;
    left: 0;
    width: calc(50%);
    height: 36px;
    opacity: 0.7;
    transition: 0.3s ease;
    transition-property: transform background-color;
  }

  @media (max-width: 1024px) {
    height: 38px;
    width: 120px;

    .pointer {
      height: 34px;
    }
  }
}
</style>

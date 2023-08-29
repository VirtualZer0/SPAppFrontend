<template>
  <div
    ref="rootEl"
    class="float-menu card"
    @touchmove.prevent
    @scroll.prevent
  >
    <div class="top text-l">
      {{ mainStore.user.userName }}
      <div
        class="close pi pi-times"
        @click="emits('close')"
      />
    </div>
    <img
      class="avatar"
      :src="getMinecraftAvatar(mainStore.user.minecraftUuid ?? 'X-Steve', 'face', 74)"
      alt="Аватар"
      height="74"
      width="74"
    />
    <div class="menu">
      <NuxtLink
        to="/profile/main"
        @click="emits('close')"
      >
        <div class="left">
          <span class="pi pi-user text-l" />
          <span class="text">Мой аккаунт</span>
        </div>
        <div class="right flex-line">
          {{ mainStore.userBalance }}
          <img
            src="/img/icons/diamond.svg"
            height="24"
            width="24"
            alt="АРы"
          />
        </div>
      </NuxtLink>
      <NuxtLink
        to="/notifications"
        @click="emits('close')"
      >
        <div class="left">
          <span class="pi pi-bell text-l" />
          <span class="text">Уведомления</span>
        </div>
        <div class="right">
          <Badge value="2" />
        </div>
      </NuxtLink>
      <NuxtLink
        to="/#our-services"
        @click="emits('close')"
      >
        <div class="left">
          <span class="pi pi-th-large text-l" />
          <span class="text">Все сервисы</span>
        </div>
      </NuxtLink>
      <NuxtLink
        v-if="mainStore.isEmployee"
        to="/employee"
        @click="emits('close')"
      >
        <div class="left">
          <span class="pi pi-briefcase text-l" />
          <span class="text">Панель сотрудника</span>
        </div>
      </NuxtLink>
      <NuxtLink
        v-if="mainStore.isAdmin"
        to="/admin"
        @click="emits('close')"
      >
        <div class="left">
          <span class="pi pi-sliders-h text-l" />
          <span class="text">Панель управления</span>
        </div>
      </NuxtLink>
      <NuxtLink
        to="#"
        class="exit"
        @click="logout"
      >
        <div class="left">
          <span class="pi pi-sign-out text-l" />
          <span class="text">Выход</span>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>
<script lang="ts" setup>
import Badge from 'primevue/badge';
import MCSwitcher from '../other/MCSwitcher.vue';
import { useMainStore } from '~/store/main';
import { getMinecraftAvatar } from '~/utils/thirdparty/getMinecraftAvatar';
const mainStore = useMainStore();
const emits = defineEmits(['close']);
const rootEl = ref(null);
onClickOutside(rootEl, () => emits('close'));

const logout = () => {
  mainStore.logout();
  useCookie('token').value = null;
  useRouter().push('/');
  emits('close');
};
</script>
<style lang="scss" scoped>
.float-menu {
  width: 320px;
  position: fixed;
  right: 20px;
  padding: 0;
  padding-bottom: 90px;
  top: 12px;
  z-index: 90;

  .top {
    position: relative;
    display: flex;
    align-items: flex-end;
    font-weight: bold;
    padding-bottom: 8px;
    padding-left: 130px;
    border-radius: 12px 12px 0 0;
    height: 75px;
    width: inherit;
    background: linear-gradient(to left, rgba(var(--p1-color-spread), 0.5), rgba(var(--p2-color-spread), 0.5));

    .close {
      position: absolute;
      top: 12px;
      right: 12px;
      cursor: pointer;
    }
  }

  .avatar {
    position: relative;
    left: 20px;
    top: -40px;
  }

  .menu {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    margin-top: -10px;
    padding: 0 20px;
  }

  a {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    border: none;
    color: var(--fg-color);
    transition: color 0.3s ease;

    .left {
      display: flex;
      align-items: center;
      gap: 14px;

      .pi {
        color: var(--p1-color);
      }

      .text {
        transition: 0.3s ease;
        transition-property: transform color;
      }
    }

    &:hover:not(.exit) {
      .left {
        .text {
          color: var(--p1-color);
          transform: translateX(10px);
        }
      }
    }

    &.exit:hover {
      .left {
        .text {
          color: var(--danger-color);
          transform: translateX(10px);
        }
      }
    }

    &.exit {
      position: absolute;
      bottom: 16px;
      .pi {
        color: var(--danger-color);
      }
    }
  }

  @media (max-width: 640px) {
    position: fixed;
    width: 100vw;
    min-height: 100vh;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    padding: 0;
    border-radius: 0;

    .top {
      border-radius: 0;
    }

    a {
      &.exit {
        position: static;
        margin-top: 24px;
      }
    }
  }
}
</style>

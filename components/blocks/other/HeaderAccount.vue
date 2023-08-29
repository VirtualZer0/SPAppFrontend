<template>
  <div class="header-account">
    <button
      v-if="!mainStore.user.isAuthorized"
      class="primary-button"
      @click="openAuth"
    >
      <span class="pi pi-user" />
      <span class="label">Войти</span>
    </button>
    <div
      v-else
      class="user"
      @click="emits('openMenu')"
    >
      <div class="balance">
        {{ mainStore.userBalance }}
        <img
          src="/img/icons/diamond.svg"
          height="28"
          width="28"
          alt="АРы"
        />
      </div>
      <img
        class="avatar"
        height="42"
        width="42"
        alt="Аватар"
        :src="getMinecraftAvatar(mainStore.user.minecraftUuid ?? 'X-Steve')"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useMainStore } from '~/store/main';
import { getMinecraftAvatar } from '~/utils/thirdparty/getMinecraftAvatar';
import { useAuthorization } from '~/composables/useAuthorization';

const mainStore = useMainStore();
const emits = defineEmits(['openMenu']);
const auth = useAuthorization();

const openAuth = async () => {
  const res = await auth?.openAuth();
};
</script>
<style lang="scss" scoped>
.header-account {
  display: flex;
  gap: 48px;
  .primary-button {
    height: 44px;
    background-image: linear-gradient(to left, var(--p1-color), var(--p2-color));
  }

  .user {
    display: flex;
    align-items: center;
    gap: 32px;
    cursor: pointer;

    .avatar {
      transition: transform 0.3s ease;
    }

    &:hover {
      .avatar {
        transform: scale(1.2);
      }
    }

    .balance {
      display: flex;
      align-items: center;
      gap: 16px;
      font-size: 1.3rem;

      @media (max-width: 1024px) {
        font-size: 1.2rem;
      }

      @media (max-width: 640px) {
        display: none;
      }
    }
  }

  @media (max-width: 640px) {
    gap: 0px;
    justify-content: space-between;

    .primary-button {
      height: 36px;
      min-width: auto;
      font-size: 1.1rem;

      .label {
        display: none;
      }
    }

    .avatar {
      width: 36px;
      height: 36px;
    }
  }
}
</style>

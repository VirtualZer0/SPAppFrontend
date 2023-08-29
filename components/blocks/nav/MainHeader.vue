<template>
  <header class="main-header">
    <div class="container">
      <div class="left">
        <ServiceSwitcher />
        <MCSwitcher class="mcswitcher" />
      </div>
      <div class="nav">
        <slot name="nav" />
      </div>
      <HeaderAccount
        class="right"
        @openMenu="showProfileMenu = true"
      />
    </div>
    <Transition name="profile-menu">
      <ProfileMenu
        v-if="showProfileMenu"
        @close="showProfileMenu = false"
      />
    </Transition>
  </header>
</template>
<script lang="ts" setup>
import HeaderAccount from '../other/HeaderAccount.vue';
import MCSwitcher from '../other/MCSwitcher.vue';
import ProfileMenu from './ProfileMenu.vue';
import HeaderLogo from '~/components/logo/HeaderLogo.vue';
import ServiceSwitcher from '~/components/logo/ServiceSwitcher.vue';

const showProfileMenu = ref(false);
</script>
<style lang="scss" scoped>
.main-header {
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(10px);
  background: rgba(27, 27, 27, 0.4);
  border-bottom: 1px solid rgba(27, 27, 27, 0.2);
  padding: 10px 24px;
  max-width: 100vw;

  .left {
    display: flex;
    align-items: center;
    gap: 32px;
  }

  .right {
    display: flex;
    justify-content: right;
  }

  .nav {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5%;
    font-size: 1.2rem;
  }

  .container {
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    justify-content: space-between;
  }

  @media (max-width: 1024px) {
    .container {
      grid-template-columns: 1fr 1fr;
    }
    .nav {
      display: none;
    }
  }

  @media (max-width: 640px) {
    .mcswitcher {
      display: none;
    }

    padding: 8px;
  }
}
</style>

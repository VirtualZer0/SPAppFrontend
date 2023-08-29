<template>
  <section class="page main-profile-page">
    <Card class="profile-card-container">
      <template #content>
        <div class="profile-card">
          <div class="left">
            <img
              :src="getMinecraftAvatar(mainStore.user.minecraftUuid, 'full', 512)"
              height="512"
              lazy
              alt="Скин"
            />
          </div>
          <div class="right">
            <div class="username text-xxl">{{ mainStore.user.userName }}</div>
            <div class="uuid">{{ mainStore.user.minecraftUuid }}</div>
            <div class="discord">
              <span class="pi pi-discord" />
              @{{ mainStore.user.discordName }}
            </div>

            <div class="balance">
              <div class="current text-xl">
                <img
                  src="/img/icons/diamond.svg"
                  height="42"
                  alt="АРы"
                />
                {{ mainStore.userBalance }}
                АРов
              </div>
              <div class="actions">
                <Button
                  icon="pi pi-money-bill"
                  label="Пополнить"
                  outlined
                  @click="openPaymentWindow()"
                />
                <Button
                  icon="pi pi-credit-card"
                  label="Вывести"
                  outlined
                />
              </div>
            </div>
          </div>
        </div>
      </template>
    </Card>
  </section>
</template>
<script lang="ts" setup>
import Card from 'primevue/card';
import Button from 'primevue/button';
import { useMainStore } from '~/store/main';
import { usePayment } from '~/composables/usePayment';
import { getMinecraftAvatar } from '~/utils/thirdparty/getMinecraftAvatar';
const mainStore = useMainStore();
const { openPaymentWindow } = usePayment();
</script>
<style lang="scss" scoped>
.main-profile-page {
  display: flex;
  justify-content: stretch;
  justify-self: center;
  width: 100%;

  .profile-card {
    width: 100%;
    display: flex;
    gap: 24px;

    &-container {
      margin: 0 auto;
    }

    .left {
      padding-right: 24px;
    }

    .right {
      padding-right: 24px;
      display: flex;
      flex-direction: column;
      .username {
        font-weight: bold;
        color: var(--p1-color);
      }

      .uuid {
        opacity: 0.7;
        margin-bottom: 16px;
      }

      .discord {
        display: flex;
        align-items: center;
        align-self: flex-start;
        gap: 16px;
        border: 2px solid #5865f2;
        padding: 4px 12px;
        border-radius: 100px;

        .pi {
          font-size: 1.5rem;
          color: #5865f2;
        }
      }
    }

    .balance {
      margin-top: 120px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 24px;

      .current {
        display: flex;
        align-items: center;
        gap: 16px;
        font-weight: bold;
      }

      .actions {
        display: flex;
        gap: 12px;
      }
    }
  }
}
</style>

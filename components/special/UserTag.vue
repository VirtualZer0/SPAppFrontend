<template>
  <div
    v-if="user"
    class="user-tag flex-line"
  >
    <img
      :src="getMinecraftAvatar(user.minecraftUuid, 'face', 28)"
      lazy
      height="28"
      width="28"
      alt="Аватар"
    />
    <span class="username">{{ user.userName }}</span>
  </div>
</template>
<script lang="ts" setup>
import { PropType } from 'nuxt/dist/app/compat/capi';
import { getMinecraftAvatar } from '~/utils/thirdparty/getMinecraftAvatar';

const props = defineProps({
  user: {
    type: Object as PropType<MainDto.UserInfoDto>,
    required: true
  }
});
</script>
<style lang="scss" scoped>
.user-tag {
  .username {
    color: var(--p1-color);
    font-weight: bold;
  }
}
</style>

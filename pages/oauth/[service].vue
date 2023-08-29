<template>
  <div />
</template>
<script lang="ts" setup>
import { useDiscordAuth } from '~/utils/thirdparty/useDiscordAuth';

if (process.client) {
  const route = useRoute();
  switch (route.params.service) {
    case 'discord':
      const discordCode = route.query.code as string;
      const discordAuth = useDiscordAuth();
      const ch = discordAuth.createDiscordAuthBC();
      discordAuth.sendDiscordCodeToBC(discordCode, ch);
      break;
  }

  window.close();
}
</script>

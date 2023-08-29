export const getMinecraftAvatar = (nick: string | null = 'X-Steve', type: 'face' | 'front' | 'head' | 'bust' | 'full' = 'face', size = 64) => {
  nick = nick || 'X-Steve';
  return `https://visage.surgeplay.com/${type}/${size}/${nick}`;
};

module.exports = {
  apps: [
    {
      name: 'SPApp',
      port: '3001',
      instances: 2,
      exec_mode: 'cluster',
      script: './.output/server/index.mjs'
    }
  ]
}
module.exports = {
  apps: [
    {
      name: 'NextJS Apps',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 3005', //running on port 3005
      cwd: '.',
      instances: 1,
      watch: false,
      env: {},
    },
  ],
};

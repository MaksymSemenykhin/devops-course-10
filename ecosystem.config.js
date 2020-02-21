module.exports = {
  apps : [{
    name: %ENV%,
    script: 'server/index.js',
    instances: 1,
    autorestart: false,
    watch: false,
    exec_mode  : "fork",
    instance_var: 'port',
    env: {
      "PORT": 3000,
      "NODE_ENV": "development"
    }
  }]
};

module.exports = {
  apps : [{
    name: 'server',
    script: './bin/www',
    instances: 2,
    watch: true,
    ignore_watch : ['node_modules'],
    exec_mode : 'cluster',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }]
};
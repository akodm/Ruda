module.exports = {
  apps : [{
    name: 'server',
    script: './bin/www',
    instances: 3,
    watch: true,
    ignore_watch : ['node_modules','public'],
    exec_mode : 'cluster',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }]
};
module.exports = {
  apps : [
    {
      name: 'client',
      script: './node_modules/react-scripts/scripts/start.js',
      ignore_watch : ["node_modules"],
      instances: 1,
      autorestart: true,
      exec_mode : "fork",
      time: true,
      env: {
        "NODE_ENV": 'development'
      }
    }
  ]
};

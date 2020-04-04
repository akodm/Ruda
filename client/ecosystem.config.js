module.exports = {
  apps : [
    {
      name: 'client',
      script: './node_modules/react-scripts/scripts/start.js',
      watch : true,
      ignore_watch : ["node_modules"],
      instances: 1,
      autorestart: true,
      exec_mode : "fork",
      time: true,
      watch_options : {
        followSymlinks : false
      },
      env: {
        "NODE_ENV": 'development'
      }
    }
  ]
};

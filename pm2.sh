echo 'server Start'
cd server
pm2 start ecosystem.config.js
cd ..
cd client
echo 'client Start'
pm2 start ecosystem.config.js
echo 'pm2 Start & pm2 logs output ------------------------------------------------------------------'
pm2 logs
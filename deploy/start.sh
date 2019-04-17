# 启动服务

cd /projects/weibo/server
yarn
NODE_ENV=production npx sequelize db:migrate
npm start
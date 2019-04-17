
cd ../web
npm run build
mkdir ../web-dist
cp -r ./dist/* ../web-dist/
rm -rf ./dist
cd ../../
tar -czvf weibo.tar.gz --exclude='node_modules/*' --exclude='.git/*' --exclude='web/*' ./weibo
scp -P 26825 ./weibo.tar.gz root@23.105.195.24:/projects
rm -rf ./weibo/web-dist

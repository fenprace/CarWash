#!/bin/bash
cd ~/CarWash
git fetch --all
git reset --hard origin/master
cd backend
npm install
pm2 restart all
cd ../frontend
npm install
npm run build
echo 'Deploy Successfully.'
#!/bin/bash
# Azure App Service startup script for Next.js
cd /home/site/wwwroot
npm run start -- --port $PORT

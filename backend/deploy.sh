#!/bin/bash
# deploy.sh - Production deployment script for QuickCheck Backend

set -e

echo "🚀 QuickCheck Backend Deployment"
echo "================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
APP_DIR="/var/www/quickcheck-backend"
REPO_URL="https://github.com/your-username/QuickCheckin.git"
BRANCH="main"

echo -e "${YELLOW}Step 1: Pulling latest code...${NC}"
cd $APP_DIR
git fetch origin
git reset --hard origin/$BRANCH

echo -e "${YELLOW}Step 2: Installing dependencies...${NC}"
npm ci --production

echo -e "${YELLOW}Step 3: Restarting PM2...${NC}"
pm2 reload ecosystem.config.js --env production

echo -e "${YELLOW}Step 4: Saving PM2 process list...${NC}"
pm2 save

echo -e "${GREEN}✅ Deployment complete!${NC}"
echo ""
echo "Check status with: pm2 status"
echo "View logs with: pm2 logs quickcheck-backend"

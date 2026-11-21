#!/usr/bin/env bash
set -euo pipefail

EC2_HOST="ubuntu@15.207.59.246"
EC2_KEY="$HOME/.ssh/jlu-keypair.pem"
REMOTE_DIR="~/jlu-website"
PM2_APP="jlu-website"

SSH_CMD="ssh -i $EC2_KEY -o StrictHostKeyChecking=accept-new"

echo "▶ Building locally..."
npm run build

echo "▶ Syncing .next/ → EC2..."
rsync -avz --delete -e "$SSH_CMD" .next/ "$EC2_HOST:$REMOTE_DIR/.next/"

echo "▶ Syncing public/ → EC2..."
rsync -avz -e "$SSH_CMD" public/ "$EC2_HOST:$REMOTE_DIR/public/"

echo "▶ Syncing package files → EC2..."
rsync -avz -e "$SSH_CMD" package.json package-lock.json "$EC2_HOST:$REMOTE_DIR/"

echo "▶ Installing prod deps + restarting pm2 on EC2..."
$SSH_CMD "$EC2_HOST" "cd $REMOTE_DIR && npm install --omit=dev && pm2 restart $PM2_APP"

echo "✔ Deployed."

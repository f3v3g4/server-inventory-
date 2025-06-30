#!/bin/bash
cd /usr/src/app
npm config set update-notifier false
npm config set fund false
npm config set audit false
npm ci --silent --no-audit --no-fund
exit 0  # Siempre retorna éxito

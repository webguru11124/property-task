#!/usr/bin/env bash
set -euo pipefail
cd "./.."
cp -n .env.example .env || true
docker compose up --build -d

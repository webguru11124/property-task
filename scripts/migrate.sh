#!/usr/bin/env bash
set -euo pipefail
cd "./.."
docker compose exec backend npm run migration:run | cat

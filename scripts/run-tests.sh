#!/bin/bash

# Script para ejecutar pruebas con reportes
# Uso: ./run-tests.sh [proyecto] [modo]

PROJECT=${1:-"chromium"}
MODE=${2:-"headless"}

echo "Ejecutando pruebas en proyecto: $PROJECT, modo: $MODE"

if [ "$MODE" = "headed" ]; then
  npx playwright test --project=$PROJECT --headed
elif [ "$MODE" = "debug" ]; then
  npx playwright test --project=$PROJECT --debug
else
  npx playwright test --project=$PROJECT
fi

echo "Generando reporte HTML..."
npx playwright show-report
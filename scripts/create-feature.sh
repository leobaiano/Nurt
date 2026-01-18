#!/usr/bin/env bash

set -e

DRY_RUN=false

if [[ "$1" == "--dry-run" ]]; then
  DRY_RUN=true
fi

run() {
  if $DRY_RUN; then
    echo "[DRY-RUN] $*"
  else
    eval "$@"
  fi
}

to_kebab_case() {
  echo "$1" \
    | tr '[:upper:]' '[:lower:]' \
    | sed 's/[^a-z0-9]/-/g' \
    | sed 's/--*/-/g' \
    | sed 's/^-//' \
    | sed 's/-$//'
}

to_pascal_case() {
  echo "$1" \
    | sed 's/[^a-zA-Z0-9]/ /g' \
    | awk '{ for (i=1; i<=NF; i++) printf toupper(substr($i,1,1)) substr($i,2) }'
}

to_camel_case() {
  local pascal
  pascal=$(to_pascal_case "$1")
  echo "$(tr '[:upper:]' '[:lower:]' <<< ${pascal:0:1})${pascal:1}"
}

echo "== Create Feature Script =="

read -p "Category name (e.g. leads, health-check): " CATEGORY
CATEGORY_KB=$(to_kebab_case "$CATEGORY")
CATEGORY_PATH="src/features/$CATEGORY_KB"

if [[ -d "$CATEGORY_PATH" ]]; then
  echo "Category already exists: $CATEGORY_PATH"
else
  run "mkdir -p $CATEGORY_PATH"
fi

read -p "Feature name (e.g. create lead): " FEATURE
FEATURE_KB=$(to_kebab_case "$FEATURE")
FEATURE_PC=$(to_pascal_case "$FEATURE")
FEATURE_PATH="$CATEGORY_PATH/$FEATURE_KB"

run "mkdir -p $FEATURE_PATH"

read -p "Persistence type (mongo, sql, etc): " PERSISTENCE
PERSISTENCE_PC=$(to_pascal_case "$PERSISTENCE")

FILES=(
  "${FEATURE_PC}Controller.ts"
  "${FEATURE_PC}DTO.ts"
  "${FEATURE_PC}Repository.ts"
  "${FEATURE_PC}UseCase.ts"
  "${FEATURE_PC}.entity.ts"
  "index.ts"
  "${PERSISTENCE_PC}${FEATURE_PC}Repository.ts"
)

for FILE in "${FILES[@]}"; do
  run "touch $FEATURE_PATH/$FILE"
done

ROUTES_DIR="src/shared/infra/http/routes"
ROUTE_FILE="$(to_camel_case "$FEATURE").routes.ts"

run "mkdir -p $ROUTES_DIR"
run "touch $ROUTES_DIR/$ROUTE_FILE"

echo ""
echo "== Files created =="
for FILE in "${FILES[@]}"; do
  echo "- $FEATURE_PATH/$FILE"
done
echo "- $ROUTES_DIR/$ROUTE_FILE"

echo ""
echo "== What each file is for =="
echo "Controller: handles HTTP input/output and validation."
echo "DTO: defines input/output data contracts."
echo "UseCase: contains business rules."
echo "Repository: persistence contract (interface)."
echo "Entity: domain model and rules."
echo "PersistenceRepository: concrete DB implementation."
echo "Routes file: HTTP route definitions."

echo ""
echo "⚠️ Remember to import the route file in:"
echo "src/shared/infra/http/index.ts"

echo ""
echo "📘 For more details, check the project documentation."

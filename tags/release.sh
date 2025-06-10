#!/bin/bash

set -e

# Choix de l'outil
TOOL=$1

if [ -z "$TOOL" ]; then
  echo "Quel outil souhaitez-vous utiliser ?"
  echo "1) standard-version"
  echo "2) semantic-release"
  read -p "Votre choix (1 ou 2) : " CHOICE
  case $CHOICE in
    1) TOOL="standard-version" ;;
    2) TOOL="semantic-release" ;;
    *) echo "Choix invalide" && exit 1 ;;
  esac
fi

# Fonction release avec standard-version
release_with_standard_version() {
  echo "Incrémentation de version (standard-version)..."
  npx standard-version --release-as minor --changelog

  VERSION=$(jq -r .version package.json)
  echo "Nouvelle version : v$VERSION"

  echo "Création du tag git..."
  git push --follow-tags origin main

  echo "Création de la release GitHub..."
  gh release create "v$VERSION" -F CHANGELOG.md --title "Release v$VERSION"
}

# Fonction release avec semantic-release
release_with_semantic_release() {
  echo "Simulation de release avec semantic-release"
  npx semantic-release
}

# Lancer le bon outil
case $TOOL in
  standard-version)
    release_with_standard_version
    ;;
  semantic-release)
    release_with_semantic_release
    ;;
  *)
    echo "Outil non reconnu : $TOOL"
    exit 1
    ;;
esac
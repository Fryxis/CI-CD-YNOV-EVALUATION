#!/bin/bash

# Nom du disque à sauvegarder
DISK_NAME="api-vm"
# Zone du disque
ZONE="europe-west9-b"
# Préfixe du snapshot
SNAPSHOT_NAME="snapshot-${DISK_NAME}-$(date +%Y%m%d-%H%M%S)"

echo "🔄 Création du snapshot : $SNAPSHOT_NAME"
gcloud compute disks snapshot "$DISK_NAME" \
    --snapshot-names="$SNAPSHOT_NAME" \
    --zone="$ZONE"

if [ $? -eq 0 ]; then
    echo "✅ Snapshot créé avec succès : $SNAPSHOT_NAME"
else
    echo "❌ Échec de la création du snapshot"
    exit 1
fi

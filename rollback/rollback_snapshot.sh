# Supprimer le disque corrompu
gcloud compute instances detach-disk api-vm --disk api-vm --zone europe-west9-b
gcloud compute disks delete api-vm --zone europe-west9-b --quiet

# Recréer le disque à partir du snapshot
gcloud compute disks create api-vm \
  --source-snapshot=snapshot-api-20250611102000 \
  --zone=europe-west9-b

# Rattacher à la VM
gcloud compute instances attach-disk appi-vm \
  --disk=vm-disk \
  --zone=europe-west9-b

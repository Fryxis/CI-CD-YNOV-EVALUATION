# Affiche l'adresse IP externe de la VM
output "vm_external_ip" {
  description = "Adresse IP publique de la VM"
  value       = google_compute_instance.vm_instance.network_interface[0].access_config[0].nat_ip
}

# Affiche le nom de la VM
output "vm_name" {
  description = "Nom de l'instance VM"
  value       = google_compute_instance.vm_instance.name
}

# Affiche la zone utilisée
output "vm_zone" {
  description = "Zone de déploiement"
  value       = google_compute_instance.vm_instance.zone
}

# Identifiant du projet GCP
variable "project_id" {
  description = "ID du projet Google Cloud"
  type        = string
}

# Région où déployer les ressources
variable "region" {
  description = "Région GCP"
  type        = string
  default     = "europe-west9"
}

# Zone où déployer la VM
variable "zone" {
  description = "Zone GCP"
  type        = string
  default     = "europe-west9-b"
}

variable "gcp_credentials" {
  description = "Clé JSON GCP brute"
  type        = string
  sensitive   = true
}

variable "ssh_public_key" {
  type        = string
  description = "Clé publique SSH pour la VM"
}
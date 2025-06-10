provider "google" {
  credentials = var.gcp_credentials
  project     = var.project_id
  region      = var.region
  zone        = var.zone
}

# Image Ubuntu 22.04 LTS la plus récente
data "google_compute_image" "ubuntu" {
  family  = "ubuntu-2204-lts"
  project = "ubuntu-os-cloud"
}

# Réseau VPC
resource "google_compute_network" "vpc_network" {
  name = "api-network"
}

# Firewall : autorise SSH et API (3000)
resource "google_compute_firewall" "default" {
  name    = "allow-ssh-http"
  network = google_compute_network.vpc_network.name

  allow {
    protocol = "tcp"
    ports    = ["22", "3000"]
  }

  source_ranges = ["0.0.0.0/0"]
}

# VM Ubuntu
resource "google_compute_instance" "vm_instance" {
  name         = "api-vm"
  machine_type = "e2-medium"
  zone         = var.zone

  boot_disk {
    initialize_params {
      image = data.google_compute_image.ubuntu.self_link
    }
  }

  network_interface {
    network = google_compute_network.vpc_network.name
    access_config {}
  }

  metadata = {
    ssh-keys = "lennytooxikx:${var.ssh_public_key}"
  }
}

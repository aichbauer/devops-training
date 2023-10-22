terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~>3.0"
    }
  }
}

provider "azurerm" {
  # why skip provider registration?
  # azure provider always registeres all ressources
  # even if not working with italias
  # so if you need that register the service first
  # cli or dashboard
  # if not needed skip it
  skip_provider_registration = true
  features {}
}

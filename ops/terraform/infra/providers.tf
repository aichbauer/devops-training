terraform {
  required_version = ">=1.0"

  required_providers {
    # plugins
    # that manage external apis
    azapi = {
      source  = "azure/azapi"
      version = "~>1.5"
    }
    #
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~>3.0"
    }
    random = {
      source  = "hashicorp/random"
      version = "~>3.0"
    }
  }

  backend "azurerm" {
    resource_group_name  = "tfstate"
    # use the storage_account_name from the outputs of the backend
    storage_account_name = "tfstate3ocwwb6l7h"
    container_name       = "tfstate"
    key                  = "terraform.tfstate"
  }
}

provider "azurerm" {
  # why skip provider registration?
  # azure provider always registeres all ressources
  # even if not working with it
  # so if you need that register the service first
  # cli or dashboard
  # if not needed skip it
  skip_provider_registration = true
  features {}
}

resource "azurerm_resource_group" "rg" {
  location = var.resource_group_location
  name     = "devops-test-resource-group"
}

resource "azurerm_kubernetes_cluster" "k8s" {
  location            = azurerm_resource_group.rg.location
  name                = "devops-test-cluster"
  resource_group_name = azurerm_resource_group.rg.name
  dns_prefix          = "devops-test-dns-prefix"
  sku_tier            = "Free"
  identity {
    type = "SystemAssigned"
  }

  default_node_pool {
    name       = "agentpool"
    vm_size    = "standard_b2s"
    node_count = var.node_count
  }
  linux_profile {
    admin_username = "ubuntu"

    ssh_key {
      key_data = azapi_resource_action.ssh_public_key_gen.output.publicKey
    }
  }
  network_profile {
    network_plugin    = "kubenet"
    load_balancer_sku = "standard"
  }

  tags = {
    Environment = "devops-test",
  }
    timeouts {
    create = "420m"
    update = "420m"
    delete = "30m"
  }
}

resource "azurerm_postgresql_server" "devops_test_postgres_server" {
  name                = "devops-test-postgres-server"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name

  sku_name = "B_Gen5_1"

  storage_mb                        = 5120
  backup_retention_days             = 7
  geo_redundant_backup_enabled      = false
  auto_grow_enabled                 = true
  administrator_login               = "devopstestpostgresuser"
  # in production you would manage passwords with a secrets management tool
  # e.g. Azure KeyVault or Hashicorp Vault
  administrator_login_password      = var.devops_test_database_password
  # NOTE: Single Server is retiring and sees the EOL on March 28, 2025
  # Production: Use Flexible Server
  version                           = "11"
  ssl_enforcement_enabled           = true

  tags = {
    Environment = "devops-test",
  }
  timeouts {
    create = "420m"
    update = "420m"
    delete = "30m"
  }
}

resource "azurerm_postgresql_database" "devops_test_prostgres_database" {
  name                = "devops-test-postgres-database"
  resource_group_name = azurerm_resource_group.rg.name
  server_name         = azurerm_postgresql_server.devops_test_postgres_server.name
  charset             = "UTF8"
  collation           = "English_United States.1252"
  timeouts {
    create = "420m"
    delete = "30m"
  }
}

resource "azurerm_postgresql_firewall_rule" "example" {
  name                = "public-internet"
  resource_group_name = azurerm_resource_group.rg.name
  server_name         = azurerm_postgresql_server.devops_test_postgres_server.name
  start_ip_address    = "0.0.0.0"
  end_ip_address      = "255.255.255.255"
    timeouts {
    create = "420m"
    delete = "30m"
  }
}

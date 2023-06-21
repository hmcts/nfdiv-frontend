provider "azurerm" {
  features {}
}

locals {
  vaultName = "${var.product}-${var.env}"
}

data "azurerm_subnet" "core_infra_redis_subnet" {
  name                 = "core-infra-subnet-1-${var.env}"
  virtual_network_name = "core-infra-vnet-${var.env}"
  resource_group_name = "core-infra-${var.env}"
}

module "nfdiv-frontend-session-storage" {
  source   = "git@github.com:hmcts/cnp-module-redis?ref=master"
  product  = "${var.product}-${var.component}-redis"
  location = var.location
  env      = var.env
  subnetid = data.azurerm_subnet.core_infra_redis_subnet.id
  common_tags  = var.common_tags
}

data "azurerm_key_vault" "key_vault" {
  name = local.vaultName
  resource_group_name = local.vaultName
}

resource "azurerm_key_vault_secret" "redis_access_key" {
  name         = "redis-access-key"
  value        = module.nfdiv-frontend-session-storage.access_key
  key_vault_id = data.azurerm_key_vault.key_vault.id
}

module "nfdiv-frontend-redis6" {
  source   = "git@github.com:hmcts/cnp-module-redis?ref=master"
  product  = var.product
  name     = "${var.product}-${var.component}-${var.env}"
  location = var.location
  env      = var.env
  private_endpoint_enabled = true
  redis_version = "6"
  business_area = "cft"
  public_network_access_enabled = false
  common_tags  = var.common_tags
}

resource "azurerm_key_vault_secret" "redis6_access_key" {
  name         = "redis6-access-key"
  value        = module.nfdiv-frontend-redis6.access_key
  key_vault_id = data.azurerm_key_vault.key_vault.id
}

provider "azurerm" {
  features {}
}

locals {
  vaultName = "${var.product}-${var.env}"
}

data "azurerm_key_vault" "key_vault" {
  name = local.vaultName
  resource_group_name = local.vaultName
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

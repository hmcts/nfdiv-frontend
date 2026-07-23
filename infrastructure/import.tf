import {
  to = module.managed_redis.azurerm_managed_redis.redis
  id = "/subscriptions/${var.subscription}/resourceGroups/${var.product}-${var.component}-${var.env}-rg/providers/Microsoft.Cache/redisEnterprise/${var.product}-${var.component}-${var.env}"
}

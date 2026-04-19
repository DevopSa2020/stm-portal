// STM Portal - Azure App Service Deployment
// Deploy to: Microsoft Azure Sponsorship subscription
// Region: qatarcentral (closest to Saudi Arabia)

targetScope = 'resourceGroup'

param appName string = 'stm-portal'
param location string = 'qatarcentral'
param sku string = 'B1' // Basic tier

// App Service Plan
resource appServicePlan 'Microsoft.Web/serverfarms@2023-01-01' = {
  name: '${appName}-plan'
  location: location
  sku: {
    name: sku
    tier: 'Basic'
    size: 'B1'
    family: 'B'
    capacity: 1
  }
  properties: {
    reserved: true // Linux
  }
}

// Web App
resource webApp 'Microsoft.Web/sites@2023-01-01' = {
  name: appName
  location: location
  properties: {
    serverFarmId: appServicePlan.id
    siteConfig: {
      linuxFxVersion: 'NODE|20-lts'
      alwaysOn: true
      http20Enabled: true
      minTlsVersion: '1.2'
      appSettings: [
        {
          name: 'NODE_ENV'
          value: 'production'
        }
        {
          name: 'WEBSITE_WEBDEPLOY_USE_SCM'
          value: 'false'
        }
      ]
    }
  }
}

// Key Vault for secrets
resource keyVault 'Microsoft.KeyVault/vaults@2023-07-01' = {
  name: '${appName}-vault'
  location: location
  properties: {
    sku: {
      family: 'A'
      name: 'standard'
    }
    tenantId: tenant().tenantId
    accessPolicies: [
      {
        tenantId: tenant().tenantId
        objectId: reference(webApp.identity, '2023-01-01', 'full').principalId
        permissions: {
          secrets: [
            'get'
            'list'
          ]
        }
      }
    ]
  }
}

// Managed Identity for Web App
resource webAppIdentity 'Microsoft.Web/sites@2023-01-01' = {
  name: appName
  location: location
  identity: {
    type: 'SystemAssigned'
  }
  properties: {}
}

// Output
output webAppUrl string = 'https://${webApp.properties.defaultHostName}'
output keyVaultName string = keyVault.name

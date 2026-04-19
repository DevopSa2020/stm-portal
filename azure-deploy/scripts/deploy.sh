#!/bin/bash
# STM Portal - Azure Deployment Script
# Usage: ./deploy.sh [resource-group]

set -e

RESOURCE_GROUP="${1:-DevopResources}"
LOCATION="qatarcentral"
APP_NAME="stm-portal"
VAULT_NAME="${APP_NAME}-vault"

echo "🚀 Deploying STM Portal to Azure..."
echo "Resource Group: $RESOURCE_GROUP"
echo "Location: $LOCATION"
echo ""

# Check if resource group exists
echo "📦 Checking resource group..."
az group show --name "$RESOURCE_GROUP" --query name --output tsv > /dev/null 2>&1 || {
    echo "Creating resource group: $RESOURCE_GROUP"
    az group create --name "$RESOURCE_GROUP" --location "$LOCATION"
}

# Deploy Bicep template
echo "🏗️  Deploying Azure resources..."
az deployment group create \
    --resource-group "$RESOURCE_GROUP" \
    --template-file azure-deploy/bicep/main.bicep \
    --parameters appName="$APP_NAME"

# Get web app name
WEBAPP_ID=$(az webapp show --name "$APP_NAME" --resource-group "$RESOURCE_GROUP" --query id --output tsv)

# Configure deployment credentials
echo "🔐 Configuring deployment credentials..."
az webapp deployment user set --user-name "stmdeploy" --password "$(openssl rand -base64 16)"

# Get publish profile
echo "📥 Downloading publish profile..."
az webapp deployment publish-profile \
    --name "$APP_NAME" \
    --resource-group "$RESOURCE_GROUP" \
    --xml > azure-deploy/scripts/publish-profile.xml

echo ""
echo "✅ Deployment complete!"
echo ""
echo "Next steps:"
echo "1. Build the app: npm run build"
echo "2. Deploy via GitHub Actions or manually:"
echo "   az webapp deployment source config-zip \\"
echo "     --resource-group $RESOURCE_GROUP \\"
echo "     --name $APP_NAME \\"
echo "     --src src.zip"
echo ""
echo "Web App URL: https://${APP_NAME}.azurewebsites.net"

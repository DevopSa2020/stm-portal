# DEPLOYMENT.md - STM Portal Deployment Guide

## Overview

STM Portal is a Next.js 16 application deployed to Azure App Service using standalone output mode.

## Architecture

- **Platform**: Azure App Service (Linux, Node.js 20 LTS)
- **Build**: Next.js 16 with App Router
- **Deployment**: Standalone mode (no build during deployment)
- **CI/CD**: GitHub Actions with Azure deployment

## Prerequisites

- Azure CLI installed and authenticated
- GitHub repository access
- Azure service principal credentials

## Deployment Process

### 1. Build Configuration

The app uses Next.js standalone output:

```javascript
// next.config.js
module.exports = {
  output: 'standalone',
  // ... rest of config
}
```

### 2. Azure App Service Configuration

**Required Settings:**
- **Linux FX Version**: `NODE|20-lts`
- **Startup Command**: `node server.js`
- **SCM_DO_BUILD_DURING_DEPLOYMENT**: `false` (critical!)

**Set via CLI:**
```bash
az webapp config set \
  --resource-group DevopResources \
  --name stm-portal \
  --startup-file "node server.js"

az webapp config appsettings set \
  --resource-group DevopResources \
  --name stm-portal \
  --settings SCM_DO_BUILD_DURING_DEPLOYMENT=false
```

### 3. Deployment Methods

#### Option A: GitHub Actions (Recommended)

Push to `main` branch triggers automatic deployment.

**Workflow**: `.github/workflows/deploy.yml`

1. Builds Next.js standalone output
2. Creates deployment package from `.next/standalone`
3. Deploys to Azure App Service via zip deploy

#### Option B: Manual Deployment

```bash
# Build locally
npm run build

# Create deployment package
cd .next/standalone
zip -r ../deploy-standalone.zip .

# Deploy to Azure
az webapp deployment source config-zip \
  --resource-group DevopResources \
  --name stm-portal \
  --src .next/deploy-standalone.zip
```

### 4. Deployment Structure

The standalone output must be deployed with this structure:

```
/home/site/wwwroot/
├── server.js              # Next.js standalone server
├── package.json           # From standalone output
├── node_modules/          # Production dependencies only
└── .next/
    ├── server/            # Server-side bundles
    ├── static/            # Client-side assets
    └── required-server-files.json
```

**Important**: Do NOT deploy the full project root. Only deploy the `.next/standalone` output.

## Troubleshooting

### 503 Error - Service Unavailable

**Common Causes:**
1. Wrong startup command (should be `node server.js`)
2. Build during deployment enabled (should be disabled)
3. Missing `server.js` in deployment root

**Check Logs:**
```bash
az webapp log tail --resource-group DevopResources --name stm-portal
```

**Verify Configuration:**
```bash
az webapp config show \
  --resource-group DevopResources \
  --name stm-portal \
  --query "{startupCommand:appCommandLine, linuxFxVersion:linuxFxVersion}"
```

### Build Errors

If you see "Couldn't find any `pages` or `app` directory":
- Ensure `SCM_DO_BUILD_DURING_DEPLOYMENT=false`
- Deploy pre-built standalone output, not source code

### SSL/Certificate Issues

For custom domain SSL:
1. Add custom domain in Azure Portal
2. Validate domain ownership (TXT record)
3. Bind App Service Managed Certificate or upload custom cert

```bash
# Create managed certificate
az webapp config ssl create \
  --resource-group DevopResources \
  --name stm-portal \
  --hostname stm.devop.com.sa
```

## Monitoring

**Azure Portal:**
- App Service → Monitoring → Logs
- App Service → Deployment Center → Logs

**CLI:**
```bash
# View recent deployments
az webapp deployment list \
  --resource-group DevopResources \
  --name stm-portal

# Stream logs
az webapp log tail \
  --resource-group DevopResources \
  --name stm-portal
```

## Environment Variables

Set in Azure Portal → Configuration → Application settings:

- `NODE_ENV`: `production`
- Any app-specific secrets

## Rollback

To rollback to previous deployment:

```bash
az webapp deployment source config-zip \
  --resource-group DevopResources \
  --name stm-portal \
  --src <previous-deployment-zip>
```

Or use Azure Portal → Deployment Center → Activity Log → Redeploy

## Support

For issues, check:
1. Azure App Service logs
2. GitHub Actions workflow runs
3. Next.js build output

---

**Last Updated**: 2026-04-19
**Version**: 1.0

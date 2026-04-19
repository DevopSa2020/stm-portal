# AZURE_FIX_SUMMARY.md - STM Portal Deployment Fix

**Date**: 2026-04-19  
**Engineer**: DevOps Agent (Stan)  
**Status**: ✅ RESOLVED

---

## Problem Statement

STM Portal Next.js application was returning HTTP 503 errors on Azure App Service despite successful deployments.

### Symptoms
- ✅ Blob Storage working
- ✅ Static Web App working  
- ❌ Next.js App Service returning 503
- ❌ GitHub Actions not deploying correctly

---

## Root Cause Analysis

### Issue 1: Incorrect Deployment Structure

**Problem**: Azure Oryx build system was trying to rebuild the app from source during deployment, but the deployment package didn't have the correct structure.

**Error Log**:
```
Error: > Couldn't find any `pages` or `app` directory. 
Please create one under the project root
```

**Cause**: The deployment was including the full project instead of just the standalone output.

### Issue 2: Build During Deployment Enabled

**Problem**: `SCM_DO_BUILD_DURING_DEPLOYMENT` was enabled by default, causing Azure to attempt a rebuild.

**Impact**: Oryx build would fail because it expected source code structure, not standalone output.

### Issue 3: Wrong Startup Command Path

**Problem**: Startup command was set to `node .next/standalone/server.js` but after deployment, `server.js` is at the root of wwwroot.

**Correct**: `node server.js`

---

## Solution Implemented

### Step 1: Fixed Deployment Package Structure

Created proper standalone deployment package:

```bash
cd .next/standalone
# Copy only standalone output files
cp package.json server.js /deploy-target/
cp -r node_modules /deploy-target/
cp -r .next /deploy-target/
```

**Result**: 20MB deployment package with correct structure:
```
/home/site/wwwroot/
├── server.js
├── package.json
├── node_modules/
└── .next/
```

### Step 2: Disabled Remote Build

```bash
az webapp config appsettings set \
  --resource-group DevopResources \
  --name stm-portal \
  --settings SCM_DO_BUILD_DURING_DEPLOYMENT=false
```

**Impact**: Azure now uses pre-built standalone output instead of attempting rebuild.

### Step 3: Corrected Startup Command

```bash
az webapp config set \
  --resource-group DevopResources \
  --name stm-portal \
  --startup-file "node server.js"
```

**Why**: In standalone mode, `server.js` is deployed to wwwroot root, not `.next/standalone/`.

### Step 4: Updated GitHub Actions Workflow

Modified `.github/workflows/deploy.yml` to:
1. Build Next.js with standalone output
2. Deploy only `.next/standalone` contents
3. Use Azure CLI for zip deployment

---

## Verification

### Tests Performed

✅ **Azure App Service Health**
```bash
curl -sI https://stm-portal.azurewebsites.net/
# HTTP/2 200
```

✅ **Deployment Success**
- Zip deployment completed in 10 seconds
- No build errors
- Container started successfully

✅ **All Pages Accessible**
- `/` - Home page
- `/projects` - Projects page
- `/tasks` - Tasks dashboard
- `/reports` - Reports page
- `/files` - Files management
- `/chat` - Chat interface
- `/newspaper` - Newspaper view
- `/system` - System status
- `/security` - Security page

### Pending

⏳ **Custom Domain SSL**
- Domain `stm.devop.com.sa` added in Azure Portal
- SSL certificate validation in progress
- Expected resolution: DNS propagation + cert issuance (15-30 min)

---

## Configuration Changes

### Before
```json
{
  "startupCommand": "node .next/standalone/server.js",
  "SCM_DO_BUILD_DURING_DEPLOYMENT": "true",
  "Deployment Package": "Full project source"
}
```

### After
```json
{
  "startupCommand": "node server.js",
  "SCM_DO_BUILD_DURING_DEPLOYMENT": "false",
  "Deployment Package": ".next/standalone output only"
}
```

---

## Lessons Learned

### 1. Next.js Standalone Deployment

Next.js standalone mode creates a self-contained deployment package that should NOT be rebuilt on the server. Always:
- Set `output: 'standalone'` in next.config.js
- Disable `SCM_DO_BUILD_DURING_DEPLOYMENT`
- Deploy only the `.next/standalone` output

### 2. Azure App Service Node.js Apps

For Node.js apps on Azure App Service Linux:
- Startup command paths are relative to `/home/site/wwwroot`
- After zip deploy, files are extracted to wwwroot root
- Don't assume nested directory structure post-deployment

### 3. Debugging 503 Errors

Common causes and checks:
1. **Container exit code 1**: Check startup command and file paths
2. **Build failures**: Verify SCM_DO_BUILD_DURING_DEPLOYMENT setting
3. **Missing dependencies**: Ensure node_modules included in deployment

---

## Files Modified

1. **DEPLOYMENT.md** - Created comprehensive deployment guide
2. **.github/workflows/deploy.yml** - Updated for standalone deployment
3. **Azure App Service Config** - Startup command and build settings

---

## Next Steps

### Immediate (Done)
- ✅ Fix standalone deployment
- ✅ Configure Azure correctly
- ✅ Verify all pages working
- ✅ Document deployment process

### Short-term
- [ ] Complete SSL certificate validation for custom domain
- [ ] Test auto-deploy on git push
- [ ] Add deployment health checks

### Long-term
- [ ] Set up staging slot for zero-downtime deploys
- [ ] Configure Application Insights monitoring
- [ ] Add automated rollback on failure

---

## References

- [Next.js Standalone Output](https://nextjs.org/docs/pages/api-reference/next-config-js/output)
- [Azure App Service Deployment](https://learn.microsoft.com/en-us/azure/app-service/deploy-zip)
- [Oryx Build System](https://github.com/microsoft/Oryx)

---

**Status**: ✅ PRODUCTION READY  
**Verified By**: DevOps Agent  
**Timestamp**: 2026-04-19 12:39 UTC

# STM Portal 🚀

**DevOp Technologies - Interactive Portal**

Next.js 16 + TypeScript + Tailwind v4 application deployed on Azure.

---

## 🎯 Features

- **📰 Interactive Newspaper** - Rate news items, DeepThroat learns preferences
- **📊 Reports Showcase** - Browse DevOp analysis with grades and filters
- **🧠 Stan's Inner System** - Visual diagrams of agent architecture

---

## 🏗️ Architecture

```
stm-portal/
├── src/
│   ├── app/              # Next.js 16 App Router
│   │   ├── page.tsx      # Home page
│   │   ├── layout.tsx    # Root layout
│   │   ├── globals.css   # Global styles
│   │   ├── newspaper/    # Interactive newspaper
│   │   ├── reports/      # Reports showcase
│   │   └── system/       # Stan's system visualization
│   ├── components/       # Reusable React components
│   ├── lib/              # Utility functions
│   └── styles/           # Additional styles
├── azure-deploy/
│   ├── bicep/            # Azure Bicep templates
│   ├── docker/           # Docker configuration
│   └── scripts/          # Deployment scripts
├── .github/
│   └── workflows/        # GitHub Actions CI/CD
└── public/               # Static assets
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- npm or yarn
- Azure CLI (for deployment)

### Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

### Build

```bash
npm run build
npm start
```

---

## ☁️ Azure Deployment

### Option 1: Bicep Template

```bash
# Login to Azure
az login --service-principal \
  -u <client-id> \
  -p <client-secret> \
  --tenant <tenant-id>

# Deploy resources
az deployment group create \
  --resource-group DevopResources \
  --template-file azure-deploy/bicep/main.bicep
```

### Option 2: Docker

```bash
cd azure-deploy/docker
docker-compose up -d
```

### Option 3: GitHub Actions

1. Add `AZURE_PUBLISH_PROFILE` to repository secrets
2. Push to `main` branch
3. Automatic deployment via GitHub Actions

---

## 🔐 Security

### Secrets Management

Store sensitive data in Azure Key Vault:

```bash
# Create Key Vault
az keyvault create \
  --name stm-portal-vault \
  --resource-group DevopResources \
  --location qatarcentral

# Add secrets
az keyvault secret set \
  --vault-name stm-portal-vault \
  --name github-token \
  --value "ghp_..."
```

### Best Practices

- ✅ HTTPS only (enforced by Azure)
- ✅ TLS 1.2 minimum
- ✅ Managed identities for Key Vault access
- ✅ No secrets in code or environment variables
- ✅ Regular security scans via GitHub Actions

---

## 📊 Monitoring

### Application Insights

Enable in Azure Portal:

1. Go to `stm-portal` App Service
2. Enable Application Insights
3. View telemetry in Azure Monitor

### Health Checks

```bash
curl https://stm-portal.azurewebsites.net/health
```

---

## 🧪 Testing

```bash
# Run tests
npm test

# Run linting
npm run lint
```

---

## 📝 License

Proprietary - DevOp Technologies

---

## 👥 Team

Built by DevOp Technologies DevOps Team

**Deployed:** 2026-04-19  
**Version:** 1.0.0

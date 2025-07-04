# 🚀 CI/CD Documentation

## Overview

NanoLux uses GitHub Actions for comprehensive CI/CD pipeline with multi-platform deployment capabilities.

## Pipeline Structure

### 🔄 Build Job
- **Node.js 20** environment
- **npm ci** for reproducible builds
- **Playwright** browser testing setup
- **Vitest** test execution with coverage
- **Storybook** integration testing
- **Build artifacts** generation

### 📊 Bundle Analysis Job
- **Vite bundle analyzer** for size monitoring
- **Performance budgets** (<50KB target)
- **Asset optimization** tracking
- **Size trend** analysis

### 📝 PR Integration
- **Automated comments** with test results
- **Coverage reports** inline
- **Bundle size** comparison
- **Performance warnings** for budget overruns

### 🚀 Deployment Jobs

#### GitHub Pages
- **Automatic deployment** on main branch
- **Test reports** at `/reports`
- **Storybook** at `/storybook`
- **Coverage dashboard** integration

#### GitLab Pages
- **Mirror deployment** to GitLab
- **Cross-platform** availability
- **Backup hosting** option

## Configuration

### Required Secrets
```
GITLAB_TOKEN        # GitLab access token
GITLAB_USERNAME     # GitLab username
GITLAB_PROJECT_PATH # GitLab project path (user/repo)
```

### Environment Variables
```
NODE_ENV=production
GITHUB_PAGES=true
```

## Features

### 🧪 Testing Integration
- **Unit tests** with Vitest
- **Integration tests** with Playwright
- **Storybook tests** for component validation
- **Coverage thresholds**: 80% lines, 70% branches

### 📦 Performance Monitoring
- **Bundle size** tracking
- **Asset optimization** validation
- **Performance budgets** enforcement
- **Trend analysis** over time

### 📁 Artifact Management
- **30-day retention** for all artifacts
- **Coverage reports** preservation
- **Build artifacts** for deployment
- **Test results** archival

## Workflow Triggers

### Push to Main/Master
- Full CI/CD pipeline
- Automated deployment
- Performance analysis
- Report generation

### Pull Requests
- Test execution
- Coverage analysis
- Bundle size comparison
- Automated PR comments

## Monitoring & Reports

### Coverage Reports
- **Line coverage**: 80% minimum
- **Function coverage**: 80% minimum
- **Branch coverage**: 70% minimum
- **Statement coverage**: 80% minimum

### Bundle Analysis
- **Total size**: <50KB target
- **Individual files**: <100KB warning
- **Gzip analysis**: Automatic
- **Performance scoring**: Visual indicators

### Test Results
- **Pass/fail status**: Real-time
- **Performance metrics**: Execution time
- **Flaky test detection**: Retry mechanisms
- **Trend analysis**: Historical data

## Troubleshooting

### Common Issues

#### Missing Secrets
```bash
# Error: Missing GitLab secrets
# Solution: Configure repository secrets
GITLAB_TOKEN, GITLAB_USERNAME, GITLAB_PROJECT_PATH
```

#### GitHub Pages Not Enabled
```bash
# Error: Pages not configured
# Solution: Enable in repository settings
Settings > Pages > Source: GitHub Actions
```

#### Bundle Size Exceeded
```bash
# Warning: Bundle >50KB
# Solution: Code splitting, tree shaking
npm run build -- --analyze
```

### Debug Commands
```bash
# Local testing
npm run test:coverage
npm run build
npm run build-storybook

# Bundle analysis
npx vite-bundle-analyzer dist/assets

# Coverage validation
npm run test:coverage && cat coverage/coverage-summary.json
```

## Best Practices

### Performance
- Monitor bundle size trends
- Use code splitting for large features
- Optimize assets and images
- Leverage tree shaking

### Testing
- Maintain high coverage
- Write integration tests
- Test Storybook stories
- Validate accessibility

### Deployment
- Use semantic versioning
- Tag releases properly
- Monitor deployment status
- Validate live sites

## Integration with Development

### Pre-commit Hooks
```bash
# Recommended pre-commit setup
npm run test
npm run build
npm run lint
```

### Local Development
```bash
# Verify CI/CD locally
npm run test:coverage  # Test like CI
npm run build         # Build like CI
npm run preview       # Test production build
```

### Performance Budget
- **JavaScript**: <40KB
- **CSS**: <10KB
- **Total**: <50KB
- **Loading time**: <3s on 3G

## Metrics & KPIs

### Build Performance
- **Build time**: <2 minutes
- **Test execution**: <30 seconds
- **Deployment time**: <1 minute

### Quality Gates
- **Test coverage**: ≥80%
- **Build success**: 100%
- **Bundle size**: <50KB
- **Performance score**: ≥90

### Reliability
- **Uptime**: 99.9%
- **Deployment success**: ≥98%
- **Rollback time**: <5 minutes

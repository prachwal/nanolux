# GitHub Actions Setup for NanoLux

## Required Secrets

To enable GitLab Pages deployment from GitHub Actions, you need to set up the following repository secrets:

### GitLab Integration Secrets

1. **GITLAB_TOKEN**
   - Go to GitLab → User Settings → Access Tokens
   - Create a new token with `api`, `read_user`, and `write_repository` scopes
   - Copy the token value

2. **GITLAB_USERNAME**
   - Your GitLab username (not email)

3. **GITLAB_PROJECT_PATH**
   - Format: `username/repository-name` or `group/repository-name`
   - Example: `johndoe/my-nanolux-site`

### Setting up Secrets in GitHub

1. Go to your GitHub repository
2. Click on **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add each secret with the exact names above

### Alternative: GitHub Pages Only

If you don't want GitLab deployment, you can:

1. Remove the GitLab deployment step from `.github/workflows/build-and-deploy.yml`
2. Use only GitHub Pages (already configured in the workflow)

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm run test

# Run tests with coverage
npm run test:coverage

# Start Storybook
npm run storybook

# Run Storybook tests (requires Storybook to be running)
npm run test:stories

# Build for production
npm run build

# Build Storybook
npm run build-storybook
```

### Troubleshooting

#### Storybook Tests Failing
- Make sure Storybook is running on port 6006
- Check if you have stories in `src/**/*.stories.tsx`
- Verify Playwright browser dependencies are installed

#### GitLab Deployment Failing
- Check that all three GitLab secrets are set correctly
- Verify the GitLab repository exists and you have write access
- Make sure the GitLab token has sufficient permissions

#### Bundle Size Warnings
- Review the bundle analysis in GitHub Actions logs
- NanoLux targets < 50KB total bundle size
- Use the bundle analyzer to identify large dependencies

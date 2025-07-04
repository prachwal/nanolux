# GitHub Actions to GitLab Pages Deployment

## Wymagane Secrets w GitHub Repository

Aby pipeline działał poprawnie, musisz dodać następujące secrets w ustawieniach GitHub repository:

### 1. GitLab Token
- Nazwa: `GITLAB_TOKEN`
- Wartość: Personal Access Token z GitLab z uprawnieniami `write_repository`

### 2. GitLab Username
- Nazwa: `GITLAB_USERNAME`  
- Wartość: Twoja nazwa użytkownika GitLab

### 3. GitLab Project Path
- Nazwa: `GITLAB_PROJECT_PATH`
- Wartość: `username/repository-name` (ścieżka do repo GitLab)

## Jak dodać secrets:

1. Idź do Settings → Secrets and variables → Actions
2. Kliknij "New repository secret"
3. Dodaj każdy z wyżej wymienionych secrets

## Struktura Deployment:

```
GitLab Pages (public/)
├── index.html          # Główna aplikacja (z dist/)
├── assets/             # Zasoby aplikacji
├── storybook/          # Storybook documentation
│   ├── index.html
│   └── assets/
└── bundle-analysis.json # Analiza rozmiaru bundla
```

## URLs po deployment:

- **Główna aplikacja**: `https://username.gitlab.io/repository-name/`
- **Storybook**: `https://username.gitlab.io/repository-name/storybook/`

## Features Pipeline:

- ✅ **Build** - Buduje projekt i Storybook
- ✅ **Test** - Uruchamia testy przed deploymentem  
- ✅ **Bundle Analysis** - Sprawdza rozmiar bundla
- ✅ **Artifacts** - Zapisuje artefakty buildu
- ✅ **Auto Deploy** - Deploy tylko z main/master branch
- ✅ **PR Comments** - Komentarze z analizą bundla na PR

## Performance Monitoring:

Pipeline automatycznie sprawdza rozmiar bundla i ostrzega jeśli przekracza 50KB (zgodnie z filozofią NanoLux).

# 🚀 VERBIT HomeAssginment GitHub API Testing Framework

In order to bypass authorization for creating new issue and not keep clean any public repository,
a personal public demo repository https://github.com/mariand93/demo-repo was created on my account.
Also a test github account was used for auth. If you need auth token /users / passwords, please let me know.


## ✨ Features

- **End-to-End Testing**: Comprehensive test suite for GitHub Issues API
- **Edge Case Coverage**: Tests for special characters, long content, and error conditions
- **UI Integration**: Optional UI testing for issue creation and management
- **Strong Typing**: Full TypeScript support for reliable code
- **Clean Architecture**: Separation of concerns with services, data objects, and test layers

## 📊 Project Structure

```
📦 github-api-testing
 ┣ 📂 src
 ┃ ┣ 📂 modules
 ┃ ┃ ┣ 📂 api
 ┃ ┃ ┃ ┣ 📂 config
 ┃ ┃ ┃ ┃ ┣ 📄 api-config.ts
 ┃ ┃ ┃ ┃ ┗ 📄 environment.ts
 ┃ ┃ ┃ ┣ 📂 dto
 ┃ ┃ ┃ ┃ ┣ 📄 create-issue.dto.ts
 ┃ ┃ ┃ ┃ ┣ 📄 update-issue.dto.ts
 ┃ ┃ ┃ ┃ ┗ 📄 issue.dto.ts
 ┃ ┃ ┃ ┣ 📂 fixtures
 ┃ ┃ ┃ ┃ ┗ 📄 test-data.ts
 ┃ ┃ ┃ ┣ 📂 services
 ┃ ┃ ┃ ┃ ┣ 📄 base-api.service.ts
 ┃ ┃ ┃ ┃ ┗ 📄 github-issues.service.ts
 ┃ ┃ ┃ ┗ 📄 setup.ts
 ┃ ┃ ┗ 📂 ui
 ┃ ┃ ┃ ┗ 📂 pages
 ┃ ┃ ┃ ┃ ┣ 📂 issues
 ┃ ┃ ┃ ┃ ┃ ┣ 📄 IssuesListPage.ts
 ┃ ┃ ┃ ┃ ┃ ┗ 📄 NewIssuePage.ts
 ┃ ┃ ┃ ┃ ┣ 📄 LoginPage.ts
 ┃ ┃ ┃ ┃ ┗ 📄 RepositoryPage.ts
 ┣ 📂 tests
 ┃ ┣ 📂 modules
 ┃ ┃ ┣ 📂 api
 ┃ ┃ ┃ ┗ 📄 github-issues.spec.ts
 ┃ ┃ ┗ 📂 ui
 ┃ ┃ ┃ ┗ 📄 github-issues.e2e.spec.ts
 ┣ 📄 .env.example
 ┣ 📄 .gitignore
 ┣ 📄 package.json
 ┣ 📄 playwright.config.ts
 ┣ 📄 README.md
 ┗ 📄 tsconfig.json
```

## 🔧 Prerequisites

- **Node.js**: v16 or later
- **npm** or **yarn**
- **GitHub Account**: With a personal access token

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/mariand93/verbit-home-assignment
```

### 2. Install Dependencies

```bash
npm install
# or with yarn
yarn install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory based on the `.env.example` template:

```env
# GitHub Authentication
GITHUB_TOKEN=your_personal_access_token
GITHUB_USERNAME=your_github_username
GITHUB_PASSWORD=your_github_password

# Repository Settings
GITHUB_OWNER=target_repository_owner
GITHUB_REPO=target_repository_name
```

> ⚠️ **Security Note**: Never commit your `.env` file to version control. It's included in `.gitignore` by default.

## 🧪 Running Tests

### Run All Tests

```bash
npm test
# or with yarn
yarn test
```

### Run API Tests Only

```bash
npm run test:api
# or with yarn
yarn test:api
```

### Run UI Tests Only

```bash
npm run test:ui
# or with yarn
yarn test:ui
```

### View Test Report

```bash
npx playwright show-report
```

## 📈 Test Coverage

The test suite includes comprehensive validation for:

- ✅ Basic CRUD operations
- ✅ Handling of special characters and emojis
- ✅ International character support
- ✅ Markdown formatting
- ✅ Boundary testing (long titles/bodies)
- ✅ Error handling and validation
- ✅ State transitions (open/close/reopen)
- ✅ Batch operations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- [GitHub REST API Documentation](https://docs.github.com/en/rest)
- [Playwright Documentation](https://playwright.dev/docs/intro)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

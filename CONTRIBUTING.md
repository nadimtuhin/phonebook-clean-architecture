# Contributing to Phonebook Clean Architecture

Thank you for your interest in contributing to this project! This document provides guidelines for contributing to the Phonebook Clean Architecture project.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for all contributors.

## How to Contribute

### Reporting Bugs

1. **Check existing issues** first to avoid duplicates
2. **Use the bug report template** when creating a new issue
3. **Provide detailed information** including:
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Environment details (OS, browser, etc.)

### Suggesting Features

1. **Check existing feature requests** to avoid duplicates
2. **Use the feature request template**
3. **Explain the use case** and how it fits with clean architecture principles
4. **Consider implementation approach** that maintains the project's architectural integrity

### Development Setup

1. **Fork the repository**
2. **Clone your fork**:
   ```bash
   git clone https://github.com/your-username/phonebook-clean-architecture.git
   cd phonebook-clean-architecture
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Start development server**:
   ```bash
   npm run dev
   ```

### Making Changes

#### Architecture Guidelines

This project follows **Clean Architecture** principles. Please ensure your contributions maintain:

1. **Separation of Concerns**:
   - **Entities** (`/lib/entities/`): Core business logic and rules
   - **Use Cases** (`/lib/use-cases/`): Application-specific business rules
   - **Adapters** (`/lib/adapters/`): Interface adapters (repositories, etc.)
   - **UI Components** (`/components/`): Framework-specific UI code

2. **Dependency Rule**: Dependencies should point inward. UI depends on use cases, use cases depend on entities, never the reverse.

3. **Testability**: Business logic should be framework-independent and easily testable.

#### Code Style

- **TypeScript**: Use strict typing, avoid `any`
- **Naming**: Use descriptive names for functions, variables, and components
- **Components**: Keep components focused and single-purpose
- **Hooks**: Extract complex logic into custom hooks
- **Formatting**: The project uses Prettier and ESLint

#### Git Workflow

1. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. **Make your changes** following the guidelines above
3. **Test your changes**:
   ```bash
   npm run build
   npm run lint
   ```
4. **Commit with descriptive messages**:
   ```bash
   git commit -m "feat: add contact export functionality"
   ```
5. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```
6. **Create a Pull Request** using the provided template

### Pull Request Guidelines

- **Fill out the PR template** completely
- **Keep PRs focused** - one feature or bug fix per PR
- **Include tests** for new functionality
- **Update documentation** if needed
- **Ensure CI passes** (build, lint, tests)
- **Respond to feedback** promptly and professionally

### Testing

- Write unit tests for business logic (entities and use cases)
- Test components when they contain complex logic
- Ensure all tests pass before submitting PR

### Documentation

- Update README.md if you add new features
- Add JSDoc comments for complex functions
- Update architecture documentation if you modify the structure

## Development Philosophy

### Clean Architecture Benefits

1. **Framework Independence**: Business rules don't depend on frameworks
2. **Testable**: Business rules can be tested without UI, database, or external elements
3. **UI Independence**: Change the UI without changing business rules
4. **Database Independence**: Business rules not bound to database specifics
5. **External Agency Independence**: Business rules don't know about outside world

### Project Structure

```
├── lib/
│   ├── entities/          # Enterprise business rules
│   ├── use-cases/         # Application business rules
│   └── adapters/          # Interface adapters
├── components/            # UI components
├── hooks/                 # Custom React hooks
└── app/                   # Next.js app structure
```

## Getting Help

- **Issues**: For bug reports and feature requests
- **Discussions**: For questions and general discussion
- **Code Review**: For feedback on implementation approaches

## Recognition

Contributors will be recognized in:
- GitHub contributors list
- Release notes for significant contributions
- Project documentation

Thank you for contributing to Phonebook Clean Architecture! 🎉
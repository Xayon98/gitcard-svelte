# GitCard Component Tests

This directory contains comprehensive tests for the GitCard Svelte component using Vitest and Testing Library.

## Test Coverage

The `GitCard.test.ts` file covers the following aspects of the component:

### Basic Rendering
- ✅ Renders with default props
- ✅ Renders with custom user data
- ✅ Handles empty repositories array

### User Profile Display
- ✅ Renders avatar with correct attributes
- ✅ Displays user information (name, login, bio, location, company, email)
- ✅ Creates profile links with correct URLs
- ✅ Renders email as mailto link

### Repository Display
- ✅ Renders repository list correctly
- ✅ Shows repository names, descriptions, and programming languages
- ✅ Creates repository links with proper attributes (target="_blank", rel="noopener noreferrer")
- ✅ Renders programming language color indicators with correct styling

### Status Tooltip Functionality  
- ✅ Renders status tooltip when status is provided
- ✅ Does not render status tooltip when status is null
- ✅ Handles mouseenter and mouseleave events for tooltip expansion
- ✅ Cleans HTML div tags from status emoji
- ✅ Handles missing status message gracefully

### CSS and Styling
- ✅ Applies correct CSS classes
- ✅ Handles programming language color styling

## Running Tests

```bash
# Run all tests
npm test

# Run tests once (CI mode)
npm run test:run

# Run tests in watch mode
npm run test
```

## Test Setup

The test environment includes:
- **Vitest** for the test runner
- **@testing-library/svelte** for component testing utilities
- **@testing-library/jest-dom** for additional DOM matchers
- **jsdom** for DOM environment simulation
- **sass-embedded** for SCSS preprocessing

## Mocking

The tests mock the `@iconify/svelte` dependency since it's not essential for the component's core functionality testing.
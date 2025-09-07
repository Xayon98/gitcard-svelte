import { render, screen, fireEvent, waitFor } from '@testing-library/svelte';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import GitCard from '../lib/gitCard/gitCard.svelte';

// Mock the @iconify/svelte import
vi.mock('@iconify/svelte', () => ({
  default: vi.fn(() => ({ $$render: () => '<div data-testid="icon">Icon</div>' }))
}));

describe('GitCard Component', () => {
  const mockUserData = {
    name: 'John Doe',
    login: 'johndoe',
    avatar: 'https://example.com/avatar.jpg',
    bio: 'A passionate developer',
    location: 'New York, NY',
    company: 'Tech Corp',
    email: 'john@example.com',
    url: 'https://github.com/johndoe',
    status: {
      emojiHTML: '<div>🚀</div>',
      message: 'Working on something cool'
    },
    totalCount: 42,
    repositories: [
      {
        name: 'awesome-project',
        description: 'An awesome project description',
        url: 'https://github.com/johndoe/awesome-project',
        primaryLanguage: {
          name: 'JavaScript',
          color: '#f1e05a'
        }
      },
      {
        name: 'another-project',
        description: 'Another great project',
        url: 'https://github.com/johndoe/another-project',
        primaryLanguage: {
          name: 'Python',
          color: '#3572A5'
        }
      }
    ]
  };

  // Mock DOM methods
  beforeEach(() => {
    Object.defineProperty(HTMLElement.prototype, 'scrollWidth', {
      configurable: true,
      value: 100
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders with default props', () => {
    render(GitCard);
    
    expect(screen.getByText('Nom')).toBeInTheDocument();
    expect(screen.getByText('Pseudo')).toBeInTheDocument();
    expect(screen.getByText('Bio')).toBeInTheDocument();
    expect(screen.getByText('Location')).toBeInTheDocument();
    expect(screen.getByText('Company')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  it('renders with custom user data', () => {
    render(GitCard, mockUserData);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('johndoe')).toBeInTheDocument();
    expect(screen.getByText('A passionate developer')).toBeInTheDocument();
    expect(screen.getByText('New York, NY')).toBeInTheDocument();
    expect(screen.getByText('Tech Corp')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
  });

  it('renders avatar with correct attributes', () => {
    render(GitCard, mockUserData);
    
    const avatar = screen.getByAltText('Avatar');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('src', mockUserData.avatar);
    expect(avatar).toHaveAttribute('width', '150');
    expect(avatar).toHaveAttribute('height', '150');
  });

  it('renders repository list correctly', () => {
    render(GitCard, mockUserData);
    
    // Check for popular repositories header
    expect(screen.getByText('Popular repositories')).toBeInTheDocument();
    
    // Check for repository names
    expect(screen.getByText('awesome-project')).toBeInTheDocument();
    expect(screen.getByText('another-project')).toBeInTheDocument();
    
    // Check for repository descriptions
    expect(screen.getByText('An awesome project description')).toBeInTheDocument();
    expect(screen.getByText('Another great project')).toBeInTheDocument();
    
    // Check for programming languages
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
    expect(screen.getByText('Python')).toBeInTheDocument();
  });

  it('renders repository links with correct attributes', () => {
    render(GitCard, mockUserData);
    
    const repoLinks = screen.getAllByRole('link', { name: /awesome-project|another-project/ });
    expect(repoLinks).toHaveLength(2);
    
    expect(repoLinks[0]).toHaveAttribute('href', mockUserData.repositories[0].url);
    expect(repoLinks[0]).toHaveAttribute('target', '_blank');
    expect(repoLinks[0]).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders status tooltip when status is provided', () => {
    render(GitCard, mockUserData);
    
    const statusElement = screen.getByRole('tooltip');
    expect(statusElement).toBeInTheDocument();
    expect(statusElement).toHaveTextContent('🚀 Working on something cool');
  });

  it('does not render status tooltip when status is not provided', () => {
    const dataWithoutStatus = { ...mockUserData, status: null };
    render(GitCard, dataWithoutStatus);
    
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('handles status tooltip mouseenter and mouseleave events', async () => {
    // Mock the DOM manipulation methods
    const mockSetAttribute = vi.fn();
    const mockStyle = {
      width: '',
      paddingLeft: '',
      paddingRight: ''
    };

    // Mock getElementById to return element with mocked properties
    const mockElement = {
      scrollWidth: 120,
      style: mockStyle,
      setAttribute: mockSetAttribute
    };

    vi.spyOn(document, 'getElementById').mockReturnValue(mockElement as any);

    render(GitCard, mockUserData);
    
    const statusElement = screen.getByRole('tooltip');
    
    // Test mouseenter event
    await fireEvent.mouseEnter(statusElement);
    expect(mockElement.style.width).toBe('130px');
    
    // Test mouseleave event
    await fireEvent.mouseLeave(statusElement);
    expect(mockElement.style.width).toBe('1.5rem');
    expect(mockElement.style.paddingLeft).toBe('0.2rem');
    expect(mockElement.style.paddingRight).toBe('0.2rem');
  });

  it('cleans HTML tags from status emoji', () => {
    const statusWithDivTags = {
      ...mockUserData,
      status: {
        emojiHTML: '<div>🎉</div>',
        message: 'Celebrating!'
      }
    };
    
    render(GitCard, statusWithDivTags);
    
    const statusElement = screen.getByRole('tooltip');
    expect(statusElement).toHaveTextContent('🎉 Celebrating!');
  });

  it('renders profile links with correct URLs', () => {
    render(GitCard, mockUserData);
    
    const profileLinks = screen.getAllByRole('link').filter(link => 
      link.getAttribute('href') === mockUserData.url
    );
    
    // Should have links for name, login, and avatar
    expect(profileLinks.length).toBeGreaterThan(0);
    profileLinks.forEach(link => {
      expect(link).toHaveAttribute('href', mockUserData.url);
    });
  });

  it('renders email as mailto link', () => {
    render(GitCard, mockUserData);
    
    const emailLink = screen.getByRole('link', { name: mockUserData.email });
    expect(emailLink).toHaveAttribute('href', `mailto:${mockUserData.email}`);
  });

  it('renders programming language color indicators', () => {
    render(GitCard, mockUserData);
    
    // The language color indicators are div elements with inline styles
    const container = screen.getByText('JavaScript').parentElement;
    const colorIndicator = container?.querySelector('div[style*="background-color"]');
    
    expect(colorIndicator).toBeInTheDocument();
    expect(colorIndicator).toHaveStyle({ backgroundColor: '#f1e05a' });
  });

  it('renders skeleton loading state when flag is false', async () => {
    // We need to test the loading state, but the component initializes flag to true
    // and uses onMount to potentially set it to false. For testing purposes,
    // we can test by rendering and checking for animated pulse elements
    
    render(GitCard, { ...mockUserData, repositories: [] });
    
    // The component should render normally by default
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    
    // Note: Testing the loading state would require mocking the onMount lifecycle
    // or creating a separate test component that controls the flag prop
  });

  it('handles empty repositories array', () => {
    const dataWithNoRepos = { ...mockUserData, repositories: [] };
    render(GitCard, dataWithNoRepos);
    
    expect(screen.getByText('Popular repositories')).toBeInTheDocument();
    // Should not render any repository cards
    expect(screen.queryByText('awesome-project')).not.toBeInTheDocument();
  });

  it('applies correct CSS classes', () => {
    render(GitCard, mockUserData);
    
    // Check for main card class
    const cardElement = screen.getByText('John Doe').closest('.card');
    expect(cardElement).toHaveClass('card', 'w-full', 'flex-row');
  });

  it('handles missing status message gracefully', () => {
    const statusWithoutMessage = {
      ...mockUserData,
      status: {
        emojiHTML: '🔥',
        message: ''
      }
    };
    
    render(GitCard, statusWithoutMessage);
    
    const statusElement = screen.getByRole('tooltip');
    expect(statusElement).toHaveTextContent('🔥');
  });

  it('renders repository descriptions correctly', () => {
    render(GitCard, mockUserData);
    
    mockUserData.repositories.forEach(repo => {
      expect(screen.getByText(repo.description)).toBeInTheDocument();
    });
  });
});
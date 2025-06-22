import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DebugPanel } from './debug-panel';

// Mock the mutation function
const mockChangeTurn = jest.fn();

// Mock Convex
jest.mock('convex/react', () => ({
  useMutation: jest.fn(() => mockChangeTurn),
}));

// Mock the API
jest.mock('@/convex/_generated/api', () => ({
  api: {
    games: {
      debugChangeTurn: 'mocked-mutation',
    },
  },
}));

describe('DebugPanel', () => {
  const defaultProps = {
    gameId: 'game123',
    currentPlayer: 'playerA' as const,
    playerAName: 'Alice',
    playerBName: 'Bob',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders closed by default with bug icon', () => {
    render(<DebugPanel {...defaultProps} />);

    const bugButton = screen.getByTitle('Open Debug Panel');
    expect(bugButton).toBeInTheDocument();
    expect(screen.queryByText('Debug Panel')).not.toBeInTheDocument();
  });

  it('opens the panel when bug icon is clicked', async () => {
    const user = userEvent.setup();
    render(<DebugPanel {...defaultProps} />);

    const bugButton = screen.getByTitle('Open Debug Panel');
    await user.click(bugButton);

    expect(screen.getByText('Debug Panel')).toBeInTheDocument();
    expect(screen.getByText('Current Turn')).toBeInTheDocument();
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Switch Turn')).toBeInTheDocument();
  });

  it('closes the panel when close button is clicked', async () => {
    const user = userEvent.setup();
    render(<DebugPanel {...defaultProps} />);

    // Open panel
    await user.click(screen.getByTitle('Open Debug Panel'));

    // Close panel
    const closeButton = screen.getByTitle('Close');
    await user.click(closeButton);

    expect(screen.queryByText('Debug Panel')).not.toBeInTheDocument();
    expect(screen.getByTitle('Open Debug Panel')).toBeInTheDocument();
  });

  it('minimizes and expands the panel', async () => {
    const user = userEvent.setup();
    render(<DebugPanel {...defaultProps} />);

    // Open panel
    await user.click(screen.getByTitle('Open Debug Panel'));

    // Check content is visible
    expect(screen.getByText('Current Turn')).toBeInTheDocument();
    expect(
      screen.getByText('Debug mode - Development only')
    ).toBeInTheDocument();

    // Minimize
    const minimizeButton = screen.getByTitle('Minimize');
    await user.click(minimizeButton);

    // Check content is hidden but header remains
    expect(screen.getByText('Debug Panel')).toBeInTheDocument();
    expect(screen.queryByText('Current Turn')).not.toBeInTheDocument();
    expect(
      screen.queryByText('Debug mode - Development only')
    ).not.toBeInTheDocument();

    // Expand
    const expandButton = screen.getByTitle('Expand');
    await user.click(expandButton);

    // Check content is visible again
    expect(screen.getByText('Current Turn')).toBeInTheDocument();
  });

  it('displays current player A correctly', () => {
    render(<DebugPanel {...defaultProps} />);
    fireEvent.click(screen.getByTitle('Open Debug Panel'));

    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Alice')).toHaveClass('text-red-400');
  });

  it('displays current player B correctly', () => {
    render(<DebugPanel {...defaultProps} currentPlayer="playerB" />);
    fireEvent.click(screen.getByTitle('Open Debug Panel'));

    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toHaveClass('text-blue-400');
  });

  it('switches turn from player A to player B', async () => {
    const user = userEvent.setup();
    mockChangeTurn.mockResolvedValue(undefined);

    render(<DebugPanel {...defaultProps} />);

    // Open panel
    await user.click(screen.getByTitle('Open Debug Panel'));

    // Click switch turn
    const switchButton = screen.getByText('Switch Turn');
    await user.click(switchButton);

    await waitFor(() => {
      expect(mockChangeTurn).toHaveBeenCalledWith({
        gameId: 'game123',
        newCurrentPlayer: 'playerB',
      });
    });
  });

  it('switches turn from player B to player A', async () => {
    const user = userEvent.setup();
    mockChangeTurn.mockResolvedValue(undefined);

    render(<DebugPanel {...defaultProps} currentPlayer="playerB" />);

    // Open panel
    await user.click(screen.getByTitle('Open Debug Panel'));

    // Click switch turn
    const switchButton = screen.getByText('Switch Turn');
    await user.click(switchButton);

    await waitFor(() => {
      expect(mockChangeTurn).toHaveBeenCalledWith({
        gameId: 'game123',
        newCurrentPlayer: 'playerA',
      });
    });
  });

  it('handles turn change errors gracefully', async () => {
    const user = userEvent.setup();
    const consoleError = jest.spyOn(console, 'error').mockImplementation();
    mockChangeTurn.mockRejectedValue(new Error('Failed to change turn'));

    render(<DebugPanel {...defaultProps} />);

    // Open panel
    await user.click(screen.getByTitle('Open Debug Panel'));

    // Click switch turn
    const switchButton = screen.getByText('Switch Turn');
    await user.click(switchButton);

    await waitFor(() => {
      expect(consoleError).toHaveBeenCalledWith(
        'Failed to change turn:',
        expect.any(Error)
      );
    });

    consoleError.mockRestore();
  });

  it('displays game ID correctly', () => {
    render(<DebugPanel {...defaultProps} />);
    fireEvent.click(screen.getByTitle('Open Debug Panel'));

    expect(screen.getByText('Game ID: game123')).toBeInTheDocument();
  });

  it('handles long player names with proper text wrapping', () => {
    const longNameProps = {
      ...defaultProps,
      playerAName: 'ThisIsAVeryLongPlayerNameThatShouldWrapProperly',
    };

    render(<DebugPanel {...longNameProps} />);
    fireEvent.click(screen.getByTitle('Open Debug Panel'));

    const playerNameElement = screen.getByText(
      'ThisIsAVeryLongPlayerNameThatShouldWrapProperly'
    );
    expect(playerNameElement).toBeInTheDocument();
    expect(playerNameElement).toHaveClass('break-all');
  });
});

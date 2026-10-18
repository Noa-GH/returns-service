import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from './App.tsx';

describe('App', () => {
  it('renders the heading and the shared API base path', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: 'Returns' })).toBeInTheDocument();
    expect(screen.getByText(/\/api\/v1/)).toBeInTheDocument();
  });
});

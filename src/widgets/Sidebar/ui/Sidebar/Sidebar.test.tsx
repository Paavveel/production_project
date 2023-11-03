import { render, screen } from '@testing-library/react';
import { Sidebar } from 'widgets/Sidebar';

describe('Sidebar', () => {
  it('should render correct', () => {
    render(<Sidebar />);
    expect(screen.getByText('TEST')).toBeInTheDocument();
  });
});

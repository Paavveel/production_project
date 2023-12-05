import { render, screen } from '@testing-library/react';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';

describe('Button', () => {
  it('should render correct', () => {
    render(<Button>TEST</Button>);
    expect(screen.getByText('TEST')).toBeInTheDocument();
  });

  it('should render clear theme', () => {
    render(<Button theme={ButtonTheme.CLEAR}>TEST</Button>);
    expect(screen.getByText('TEST')).toHaveClass('clear');
  });
});

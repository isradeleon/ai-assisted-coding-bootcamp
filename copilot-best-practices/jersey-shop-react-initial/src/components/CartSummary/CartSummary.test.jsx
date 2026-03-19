import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

jest.mock('../../contexts/CartContext', () => ({
  useCart: jest.fn(),
}));

import { useCart } from '../../contexts/CartContext';
import CartSummary from './CartSummary';

afterEach(() => {
  jest.clearAllMocks();
});

describe('CartSummary', () => {
  test('shows empty state and zero total when cart is empty', () => {
    useCart.mockReturnValue({
      cartItems: [],
      totalItems: 0,
      totalPrice: 0,
    });

    render(<CartSummary />);

    expect(screen.getByText('Order Summary')).toBeInTheDocument();
    expect(screen.getByText('Item')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
    expect(screen.getByText('Your cart is empty. Click an item to add it.')).toBeInTheDocument();
    expect(screen.getByText('Total (0 items)')).toBeInTheDocument();
    expect(screen.getByText('$0')).toBeInTheDocument();
  });

  test('renders one cart item with quantity and line total plus overall total', () => {
    useCart.mockReturnValue({
      cartItems: [
        { id: '1', name: 'Jersey', quantity: 2, price: 25.0 },
      ],
      totalItems: 2,
      totalPrice: '50.00',
    });

    render(<CartSummary />);

    expect(screen.queryByText('Your cart is empty. Click an item to add it.')).not.toBeInTheDocument();
    expect(screen.getByText('2x Jersey')).toBeInTheDocument();

    const totals = screen.getAllByText('$50.00');
    expect(totals).toHaveLength(2); // line total + grand total

    expect(screen.getByText('Total (2 items)')).toBeInTheDocument();
  });

  test('renders multiple items and computes each line total correctly', () => {
    useCart.mockReturnValue({
      cartItems: [
        { id: '1', name: 'Jersey', quantity: 2, price: 25.0 },
        { id: '2', name: 'Shorts', quantity: 1, price: 15.5 },
        { id: '3', name: 'Socks', quantity: 3, price: 5.25 },
      ],
      totalItems: 6,
      totalPrice: '96.25',
    });

    render(<CartSummary />);

    expect(screen.getByText('2x Jersey')).toBeInTheDocument();
    expect(screen.getByText('$50.00')).toBeInTheDocument();
    expect(screen.getByText('1x Shorts')).toBeInTheDocument();
    expect(screen.getByText('$15.50')).toBeInTheDocument();
    expect(screen.getByText('3x Socks')).toBeInTheDocument();
    expect(screen.getByText('$15.75')).toBeInTheDocument();

    expect(screen.getByText('Total (6 items)')).toBeInTheDocument();
    expect(screen.getByText('$96.25')).toBeInTheDocument();
  });
});

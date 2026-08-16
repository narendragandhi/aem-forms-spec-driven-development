import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DemoForm from './DemoForm';
import { getDemoScenario } from './demoScenarios';

describe('DemoForm', () => {
  test('shows seeded data and activates a financial rule', () => {
    render(<DemoForm scenario={getDemoScenario('financial')} useCase="financial" onSubmit={jest.fn()} />);
    expect(screen.getByDisplayValue('Maya Rodriguez')).toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveTextContent('Adaptive rule activated');
  });

  test('reveals the remote onboarding rule when selected', () => {
    render(<DemoForm scenario={getDemoScenario('onboarding')} useCase="onboarding" onSubmit={jest.fn()} />);
    fireEvent.change(screen.getByLabelText('Work arrangement'), { target: { value: 'remote' } });
    expect(screen.getByRole('status')).toHaveTextContent('equipment delivery');
  });

  test('reveals healthcare support questions from the synthetic patient scenario', () => {
    render(<DemoForm scenario={getDemoScenario('healthcare')} useCase="healthcare" onSubmit={jest.fn()} />);
    fireEvent.change(screen.getByLabelText('Support needed'), { target: { value: 'mobility' } });
    expect(screen.getByRole('status')).toHaveTextContent('accessibility and care-team details');
  });

  test('submits the seeded journey accessibly', () => {
    const onSubmit = jest.fn();
    render(<DemoForm scenario={getDemoScenario('claims')} useCase="claims" onSubmit={onSubmit} />);
    fireEvent.click(screen.getByRole('button', { name: /continue this seeded journey/i }));
    expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({ name: 'Jordan Lee', ruleActive: true }));
  });
});

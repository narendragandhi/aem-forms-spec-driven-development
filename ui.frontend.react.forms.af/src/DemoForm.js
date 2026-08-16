import React, { useState } from 'react';

const DemoForm = ({ scenario, useCase, onSubmit }) => {
  const [name, setName] = useState(scenario.name);
  const [email, setEmail] = useState(scenario.email);
  const [amount, setAmount] = useState(scenario.amount);
  const [role, setRole] = useState('hybrid');
  const [support, setSupport] = useState('none');
  const ruleActive = useCase === 'onboarding' ? role === 'remote' : useCase === 'healthcare' ? support === 'mobility' : Number(amount) > (useCase === 'claims' ? 10000 : 20000);

  return (
    <form className="demo-form" onSubmit={(event) => { event.preventDefault(); onSubmit({ name, email, amount, role, support, ruleActive }); }}>
      <div className="demo-badge"><span>DEMO MODE</span> Seeded scenario · {scenario.label}</div>
      <div className="field-grid">
        <label>Full name<input aria-label="Full name" value={name} onChange={(event) => setName(event.target.value)} required /></label>
        <label>Email address<input aria-label="Email address" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></label>
      </div>
      {useCase === 'onboarding' ? (
        <label>Work arrangement<select aria-label="Work arrangement" value={role} onChange={(event) => setRole(event.target.value)}><option value="hybrid">Hybrid</option><option value="remote">Remote</option><option value="office">Office-based</option></select></label>
      ) : useCase === 'healthcare' ? (
        <label>Support needed<select aria-label="Support needed" value={support} onChange={(event) => setSupport(event.target.value)}><option value="none">No additional support</option><option value="mobility">Mobility support</option><option value="language">Language support</option></select></label>
      ) : (
        <label>{useCase === 'claims' ? 'Estimated damage' : 'Requested amount'}<input aria-label={useCase === 'claims' ? 'Estimated damage' : 'Requested amount'} type="number" min="0" value={amount} onChange={(event) => setAmount(event.target.value)} /></label>
      )}
      {ruleActive ? <div className="rule-reveal" role="status"><strong>Adaptive rule activated</strong><span>{scenario.rule}</span></div> : <div className="rule-hint">Adaptive rules will reveal the next question when it becomes relevant.</div>}
      <button className="primary-button" type="submit">Continue this seeded journey <span>→</span></button>
    </form>
  );
};

export default DemoForm;

import React, { useEffect, useMemo, useState } from 'react';
import { AdaptiveForm } from '@aemforms/af-react-renderer';
import { mappings } from '@aemforms/af-react-components';
import CustomAddressField from './main/webpack/components/CustomAddressField';
import { defaultFormPath, getShowcaseConfig } from './showcaseConfig';
import { getDemoScenario } from './demoScenarios';
import { evaluateSubmission } from './evaluation';
import DemoForm from './DemoForm';
import './App.css';

const customMappings = {
  ...mappings,
  'custom-address-field': CustomAddressField
};

const App = () => {
  const [formJson, setFormJson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [workflowId, setWorkflowId] = useState(null);
  const [status, setStatus] = useState(null);

  const formPath = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('formPath') || defaultFormPath;
  }, []);

  const config = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return getShowcaseConfig(params.get('useCase'));
  }, []);
  const demoMode = useMemo(() => new URLSearchParams(window.location.search).get('demo') === 'true', []);
  const useCase = useMemo(() => new URLSearchParams(window.location.search).get('useCase') || 'financial', []);
  const demoScenario = useMemo(() => getDemoScenario(useCase), [useCase]);

  useEffect(() => {
    let cancelled = false;
    const loadForm = async () => {
      if (demoMode) {
        setLoading(false);
        return;
      }
      try {
        const wrapperResponse = await fetch(`/bin/bmad/headless-form-service?formPath=${encodeURIComponent(formPath)}`);
        if (!wrapperResponse.ok) throw new Error('The form service is unavailable.');
        const wrapper = await wrapperResponse.json();
        const formResponse = await fetch(wrapper.endpoint);
        if (!formResponse.ok) throw new Error('The form model could not be loaded.');
        const json = await formResponse.json();
        if (!cancelled) setFormJson(json);
      } catch (err) {
        if (!cancelled) setError(err.message || 'Something went wrong while loading the experience.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    loadForm();
    return () => { cancelled = true; };
  }, [formPath, demoMode]);

  useEffect(() => {
    if (!workflowId) return undefined;
    let active = true;
    const poll = async () => {
      try {
        const response = await fetch(`/bin/bmad/headless-status?workflowId=${encodeURIComponent(workflowId)}`);
        const data = await response.json();
        if (active) setStatus(data);
      } catch (err) {
        // The form remains usable if a local workflow engine is not running.
        console.warn('Status check unavailable', err);
      }
    };
    poll();
    const interval = window.setInterval(poll, 3000);
    return () => { active = false; window.clearInterval(interval); };
  }, [workflowId]);

  const onFormSubmit = (event) => {
    const responseData = event?.body || event?.data || event;
    if (responseData?.workflowId) setWorkflowId(responseData.workflowId);
  };

  const onDemoSubmit = (data) => {
    const evaluation = evaluateSubmission(data, useCase);
    setWorkflowId(`DEMO-${Date.now()}`);
    setStatus({
      state: 'REVIEW_PENDING',
      evaluation,
      review: { state: evaluation.recommendation === 'HUMAN_REVIEW' ? 'PENDING' : 'AUTO_ADVANCED' },
      signingStatus: evaluation.recommendation === 'AUTO_ADVANCE' ? 'OUT_FOR_SIGNATURE' : 'NOT_STARTED',
      dorStatus: 'NOT_STARTED'
    });
    if (evaluation.recommendation === 'AUTO_ADVANCE') {
      window.setTimeout(() => setStatus((current) => ({ ...current, state: 'RUNNING', signingStatus: 'SIGNED' })), 1800);
      window.setTimeout(() => setStatus((current) => ({ ...current, state: 'COMPLETED', dorStatus: 'GENERATED' })), 3600);
    }
  };

  const onReviewDecision = (decision) => {
    if (decision === 'REJECTED') {
      setStatus((current) => ({ ...current, state: 'REJECTED', review: { state: 'REJECTED', actor: 'demo-reviewer' }, signingStatus: 'NOT_STARTED' }));
      return;
    }
    setStatus((current) => ({ ...current, state: 'RUNNING', review: { state: 'APPROVED', actor: 'demo-reviewer' }, signingStatus: 'OUT_FOR_SIGNATURE' }));
    window.setTimeout(() => setStatus((current) => ({ ...current, signingStatus: 'SIGNED' })), 1800);
    window.setTimeout(() => setStatus((current) => ({ ...current, state: 'COMPLETED', dorStatus: 'GENERATED' })), 3600);
  };

  const currentStage = status?.dorStatus === 'GENERATED' ? 3 : workflowId ? 2 : 1;

  return (
    <main className="showcase-shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="AEM Forms Showcase home">
          <span className="brand-mark">A</span>
          <span>AEM <em>Forms</em></span>
        </a>
        <div className="topbar-meta">
          <span className="live-dot" /> Live experience
          <span className="version-chip">{demoMode ? 'SEEDED DEMO' : 'CLOUD SERVICE'}</span>
        </div>
      </header>

      <section className="hero">
        <div className="eyebrow">{config.heroEyebrow}</div>
        <h1>{config.heroTitle}</h1>
        <p className="hero-copy">{config.heroCopy}</p>
        <div className="hero-proof" aria-label="Experience capabilities">
          {config.proofPoints.map((point, index) => <div key={point}><strong>0{index + 1}</strong><span>{point}</span></div>)}
        </div>
      </section>

      <section className="journey-grid">
        <aside className="journey-rail">
          <div className="rail-kicker">{config.railKicker}</div>
          <h2>{config.railTitle}</h2>
          <p>{config.railCopy}</p>
          <div className="stage-list">
            {config.stages.map((stage, index) => (
              <div className={`stage ${currentStage > index ? 'stage-active' : ''}`} key={stage.number}>
                <div className="stage-index">{stage.number}</div>
                <div><strong>{stage.label}</strong><small>{stage.detail}</small></div>
              </div>
            ))}
          </div>
          <div className="rail-note"><span>✦</span> Designed to move from prototype to production.</div>
        </aside>

        <section className="form-card" aria-label={`${config.title} form`}>
          <div className="card-heading">
            <div><div className="eyebrow">{config.eyebrow}</div><h2>{config.title}</h2></div>
            <span className="secure-label"><span>⌁</span> Secure session</span>
          </div>
          <div className="progress-track"><span style={{ width: `${workflowId ? '100%' : '34%'}` }} /></div>
          {loading && <div className="loading-state"><span className="spinner" /> Preparing your adaptive experience…</div>}
          {error && <div className="error-state"><strong>We couldn’t start the experience.</strong><span>{error}</span><button type="button" onClick={() => window.location.reload()}>Try again</button></div>}
          {!loading && !error && !workflowId && demoMode && <DemoForm scenario={demoScenario} useCase={useCase} onSubmit={onDemoSubmit} />}
          {!loading && !error && !workflowId && !demoMode && formJson && (
            <div className="renderer-wrap"><AdaptiveForm formJson={formJson} mappings={customMappings} onSubmitSuccess={onFormSubmit} /></div>
          )}
          {workflowId && (
            <div className="completion-state">
              <div className="completion-icon">✓</div>
              <div className="eyebrow">JOURNEY IN MOTION</div>
              <h3>{status?.state === 'REJECTED' ? 'Follow-up is required.' : status?.review?.state === 'PENDING' ? 'A reviewer is deciding.' : 'Your application is moving forward.'}</h3>
              <p>{status?.state === 'REJECTED' ? 'The human decision is recorded before signature. Resolve the follow-up items and start again.' : status?.review?.state === 'PENDING' ? 'Evaluation paused this journey before signature so a human can make the accountable decision.' : 'We’ve connected your submission to the right people, the right signature, and the right document.'}</p>
              <div className="workflow-id">REFERENCE <strong>{workflowId}</strong></div>
              {status?.evaluation && <div className={`evaluation-card evaluation-${status.evaluation.band.toLowerCase()}`}>
                <div className="evaluation-heading"><span>POLICY EVALUATION</span><strong>{status.evaluation.score}/100</strong></div>
                <div className="evaluation-copy"><strong>{status.evaluation.recommendation === 'HUMAN_REVIEW' ? 'Human review required' : 'Eligible to auto-advance'}</strong><span>{status.evaluation.reason}</span></div>
                <div className="evaluation-meta"><span>Band: {status.evaluation.band}</span><span>Policy: {status.evaluation.policy}</span></div>
              </div>}
              {status?.review?.state === 'PENDING' && <div className="hitl-card" role="region" aria-label="Human review task">
                <div className="eyebrow">HUMAN-IN-THE-LOOP</div>
                <h4>Reviewer decision required</h4>
                <p>This submission is paused before signature. A named reviewer must approve or reject the evaluated outcome.</p>
                <div className="review-actions"><button className="primary-button" type="button" onClick={() => onReviewDecision('APPROVED')}>Approve and continue <span>→</span></button><button className="secondary-button" type="button" onClick={() => onReviewDecision('REJECTED')}>Reject for follow-up</button></div>
              </div>}
              {status?.review?.state === 'REJECTED' && <div className="hitl-card hitl-rejected" role="alert"><div className="eyebrow">HUMAN DECISION RECORDED</div><h4>Follow-up required</h4><p>The reviewer rejected this submission before signature. The applicant can restart after the missing information is resolved.</p></div>}
              <div className="status-timeline">
                {config.statusSteps.map((step, index) => {
                  const complete = index === 0 || (index === 1 && ['OUT_FOR_SIGNATURE', 'SIGNED'].includes(status?.signingStatus)) || (index === 2 && status?.dorStatus === 'GENERATED');
                  return <div className={`timeline-step ${complete ? 'complete' : ''}`} key={step.key}><span className="timeline-dot">{complete ? '✓' : index + 1}</span><div><strong>{step.label}</strong><small>{step.detail}</small></div></div>;
                })}
              </div>
              <button className="secondary-button" type="button" onClick={() => { setWorkflowId(null); setStatus(null); }}>Start another journey</button>
            </div>
          )}
        </section>
      </section>

      <section className="architecture-panel" aria-label="Architecture visibility">
        <div><div className="eyebrow">UNDER THE EXPERIENCE</div><h2>One journey. Six connected capabilities.</h2></div>
        <div className="architecture-flow"><span>Author</span><i>→</i><span>Publish</span><i>→</i><span>Headless Form</span><i>→</i><span>FDM + Rules</span><i>→</i><span>Workflow</span><i>→</i><span>Sign + DoR</span></div>
        <p>{demoMode ? 'Seeded demo mode makes the customer journey deterministic while keeping each integration seam visible for a live AEM swap.' : 'Live AEM mode reads the authored form model and hands submission to the configured orchestration services.'}</p>
      </section>
      <footer className="showcase-footer"><span>AEM Forms / Experience reference architecture</span><span>Adaptive logic <i>•</i> Headless delivery <i>•</i> Workflow automation</span></footer>
    </main>
  );
};

export default App;

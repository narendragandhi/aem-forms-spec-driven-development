import React, { useEffect, useState } from 'react';
import { AdaptiveForm } from '@aemforms/af-react-renderer';
import { mappings } from '@aemforms/af-react-components';
import CustomAddressField from './main/webpack/components/CustomAddressField';
import './App.css';

// Add custom components to the mappings
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

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const formPath = params.get('formPath') || '/content/forms/af/aem-forms-bmad-showcase/financial-application';
    
    // Fetch the form model from the HeadlessFormService (BFF)
    fetch(`/bin/bmad/headless-form-service?formPath=${formPath}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        return fetch(data.endpoint);
      })
      .then(response => response.json())
      .then(json => {
        setFormJson(json);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching form:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Poll for workflow status once submitted
  useEffect(() => {
    let interval;
    if (workflowId) {
      interval = setInterval(() => {
        fetch(`/bin/bmad/headless-status?workflowId=${workflowId}`)
          .then(res => res.json())
          .then(data => {
            setStatus(data);
            if (data.dorStatus === 'GENERATED') {
              clearInterval(interval);
            }
          })
          .catch(err => console.error('Status check error:', err));
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [workflowId]);

  const onFormSubmit = (event) => {
    // Integration point: Capture the submission response to get workflowId
    const responseData = event.body; // AdaptiveForm submit event structure
    if (responseData && responseData.workflowId) {
      setWorkflowId(responseData.workflowId);
    }
  };

  if (loading) return <div className="headless-form-container">Loading form...</div>;
  if (error) return <div className="headless-form-container">Error: {error}</div>;

  return (
    <div className="headless-form-container">
      <h1>Headless AEM Form - Omnichannel Flow</h1>
      
      {workflowId ? (
        <div className="status-panel">
          <h3>Submission Successful!</h3>
          <p>Workflow ID: <code>{workflowId}</code></p>
          {status && (
            <div className="status-details">
              <div className={`status-badge ${status.state}`}>System: {status.state}</div>
              <div className={`status-badge ${status.signingStatus}`}>Signing: {status.signingStatus}</div>
              <div className={`status-badge ${status.dorStatus}`}>Document: {status.dorStatus}</div>
            </div>
          )}
          {status?.dorStatus === 'GENERATED' && (
            <div className="success-msg">Your Document of Record is ready for download.</div>
          )}
        </div>
      ) : (
        <AdaptiveForm 
          formJson={formJson} 
          mappings={customMappings} 
          onSubmitSuccess={onFormSubmit}
        />
      )}
    </div>
  );
};

export default App;

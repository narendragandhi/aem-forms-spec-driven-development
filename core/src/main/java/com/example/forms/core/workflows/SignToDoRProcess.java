package com.example.forms.core.workflows;

import com.adobe.granite.workflow.WorkflowException;
import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.exec.WorkflowProcess;
import com.adobe.granite.workflow.metadata.MetaDataMap;
import com.example.forms.core.services.AdobeSignOrchestrator;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Workflow process that orchestrates Adobe Sign and subsequent DoR generation.
 */
@Component(
    service = WorkflowProcess.class,
    property = {
        "process.label=BMAD: Sign to DoR Orchestrator"
    }
)
public class SignToDoRProcess implements WorkflowProcess {

    private static final Logger LOG = LoggerFactory.getLogger(SignToDoRProcess.class);

    @Reference
    private AdobeSignOrchestrator signOrchestrator;

    @Override
    public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap metaDataMap) 
            throws WorkflowException {
        
        LOG.info("Executing SignToDoRProcess...");

        // 1. Extract payload (submitted form data)
        String payload = workItem.getWorkflowData().getPayload().toString();
        
        // 2. Access/Initialize workflow metadata
        MetaDataMap wfMetadata = workItem.getWorkflow().getMetaDataMap();
        String agreementId = wfMetadata.get("adobeSignAgreementId", String.class);

        if (agreementId == null) {
            // FIRST RUN: Create the agreement
            agreementId = signOrchestrator.createAgreement(payload);
            wfMetadata.put("adobeSignAgreementId", agreementId);
            wfMetadata.put("signingStatus", "OUT_FOR_SIGNATURE");
            LOG.info("Created new Adobe Sign agreement: {}", agreementId);
        } else {
            // SUBSEQUENT RUN (Polling/Retry): Check status
            String status = signOrchestrator.getStatus(agreementId);
            wfMetadata.put("signingStatus", status);
            
            if ("SIGNED".equals(status)) {
                LOG.info("Agreement {} is SIGNED. Proceeding to DoR generation.", agreementId);
                generateDoR(payload);
                wfMetadata.put("dorStatus", "GENERATED");
            } else {
                LOG.info("Agreement {} is still: {}", agreementId, status);
                // In a real scenario, we might use a Participant Step or a Wait step here.
                // For the demo, we show how metadata is updated.
            }
        }
    }

    private void generateDoR(String data) {
        LOG.info("MOCK DoR GENERATION: Creating PDF Document of Record for data...");
        // In real implementation, this would call Forms Output Service
    }
}

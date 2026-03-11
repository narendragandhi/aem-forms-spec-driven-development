package com.example.forms.core.services;

import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.Workflow;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.servlets.SlingAllMethodsServlet;
import org.apache.sling.servlets.annotations.SlingServletPaths;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.propertytypes.ServiceDescription;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.Servlet;
import javax.servlet.ServletException;
import java.io.IOException;
import java.io.BufferedReader;

/**
 * Mock servlet to handle headless form submissions.
 * Supports Omnichannel Sign flow and status polling.
 */
@Component(service = { Servlet.class })
@SlingServletPaths({"/bin/bmad/headless-submit", "/bin/bmad/headless-status"})
@ServiceDescription("BMAD Headless Form Submission & Status Service")
public class HeadlessSubmitServlet extends SlingAllMethodsServlet {

    private static final Logger LOG = LoggerFactory.getLogger(HeadlessSubmitServlet.class);

    @Override
    protected void doGet(final SlingHttpServletRequest req,
            final SlingHttpServletResponse resp) throws ServletException, IOException {
        
        String workflowId = req.getParameter("workflowId");
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");
        
        if (workflowId == null) {
            resp.sendError(SlingHttpServletResponse.SC_BAD_REQUEST, "Missing workflowId");
            return;
        }

        ResourceResolver resolver = req.getResourceResolver();
        WorkflowSession wfSession = resolver.adaptTo(WorkflowSession.class);
        
        try {
            if (wfSession != null) {
                Workflow wf = wfSession.getWorkflow(workflowId);
                if (wf != null) {
                    String state = wf.getState();
                    String signingStatus = (String) wf.getMetaDataMap().get("signingStatus", String.class);
                    String dorStatus = (String) wf.getMetaDataMap().get("dorStatus", String.class);

                    resp.getWriter().write("{"
                        + "\"workflowId\": \"" + workflowId + "\","
                        + "\"state\": \"" + (state != null ? state : "UNKNOWN") + "\","
                        + "\"signingStatus\": \"" + (signingStatus != null ? signingStatus : "PENDING") + "\","
                        + "\"dorStatus\": \"" + (dorStatus != null ? dorStatus : "NOT_STARTED") + "\""
                        + "}");
                    return;
                }
            }
            
            // Fallback for mock/local testing without a real workflow engine
            resp.getWriter().write("{"
                + "\"workflowId\": \"" + workflowId + "\","
                + "\"state\": \"RUNNING\","
                + "\"signingStatus\": \"OUT_FOR_SIGNATURE\","
                + "\"dorStatus\": \"NOT_STARTED\""
                + "}");
                
        } catch (Exception e) {
            LOG.error("Error fetching workflow status", e);
            resp.sendError(SlingHttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Error fetching workflow status");
        }
    }

    @Override
    protected void doPost(final SlingHttpServletRequest req,
            final SlingHttpServletResponse resp) throws ServletException, IOException {
        
        LOG.info("Received headless form submission for Omnichannel flow");

        StringBuilder sb = new StringBuilder();
        String line;
        try (BufferedReader reader = req.getReader()) {
            while ((line = reader.readLine()) != null) {
                sb.append(line);
            }
        }

        String submittedData = sb.toString();
        LOG.info("Submitted Data: {}", submittedData);

        // Initiate AEM Workflow (Mocked for Demo)
        ResourceResolver resolver = req.getResourceResolver();
        WorkflowSession wfSession = resolver.adaptTo(WorkflowSession.class);
        String workflowId = "WF-" + System.currentTimeMillis();

        try {
            if (wfSession != null) {
                // In real AEM instance:
                // WorkflowModel model = wfSession.getModel("/var/workflow/models/bmad-omnichannel-sign");
                // Workflow wf = wfSession.startWorkflow(model, wfSession.newWorkflowData("JCR_PATH", "/content/dam/submissions/data.json"));
                // workflowId = wf.getId();
            }
            LOG.info("Workflow initiated: {}", workflowId);
        } catch (Exception e) {
            LOG.warn("Failed to initiate real workflow, continuing with mock ID", e);
        }

        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        if (submittedData.contains("error")) {
            resp.setStatus(SlingHttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            resp.getWriter().write("{\"status\": \"error\", \"message\": \"Simulated processing error\"}");
        } else {
            resp.setStatus(SlingHttpServletResponse.SC_OK);
            resp.getWriter().write("{"
                + "\"status\": \"success\","
                + "\"message\": \"Form submitted and Sign workflow initiated\","
                + "\"workflowId\": \"" + workflowId + "\""
                + "}");
        }
    }
}

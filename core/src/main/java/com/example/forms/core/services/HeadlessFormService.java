package com.example.forms.core.services;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.servlets.SlingSafeMethodsServlet;
import org.apache.sling.servlets.annotations.SlingServletPaths;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.propertytypes.ServiceDescription;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.Servlet;
import javax.servlet.ServletException;
import java.io.IOException;

/**
 * Service to bridge AEM Adaptive Forms with Headless Consumers.
 * This servlet acts as a "BFF" (Backend-for-Frontend) for headless forms,
 * injecting BMAD metadata into the form model.
 */
@Component(service = { Servlet.class })
@SlingServletPaths("/bin/bmad/headless-form-service")
@ServiceDescription("BMAD Headless Form Orchestration Service")
public class HeadlessFormService extends SlingSafeMethodsServlet {

    private static final Logger LOG = LoggerFactory.getLogger(HeadlessFormService.class);

    @Override
    protected void doGet(final SlingHttpServletRequest req,
            final SlingHttpServletResponse resp) throws ServletException, IOException {
        
        String formPath = req.getParameter("formPath");
        
        if (formPath == null || formPath.isEmpty()) {
            resp.sendError(SlingHttpServletResponse.SC_BAD_REQUEST, "Missing formPath parameter");
            return;
        }

        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        // Logic to redirect or fetch the .model.json from the Adaptive Form
        // For the showcase, we return a mock headless metadata wrapper
        String headlessWrapper = "{"
            + "\"bmadVersion\": \"6.0\","
            + "\"formId\": \"" + formPath.hashCode() + "\","
            + "\"endpoint\": \"" + formPath + ".model.json\","
            + "\"prefillUrl\": \"/bin/bmad/mock-finance-data\","
            + "\"submitUrl\": \"/bin/bmad/headless-submit\","
            + "\"metadata\": {"
            + "  \"agentAsCode\": true,"
            + "  \"mode\": \"headless-react\""
            + "}"
            + "}";

        resp.getWriter().write(headlessWrapper);
    }
}

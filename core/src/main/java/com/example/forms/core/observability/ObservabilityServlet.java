package com.example.forms.core.observability;

import java.io.IOException;
import javax.servlet.Servlet;
import javax.servlet.ServletException;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.servlets.SlingSafeMethodsServlet;
import org.apache.sling.servlets.annotations.SlingServletPaths;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.component.propertytypes.ServiceDescription;

/** Read-only health and metrics surface for the showcase runtime. */
@Component(service = Servlet.class)
@SlingServletPaths({"/bin/bmad/observability/health", "/bin/bmad/observability/metrics"})
@ServiceDescription("BMAD Showcase Health and Metrics")
public class ObservabilityServlet extends SlingSafeMethodsServlet {

    @Reference
    private ObservabilityService observabilityService;

    @Override
    protected void doGet(SlingHttpServletRequest request, SlingHttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        String correlationId = (String) request.getAttribute(CorrelationIdFilter.ATTRIBUTE);
        response.getWriter().write(request.getPathInfo().endsWith("/health")
            ? "{\"status\":\"UP\",\"service\":\"aem-forms-bmad-showcase\",\"correlationId\":\"" + correlationId + "\"}"
            : "{\"requests\":" + observabilityService.getRequests()
                + ",\"submissions\":" + observabilityService.getSubmissions()
                + ",\"statusPolls\":" + observabilityService.getStatusPolls()
                + ",\"failures\":" + observabilityService.getFailures() + "}");
    }
}

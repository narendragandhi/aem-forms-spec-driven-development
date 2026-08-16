package com.example.forms.core.migration;

import java.io.IOException;
import javax.servlet.Servlet;
import javax.servlet.ServletException;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.servlets.SlingAllMethodsServlet;
import org.apache.sling.servlets.annotations.SlingServletPaths;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.component.propertytypes.ServiceDescription;

/** Demo-safe migration endpoint; production AFCS submission remains an environment adapter. */
@Component(service = Servlet.class)
@SlingServletPaths("/bin/bmad/forms-migration/convert")
@ServiceDescription("BMAD PDF to Adaptive Forms Conversion Orchestration")
public class FormsConversionServlet extends SlingAllMethodsServlet {
    @Reference(target = "(provider=demo)")
    private FormsConversionService conversionService;

    @Override
    protected void doPost(SlingHttpServletRequest request, SlingHttpServletResponse response)
            throws ServletException, IOException {
        try {
            FormsConversionService.ConversionResult result = conversionService.submit(
                    request.getParameter("sourcePath"), request.getParameter("targetPath"));
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.getWriter().write("{\"status\":\"" + result.getStatus()
                    + "\",\"provider\":\"" + result.getProvider()
                    + "\",\"sourcePath\":\"" + result.getSourcePath()
                    + "\",\"targetPath\":\"" + result.getTargetPath()
                    + "\",\"evidence\":\"" + result.getEvidence() + "\"}");
        } catch (IllegalArgumentException e) {
            response.sendError(SlingHttpServletResponse.SC_BAD_REQUEST, e.getMessage());
        }
    }
}

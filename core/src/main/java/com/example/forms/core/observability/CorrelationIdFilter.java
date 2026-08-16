package com.example.forms.core.observability;

import java.io.IOException;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.sling.engine.EngineConstants;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;

/** Adds a safe correlation ID to each request and response. */
@Component(service = Filter.class, property = EngineConstants.SLING_FILTER_SCOPE + "=" + EngineConstants.FILTER_SCOPE_REQUEST)
public class CorrelationIdFilter implements Filter {

    public static final String ATTRIBUTE = "bmad.correlationId";

    @Reference
    private ObservabilityService observabilityService;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;
        String correlationId = observabilityService.beginRequest(httpRequest.getHeader("X-Correlation-ID"));
        request.setAttribute(ATTRIBUTE, correlationId);
        httpResponse.setHeader("X-Correlation-ID", correlationId);
        chain.doFilter(request, response);
    }

    @Override public void init(FilterConfig filterConfig) { }
    @Override public void destroy() { }
}

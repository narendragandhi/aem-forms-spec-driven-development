package com.example.forms.core.observability;

import java.util.concurrent.atomic.AtomicLong;
import org.osgi.service.component.annotations.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/** Lightweight runtime observability contract for the local showcase. */
@Component(service = ObservabilityService.class)
public class ObservabilityService {

    private static final Logger LOG = LoggerFactory.getLogger(ObservabilityService.class);
    private final AtomicLong requests = new AtomicLong();
    private final AtomicLong submissions = new AtomicLong();
    private final AtomicLong failures = new AtomicLong();
    private final AtomicLong statusPolls = new AtomicLong();

    public String beginRequest(String correlationId) {
        requests.incrementAndGet();
        return correlationId == null || !correlationId.matches("[A-Za-z0-9._-]{1,64}")
            ? java.util.UUID.randomUUID().toString()
            : correlationId;
    }

    public void recordSubmission(String correlationId) {
        submissions.incrementAndGet();
        LOG.info("event=form.submission correlationId={} outcome=accepted", correlationId);
    }

    public void recordStatusPoll(String correlationId) {
        statusPolls.incrementAndGet();
        LOG.debug("event=form.status_poll correlationId={}", correlationId);
    }

    public void recordFailure(String correlationId, String operation) {
        failures.incrementAndGet();
        LOG.warn("event=integration.failure correlationId={} operation={}", correlationId, operation);
    }

    public long getRequests() { return requests.get(); }
    public long getSubmissions() { return submissions.get(); }
    public long getFailures() { return failures.get(); }
    public long getStatusPolls() { return statusPolls.get(); }
}

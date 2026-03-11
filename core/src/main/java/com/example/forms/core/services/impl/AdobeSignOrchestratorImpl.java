package com.example.forms.core.services.impl;

import com.example.forms.core.services.AdobeSignOrchestrator;
import org.osgi.service.component.annotations.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Component(service = AdobeSignOrchestrator.class)
public class AdobeSignOrchestratorImpl implements AdobeSignOrchestrator {

    private static final Logger LOG = LoggerFactory.getLogger(AdobeSignOrchestratorImpl.class);
    
    // Mock persistence for agreement statuses
    private final Map<String, String> agreementStore = new ConcurrentHashMap<>();

    @Override
    public String createAgreement(String data) {
        String agreementId = "SIGN-" + UUID.randomUUID().toString();
        LOG.info("Creating mock Adobe Sign agreement: {} for data length: {}", agreementId, data.length());
        
        // Initial status
        agreementStore.put(agreementId, "OUT_FOR_SIGNATURE");
        
        return agreementId;
    }

    @Override
    public String getStatus(String agreementId) {
        // Mock logic: randomly transition to SIGNED for demo purposes
        String currentStatus = agreementStore.getOrDefault(agreementId, "NOT_FOUND");
        
        if ("OUT_FOR_SIGNATURE".equals(currentStatus) && Math.random() > 0.7) {
            agreementStore.put(agreementId, "SIGNED");
            LOG.info("Agreement {} has been transition to SIGNED status", agreementId);
        }
        
        return agreementStore.getOrDefault(agreementId, "NOT_FOUND");
    }
}

package com.example.forms.core.migration;

import org.osgi.service.component.annotations.Component;

/**
 * Deterministic demo provider. It creates no AEM content and never claims that
 * Adobe's Automated Forms Conversion Service was called.
 */
@Component(service = FormsConversionService.class, property = "provider=demo")
public class DemoFormsConversionService implements FormsConversionService {
    @Override
    public ConversionResult submit(String sourcePath, String targetPath) {
        validate(sourcePath, targetPath);
        return new ConversionResult("seeded", "demo", sourcePath, targetPath,
                "mocked:conversion-job-created;requires-review=true");
    }

    private void validate(String sourcePath, String targetPath) {
        if (sourcePath == null || !sourcePath.startsWith("/content/dam/")) {
            throw new IllegalArgumentException("sourcePath must be an AEM DAM path");
        }
        if (targetPath == null || !targetPath.startsWith("/content/forms/af/")) {
            throw new IllegalArgumentException("targetPath must be an Adaptive Form path");
        }
    }
}

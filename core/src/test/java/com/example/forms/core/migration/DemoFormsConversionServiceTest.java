package com.example.forms.core.migration;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import org.junit.jupiter.api.Test;

class DemoFormsConversionServiceTest {
    private final DemoFormsConversionService service = new DemoFormsConversionService();

    @Test
    void createsExplicitSeededConversionResult() {
        FormsConversionService.ConversionResult result = service.submit(
                "/content/dam/forms/legacy.pdf", "/content/forms/af/new-form");
        assertEquals("seeded", result.getStatus());
        assertEquals("demo", result.getProvider());
        assertEquals("mocked:conversion-job-created;requires-review=true", result.getEvidence());
    }

    @Test
    void rejectsNonAemPaths() {
        assertThrows(IllegalArgumentException.class,
                () -> service.submit("/tmp/legacy.pdf", "/content/forms/af/new-form"));
    }
}

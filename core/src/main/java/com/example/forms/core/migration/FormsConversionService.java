package com.example.forms.core.migration;

/** Provider-neutral contract for PDF-to-Adaptive-Forms conversion. */
public interface FormsConversionService {
    ConversionResult submit(String sourcePath, String targetPath);

    final class ConversionResult {
        private final String status;
        private final String provider;
        private final String sourcePath;
        private final String targetPath;
        private final String evidence;

        public ConversionResult(String status, String provider, String sourcePath,
                String targetPath, String evidence) {
            this.status = status;
            this.provider = provider;
            this.sourcePath = sourcePath;
            this.targetPath = targetPath;
            this.evidence = evidence;
        }

        public String getStatus() { return status; }
        public String getProvider() { return provider; }
        public String getSourcePath() { return sourcePath; }
        public String getTargetPath() { return targetPath; }
        public String getEvidence() { return evidence; }
    }
}

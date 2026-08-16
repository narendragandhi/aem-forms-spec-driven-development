# Medallion Mapping for AEM Forms

The universal project foundation treats Medallion as an optional data profile.
For this showcase, the mapping is:

| Layer | AEM Forms example | Guardrail |
|---|---|---|
| Bronze | submitted form/event envelope and correlation metadata | minimum capture, bounded retention |
| Silver | validated FDM-normalized data and policy-filtered fields | schema, quality, deduplication, privacy |
| Gold | approved decision, workflow state, signed-artifact metadata, analytics, or synthetic fixture | purpose, lineage, authorization, retention |

The Document of Record is a governed artifact, not automatically a Gold dataset.
Real healthcare data requires a privacy and retention review at every promotion.

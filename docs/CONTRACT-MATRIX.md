# Archetype/Showcase Contract Matrix

The archetype is the reusable source; the showcase is its evidence-bearing
reference implementation. Both must preserve these contracts.

| Contract | Archetype | Showcase | Verification |
|---|---|---|---|
| Foundation flags/config | `bmad/foundation-config.yaml` template | `bmad/foundation-config.yaml` | config review |
| Evaluation/HITL | bead templates and docs | seeded healthcare/financial journeys | frontend tests/browser tests |
| Correlation/metrics | OSGi observability services | package observability services | Java build/AEM probe |
| Resilience | circuit-breaker seam and test | demo mode documents live seam | unit/integration test |
| Adobe Sign/DoR | configurable real provider implementation | deterministic demo provider | live credentials required |
| SOC readiness | compliance pack and template | project-specific SOC beads/docs | evidence review |
| Continuous improvement | workflow, generator, template | convoy beads and runbook | script/bead validation |

Differences are allowed only when they are explicitly labeled as demo versus
live-provider behavior. A showcase claim must not imply that a live provider was
verified when only the deterministic demo path ran.

# PDF-to-Adaptive-Forms Mapping

The showcase can demonstrate PDF migration as a separate journey: inventory the
source, map fields/rules to an Adaptive Form and FDM, validate accessibility and
data parity, run old/new coexistence, and capture cutover evidence.

The demo endpoint is `POST /bin/bmad/forms-migration/convert` with
`sourcePath=/content/dam/...` and `targetPath=/content/forms/af/...`. It returns
`provider=demo`, `status=seeded`, and an explicit `requires-review=true` marker.
It creates no content and does not claim that Adobe's Automated Forms Conversion
Service was invoked.

For a real conversion, configure AFCS on the AEM Author environment, upload the
source PDF to DAM, run the Adobe conversion workflow, and attach the resulting
job/form references to the mapping bead. The provider seam must remain
environment-configured; credentials and Adobe cloud configuration do not belong
in this repository.

Do not treat a PDF screenshot or pixel match as proof of migration. The required
proof is semantic parity, safe data handling, workflow/signature behavior,
responsive accessibility, and a rollback plan.

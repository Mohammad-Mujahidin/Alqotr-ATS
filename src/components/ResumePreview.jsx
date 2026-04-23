import React from "react";

const LOGO_SRC = "logo.png";

function cleanList(values = []) {
  return values.map((v) => (v || "").trim()).filter(Boolean);
}

export default function ResumePreview({ resume, previewRef = null }) {
  return (
    <div ref={previewRef} className="resume-preview">
      <div className="resume-header">
        <img src={LOGO_SRC} alt="Alqotr" className="preview-logo" />
        <div>
          <h2>{resume.personal?.fullName || "Your Name"}</h2>
          <p className="preview-role">{resume.personal?.targetRole || "Target Role"}</p>
          <p className="preview-contact">
            {[
              resume.personal?.email,
              resume.personal?.phone,
              resume.personal?.location,
              resume.personal?.linkedin,
              resume.personal?.portfolio || resume.personal?.website,
            ]
              .filter(Boolean)
              .join(" • ") || "Contact information will appear here."}
          </p>
        </div>
      </div>

      {resume.summary && (
        <div className="resume-section">
          <h3>Professional Summary</h3>
          <p>{resume.summary}</p>
        </div>
      )}

      {cleanList(resume.skills).length > 0 && (
        <div className="resume-section">
          <h3>Skills</h3>
          <div className="chip-wrap">
            {cleanList(resume.skills).map((skill, i) => (
              <span key={i} className="chip">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {cleanList(resume.keywords).length > 0 && (
        <div className="resume-section">
          <h3>ATS Keywords</h3>
          <div className="chip-wrap">
            {cleanList(resume.keywords).map((keyword, i) => (
              <span key={i} className="chip chip-outline">
                {keyword}
              </span>
            ))}
          </div>
        </div>
      )}

      {(resume.experience || []).some((x) => x.jobTitle || x.employer) && (
        <div className="resume-section">
          <h3>Work Experience</h3>
          <div className="stack">
            {resume.experience
              .filter((x) => x.jobTitle || x.employer)
              .map((item) => (
                <div key={item.id}>
                  <div className="row-between">
                    <div>
                      <h4>{item.jobTitle}</h4>
                      <p className="muted">
                        {[item.employer, item.location].filter(Boolean).join(" • ")}
                      </p>
                    </div>
                    <p className="muted">
                      {[item.startDate, item.current ? "Present" : item.endDate]
                        .filter(Boolean)
                        .join(" - ")}
                    </p>
                  </div>

                  {cleanList(item.achievements).length > 0 && (
                    <ul className="resume-list">
                      {cleanList(item.achievements).map((a, i) => (
                        <li key={i}>{a}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
          </div>
        </div>
      )}

      {(resume.education || []).some((x) => x.degree || x.institution) && (
        <div className="resume-section">
          <h3>Education</h3>
          <div className="stack">
            {resume.education
              .filter((x) => x.degree || x.institution)
              .map((item) => (
                <div key={item.id}>
                  <div className="row-between">
                    <div>
                      <h4>{item.degree}</h4>
                      <p className="muted">
                        {[item.institution, item.location].filter(Boolean).join(" • ")}
                      </p>
                    </div>
                    <p className="muted">
                      {[item.startDate, item.endDate].filter(Boolean).join(" - ")}
                    </p>
                  </div>

                  {cleanList(item.details).length > 0 && (
                    <ul className="resume-list">
                      {cleanList(item.details).map((a, i) => (
                        <li key={i}>{a}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
          </div>
        </div>
      )}

      {(resume.projects || []).some((x) => x.name) && (
        <div className="resume-section">
          <h3>Projects</h3>
          <div className="stack">
            {resume.projects
              .filter((x) => x.name)
              .map((item) => (
                <div key={item.id}>
                  <div className="row-between">
                    <div>
                      <h4>{item.name}</h4>
                      <p className="muted">{item.role}</p>
                    </div>
                    {item.link ? (
                      <a className="link" href={item.link} target="_blank" rel="noreferrer">
                        Project Link
                      </a>
                    ) : null}
                  </div>

                  {item.description ? <p>{item.description}</p> : null}

                  {cleanList(item.tools).length > 0 && (
                    <div className="chip-wrap top-gap-sm">
                      {cleanList(item.tools).map((tool, i) => (
                        <span key={i} className="chip">
                          {tool}
                        </span>
                      ))}
                    </div>
                  )}

                  {cleanList(item.results).length > 0 && (
                    <ul className="resume-list">
                      {cleanList(item.results).map((a, i) => (
                        <li key={i}>{a}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
          </div>
        </div>
      )}

      <div className="grid-2 top-gap">
        {(resume.certifications || []).some((x) => x.name) && (
          <div className="resume-section">
            <h3>Certifications</h3>
            <div className="stack-sm">
              {resume.certifications
                .filter((x) => x.name)
                .map((item) => (
                  <div key={item.id}>
                    <h4>{item.name}</h4>
                    <p className="muted">
                      {[item.issuer, item.issueDate].filter(Boolean).join(" • ")}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        )}

        {(resume.languages || []).some((x) => x.name) && (
          <div className="resume-section">
            <h3>Languages</h3>
            <div className="stack-sm">
              {resume.languages
                .filter((x) => x.name)
                .map((item) => (
                  <div key={item.id}>
                    <h4>{item.name}</h4>
                    <p className="muted">{item.proficiency}</p>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>

      {cleanList(resume.additionalInfo).length > 0 && (
        <div className="resume-section">
          <h3>Additional Information</h3>
          <ul className="resume-list">
            {cleanList(resume.additionalInfo).map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
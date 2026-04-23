import React from "react";

const LOGO_SRC = "logo.png";

function cleanList(values = []) {
  return values.map((v) => (v || "").trim()).filter(Boolean);
}

export default function ResumePreview({ resume, previewRef = null }) {
  const fullName = resume.personal?.fullName || "Your Name";
  const targetRole = resume.personal?.targetRole || "Target Role";

  const contactItems = [
    resume.personal?.email,
    resume.personal?.phone,
    resume.personal?.location,
    resume.personal?.linkedin,
    resume.personal?.portfolio || resume.personal?.website,
  ].filter(Boolean);

  return (
    <div ref={previewRef} className="resume-preview resume-pro">
      <div className="resume-topbar">
        <img src={LOGO_SRC} alt="Alqotr" className="resume-logo" />
      </div>

      <header className="resume-hero avoid-break">
        <div className="resume-hero-text">
          <h1>{fullName}</h1>
          <p className="resume-role">{targetRole}</p>

          {contactItems.length > 0 ? (
            <p className="resume-contact">{contactItems.join(" | ")}</p>
          ) : null}
        </div>

        {resume.profileImage ? (
          <div className="resume-hero-photo-wrap">
            <img
              src={resume.profileImage}
              alt="Profile"
              className="resume-hero-photo"
            />
          </div>
        ) : null}
      </header>

      {resume.summary ? (
        <section className="resume-section-block avoid-break">
          <h2>Professional Summary</h2>
          <p className="resume-body-text">{resume.summary}</p>
        </section>
      ) : null}

      {cleanList(resume.skills).length > 0 ? (
        <section className="resume-section-block avoid-break">
          <h2>Skills</h2>
          <p className="resume-inline-text">{cleanList(resume.skills).join(" • ")}</p>
        </section>
      ) : null}

      {cleanList(resume.keywords).length > 0 ? (
        <section className="resume-section-block avoid-break">
          <h2>ATS Keywords</h2>
          <p className="resume-inline-text">{cleanList(resume.keywords).join(" • ")}</p>
        </section>
      ) : null}

      {(resume.experience || []).some((x) => x.jobTitle || x.employer) ? (
        <section className="resume-section-block">
          <h2>Work Experience</h2>

          {(resume.experience || [])
            .filter((x) => x.jobTitle || x.employer)
            .map((item) => (
              <div key={item.id} className="resume-entry avoid-break">
                <div className="resume-entry-header">
                  <div className="resume-entry-left">
                    <h3>{item.jobTitle}</h3>
                    <p className="resume-entry-sub">
                      {[item.employer, item.location].filter(Boolean).join(" | ")}
                    </p>
                  </div>

                  <div className="resume-entry-date">
                    {[item.startDate, item.current ? "Present" : item.endDate]
                      .filter(Boolean)
                      .join(" - ")}
                  </div>
                </div>

                {cleanList(item.achievements).length > 0 ? (
                  <ul className="resume-list">
                    {cleanList(item.achievements).map((a, i) => (
                      <li key={i}>{a}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}
        </section>
      ) : null}

      {(resume.education || []).some((x) => x.degree || x.institution) ? (
        <section className="resume-section-block">
          <h2>Education</h2>

          {(resume.education || [])
            .filter((x) => x.degree || x.institution)
            .map((item) => (
              <div key={item.id} className="resume-entry avoid-break">
                <div className="resume-entry-header">
                  <div className="resume-entry-left">
                    <h3>{item.degree}</h3>
                    <p className="resume-entry-sub">
                      {[item.institution, item.location].filter(Boolean).join(" | ")}
                    </p>
                  </div>

                  <div className="resume-entry-date">
                    {[item.startDate, item.endDate].filter(Boolean).join(" - ")}
                  </div>
                </div>

                {cleanList(item.details).length > 0 ? (
                  <ul className="resume-list">
                    {cleanList(item.details).map((a, i) => (
                      <li key={i}>{a}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}
        </section>
      ) : null}

      {(resume.projects || []).some((x) => x.name) ? (
        <section className="resume-section-block">
          <h2>Projects</h2>

          {(resume.projects || [])
            .filter((x) => x.name)
            .map((item) => (
              <div key={item.id} className="resume-entry avoid-break">
                <div className="resume-entry-header">
                  <div className="resume-entry-left">
                    <h3>{item.name}</h3>
                    <p className="resume-entry-sub">{item.role}</p>
                  </div>

                  {item.link ? (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                      className="resume-project-link"
                    >
                      Project Link
                    </a>
                  ) : null}
                </div>

                {item.description ? (
                  <p className="resume-body-text resume-body-text-sm">{item.description}</p>
                ) : null}

                {cleanList(item.tools).length > 0 ? (
                  <p className="resume-inline-text resume-inline-tools">
                    <strong>Tools:</strong> {cleanList(item.tools).join(" • ")}
                  </p>
                ) : null}

                {cleanList(item.results).length > 0 ? (
                  <ul className="resume-list">
                    {cleanList(item.results).map((a, i) => (
                      <li key={i}>{a}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}
        </section>
      ) : null}

      <div className="resume-columns-2">
        {(resume.certifications || []).some((x) => x.name) ? (
          <section className="resume-section-block avoid-break">
            <h2>Certifications</h2>

            {(resume.certifications || [])
              .filter((x) => x.name)
              .map((item) => (
                <div key={item.id} className="resume-mini-entry">
                  <h3>{item.name}</h3>
                  <p className="resume-entry-sub">
                    {[item.issuer, item.issueDate].filter(Boolean).join(" | ")}
                  </p>
                </div>
              ))}
          </section>
        ) : null}

        {(resume.languages || []).some((x) => x.name) ? (
          <section className="resume-section-block avoid-break">
            <h2>Languages</h2>

            {(resume.languages || [])
              .filter((x) => x.name)
              .map((item) => (
                <div key={item.id} className="resume-mini-entry">
                  <h3>{item.name}</h3>
                  <p className="resume-entry-sub">{item.proficiency}</p>
                </div>
              ))}
          </section>
        ) : null}
      </div>

      {cleanList(resume.additionalInfo).length > 0 ? (
        <section className="resume-section-block avoid-break">
          <h2>Additional Information</h2>
          <ul className="resume-list">
            {cleanList(resume.additionalInfo).map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
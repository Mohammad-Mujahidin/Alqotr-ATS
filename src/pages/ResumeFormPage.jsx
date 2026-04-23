<<<<<<< HEAD
import React, { useEffect, useMemo, useState } from "react";
import mammoth from "mammoth";
import * as pdfjsLib from "pdfjs-dist";
import { Save, Trash2, Plus, Upload } from "lucide-react";
import DynamicList from "../components/DynamicList.jsx";
import { loadDraft, saveDraft } from "../data/storage.js";
import { createSubmission, updateSubmission } from "../data/db.js";
=======
import React, { useEffect, useState } from "react";
import mammoth from "mammoth";
import * as pdfjsLib from "pdfjs-dist";
import { useNavigate } from "react-router-dom";
import { Upload, Save, Plus, Trash2 } from "lucide-react";
import DynamicList from "../components/DynamicList.jsx";
import { loadDraft, loadSubmissions, saveDraft, saveSubmissions } from "../data/storage.js";
>>>>>>> ecfaaa3feb7d0d460686a00ee529e22bcbcb80d0

try {
  pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
  ).toString();
} catch (e) {
  console.warn("PDF worker setup warning:", e);
}

const createId = () => `${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

const emptyExperience = () => ({
  id: createId(),
  jobTitle: "",
  employer: "",
  location: "",
  startDate: "",
  endDate: "",
  current: false,
  achievements: [""],
});

const emptyEducation = () => ({
  id: createId(),
  degree: "",
  institution: "",
  location: "",
  startDate: "",
  endDate: "",
  details: [""],
});

const emptyProject = () => ({
  id: createId(),
  name: "",
  role: "",
  link: "",
  description: "",
  tools: [""],
  results: [""],
});

const emptyCertification = () => ({
  id: createId(),
  name: "",
  issuer: "",
  issueDate: "",
  expiryDate: "",
});

const emptyLanguage = () => ({
  id: createId(),
  name: "",
  proficiency: "",
});

const emptyResume = () => ({
  id: createId(),
<<<<<<< HEAD
  dbId: "",
=======
>>>>>>> ecfaaa3feb7d0d460686a00ee529e22bcbcb80d0
  title: "ATS Resume",
  personal: {
    fullName: "",
    targetRole: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    portfolio: "",
    website: "",
  },
  summary: "",
  skills: [""],
  keywords: [""],
  experience: [emptyExperience()],
  education: [emptyEducation()],
  projects: [emptyProject()],
  certifications: [emptyCertification()],
  languages: [emptyLanguage()],
  additionalInfo: [""],
  uploadedCvText: "",
  sourceFileName: "",
<<<<<<< HEAD
  profileImage: "",
=======
>>>>>>> ecfaaa3feb7d0d460686a00ee529e22bcbcb80d0
  updatedAt: new Date().toISOString(),
});

function extractEmail(text) {
  return text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)?.[0] || "";
}

function extractPhone(text) {
  return text.match(/(\+?\d[\d\s()\-]{7,}\d)/)?.[0] || "";
}

function extractLinkedIn(text) {
  return text.match(/https?:\/\/(www\.)?linkedin\.com\/[^\s]+/i)?.[0] || "";
}

function extractAnyUrl(text) {
  return text.match(/https?:\/\/[^\s]+/i)?.[0] || "";
}

function linesBetweenSections(text, startPattern, stopPatterns = []) {
  const lines = text.split(/\r?\n/);
  const startIndex = lines.findIndex((l) => startPattern.test(l.trim()));
  if (startIndex === -1) return [];
  let endIndex = lines.length;

  for (let i = startIndex + 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (stopPatterns.some((rx) => rx.test(line))) {
      endIndex = i;
      break;
    }
  }

  return lines.slice(startIndex + 1, endIndex).map((l) => l.trim()).filter(Boolean);
}

function parseCvText(rawText, currentData) {
  const text = (rawText || "").replace(/\t/g, " ").replace(/\u0000/g, " ").trim();
  const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  const topLines = lines.slice(0, 8);

  const guessedName =
    topLines.find(
      (l) =>
        l.split(" ").length >= 2 &&
        l.length < 40 &&
        !/@|http|linkedin|phone|email/i.test(l)
    ) || "";

  const guessedRole =
    topLines.find((l) =>
      /developer|engineer|manager|designer|analyst|specialist|consultant|accountant|coordinator|lead/i.test(
        l
      )
    ) || "";

  const sectionStops = [
    /^education$/i,
    /^projects?$/i,
    /^skills?$/i,
    /^certifications?$/i,
    /^languages?$/i,
    /^experience$/i,
    /^professional experience$/i,
    /^work experience$/i,
    /^summary$/i,
    /^profile$/i,
    /^additional information$/i,
  ];

  const skillsLines = linesBetweenSections(text, /^skills?$/i, sectionStops);
  const keywordsLines = linesBetweenSections(text, /^(keywords|ats keywords)$/i, sectionStops);
<<<<<<< HEAD
  const summaryLines = linesBetweenSections(
    text,
    /^(summary|profile|professional summary)$/i,
    sectionStops
  );
=======
  const summaryLines = linesBetweenSections(text, /^(summary|profile|professional summary)$/i, sectionStops);
>>>>>>> ecfaaa3feb7d0d460686a00ee529e22bcbcb80d0
  const additionalLines = linesBetweenSections(text, /^additional information$/i, sectionStops);
  const certLines = linesBetweenSections(text, /^certifications?$/i, sectionStops);
  const langLines = linesBetweenSections(text, /^languages?$/i, sectionStops);

  const inferredSkills = (skillsLines.join(" ") || "")
    .split(/[•,|]/)
    .map((s) => s.trim())
    .filter((s) => s && s.length < 50);

  const inferredKeywords = (keywordsLines.join(" ") || "")
    .split(/[•,|]/)
    .map((s) => s.trim())
    .filter(Boolean);

  const inferredCerts = certLines.slice(0, 6).map((c) => ({
    ...emptyCertification(),
    name: c,
  }));

  const inferredLanguages = langLines.slice(0, 6).map((l) => {
    const parts = l.split(/[-–:]/).map((p) => p.trim());
    return {
      ...emptyLanguage(),
      name: parts[0] || "",
      proficiency: parts[1] || "",
    };
  });

  return {
    ...currentData,
    personal: {
      ...currentData.personal,
      fullName: currentData.personal.fullName || guessedName,
      targetRole: currentData.personal.targetRole || guessedRole,
      email: currentData.personal.email || extractEmail(text),
      phone: currentData.personal.phone || extractPhone(text),
      linkedin: currentData.personal.linkedin || extractLinkedIn(text),
      portfolio: currentData.personal.portfolio || extractAnyUrl(text),
    },
    summary: currentData.summary || summaryLines.join(" "),
    skills: inferredSkills.length ? inferredSkills : currentData.skills,
    keywords: inferredKeywords.length ? inferredKeywords : currentData.keywords,
    certifications: inferredCerts.length ? inferredCerts : currentData.certifications,
    languages: inferredLanguages.length ? inferredLanguages : currentData.languages,
    additionalInfo: additionalLines.length ? additionalLines : currentData.additionalInfo,
    uploadedCvText: text,
    updatedAt: new Date().toISOString(),
  };
}

<<<<<<< HEAD
function cleanList(values = []) {
  return values.map((v) => (v || "").trim()).filter(Boolean);
}

function countMeasurableAchievements(experience = [], projects = []) {
  const regex =
    /(\d+%|\d+\+|\$\d+|\d+\s?(years|months|users|clients|projects|team|people|days|hours))/i;
  let count = 0;

  experience.forEach((item) => {
    (item.achievements || []).forEach((a) => {
      if (regex.test(a || "")) count += 1;
    });
  });

  projects.forEach((item) => {
    (item.results || []).forEach((a) => {
      if (regex.test(a || "")) count += 1;
    });
  });

  return count;
}

function scoreResume(data) {
  const skills = cleanList(data.skills);
  const keywords = cleanList(data.keywords);
  const measurableAchievements = countMeasurableAchievements(data.experience, data.projects);
  const hasLinkedIn = Boolean((data.personal.linkedin || "").trim());
  const hasSummary = (data.summary || "").trim().length >= 80;
  const experienceCount = data.experience.filter(
    (e) => e.jobTitle.trim() || e.employer.trim()
  ).length;
  const educationCount = data.education.filter(
    (e) => e.degree.trim() || e.institution.trim()
  ).length;

  let score = 0;
  score += Math.min(skills.length, 12) * 3;
  score += Math.min(keywords.length, 12) * 2;
  score += Math.min(measurableAchievements, 8) * 5;
  score += hasLinkedIn ? 8 : 0;
  score += hasSummary ? 10 : 0;
  score += experienceCount ? 12 : 0;
  score += educationCount ? 8 : 0;

  return Math.min(score, 100);
}

export default function ResumeFormPage() {
  const [resume, setResume] = useState(() => {
    const draft = loadDraft();
    return draft || emptyResume();
  });
  const [uploadLoading, setUploadLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
=======
export default function ResumeFormPage() {
  const [resume, setResume] = useState(emptyResume());
  const [uploadLoading, setUploadLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const draft = loadDraft();
    if (draft) setResume(draft);
  }, []);
>>>>>>> ecfaaa3feb7d0d460686a00ee529e22bcbcb80d0

  useEffect(() => {
    saveDraft({ ...resume, updatedAt: new Date().toISOString() });
  }, [resume]);

<<<<<<< HEAD
  const currentScore = useMemo(() => scoreResume(resume), [resume]);

=======
>>>>>>> ecfaaa3feb7d0d460686a00ee529e22bcbcb80d0
  const updateResume = (path, value) => {
    setResume((prev) => {
      const next = structuredClone(prev);
      let ref = next;
      for (let i = 0; i < path.length - 1; i++) ref = ref[path[i]];
      ref[path[path.length - 1]] = value;
      next.updatedAt = new Date().toISOString();
      return next;
    });
  };

  const readTxt = async (file) => file.text();

  const readDocx = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value || "";
  };

  const readPdf = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let text = "";

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const content = await page.getTextContent();
      text += `${content.items.map((i) => i.str).join(" ")}\n`;
    }

    return text;
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadLoading(true);

    try {
      const ext = file.name.split(".").pop()?.toLowerCase();
      let text = "";

      if (ext === "txt") text = await readTxt(file);
      else if (ext === "docx") text = await readDocx(file);
      else if (ext === "pdf") text = await readPdf(file);
      else throw new Error("Unsupported file format");

      setResume((prev) => {
        const parsed = parseCvText(text, prev);
        return {
          ...parsed,
          sourceFileName: file.name,
          uploadedCvText: text,
          updatedAt: new Date().toISOString(),
        };
      });
    } catch (error) {
      alert(`Could not read this file. ${error.message || "Please try another file."}`);
    } finally {
      setUploadLoading(false);
      event.target.value = "";
    }
  };

<<<<<<< HEAD
  const handleProfileImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      updateResume(["profileImage"], reader.result);
    };

    reader.onerror = () => {
      alert("Could not read the image file.");
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    try {
      setSaving(true);

      if (resume.dbId) {
        const saved = await updateSubmission(resume.dbId, {
          ...resume,
          score: currentScore,
        });

        const updatedDraft = {
          ...resume,
          dbId: saved.id,
          updatedAt: new Date().toISOString(),
          score: currentScore,
        };

        saveDraft(updatedDraft);
        setResume(updatedDraft);
      } else {
        const saved = await createSubmission({
          ...resume,
          score: currentScore,
        });

        const newDraft = {
          ...resume,
          dbId: saved.id,
          updatedAt: new Date().toISOString(),
          score: currentScore,
        };

        saveDraft(newDraft);
        setResume(newDraft);
      }

      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2500);
    } catch (error) {
      console.error(error);
      alert("Could not save submission to the database.");
    } finally {
      setSaving(false);
    }
=======
  const handleSubmit = () => {
    const existing = loadSubmissions();
    const entry = {
      ...resume,
      id: createId(),
      savedAt: new Date().toISOString(),
    };
    saveSubmissions([entry, ...existing]);
    navigate("/control-panel");
>>>>>>> ecfaaa3feb7d0d460686a00ee529e22bcbcb80d0
  };

  return (
    <div className="stack">
<<<<<<< HEAD
      {showSuccess ? (
        <div className="success-toast">Submission saved successfully.</div>
      ) : null}

=======
>>>>>>> ecfaaa3feb7d0d460686a00ee529e22bcbcb80d0
      <div className="card">
        <div className="card-header">
          <h2>
            <Upload size={18} /> CV Upload & Autofill
          </h2>
        </div>

        <div className="card-body stack">
          <div className="upload-row">
            <input type="file" accept=".pdf,.docx,.txt" onChange={handleFileUpload} />
            <span className="pill">PDF / DOCX / TXT</span>
            {uploadLoading ? <span className="pill pill-dark">Reading file...</span> : null}
          </div>

          {resume.sourceFileName ? (
            <div className="notice">
              Source file: <strong>{resume.sourceFileName}</strong>
            </div>
          ) : null}

          <div className="field-block">
            <label className="label">Detected Text Preview</label>
            <textarea
              className="textarea"
              rows={8}
              value={resume.uploadedCvText}
              onChange={(e) => updateResume(["uploadedCvText"], e.target.value)}
              placeholder="Uploaded CV text will appear here..."
            />
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header row-between">
          <h2>Resume Form</h2>
<<<<<<< HEAD

          <div className="action-row">
            <span className="pill">ATS Score: {currentScore}/100</span>
            <button className="btn btn-primary" onClick={handleSubmit} disabled={saving}>
              <Save size={16} /> {saving ? "Saving..." : "Submit"}
            </button>
          </div>
=======
          <button className="btn btn-primary" onClick={handleSubmit}>
            <Save size={16} /> Submit to Control Panel
          </button>
>>>>>>> ecfaaa3feb7d0d460686a00ee529e22bcbcb80d0
        </div>

        <div className="card-body stack-lg">
          <section className="section">
            <h3>Personal Information</h3>
<<<<<<< HEAD

=======
>>>>>>> ecfaaa3feb7d0d460686a00ee529e22bcbcb80d0
            <div className="grid-2">
              <div className="field-block">
                <label className="label">Full Name</label>
                <input
                  className="input"
                  value={resume.personal.fullName}
                  onChange={(e) => updateResume(["personal", "fullName"], e.target.value)}
                />
              </div>

              <div className="field-block">
                <label className="label">Target Role</label>
                <input
                  className="input"
                  value={resume.personal.targetRole}
                  onChange={(e) => updateResume(["personal", "targetRole"], e.target.value)}
                />
              </div>

              <div className="field-block">
                <label className="label">Email</label>
                <input
                  className="input"
                  value={resume.personal.email}
                  onChange={(e) => updateResume(["personal", "email"], e.target.value)}
                />
              </div>

              <div className="field-block">
                <label className="label">Phone</label>
                <input
                  className="input"
                  value={resume.personal.phone}
                  onChange={(e) => updateResume(["personal", "phone"], e.target.value)}
                />
              </div>

              <div className="field-block">
                <label className="label">Location</label>
                <input
                  className="input"
                  value={resume.personal.location}
                  onChange={(e) => updateResume(["personal", "location"], e.target.value)}
                />
              </div>

              <div className="field-block">
                <label className="label">LinkedIn</label>
                <input
                  className="input"
                  value={resume.personal.linkedin}
                  onChange={(e) => updateResume(["personal", "linkedin"], e.target.value)}
                />
              </div>

              <div className="field-block">
                <label className="label">Portfolio</label>
                <input
                  className="input"
                  value={resume.personal.portfolio}
                  onChange={(e) => updateResume(["personal", "portfolio"], e.target.value)}
                />
              </div>

              <div className="field-block">
                <label className="label">Website</label>
                <input
                  className="input"
                  value={resume.personal.website}
                  onChange={(e) => updateResume(["personal", "website"], e.target.value)}
                />
              </div>
            </div>
          </section>

          <section className="section">
<<<<<<< HEAD
            <h3>Profile Image</h3>

            <div className="stack-sm">
              <input type="file" accept="image/*" onChange={handleProfileImageUpload} />

              {resume.profileImage ? (
                <div className="profile-image-preview-box">
                  <img
                    src={resume.profileImage}
                    alt="Profile preview"
                    className="profile-image-preview"
                  />
                </div>
              ) : (
                <p className="muted">No profile image uploaded yet.</p>
              )}
            </div>
          </section>

          <section className="section">
=======
>>>>>>> ecfaaa3feb7d0d460686a00ee529e22bcbcb80d0
            <h3>Professional Summary</h3>
            <textarea
              className="textarea"
              rows={5}
              value={resume.summary}
              onChange={(e) => updateResume(["summary"], e.target.value)}
            />
          </section>

          <section className="section">
            <div className="grid-2">
              <DynamicList
                label="Skills"
                values={resume.skills}
                onChange={(value) => updateResume(["skills"], value)}
                placeholder="Example: React"
              />

              <DynamicList
                label="ATS Keywords"
                values={resume.keywords}
                onChange={(value) => updateResume(["keywords"], value)}
                placeholder="Example: Applicant Tracking System"
              />
            </div>
          </section>

          <section className="section">
            <div className="row-between section-head">
              <h3>Work Experience</h3>
              <button
<<<<<<< HEAD
                type="button"
=======
>>>>>>> ecfaaa3feb7d0d460686a00ee529e22bcbcb80d0
                className="btn btn-outline btn-small"
                onClick={() => updateResume(["experience"], [...resume.experience, emptyExperience()])}
              >
                <Plus size={16} /> Add Experience
              </button>
            </div>

            <div className="stack">
              {resume.experience.map((item, index) => (
                <div key={item.id} className="subcard">
                  <div className="row-between">
                    <h4>Experience #{index + 1}</h4>
                    <button
<<<<<<< HEAD
                      type="button"
=======
>>>>>>> ecfaaa3feb7d0d460686a00ee529e22bcbcb80d0
                      className="btn btn-outline btn-small"
                      onClick={() =>
                        updateResume(
                          ["experience"],
                          resume.experience.length > 1
                            ? resume.experience.filter((x) => x.id !== item.id)
                            : [emptyExperience()]
                        )
                      }
                    >
                      <Trash2 size={16} /> Remove
                    </button>
                  </div>

                  <div className="grid-2">
                    <div className="field-block">
                      <label className="label">Job Title</label>
                      <input
                        className="input"
                        value={item.jobTitle}
                        onChange={(e) => {
                          const next = [...resume.experience];
                          next[index].jobTitle = e.target.value;
                          updateResume(["experience"], next);
                        }}
                      />
                    </div>

                    <div className="field-block">
                      <label className="label">Employer</label>
                      <input
                        className="input"
                        value={item.employer}
                        onChange={(e) => {
                          const next = [...resume.experience];
                          next[index].employer = e.target.value;
                          updateResume(["experience"], next);
                        }}
                      />
                    </div>

                    <div className="field-block">
                      <label className="label">Location</label>
                      <input
                        className="input"
                        value={item.location}
                        onChange={(e) => {
                          const next = [...resume.experience];
                          next[index].location = e.target.value;
                          updateResume(["experience"], next);
                        }}
                      />
                    </div>

                    <div className="grid-2">
                      <div className="field-block">
                        <label className="label">Start Date</label>
                        <input
                          className="input"
                          value={item.startDate}
                          onChange={(e) => {
                            const next = [...resume.experience];
                            next[index].startDate = e.target.value;
                            updateResume(["experience"], next);
                          }}
                        />
                      </div>

                      <div className="field-block">
                        <label className="label">End Date</label>
                        <input
                          className="input"
                          value={item.endDate}
                          onChange={(e) => {
                            const next = [...resume.experience];
                            next[index].endDate = e.target.value;
                            updateResume(["experience"], next);
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <DynamicList
                    label="Achievements"
                    values={item.achievements}
                    onChange={(value) => {
                      const next = [...resume.experience];
                      next[index].achievements = value;
                      updateResume(["experience"], next);
                    }}
                    placeholder="Example: Increased conversion rate by 18%"
                  />
                </div>
              ))}
            </div>
          </section>

          <section className="section">
            <div className="row-between section-head">
              <h3>Education</h3>
              <button
<<<<<<< HEAD
                type="button"
=======
>>>>>>> ecfaaa3feb7d0d460686a00ee529e22bcbcb80d0
                className="btn btn-outline btn-small"
                onClick={() => updateResume(["education"], [...resume.education, emptyEducation()])}
              >
                <Plus size={16} /> Add Education
              </button>
            </div>

            <div className="stack">
              {resume.education.map((item, index) => (
                <div key={item.id} className="subcard">
                  <div className="row-between">
                    <h4>Education #{index + 1}</h4>
                    <button
<<<<<<< HEAD
                      type="button"
=======
>>>>>>> ecfaaa3feb7d0d460686a00ee529e22bcbcb80d0
                      className="btn btn-outline btn-small"
                      onClick={() =>
                        updateResume(
                          ["education"],
                          resume.education.length > 1
                            ? resume.education.filter((x) => x.id !== item.id)
                            : [emptyEducation()]
                        )
                      }
                    >
                      <Trash2 size={16} /> Remove
                    </button>
                  </div>

                  <div className="grid-2">
                    <div className="field-block">
                      <label className="label">Degree</label>
                      <input
                        className="input"
                        value={item.degree}
                        onChange={(e) => {
                          const next = [...resume.education];
                          next[index].degree = e.target.value;
                          updateResume(["education"], next);
                        }}
                      />
                    </div>

                    <div className="field-block">
                      <label className="label">Institution</label>
                      <input
                        className="input"
                        value={item.institution}
                        onChange={(e) => {
                          const next = [...resume.education];
                          next[index].institution = e.target.value;
                          updateResume(["education"], next);
                        }}
                      />
                    </div>

                    <div className="field-block">
                      <label className="label">Location</label>
                      <input
                        className="input"
                        value={item.location}
                        onChange={(e) => {
                          const next = [...resume.education];
                          next[index].location = e.target.value;
                          updateResume(["education"], next);
                        }}
                      />
                    </div>

                    <div className="grid-2">
                      <div className="field-block">
                        <label className="label">Start Date</label>
                        <input
                          className="input"
                          value={item.startDate}
                          onChange={(e) => {
                            const next = [...resume.education];
                            next[index].startDate = e.target.value;
                            updateResume(["education"], next);
                          }}
                        />
                      </div>

                      <div className="field-block">
                        <label className="label">End Date</label>
                        <input
                          className="input"
                          value={item.endDate}
                          onChange={(e) => {
                            const next = [...resume.education];
                            next[index].endDate = e.target.value;
                            updateResume(["education"], next);
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <DynamicList
                    label="Education Details"
                    values={item.details}
                    onChange={(value) => {
                      const next = [...resume.education];
                      next[index].details = value;
                      updateResume(["education"], next);
                    }}
                    placeholder="Example: GPA 3.8/4.0"
                  />
                </div>
              ))}
            </div>
          </section>

          <section className="section">
            <div className="row-between section-head">
              <h3>Projects</h3>
              <button
<<<<<<< HEAD
                type="button"
=======
>>>>>>> ecfaaa3feb7d0d460686a00ee529e22bcbcb80d0
                className="btn btn-outline btn-small"
                onClick={() => updateResume(["projects"], [...resume.projects, emptyProject()])}
              >
                <Plus size={16} /> Add Project
              </button>
            </div>

            <div className="stack">
              {resume.projects.map((item, index) => (
                <div key={item.id} className="subcard">
                  <div className="row-between">
                    <h4>Project #{index + 1}</h4>
                    <button
<<<<<<< HEAD
                      type="button"
=======
>>>>>>> ecfaaa3feb7d0d460686a00ee529e22bcbcb80d0
                      className="btn btn-outline btn-small"
                      onClick={() =>
                        updateResume(
                          ["projects"],
                          resume.projects.length > 1
                            ? resume.projects.filter((x) => x.id !== item.id)
                            : [emptyProject()]
                        )
                      }
                    >
                      <Trash2 size={16} /> Remove
                    </button>
                  </div>

                  <div className="grid-2">
                    <div className="field-block">
                      <label className="label">Project Name</label>
                      <input
                        className="input"
                        value={item.name}
                        onChange={(e) => {
                          const next = [...resume.projects];
                          next[index].name = e.target.value;
                          updateResume(["projects"], next);
                        }}
                      />
                    </div>

                    <div className="field-block">
                      <label className="label">Role</label>
                      <input
                        className="input"
                        value={item.role}
                        onChange={(e) => {
                          const next = [...resume.projects];
                          next[index].role = e.target.value;
                          updateResume(["projects"], next);
                        }}
                      />
                    </div>

                    <div className="field-block span-2">
                      <label className="label">Project Link</label>
                      <input
                        className="input"
                        value={item.link}
                        onChange={(e) => {
                          const next = [...resume.projects];
                          next[index].link = e.target.value;
                          updateResume(["projects"], next);
                        }}
                      />
                    </div>

                    <div className="field-block span-2">
                      <label className="label">Description</label>
                      <textarea
                        className="textarea"
                        rows={4}
                        value={item.description}
                        onChange={(e) => {
                          const next = [...resume.projects];
                          next[index].description = e.target.value;
                          updateResume(["projects"], next);
                        }}
                      />
                    </div>
                  </div>

                  <div className="grid-2">
                    <DynamicList
                      label="Project Tools"
                      values={item.tools}
                      onChange={(value) => {
                        const next = [...resume.projects];
                        next[index].tools = value;
                        updateResume(["projects"], next);
                      }}
                      placeholder="Example: TypeScript"
                    />

                    <DynamicList
                      label="Project Results"
                      values={item.results}
                      onChange={(value) => {
                        const next = [...resume.projects];
                        next[index].results = value;
                        updateResume(["projects"], next);
                      }}
                      placeholder="Example: Reduced processing time by 25%"
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="section">
            <div className="grid-3">
              <div>
                <div className="row-between section-head">
                  <h3>Certifications</h3>
                  <button
<<<<<<< HEAD
                    type="button"
=======
>>>>>>> ecfaaa3feb7d0d460686a00ee529e22bcbcb80d0
                    className="btn btn-outline btn-small"
                    onClick={() =>
                      updateResume(["certifications"], [...resume.certifications, emptyCertification()])
                    }
                  >
                    <Plus size={16} /> Add
                  </button>
                </div>

                <div className="stack">
                  {resume.certifications.map((item, index) => (
                    <div key={item.id} className="subcard compact">
                      <div className="row-between">
                        <h4>Certification #{index + 1}</h4>
                        <button
<<<<<<< HEAD
                          type="button"
=======
>>>>>>> ecfaaa3feb7d0d460686a00ee529e22bcbcb80d0
                          className="icon-btn"
                          onClick={() =>
                            updateResume(
                              ["certifications"],
                              resume.certifications.length > 1
                                ? resume.certifications.filter((x) => x.id !== item.id)
                                : [emptyCertification()]
                            )
                          }
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <input
                        className="input"
                        placeholder="Certification name"
                        value={item.name}
                        onChange={(e) => {
                          const next = [...resume.certifications];
                          next[index].name = e.target.value;
                          updateResume(["certifications"], next);
                        }}
                      />

                      <input
                        className="input"
                        placeholder="Issuer"
                        value={item.issuer}
                        onChange={(e) => {
                          const next = [...resume.certifications];
                          next[index].issuer = e.target.value;
                          updateResume(["certifications"], next);
                        }}
                      />

                      <input
                        className="input"
                        placeholder="Issue date"
                        value={item.issueDate}
                        onChange={(e) => {
                          const next = [...resume.certifications];
                          next[index].issueDate = e.target.value;
                          updateResume(["certifications"], next);
                        }}
                      />

                      <input
                        className="input"
                        placeholder="Expiry date"
                        value={item.expiryDate}
                        onChange={(e) => {
                          const next = [...resume.certifications];
                          next[index].expiryDate = e.target.value;
                          updateResume(["certifications"], next);
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="row-between section-head">
                  <h3>Languages</h3>
                  <button
<<<<<<< HEAD
                    type="button"
=======
>>>>>>> ecfaaa3feb7d0d460686a00ee529e22bcbcb80d0
                    className="btn btn-outline btn-small"
                    onClick={() => updateResume(["languages"], [...resume.languages, emptyLanguage()])}
                  >
                    <Plus size={16} /> Add
                  </button>
                </div>

                <div className="stack">
                  {resume.languages.map((item, index) => (
                    <div key={item.id} className="subcard compact">
                      <div className="row-between">
                        <h4>Language #{index + 1}</h4>
                        <button
<<<<<<< HEAD
                          type="button"
=======
>>>>>>> ecfaaa3feb7d0d460686a00ee529e22bcbcb80d0
                          className="icon-btn"
                          onClick={() =>
                            updateResume(
                              ["languages"],
                              resume.languages.length > 1
                                ? resume.languages.filter((x) => x.id !== item.id)
                                : [emptyLanguage()]
                            )
                          }
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <input
                        className="input"
                        placeholder="Language"
                        value={item.name}
                        onChange={(e) => {
                          const next = [...resume.languages];
                          next[index].name = e.target.value;
                          updateResume(["languages"], next);
                        }}
                      />

                      <input
                        className="input"
                        placeholder="Proficiency"
                        value={item.proficiency}
                        onChange={(e) => {
                          const next = [...resume.languages];
                          next[index].proficiency = e.target.value;
                          updateResume(["languages"], next);
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3>Additional Information</h3>
                <DynamicList
                  label="Additional Information"
                  values={resume.additionalInfo}
                  onChange={(value) => updateResume(["additionalInfo"], value)}
                  placeholder="Example: Open to relocation"
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
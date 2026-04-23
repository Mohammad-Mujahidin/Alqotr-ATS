import React, { useEffect, useRef, useState } from "react";
import ResumePreview from "../components/ResumePreview.jsx";
import { loadDraft } from "../data/storage.js";

export default function PreviewPage() {
  const [resume, setResume] = useState(null);
  const previewRef = useRef(null);

  useEffect(() => {
    const draft = loadDraft();
    setResume(draft);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const handleExportPdf = () => {
    window.print();
  };

  if (!resume) {
    return (
      <div className="card">
        <div className="card-body">
          <div className="empty-state">No draft found. Go to the Resume Form page first.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="stack">
      <div className="card no-print">
        <div className="card-header row-between">
          <h2>Printable Preview</h2>
          <div className="action-row">
            <button className="btn btn-outline btn-small" onClick={handlePrint}>
              Print
            </button>
            <button className="btn btn-primary btn-small" onClick={handleExportPdf}>
              Export PDF
            </button>
          </div>
        </div>
      </div>

      <div className="print-page-wrap">
        <ResumePreview resume={resume} previewRef={previewRef} />
      </div>
    </div>
  );
}
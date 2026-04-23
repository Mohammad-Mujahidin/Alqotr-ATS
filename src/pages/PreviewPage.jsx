import React, { useEffect, useRef, useState } from "react";
<<<<<<< HEAD
=======
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
>>>>>>> ecfaaa3feb7d0d460686a00ee529e22bcbcb80d0
import ResumePreview from "../components/ResumePreview.jsx";
import { loadDraft } from "../data/storage.js";

export default function PreviewPage() {
  const [resume, setResume] = useState(null);
  const previewRef = useRef(null);

  useEffect(() => {
    const draft = loadDraft();
    setResume(draft);
  }, []);

<<<<<<< HEAD
  const handlePrint = () => {
    window.print();
  };

  const handleExportPdf = () => {
=======
  const exportPdfFromNode = async (node, fileName) => {
    const canvas = await html2canvas(node, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
      scrollY: -window.scrollY,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pageWidth - 10;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 5;

    pdf.addImage(imgData, "PNG", 5, position, imgWidth, imgHeight);
    heightLeft -= pageHeight - 10;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight + 5;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 5, position, imgWidth, imgHeight);
      heightLeft -= pageHeight - 10;
    }

    pdf.save(fileName);
  };

  const handleExportPdf = async () => {
    if (!previewRef.current || !resume) return;
    await exportPdfFromNode(previewRef.current, `${resume.personal?.fullName || "resume"}.pdf`);
  };

  const handlePrint = () => {
>>>>>>> ecfaaa3feb7d0d460686a00ee529e22bcbcb80d0
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
<<<<<<< HEAD
      <div className="card no-print">
=======
      <div className="card">
>>>>>>> ecfaaa3feb7d0d460686a00ee529e22bcbcb80d0
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
<<<<<<< HEAD
      </div>

      <div className="print-page-wrap">
        <ResumePreview resume={resume} previewRef={previewRef} />
=======

        <div className="card-body">
          <ResumePreview resume={resume} previewRef={previewRef} />
        </div>
>>>>>>> ecfaaa3feb7d0d460686a00ee529e22bcbcb80d0
      </div>
    </div>
  );
}
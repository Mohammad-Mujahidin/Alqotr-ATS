const STORAGE_DRAFT_KEY = "ats_resume_builder_draft_v1";
const STORAGE_SUBMISSIONS_KEY = "ats_resume_builder_submissions_v1";

export function loadDraft() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_DRAFT_KEY) || "null");
  } catch {
    return null;
  }
}

export function saveDraft(data) {
  localStorage.setItem(STORAGE_DRAFT_KEY, JSON.stringify(data));
}

export function loadSubmissions() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_SUBMISSIONS_KEY) || "[]");
  } catch {
    return [];
  }
}

export function saveSubmissions(items) {
  localStorage.setItem(STORAGE_SUBMISSIONS_KEY, JSON.stringify(items));
}
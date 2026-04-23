import React, { useEffect, useState } from "react";
import { getSubmissions, deleteSubmission } from "../data/db.js";
import { saveDraft } from "../data/storage.js";

export default function ControlPanelPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      setLoading(true);
      const rows = await getSubmissions();
      setItems(rows);
    } catch (error) {
      console.error(error);
      alert("Could not load submissions from the database.");
    } finally {
      setLoading(false);
    }
  };

  const handleLoad = (row) => {
    const resume = {
      ...row.resume_data,
      dbId: row.id,
      profileImage: row.profile_image || row.resume_data?.profileImage || "",
      updatedAt: new Date().toISOString(),
    };

    saveDraft(resume);
    alert("Submission loaded into the form. Open the Resume Form page to review it.");
  };

  const handleDelete = async (id) => {
    try {
      await deleteSubmission(id);
      await loadItems();
    } catch (error) {
      console.error(error);
      alert("Could not delete submission.");
    }
  };

  const handleOpenPreview = (row) => {
    const resume = {
      ...row.resume_data,
      dbId: row.id,
      profileImage: row.profile_image || row.resume_data?.profileImage || "",
      updatedAt: new Date().toISOString(),
    };

    saveDraft(resume);
    window.location.href = "/preview";
  };

  if (loading) {
    return (
      <div className="card">
        <div className="card-body">
          <div className="empty-state">Loading submissions...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-header">
        <h2>Control Panel</h2>
      </div>

      <div className="card-body">
        {!items.length ? (
          <div className="empty-state">No saved submissions yet.</div>
        ) : (
          <div className="saved-list">
            {items.map((row) => (
              <div key={row.id} className="saved-item">
                <div className="saved-header">
                  {row.profile_image ? (
                    <img
                      src={row.profile_image}
                      alt="Profile"
                      className="saved-profile-image"
                    />
                  ) : null}

                  <div>
                    <h4>{row.full_name || "Untitled Resume"}</h4>
                    <p className="muted">{row.target_role || "No target role"}</p>
                    <p className="muted small">
                      Saved {new Date(row.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="action-row">
                  <button
                    className="btn btn-outline btn-small"
                    onClick={() => handleLoad(row)}
                  >
                    Load into Form
                  </button>

                  <button
                    className="btn btn-outline btn-small"
                    onClick={() => handleOpenPreview(row)}
                  >
                    Open Preview
                  </button>

                  <button
                    className="btn btn-outline btn-small"
                    onClick={() => handleDelete(row.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
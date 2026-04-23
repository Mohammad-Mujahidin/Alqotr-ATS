import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loadSubmissions, saveDraft, saveSubmissions } from "../data/storage.js";

export default function ControlPanelPage() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setItems(loadSubmissions());
  }, []);

  const handleLoad = (item) => {
    saveDraft(item);
    navigate("/");
  };

  const handleDelete = (id) => {
    const next = items.filter((x) => x.id !== id);
    setItems(next);
    saveSubmissions(next);
  };

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
            {items.map((item) => (
              <div key={item.id} className="saved-item">
                <h4>{item.personal?.fullName || "Untitled Resume"}</h4>
                <p className="muted">{item.personal?.targetRole || "No target role"}</p>

                <div className="action-row">
                  <button className="btn btn-outline btn-small" onClick={() => handleLoad(item)}>
                    Load into Form
                  </button>

                  <button
                    className="btn btn-outline btn-small"
                    onClick={() => handleDelete(item.id)}
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
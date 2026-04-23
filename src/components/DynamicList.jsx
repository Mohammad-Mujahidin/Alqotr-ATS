import React from "react";
import { Plus, Trash2 } from "lucide-react";

export default function DynamicList({
  label,
  values = [""],
  onChange,
  placeholder = "Add item",
}) {
  const setValue = (index, value) => {
    const next = [...values];
    next[index] = value;
    onChange(next);
  };

  const addItem = () => {
    onChange([...(values || []), ""]);
  };

  const removeItem = (index) => {
    const next = values.filter((_, i) => i !== index);
    onChange(next.length ? next : [""]);
  };

  return (
    <div className="field-block">
      <div className="row-between">
        <label className="label">{label}</label>
        <button type="button" className="btn btn-outline btn-small" onClick={addItem}>
          <Plus size={16} /> Add
        </button>
      </div>

      <div className="stack-sm">
        {(values || []).map((value, index) => (
          <div key={index} className="list-row">
            <input
              className="input"
              value={value}
              placeholder={placeholder}
              onChange={(e) => setValue(index, e.target.value)}
            />
            <button type="button" className="icon-btn" onClick={() => removeItem(index)}>
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
import { useEffect, useState } from 'react';
import { useBlueprintStore } from '../store';

export default function Toolbar() {
  const { blueprint, savedList, newBlueprint, saveBlueprint, loadBlueprints, loadBlueprint, deleteBlueprint, setBlueprint } = useBlueprintStore();
  const [showList, setShowList] = useState(false);
  const [editingName, setEditingName] = useState(false);

  useEffect(() => {
    loadBlueprints();
  }, [loadBlueprints]);

  const handleSave = async () => {
    await saveBlueprint();
    await loadBlueprints();
  };

  const handleNew = () => {
    if (blueprint && blueprint.nodes.length > 0) {
      if (!confirm('Create new blueprint? Unsaved changes will be lost.')) return;
    }
    newBlueprint();
  };

  const handleNameChange = (name: string) => {
    if (!blueprint) return;
    setBlueprint({ ...blueprint, name });
  };

  return (
    <>
      <div style={barStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontWeight: 700, fontSize: 16, color: '#1e293b' }}>Fluxi</span>
          <span style={{ fontSize: 11, color: '#94a3b8', border: '1px solid #e2e8f0', borderRadius: 4, padding: '1px 5px' }}>v0.1</span>
        </div>

        {blueprint && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, justifyContent: 'center' }}>
            {editingName ? (
              <input
                style={nameInputStyle}
                value={blueprint.name}
                onChange={(e) => handleNameChange(e.target.value)}
                onBlur={() => setEditingName(false)}
                onKeyDown={(e) => e.key === 'Enter' && setEditingName(false)}
                autoFocus
              />
            ) : (
              <span
                style={nameStyle}
                onClick={() => setEditingName(true)}
                title="Click to rename"
              >
                {blueprint.name}
                {blueprint.id && <span style={{ fontSize: 10, color: '#94a3b8', marginLeft: 6 }}>v{blueprint.version}</span>}
              </span>
            )}
          </div>
        )}

        <div style={{ display: 'flex', gap: 6 }}>
          <button style={btnStyle} onClick={handleNew}>New</button>
          <button style={btnStyle} onClick={() => { loadBlueprints(); setShowList(!showList); }}>Open</button>
          <button style={{ ...btnStyle, background: '#2563eb', color: '#fff' }} onClick={handleSave}>
            {blueprint?.id ? 'Save' : 'Save As'}
          </button>
        </div>
      </div>

      {showList && (
        <div style={overlayStyle} onClick={() => setShowList(false)}>
          <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ margin: '0 0 12px 0', fontSize: 15 }}>Saved Blueprints</h3>
            {savedList.length === 0 ? (
              <p style={{ color: '#94a3b8', fontSize: 13 }}>No blueprints saved yet.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {savedList.map((bp) => (
                  <div key={bp.id} style={itemStyle}>
                    <div style={{ flex: 1, cursor: 'pointer' }} onClick={() => { loadBlueprint(bp.id); setShowList(false); }}>
                      <div style={{ fontWeight: 600, fontSize: 13 }}>{bp.name}</div>
                      <div style={{ fontSize: 11, color: '#94a3b8' }}>
                        v{bp.version} — {bp.nodes.length} steps — {new Date(bp.updated_at).toLocaleDateString()}
                      </div>
                    </div>
                    <button
                      style={deleteBtnStyle}
                      onClick={(e) => { e.stopPropagation(); if (confirm(`Delete "${bp.name}"?`)) deleteBlueprint(bp.id); }}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
            <button style={{ ...btnStyle, marginTop: 12, width: '100%' }} onClick={() => setShowList(false)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}

const barStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '8px 16px',
  borderBottom: '1px solid #e5e7eb',
  background: '#fff',
  height: 48,
  zIndex: 10,
};

const nameStyle: React.CSSProperties = {
  fontSize: 14,
  fontWeight: 500,
  color: '#374151',
  cursor: 'pointer',
  padding: '2px 6px',
  borderRadius: 4,
};

const nameInputStyle: React.CSSProperties = {
  fontSize: 14,
  fontWeight: 500,
  color: '#374151',
  border: '1px solid #93c5fd',
  borderRadius: 4,
  padding: '2px 6px',
  outline: 'none',
  textAlign: 'center',
  width: 250,
};

const btnStyle: React.CSSProperties = {
  padding: '5px 12px',
  fontSize: 12,
  fontWeight: 500,
  border: '1px solid #d1d5db',
  borderRadius: 4,
  background: '#fff',
  color: '#374151',
  cursor: 'pointer',
};

const overlayStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'rgba(0,0,0,0.3)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 100,
};

const modalStyle: React.CSSProperties = {
  background: '#fff',
  borderRadius: 8,
  padding: 20,
  width: 420,
  maxHeight: '60vh',
  overflowY: 'auto',
  boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
};

const itemStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  padding: '8px 10px',
  border: '1px solid #e5e7eb',
  borderRadius: 6,
  background: '#f9fafb',
};

const deleteBtnStyle: React.CSSProperties = {
  border: 'none',
  background: 'none',
  color: '#ef4444',
  fontSize: 18,
  cursor: 'pointer',
  padding: '0 4px',
  lineHeight: 1,
};

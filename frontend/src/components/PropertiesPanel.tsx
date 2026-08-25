import { useReactFlow } from '@xyflow/react';
import { useBlueprintStore } from '../store';

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '6px 8px',
  border: '1px solid #d1d5db',
  borderRadius: 4,
  fontSize: 13,
  boxSizing: 'border-box',
};

const labelStyle: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  color: '#374151',
  marginBottom: 4,
  display: 'block',
};

const deleteBtnStyle: React.CSSProperties = {
  width: '100%',
  padding: '8px',
  border: '1px solid #ef4444',
  borderRadius: 4,
  fontSize: 13,
  color: '#ef4444',
  background: '#fff',
  cursor: 'pointer',
  marginTop: 12,
};

interface PropertiesPanelProps {
  setNodes: (updater: any[] | ((nds: any[]) => any[])) => void;
  onDelete: (nodeId: string) => void;
}

export default function PropertiesPanel({ setNodes, onDelete }: PropertiesPanelProps) {
  const { selectedNodeId } = useBlueprintStore();
  const { getNodes } = useReactFlow();

  const nodes = getNodes();
  const selectedNode = nodes.find((n) => n.id === selectedNodeId);
  if (!selectedNode) return null;

  const d = selectedNode.data as any;
  const isStart = d.stepType === 'start';
  const isFinish = d.stepType === 'finish';
  const isContinuation = d.stepType === 'continuation';

  const updateField = (path: string, value: any) => {
    setNodes((nds: any[]) =>
      nds.map((n: any) => {
        if (n.id !== selectedNodeId) return n;
        const newData = { ...n.data };
        if (path === 'label') newData.label = value;
        else if (path === 'description') newData.description = value;
        else if (path === 'gateType') newData.gateType = value;
        else if (path === 'linkCount') newData.linkCount = Math.max(1, parseInt(value) || 1);
        else if (path === 'inLinkCount') newData.inLinkCount = Math.max(1, parseInt(value) || 1);
        else if (path.startsWith('attributes.')) {
          const key = path.split('.')[1];
          newData.attributes = { ...newData.attributes, [key]: value };
        }
        return { ...n, data: newData };
      })
    );
  };

  return (
    <div style={{ width: 260, padding: 16, borderLeft: '1px solid #e5e7eb', background: '#f9fafb', overflowY: 'auto' }}>
      <h3 style={{ margin: '0 0 12px 0', fontSize: 14, fontWeight: 600 }}>Properties</h3>

      <div style={{ marginBottom: 12 }}>
        <label style={labelStyle}>Title</label>
        <input
          style={inputStyle}
          value={d.label || ''}
          onChange={(e) => updateField('label', e.target.value)}
        />
      </div>

      <div style={{ marginBottom: 12 }}>
        <label style={labelStyle}>Description</label>
        <textarea
          style={{ ...inputStyle, minHeight: 60, resize: 'vertical' }}
          value={d.description || ''}
          onChange={(e) => updateField('description', e.target.value)}
        />
      </div>

      {d.stepType === 'gate' && (
        <div style={{ marginBottom: 12 }}>
          <label style={labelStyle}>Gate Type</label>
          <select
            style={inputStyle}
            value={d.gateType || 'xor'}
            onChange={(e) => updateField('gateType', e.target.value)}
          >
            <option value="xor">XOR (exclusive)</option>
            <option value="and">AND (parallel)</option>
            <option value="or">OR (inclusive)</option>
          </select>
        </div>
      )}

      {!isFinish && (
        <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: 12, marginTop: 12 }}>
          <h4 style={{ margin: '0 0 10px 0', fontSize: 12, fontWeight: 600, color: '#6b7280' }}>Links</h4>

          {!isStart && (
            <div style={{ marginBottom: 10 }}>
              <label style={labelStyle}>Incoming (max)</label>
              <input
                style={inputStyle}
                type="number"
                min={1}
                max={10}
                value={d.inLinkCount || 1}
                onChange={(e) => updateField('inLinkCount', e.target.value)}
              />
            </div>
          )}

          {!isContinuation && (
            <div style={{ marginBottom: 10 }}>
              <label style={labelStyle}>Outgoing (max)</label>
              <input
                style={inputStyle}
                type="number"
                min={1}
                max={10}
                value={d.linkCount || 1}
                onChange={(e) => updateField('linkCount', e.target.value)}
              />
            </div>
          )}
        </div>
      )}

      {isFinish && (
        <div style={{ marginBottom: 12, fontSize: 12, color: '#6b7280', fontStyle: 'italic' }}>
          Finish — link to a Next Process step to connect to a different process.
        </div>
      )}

      {isContinuation && (
        <div style={{ marginBottom: 12, fontSize: 12, color: '#8b5cf6', fontStyle: 'italic' }}>
          Next Process — receives link from Finish to represent start of a different process.
        </div>
      )}

      <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: 12, marginTop: 12 }}>
        <h4 style={{ margin: '0 0 10px 0', fontSize: 12, fontWeight: 600, color: '#6b7280' }}>Attributes</h4>

        <div style={{ marginBottom: 10 }}>
          <label style={labelStyle}>Who</label>
          <input
            style={inputStyle}
            placeholder="Actor"
            value={d.attributes?.actor || ''}
            onChange={(e) => updateField('attributes.actor', e.target.value)}
          />
        </div>

        <div style={{ marginBottom: 10 }}>
          <label style={labelStyle}>Tool</label>
          <input
            style={inputStyle}
            placeholder="System used"
            value={d.attributes?.tool || ''}
            onChange={(e) => updateField('attributes.tool', e.target.value)}
          />
        </div>

        <div style={{ marginBottom: 10 }}>
          <label style={labelStyle}>Goal</label>
          <input
            style={inputStyle}
            placeholder="Expected outcome"
            value={d.attributes?.goal || ''}
            onChange={(e) => updateField('attributes.goal', e.target.value)}
          />
        </div>
      </div>

      <button
        style={deleteBtnStyle}
        onClick={() => onDelete(selectedNodeId!)}
      >
        Delete Step
      </button>
    </div>
  );
}

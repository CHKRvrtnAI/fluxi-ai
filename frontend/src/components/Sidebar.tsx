import type { StepType } from '../store';

const stepTypes: { type: StepType; label: string; icon: string }[] = [
  { type: 'start', label: 'Start', icon: '▶' },
  { type: 'step', label: 'Step', icon: '☐' },
  { type: 'gate', label: 'Gate', icon: '◇' },
  { type: 'finish', label: 'Finish', icon: '■' },
  { type: 'continuation', label: 'Next Process', icon: '↗' },
];

export default function Sidebar() {
  const onDragStart = (e: React.DragEvent, type: StepType) => {
    e.dataTransfer.setData('application/fluxi-node', type);
    e.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div style={{ width: 200, padding: 16, borderRight: '1px solid #e5e7eb', background: '#f9fafb' }}>
      <h3 style={{ margin: '0 0 12px 0', fontSize: 14, fontWeight: 600 }}>Steps</h3>
      {stepTypes.map((st) => (
        <div
          key={st.type}
          draggable
          onDragStart={(e) => onDragStart(e, st.type)}
          style={{
            padding: '8px 12px',
            marginBottom: 6,
            borderRadius: 6,
            border: '1px solid #d1d5db',
            background: '#fff',
            cursor: 'grab',
            fontSize: 13,
            userSelect: 'none',
          }}
        >
          {st.icon} {st.label}
        </div>
      ))}
    </div>
  );
}

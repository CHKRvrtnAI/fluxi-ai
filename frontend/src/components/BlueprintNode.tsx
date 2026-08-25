import { Handle, Position } from '@xyflow/react';
import type { NodeProps } from '@xyflow/react';

const stepColors: Record<string, string> = {
  start: '#22c55e',
  step: '#3b82f6',
  gate: '#f59e0b',
  finish: '#ef4444',
  continuation: '#8b5cf6',
};

const stepIcons: Record<string, string> = {
  start: '▶',
  step: '☐',
  gate: '◇',
  finish: '■',
  continuation: '↗',
};

export default function BlueprintNode({ data, selected }: NodeProps) {
  const d = data as any;
  const color = stepColors[d.stepType] || '#6b7280';
  const icon = stepIcons[d.stepType] || '?';
  const attrs = d.attributes || {};
  const hasAttrs = attrs.actor || attrs.tool || attrs.goal;

  const isStart = d.stepType === 'start';
  const isFinish = d.stepType === 'finish';
  const isContinuation = d.stepType === 'continuation';

  const inCount = isStart ? 0 : (d.inLinkCount || 1);
  const outCount = isFinish ? 1 : (isContinuation ? 0 : (d.linkCount || 1));

  const nodeWidth = 160;

  return (
    <div
      style={{
        padding: '12px 16px',
        borderRadius: 8,
        border: `2px solid ${selected ? '#000' : color}`,
        background: selected ? color + '22' : '#fff',
        width: nodeWidth,
        textAlign: 'center',
        cursor: 'grab',
        position: 'relative',
      }}
    >
      {Array.from({ length: inCount }).map((_, i) => {
        const spacing = nodeWidth / (inCount + 1);
        return (
          <Handle
            key={`in-${i}`}
            type="target"
            position={Position.Top}
            id={`in-${i}`}
            style={{
              background: '#3b82f6',
              width: 12,
              height: 12,
              top: -6,
              left: spacing * (i + 1) - 6,
            }}
          />
        );
      })}

      <div style={{ fontSize: 10, textTransform: 'uppercase', color, marginBottom: 4, fontWeight: 600 }}>
        {icon} {isContinuation ? 'next process' : d.stepType}
        {d.gateType && <span style={{ marginLeft: 4, opacity: 0.7 }}>({d.gateType})</span>}
      </div>
      <div style={{ fontWeight: 500 }}>{d.label}</div>
      {hasAttrs && (
        <div style={{ fontSize: 10, color: '#6b7280', marginTop: 4, textAlign: 'left' }}>
          {attrs.actor && <div>👤 {attrs.actor}</div>}
          {attrs.tool && <div>🔧 {attrs.tool}</div>}
          {attrs.goal && <div>🎯 {attrs.goal}</div>}
        </div>
      )}

      {Array.from({ length: outCount }).map((_, i) => {
        const spacing = nodeWidth / (outCount + 1);
        return (
          <Handle
            key={`out-${i}`}
            type="source"
            position={Position.Bottom}
            id={`out-${i}`}
            style={{
              background: '#22c55e',
              width: 12,
              height: 12,
              bottom: -6,
              left: spacing * (i + 1) - 6,
            }}
          />
        );
      })}
    </div>
  );
}

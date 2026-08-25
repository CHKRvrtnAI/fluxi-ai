import { useCallback, useEffect } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  ReactFlowProvider,
  BackgroundVariant,
  useReactFlow,
  useUpdateNodeInternals,
} from '@xyflow/react';
import type { Connection } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import BlueprintNode from './BlueprintNode';
import Sidebar from './Sidebar';
import PropertiesPanel from './PropertiesPanel';
import { useBlueprintStore } from '../store';
import type { StepType } from '../store';
import { v4 as uuid } from 'uuid';

const nodeTypes = { blueprint: BlueprintNode };

function EditorInner() {
  const { blueprint, updateNodes, updateEdges, selectNode, selectedNodeId, newBlueprint } = useBlueprintStore();
  const { screenToFlowPosition } = useReactFlow();
  const updateNodeInternals = useUpdateNodeInternals();
  const [nodes, setNodes, onNodesChange] = useNodesState(blueprint?.nodes || []);
  const [edges, setEdges, onEdgesChange] = useEdgesState(
    (blueprint?.edges || []).map((e) => ({ ...e, animated: true }))
  );

  useEffect(() => {
    if (!blueprint) {
      newBlueprint();
    }
  }, [blueprint, newBlueprint]);

  useEffect(() => {
    if (blueprint) {
      setNodes(blueprint.nodes);
      setEdges(blueprint.edges.map((e) => ({ ...e, animated: true })));
    }
  }, [blueprint?.id]);

  const syncToStore = useCallback(
    (n: any[], e: any[]) => {
      updateNodes(n);
      updateEdges(e);
    },
    [updateNodes, updateEdges]
  );

  const handleSetNodes = useCallback(
    (updater: any[] | ((nds: any[]) => any[])) => {
      setNodes((currentNodes) => {
        const nextNodes = typeof updater === 'function' ? updater(currentNodes) : updater;
        syncToStore(nextNodes, edges);
        nextNodes.forEach((n: any) => updateNodeInternals(n.id));
        return nextNodes;
      });
    },
    [setNodes, edges, syncToStore, updateNodeInternals]
  );

  const deleteNode = useCallback(
    (nodeId: string) => {
      setNodes((nds) => {
        const next = nds.filter((n) => n.id !== nodeId);
        syncToStore(next, edges);
        return next;
      });
      setEdges((eds) => {
        const next = eds.filter((e) => e.source !== nodeId && e.target !== nodeId);
        syncToStore(nodes, next);
        return next;
      });
      selectNode(null);
    },
    [setNodes, setEdges, nodes, edges, syncToStore, selectNode]
  );

  const deleteEdge = useCallback(
    (edgeId: string) => {
      setEdges((eds) => {
        const next = eds.filter((e) => e.id !== edgeId);
        syncToStore(nodes, next);
        return next;
      });
    },
    [setEdges, nodes, syncToStore]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Delete' || e.key === 'Backspace') {
        const target = e.target as HTMLElement;
        if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT') return;
        if (selectedNodeId) {
          e.preventDefault();
          deleteNode(selectedNodeId);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedNodeId, deleteNode]);

  const onConnect = useCallback(
    (conn: Connection) => {
      if (conn.source === conn.target) return;

      const sourceNode = nodes.find((n) => n.id === conn.source);
      const targetNode = nodes.find((n) => n.id === conn.target);
      if (!sourceNode || !targetNode) return;

      const sourceData = sourceNode.data as any;
      const targetData = targetNode.data as any;

      if (targetData.stepType === 'start') return;
      if (sourceData.stepType === 'continuation') return;
      if (sourceData.stepType === 'finish' && targetData.stepType !== 'continuation') return;
      if (sourceData.stepType === 'finish') {
        const outEdges = edges.filter((e) => e.source === conn.source);
        if (outEdges.length >= 1) return;
      }

      if (conn.sourceHandle) {
        const used = edges.some(
          (e) => e.source === conn.source && e.sourceHandle === conn.sourceHandle
        );
        if (used) return;
      }

      if (conn.targetHandle) {
        const used = edges.some(
          (e) => e.target === conn.target && e.targetHandle === conn.targetHandle
        );
        if (used) return;
      }

      setEdges((eds) => {
        const next = addEdge({ ...conn, animated: true }, eds);
        syncToStore(nodes, next);
        return next;
      });
    },
    [setEdges, nodes, edges, syncToStore]
  );

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const type = e.dataTransfer.getData('application/fluxi-node') as StepType;
      if (!type) return;

      const position = screenToFlowPosition({ x: e.clientX, y: e.clientY });
      const label = type === 'continuation' ? 'Next Process' : type.charAt(0).toUpperCase() + type.slice(1);

      const newNode = {
        id: uuid(),
        type: 'blueprint',
        position,
        data: {
          label,
          stepType: type,
          description: '',
          attributes: { actor: '', tool: '', goal: '' },
          gateType: type === 'gate' ? 'xor' : undefined,
          linkCount: type === 'gate' ? 2 : 1,
          inLinkCount: 1,
        },
      };

      setNodes((nds) => {
        const next = [...nds, newNode];
        syncToStore(next, edges);
        return next;
      });
    },
    [screenToFlowPosition, setNodes, edges, syncToStore]
  );

  const onNodeClick = useCallback((_: any, node: any) => {
    selectNode(node.id);
  }, [selectNode]);

  const onEdgeDoubleClick = useCallback((_: any, edge: any) => {
    deleteEdge(edge.id);
  }, [deleteEdge]);

  const onPaneClick = useCallback(() => {
    selectNode(null);
  }, [selectNode]);

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          onEdgeDoubleClick={onEdgeDoubleClick}
          onPaneClick={onPaneClick}
          onDragOver={onDragOver}
          onDrop={onDrop}
          nodeTypes={nodeTypes}
          fitView
          style={{ background: '#f8fafc' }}
        >
          <Controls />
          <Background variant={BackgroundVariant.Dots} gap={16} size={1} />
        </ReactFlow>
      </div>
      {selectedNodeId && (
        <PropertiesPanel setNodes={handleSetNodes} onDelete={deleteNode} />
      )}
    </div>
  );
}

export default function BlueprintEditor() {
  return (
    <ReactFlowProvider>
      <EditorInner />
    </ReactFlowProvider>
  );
}

import { create } from 'zustand';

export type StepType = 'start' | 'step' | 'gate' | 'finish' | 'continuation';

export type GateType = 'and' | 'or' | 'xor';

export interface StepAttributes {
  actor: string;
  tool: string;
  goal: string;
}

export interface BlueprintNodeData {
  label: string;
  stepType: StepType;
  description: string;
  attributes: StepAttributes;
  gateType?: GateType;
  linkCount?: number;
}

export interface BlueprintEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
  condition?: string;
}

export interface Blueprint {
  id: string;
  name: string;
  description: string;
  version: number;
  nodes: any[];
  edges: BlueprintEdge[];
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

interface BlueprintStore {
  blueprint: Blueprint | null;
  selectedNodeId: string | null;
  setBlueprint: (bp: Blueprint) => void;
  updateNodes: (nodes: any[]) => void;
  updateEdges: (edges: any[]) => void;
  selectNode: (id: string | null) => void;
}

export const useBlueprintStore = create<BlueprintStore>((set) => ({
  blueprint: null,
  selectedNodeId: null,
  setBlueprint: (bp) => set({ blueprint: bp }),
  updateNodes: (nodes) =>
    set((state) =>
      state.blueprint
        ? { blueprint: { ...state.blueprint, nodes } }
        : {}
    ),
  updateEdges: (edges) =>
    set((state) =>
      state.blueprint
        ? { blueprint: { ...state.blueprint, edges } }
        : {}
    ),
  selectNode: (id) => set({ selectedNodeId: id }),
}));

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

const API = 'http://localhost:8080/api/v1';

interface BlueprintStore {
  blueprint: Blueprint | null;
  selectedNodeId: string | null;
  savedList: Blueprint[];
  setBlueprint: (bp: Blueprint) => void;
  updateNodes: (nodes: any[]) => void;
  updateEdges: (edges: any[]) => void;
  selectNode: (id: string | null) => void;
  newBlueprint: () => void;
  saveBlueprint: () => Promise<void>;
  loadBlueprints: () => Promise<void>;
  loadBlueprint: (id: string) => Promise<void>;
  deleteBlueprint: (id: string) => Promise<void>;
}

export const useBlueprintStore = create<BlueprintStore>((set, get) => ({
  blueprint: null,
  selectedNodeId: null,
  savedList: [],

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

  newBlueprint: () =>
    set({
      blueprint: {
        id: '',
        name: 'Untitled Blueprint',
        description: '',
        version: 1,
        nodes: [],
        edges: [],
        metadata: {},
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      selectedNodeId: null,
    }),

  saveBlueprint: async () => {
    const bp = get().blueprint;
    if (!bp) return;

    const payload = {
      name: bp.name,
      description: bp.description,
      nodes: bp.nodes.map((n: any) => ({
        id: n.id,
        type: n.data.stepType,
        title: n.data.label,
        description: n.data.description || '',
        attributes: n.data.attributes || { actor: '', tool: '', goal: '' },
        gate_type: n.data.gateType || null,
        metadata: {
          position: n.position,
          linkCount: n.data.linkCount || 1,
          inLinkCount: n.data.inLinkCount || 1,
        },
      })),
      edges: bp.edges.map((e) => ({
        id: e.id,
        source: e.source,
        target: e.target,
        label: e.label || '',
        condition: e.condition || '',
      })),
      metadata: bp.metadata,
    };

    try {
      if (bp.id) {
        const res = await fetch(`${API}/blueprints/${bp.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          const updated = await res.json();
          set({ blueprint: apiToBlueprint(updated) });
        }
      } else {
        const res = await fetch(`${API}/blueprints/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          const created = await res.json();
          set({ blueprint: apiToBlueprint(created) });
        }
      }
    } catch (e) {
      console.error('Save failed:', e);
    }
  },

  loadBlueprints: async () => {
    try {
      const res = await fetch(`${API}/blueprints/`);
      if (res.ok) {
        const list = await res.json();
        set({ savedList: list.map(apiToBlueprint) });
      }
    } catch (e) {
      console.error('Load list failed:', e);
    }
  },

  loadBlueprint: async (id: string) => {
    try {
      const res = await fetch(`${API}/blueprints/${id}`);
      if (res.ok) {
        const bp = await res.json();
        set({ blueprint: apiToBlueprint(bp), selectedNodeId: null });
      }
    } catch (e) {
      console.error('Load failed:', e);
    }
  },

  deleteBlueprint: async (id: string) => {
    try {
      await fetch(`${API}/blueprints/${id}`, { method: 'DELETE' });
      set((state) => ({
        savedList: state.savedList.filter((b) => b.id !== id),
        blueprint: state.blueprint?.id === id ? null : state.blueprint,
      }));
    } catch (e) {
      console.error('Delete failed:', e);
    }
  },
}));

function apiToBlueprint(api: any): Blueprint {
  return {
    id: api.id,
    name: api.name,
    description: api.description || '',
    version: api.version || 1,
    nodes: (api.nodes || []).map((n: any) => ({
      id: n.id,
      type: 'blueprint',
      position: n.metadata?.position || { x: 0, y: 0 },
      data: {
        label: n.title,
        stepType: n.type,
        description: n.description || '',
        attributes: n.attributes || { actor: '', tool: '', goal: '' },
        gateType: n.gate_type || undefined,
        linkCount: n.metadata?.linkCount || 1,
        inLinkCount: n.metadata?.inLinkCount || 1,
      },
    })),
    edges: (api.edges || []).map((e: any) => ({
      id: e.id,
      source: e.source,
      target: e.target,
      label: e.label || '',
      condition: e.condition || '',
    })),
    metadata: api.metadata || {},
    created_at: api.created_at,
    updated_at: api.updated_at,
  };
}

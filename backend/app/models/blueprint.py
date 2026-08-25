from enum import Enum
from typing import Optional
from pydantic import BaseModel, Field
import uuid
from datetime import datetime


class StepType(str, Enum):
    START = "start"
    STEP = "step"
    GATE = "gate"
    FINISH = "finish"
    CONTINUATION = "continuation"


class GateType(str, Enum):
    AND = "and"
    OR = "or"
    XOR = "xor"


class StepAttributes(BaseModel):
    actor: str = ""
    tool: str = ""
    goal: str = ""


class NodePosition(BaseModel):
    x: float = 0.0
    y: float = 0.0


class BlueprintNode(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    type: StepType
    title: str
    description: str = ""
    attributes: StepAttributes = StepAttributes()
    gate_type: Optional[GateType] = None
    metadata: dict = {}
    position: NodePosition = NodePosition()


class BlueprintEdge(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    source: str
    target: str
    label: str = ""
    condition: str = ""


class Blueprint(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    description: str = ""
    version: int = 1
    nodes: list[BlueprintNode] = []
    edges: list[BlueprintEdge] = []
    metadata: dict = {}
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    created_by: str = ""


class BlueprintCreate(BaseModel):
    name: str
    description: str = ""
    nodes: list[BlueprintNode] = []
    edges: list[BlueprintEdge] = []
    metadata: dict = {}


class BlueprintUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    nodes: Optional[list[BlueprintNode]] = None
    edges: Optional[list[BlueprintEdge]] = None
    metadata: Optional[dict] = None

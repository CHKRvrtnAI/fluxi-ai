from fastapi import APIRouter, HTTPException
from ..models.blueprint import Blueprint, BlueprintCreate, BlueprintUpdate
from ..core.database import get_blueprints
import uuid
from datetime import datetime

router = APIRouter(prefix="/blueprints", tags=["blueprints"])


def _doc_to_blueprint(doc: dict) -> Blueprint:
    doc.pop("_key", None)
    doc.pop("_id", None)
    doc.pop("_rev", None)
    return Blueprint(**doc)


@router.post("/", response_model=Blueprint)
def create_blueprint(payload: BlueprintCreate):
    bp_id = str(uuid.uuid4())
    doc = {
        "_key": bp_id,
        "id": bp_id,
        "name": payload.name,
        "description": payload.description,
        "version": 1,
        "nodes": [n.model_dump() for n in payload.nodes],
        "edges": [e.model_dump() for e in payload.edges],
        "metadata": payload.metadata,
        "created_at": datetime.utcnow().isoformat(),
        "updated_at": datetime.utcnow().isoformat(),
        "created_by": "",
    }
    get_blueprints().insert(doc)
    return _doc_to_blueprint(doc)


@router.get("/", response_model=list[Blueprint])
def list_blueprints():
    docs = []
    for doc in get_blueprints().all():
        docs.append(_doc_to_blueprint(doc))
    return docs


@router.get("/{blueprint_id}", response_model=Blueprint)
def get_blueprint(blueprint_id: str):
    try:
        doc = get_blueprints().get(blueprint_id)
    except Exception:
        doc = None
    if not doc:
        raise HTTPException(status_code=404, detail="Blueprint not found")
    return _doc_to_blueprint(doc)


@router.put("/{blueprint_id}", response_model=Blueprint)
def update_blueprint(blueprint_id: str, payload: BlueprintUpdate):
    try:
        doc = get_blueprints().get(blueprint_id)
    except Exception:
        doc = None
    if not doc:
        raise HTTPException(status_code=404, detail="Blueprint not found")

    update_data = payload.model_dump(exclude_unset=True)
    if "nodes" in update_data and update_data["nodes"] is not None:
        update_data["nodes"] = [n.model_dump() if hasattr(n, "model_dump") else n for n in update_data["nodes"]]
    if "edges" in update_data and update_data["edges"] is not None:
        update_data["edges"] = [e.model_dump() if hasattr(e, "model_dump") else e for e in update_data["edges"]]

    update_data["updated_at"] = datetime.utcnow().isoformat()
    update_data["version"] = doc.get("version", 0) + 1

    get_blueprints().update_match({"_key": blueprint_id}, update_data)
    updated = get_blueprints().get(blueprint_id)
    return _doc_to_blueprint(updated)


@router.delete("/{blueprint_id}")
def delete_blueprint(blueprint_id: str):
    try:
        get_blueprints().delete({"_key": blueprint_id})
    except Exception:
        raise HTTPException(status_code=404, detail="Blueprint not found")
    return {"ok": True}

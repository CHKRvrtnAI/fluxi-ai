from fastapi import APIRouter, HTTPException
from ..models.blueprint import Blueprint, BlueprintCreate, BlueprintUpdate
import uuid
from datetime import datetime

router = APIRouter(prefix="/blueprints", tags=["blueprints"])

blueprints_db: dict[str, Blueprint] = {}


@router.post("/", response_model=Blueprint)
def create_blueprint(payload: BlueprintCreate):
    bp = Blueprint(
        id=str(uuid.uuid4()),
        name=payload.name,
        description=payload.description,
        nodes=payload.nodes,
        edges=payload.edges,
        metadata=payload.metadata,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow(),
    )
    blueprints_db[bp.id] = bp
    return bp


@router.get("/", response_model=list[Blueprint])
def list_blueprints():
    return list(blueprints_db.values())


@router.get("/{blueprint_id}", response_model=Blueprint)
def get_blueprint(blueprint_id: str):
    if blueprint_id not in blueprints_db:
        raise HTTPException(status_code=404, detail="Blueprint not found")
    return blueprints_db[blueprint_id]


@router.put("/{blueprint_id}", response_model=Blueprint)
def update_blueprint(blueprint_id: str, payload: BlueprintUpdate):
    if blueprint_id not in blueprints_db:
        raise HTTPException(status_code=404, detail="Blueprint not found")

    bp = blueprints_db[blueprint_id]
    update_data = payload.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(bp, key, value)
    bp.updated_at = datetime.utcnow()
    bp.version += 1
    blueprints_db[blueprint_id] = bp
    return bp


@router.delete("/{blueprint_id}")
def delete_blueprint(blueprint_id: str):
    if blueprint_id not in blueprints_db:
        raise HTTPException(status_code=404, detail="Blueprint not found")
    del blueprints_db[blueprint_id]
    return {"ok": True}

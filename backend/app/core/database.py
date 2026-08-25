from arango import ArangoClient
from .config import settings

_client = None
_db = None
_collection = None


def get_db():
    global _client, _db
    if _db is None:
        _client = ArangoClient(hosts=settings.ARANGO_URL)
        sys_db = _client.db("_system", username=settings.ARANGO_USER, password=settings.ARANGO_PASSWORD)
        if not sys_db.has_database(settings.ARANGO_DB):
            sys_db.create_database(settings.ARANGO_DB)
        _db = _client.db(settings.ARANGO_DB, username=settings.ARANGO_USER, password=settings.ARANGO_PASSWORD)
    return _db


def get_blueprints():
    global _collection
    if _collection is None:
        db = get_db()
        if not db.has_collection("blueprints"):
            db.create_collection("blueprints")
        _collection = db.collection("blueprints")
    return _collection

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.core.permissions import require
from app.api.deps import get_current_user
from app.core.security import OIDCUserInfo
from app.models.audit import AuditEvent

router = APIRouter()

@router.get("")
def list_audit_events(limit: int = Query(default=100, ge=1, le=500), offset: int = Query(default=0, ge=0), db: Session = Depends(get_db), current_user: OIDCUserInfo = Depends(require('audit.read'))):
    return db.query(AuditEvent).order_by(AuditEvent.occurred_at.desc()).offset(offset).limit(limit).all()

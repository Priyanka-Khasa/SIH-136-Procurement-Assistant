from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.core.permissions import require, require_no_own_evidence_approval
from app.core.audit_helper import write_audit_event
from app.api.deps import get_current_user
from app.core.security import OIDCUserInfo
from app.models.evidence import EvidenceFile
from uuid import UUID

router = APIRouter()

@router.post("/pilots/{id}/evidence", tags=['Startup Applicant'])
def submit_evidence(id: str, filename: str, agreement_version: int, db: Session = Depends(get_db), current_user: OIDCUserInfo = Depends(require('evidence.submit'))):
    ev = EvidenceFile(agreement_id=id, agreement_version=agreement_version, submitted_by=UUID(current_user.sub), filename=filename, status="Submitted")
    db.add(ev)
    db.commit()
    write_audit_event(db, current_user.sub, current_user.role, "evidence.submitted", "EvidenceFile", str(ev.id), f"Evidence {filename} submitted")
    return {"status": "ok"}

@router.post("/evidence/{id}/validate", tags=['Validator'])
def validate_evidence(id: str, db: Session = Depends(get_db), current_user: OIDCUserInfo = Depends(require('evidence.validate'))):
    require_no_own_evidence_approval(id, db, current_user)
    write_audit_event(db, current_user.sub, current_user.role, "evidence.validated", "EvidenceFile", id, f"Evidence {id} validated")
    return {"status": "ok"}

@router.get("/pilots/{id}/evidence")
def get_pilot_evidence(id: str, db: Session = Depends(get_db), current_user: OIDCUserInfo = Depends(get_current_user)):
    return db.query(EvidenceFile).filter(EvidenceFile.agreement_id == id).all()

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Depends 
from pydantic import BaseModel
from typing import List
from database import Base, engine, get_db, FerramentaModel
from sqlalchemy.orm import Session

Base.metadata.create_all(bind=engine)

app = FastAPI()

#CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class FerramentaSchema(BaseModel):
  nome: str
  marca: str
  codigo: str

banco = []

  # 1 ROTA LISTAR FERRAMENTAS

@app.get('/ferramentas', response_model=List[FerramentaSchema])
def listar_ferramentas(db: Session = Depends(get_db)):
  return db.query(FerramentaModel).all()
  
# 2 ROTA ADICIONAR FERRAMENTA

@app.post('/ferramentas', response_model=FerramentaSchema, status_code=201)
def add_ferramenta(ferramenta: FerramentaSchema, db: Session = Depends(get_db)):
  codigo_existe = db.query(FerramentaModel).filter(FerramentaModel.codigo == ferramenta.codigo).first()
  if codigo_existe:
     raise HTTPException(status_code=400, detail=f"O código '{ferramenta.codigo}' já está cadastrado!")
  else:
    nova_ferramenta = FerramentaModel(
      codigo = ferramenta.codigo,
      nome = ferramenta.nome,
      marca = ferramenta.marca
    )
    db.add(nova_ferramenta)
    db.commit()
    db.refresh(nova_ferramenta)
    return nova_ferramenta

 # 3 ROTA DELETAR FERRAMENTA

@app.delete('/ferramentas/{codigo}')
def deletar_ferramenta(codigo: str, db: Session = Depends(get_db)):
  ferramenta = db.query(FerramentaModel).filter(FerramentaModel.codigo == codigo).first()
  if not ferramenta: 
    raise HTTPException(status_code=404, detail="Ferramenta não encontrada")
  else: 
    db.delete(ferramenta)
    db.commit()
    return {'messagem': f"Ferramenta com código {codigo} removida com sucesso"}
    


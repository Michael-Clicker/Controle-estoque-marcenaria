from sqlalchemy import create_engine, Column, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

SQLALCHEMY_DATABASE_URL = 'sqlite:///./estoque.db'

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

class FerramentaModel(Base):
  __tablename__ = 'ferramentas'
  codigo = Column(String, primary_key=True, index=True)
  nome = Column(String, nullable=False)
  marca = Column(String, nullable=False)

def get_db():
  db =  SessionLocal()
  try:
     yield db
  finally:
      db.close()
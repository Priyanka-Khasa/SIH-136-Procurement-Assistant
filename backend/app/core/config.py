from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_env: str = Field(default='development', alias='APP_ENV')
    backend_host: str = Field(default='0.0.0.0', alias='BACKEND_HOST')
    backend_port: int = Field(default=8000, alias='BACKEND_PORT')
    postgres_db: str = Field(default='pilotproof', alias='POSTGRES_DB')
    postgres_user: str = Field(default='pilotproof', alias='POSTGRES_USER')
    postgres_password: str = Field(default='pilotproof', alias='POSTGRES_PASSWORD')
    postgres_host: str = Field(default='postgres', alias='POSTGRES_HOST')
    postgres_port: int = Field(default=5432, alias='POSTGRES_PORT')
    seed_demo_users: bool = Field(default=True, alias='SEED_DEMO_USERS')
    database_url_override: str | None = Field(default=None, alias='DATABASE_URL')
    secret_key: str = Field(default='09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7', alias='SECRET_KEY')
    oidc_issuer: str | None = Field(default=None, alias='OIDC_ISSUER')

    model_config = SettingsConfigDict(env_file='.env', case_sensitive=False)

    @property
    def database_url(self) -> str:
        if self.database_url_override and self.database_url_override.strip():
            return self.database_url_override.strip()
        if self.app_env.lower() in {'development', 'dev', 'local'}:
            return 'sqlite:///./pilotproof-dev.db'
        return (
            f'postgresql+psycopg://{self.postgres_user}:{self.postgres_password}'
            f'@{self.postgres_host}:{self.postgres_port}/{self.postgres_db}'
        )


settings = Settings()

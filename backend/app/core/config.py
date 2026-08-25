import os


class Settings:
    ARANGO_URL: str = os.getenv("ARANGO_URL", "http://localhost:8529")
    ARANGO_USER: str = os.getenv("ARANGO_USER", "root")
    ARANGO_PASSWORD: str = os.getenv("ARANGO_PASSWORD", "fluxi_dev")
    ARANGO_DB: str = os.getenv("ARANGO_DB", "fluxi")

    POSTGRES_URL: str = os.getenv("POSTGRES_URL", "postgresql://fluxi:fluxi_dev@localhost:5432/fluxi")

    VALKEY_URL: str = os.getenv("VALKEY_URL", "redis://localhost:6379/0")

    MINIO_ENDPOINT: str = os.getenv("MINIO_ENDPOINT", "localhost:9000")
    MINIO_ACCESS_KEY: str = os.getenv("MINIO_ACCESS_KEY", "fluxi")
    MINIO_SECRET_KEY: str = os.getenv("MINIO_SECRET_KEY", "fluxi_dev")
    MINIO_BUCKET: str = os.getenv("MINIO_BUCKET", "fluxi")

    CASDOOR_ENDPOINT: str = os.getenv("CASDOOR_ENDPOINT", "http://localhost:8000")
    CASDOOR_CLIENT_ID: str = os.getenv("CASDOOR_CLIENT_ID", "")
    CASDOOR_CLIENT_SECRET: str = os.getenv("CASDOOR_CLIENT_SECRET", "")

    SECRET_KEY: str = os.getenv("SECRET_KEY", "change-me-in-production")
    API_HOST: str = os.getenv("API_HOST", "0.0.0.0")
    API_PORT: int = int(os.getenv("API_PORT", "8080"))


settings = Settings()

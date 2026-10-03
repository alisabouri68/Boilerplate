CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS design_systems_colors (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  data       JSONB NOT NULL,
  version    INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS dsc_data_gin ON design_systems_colors USING GIN (data);
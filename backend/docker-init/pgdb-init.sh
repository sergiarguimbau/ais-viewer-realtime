#!/bin/bash
set -e

# Enable PostGIS extension if it doesn't exist yet
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE EXTENSION IF NOT EXISTS postgis;
EOSQL

# Create the vessels table if it does not exist already
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE TABLE IF NOT EXISTS vessels (
        mmsi        INTEGER PRIMARY KEY,              -- Vessel User ID (MMSI)
        position    geometry(Point, 4326) NOT NULL,   -- Geo point (lon/lat, WGS84)
        heading     INTEGER,                          -- Direction in degrees
        updated_at  TIMESTAMPTZ DEFAULT NOW()         -- Last update timestamp
    );

    -- Spatial index for fast bounding box queries
    CREATE INDEX IF NOT EXISTS idx_vessels_position ON vessels USING GIST (position);
    -- Recency index for quick time filtering
    CREATE INDEX IF NOT EXISTS idx_vessels_updated_at ON vessels (updated_at);
EOSQL

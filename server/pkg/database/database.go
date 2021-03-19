package database

import (
	"path/filepath"

	"cryptobeats.xyz/pkg/config"
	"github.com/jmoiron/sqlx"
	"github.com/lumina-tech/gooq/pkg/database"
)

func NewDatabase(
	cfg *config.Config,
) *sqlx.DB {
	dbConfig := cfg.Database
	db := database.NewDatabase(dbConfig.GetGOOQConfig())
	if dbConfig.MaxConnections.Valid {
		db.SetMaxOpenConns(int(dbConfig.MaxConnections.Int64))
	}
	if cfg.Database.IsMigrationEnabled {
		migrationPath := filepath.Join(config.GetBaseDirectory(), dbConfig.MigrationPath)
		database.MigrateDatabase(db.DB, migrationPath)
	}
	return db
}

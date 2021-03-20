package collectible

import (
	"context"

	"cryptobeats.xyz/model"
	"github.com/jmoiron/sqlx"
)

type Service struct {
	db *sqlx.DB
}

func NewCollectibleService(
	db *sqlx.DB,
) *Service {
	return &Service{
		db: db,
	}
}

func (service *Service) CreateCollectible(
	ctx context.Context,
) (*model.Collectible, error) {
	// get user from context
	// create collectible
	// add to users' default playlist
	return nil, nil
}

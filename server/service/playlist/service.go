package playlist

import (
	"context"

	"cryptobeats.xyz/model"
	"cryptobeats.xyz/repository"
	"github.com/jmoiron/sqlx"
)

type Service struct {
	db                            *sqlx.DB
	playlistRepository            *repository.PlaylistRepository
	playlistAssociationRepository *repository.PlaylistAssociationRepository
}

func NewPlaylistService(
	db *sqlx.DB,
	playlistRepository *repository.PlaylistRepository,
	playlistAssociationRepository *repository.PlaylistAssociationRepository,
) *Service {
	return &Service{
		db:                            db,
		playlistRepository:            playlistRepository,
		playlistAssociationRepository: playlistAssociationRepository,
	}
}

func (service *Service) CreateDefaultPlaylist(
	user *model.User,
) (*model.Playlist, error) {
	return nil, nil
}

func (service *Service) GetDefaultPlaylist(
	context context.Context,
) (*model.Playlist, error) {
	return nil, nil
}

func (service *Service) AddCollectibleToPlaylist(
	context context.Context,
) error {
	return nil
}

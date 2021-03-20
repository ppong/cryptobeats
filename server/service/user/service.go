package user

import (
	"context"

	"cryptobeats.xyz/model"

	"cryptobeats.xyz/repository"
	"cryptobeats.xyz/service/playlist"
	"github.com/jmoiron/sqlx"
)

type Service struct {
	db              *sqlx.DB
	userRepository  *repository.UserRepository
	playlistService *playlist.Service
}

func NewUserService(
	db *sqlx.DB,
	userRepository *repository.UserRepository,
	playlistService *playlist.Service,
) *Service {
	return &Service{
		db:              db,
		userRepository:  userRepository,
		playlistService: playlistService,
	}
}

func (service *Service) SignInOrSignUp() (*model.User, error) {
	// if user exists login
	return nil, nil
}

func (service *Service) GetCurrentUser(
	ctx context.Context,
) (*model.User, error) {
	return nil, nil
}

func (service *Service) UpdateUser(
	ctx context.Context,
) (*model.User, error) {
	return nil, nil
}

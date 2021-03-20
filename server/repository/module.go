package repository

import (
	"go.uber.org/fx"
)

func Module() fx.Option {
	return fx.Provide(
		NewCollectibleRepository,
		NewFollowRepository,
		NewPlaylistAssociationRepository,
		NewPlaylistRepository,
		NewUserRepository,
	)
}

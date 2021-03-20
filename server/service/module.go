package service

import (
	"cryptobeats.xyz/service/collectible"
	"cryptobeats.xyz/service/playlist"
	"cryptobeats.xyz/service/user"
	"go.uber.org/fx"
)

func Module() fx.Option {
	return fx.Provide(
		collectible.NewCollectibleService,
		playlist.NewPlaylistService,
		user.NewUserService,
	)
}

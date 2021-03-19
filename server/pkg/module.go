package pkg

import (
	"cryptobeats.xyz/pkg/config"
	"cryptobeats.xyz/pkg/database"
	"cryptobeats.xyz/pkg/logger"
	"go.uber.org/fx"
)

func Module(configFile string) fx.Option {
	return fx.Provide(
		func() *config.Config { return config.NewConfig(configFile) },
		database.NewDatabase,
		logger.GetDefaultLogger,
	)
}

package main

import (
	"cryptobeats.xyz/pkg/config"
	"cryptobeats.xyz/pkg/database"
	"cryptobeats.xyz/server"
	"flag"
	"go.uber.org/fx"
)

func main() {

	configFile := flag.String("config", "config/config.yaml", "config file")
	flag.Parse()

	app := fx.New(
		fx.Provide(
			func() *config.Config { return config.NewConfig(*configFile) },
			database.NewDatabase,
		),
		fx.Invoke(server.NewAppServer))
	app.Run()
	<-app.Done()
}


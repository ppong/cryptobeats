package main

import (
	"flag"

	"cryptobeats.xyz/service"

	"cryptobeats.xyz/pkg"
	"cryptobeats.xyz/repository"
	"cryptobeats.xyz/server"
	"go.uber.org/fx"
)

func main() {
	configFile := flag.String("config", "config/config.yaml", "config file")
	flag.Parse()

	app := fx.New(
		pkg.Module(*configFile),
		repository.Module(),
		service.Module(),
		fx.Invoke(server.NewAppServer))
	app.Run()
	<-app.Done()
}

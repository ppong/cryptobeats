package generator

import (
	"context"
	"fmt"
	"os"

	"cryptobeats.xyz/pkg"
	"github.com/spf13/cobra"
	"go.uber.org/fx"
)

var (
	rootCmd    = &cobra.Command{}
	configFile string
)

func init() {
	rootCmd.PersistentFlags().StringVar(&configFile, "config", "config/config.yaml", "config file")
	rootCmd.AddCommand(generateDatabaseModelsCommand)
}

func Execute() {
	if err := rootCmd.Execute(); err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
}

func invoke(funcs ...interface{}) {
	providers := pkg.Module(configFile)
	app := fx.New(providers, fx.Invoke(funcs...))
	if err := app.Start(context.Background()); err != nil {
		panic(err)
	}
	defer app.Stop(context.Background())
}

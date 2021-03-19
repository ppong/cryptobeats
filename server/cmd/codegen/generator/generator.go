package generator

import (
	"fmt"
	"os"

	"cryptobeats.xyz/pkg/config"
	"github.com/jmoiron/sqlx"
	"github.com/lumina-tech/gooq/pkg/database"
	"github.com/lumina-tech/gooq/pkg/generator"
	"github.com/lumina-tech/gooq/pkg/generator/plugin/enumgen"
	"github.com/lumina-tech/gooq/pkg/generator/plugin/modelgen"
	"github.com/spf13/cobra"
)

var generateDatabaseModelsCommand = &cobra.Command{
	Use:   "generate-database-model",
	Short: "generate Go models by introspecting the database",
	Run: func(cmd *cobra.Command, args []string) {
		invoke(func(config *config.Config) {
			dbConfig := config.Database
			db := database.NewDockerizedDB(dbConfig.GetGOOQConfig(), "11.5-alpine")
			defer db.Close()
			database.MigrateDatabase(db.DB.DB, dbConfig.MigrationPath)
			generateModelsForDB(db.DB, &dbConfig)
		})
	},
}

func generateModelsForDB(
	db *sqlx.DB, config *config.DatabaseConfig,
) {
	enumOutputFile := fmt.Sprintf("model/%s_enum.generated.go", config.DatabaseName)
	modelOutputFile := fmt.Sprintf("model/%s_model.generated.go", config.DatabaseName)
	tableOutputFile := fmt.Sprintf("table/%s_table.generated.go", config.DatabaseName)
	err := generator.NewGenerator(
		enumgen.NewEnumGenerator(enumOutputFile),
		modelgen.NewModelGenerator(modelOutputFile, "table", "model"),
		modelgen.NewTableGenerator(tableOutputFile, "table", "model"),
	).Run(db)
	if err != nil {
		_, _ = fmt.Fprint(os.Stderr, "cannot generate code:", err)
		os.Exit(1)
	}
}

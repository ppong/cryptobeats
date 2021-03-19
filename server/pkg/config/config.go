package config

import (
	"log"
	"os"

	"github.com/lumina-tech/gooq/pkg/database"
	"go.uber.org/config"
	"gopkg.in/guregu/null.v3"
)

type Config struct {
	Server   ServerConfig   `yaml:"server"`
	Database DatabaseConfig `yaml:"database"`
}

func NewConfig(
	fileName string,
) *Config {
	provider, err := config.NewYAML(config.File(fileName))
	if err != nil {
		log.Fatalf("cannot parse config file=%s", fileName)
	}
	result := Config{}
	if err := provider.Get("configmap").Populate(&result); err != nil {
		log.Fatal(err)
	}
	result.Database.ResolveSecrets()
	return &result
}

type ServerConfig struct {
}

type DatabaseConfig struct {
	Engine             string   `yaml:"engine"`
	Host               string   `yaml:"host"`
	Port               int64    `yaml:"port"`
	Username           string   `yaml:"username"`
	Password           string   `yaml:"password"`
	PasswordEnv        string   `yaml:"passwordEnv"`
	DatabaseName       string   `yaml:"dbname"`
	MigrationPath      string   `yaml:"migrationPath"`
	IsMigrationEnabled bool     `yaml:"isMigrationEnabled"`
	SSLMode            string   `yaml:"sslMode"`
	Version            string   `yaml:"version"`
	MaxConnections     null.Int `yaml:"maxConnections"`
}

func (config *DatabaseConfig) ResolveSecrets() {
	if config.PasswordEnv != "" {
		config.Password = os.Getenv(config.PasswordEnv)
	}
}

func (config *DatabaseConfig) GetGOOQConfig() *database.DatabaseConfig {
	return &database.DatabaseConfig{
		Host:          config.Host,
		Port:          config.Port,
		Username:      config.Username,
		Password:      config.Password,
		DatabaseName:  config.DatabaseName,
		SSLMode:       config.SSLMode,
		MigrationPath: config.MigrationPath,
	}
}

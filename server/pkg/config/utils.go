package config

import (
	"log"
	"path/filepath"
	"runtime"
)

var (
	baseDirectory string
)

func init() {
	_, currentFilename, _, ok := runtime.Caller(0)
	if !ok {
		log.Fatal("cannot get current runtime")
	}
	baseDirectory = filepath.Join(filepath.Dir(currentFilename), "../../")
	log.Printf("baseDirectory=%s\n", baseDirectory)
}

func GetBaseDirectory() string {
	return baseDirectory
}

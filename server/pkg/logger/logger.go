package logger

import (
	"github.com/sirupsen/logrus"
)

var defaultLogger = logrus.StandardLogger()

func GetDefaultLogger() *logrus.Logger {
	return defaultLogger
}

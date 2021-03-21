package user

import (
	"time"

	"github.com/dgrijalva/jwt-go"
)

type SessionToken struct {
	*jwt.Token
}

type TokenClaims struct {
	AddressHex string `json:"address"`
	jwt.StandardClaims
}

func NewSessionToken(address string, d time.Duration) *SessionToken {
	now := time.Now()
	claims := &TokenClaims{
		AddressHex: address,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: now.Add(d).Unix(),
			IssuedAt:  now.Unix(),
		},
	}
	return &SessionToken{
		Token: jwt.NewWithClaims(jwt.SigningMethodHS256, claims),
	}
}

func (token *SessionToken) signedString(secret string) (string, error) {
	return token.Token.SignedString([]byte(secret))
}

func (token *SessionToken) signedBytes(secret string) ([]byte, error) {
	str, err := token.signedString(secret)
	if err != nil {
		return nil, err
	}
	return []byte(str), nil
}

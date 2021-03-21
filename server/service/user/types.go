package user

import (
	"encoding/hex"
	"fmt"

	"github.com/ethereum/go-ethereum/crypto"
)

type SignUpOrSignInInput struct {
	Address   string `json:"address"`
	Challenge string `json:"challenge"`
	Signature string `json:"signature"`
	Nonce     string `json:"nonce"`
}

func (input *SignUpOrSignInInput) Validate() error {
	signature, err := decodeEthereumSignature(input.Signature)
	if err != nil {
		return err
	}
	sigPublicKey, err := crypto.Ecrecover(getEthereumSignatureHashBytes(input.Challenge), signature)
	if err != nil {
		return err
	}
	pubKey, err := crypto.UnmarshalPubkey(sigPublicKey)
	if err != nil {
		return err
	}
	address := crypto.PubkeyToAddress(*pubKey).Hex()
	if address != input.Address {
		return fmt.Errorf("address mismatch")
	}
	return nil
}

func decodeEthereumSignature(
	signature string,
) ([]byte, error) {
	sigHex, err := hex.DecodeString(signature[2:])
	if err != nil {
		return nil, fmt.Errorf("cannot decode signature")
	}
	if len(sigHex) != 65 {
		return nil, fmt.Errorf("signature must be 65 bytes long")
	}
	if sigHex[64] != 27 && sigHex[64] != 28 {
		return nil, fmt.Errorf("invalid Ethereum signature (V is not 27 or 28)")
	}
	sigHex[64] -= 27
	return sigHex, nil
}

func getEthereumSignatureHashBytes(data string) []byte {
	msg := fmt.Sprintf("\x19Ethereum Signed Message:\n%d%s", len(data), data)
	return crypto.Keccak256([]byte(msg))
}

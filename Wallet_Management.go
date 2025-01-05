import (
    "crypto/ecdsa"
    "crypto/elliptic"
    "crypto/rand"
    "crypto/sha256"
    "encoding/hex"
)

type Wallet struct {
    PrivateKey *ecdsa.PrivateKey
    PublicKey  string
}

func createWallet() Wallet {
    privKey, _ := ecdsa.GenerateKey(elliptic.P256(), rand.Reader)
    pubKey := append(privKey.PublicKey.X.Bytes(), privKey.PublicKey.Y.Bytes()...)
    return Wallet{
        PrivateKey: privKey,
        PublicKey:  hex.EncodeToString(pubKey),
    }
}

func signTransaction(tx Transaction, privKey *ecdsa.PrivateKey) string {
    hash := sha256.Sum256([]byte(tx.Sender + tx.Receiver + strconv.Itoa(tx.Amount) + tx.Timestamp))
    r, s, _ := ecdsa.Sign(rand.Reader, privKey, hash[:])
    return hex.EncodeToString(r.Bytes()) + hex.EncodeToString(s.Bytes())
}

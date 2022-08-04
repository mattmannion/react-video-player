package util

import (
	"fmt"

	"golang.org/x/crypto/bcrypt"
)

func WeakHash(password string) string {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 1)
	if err != nil {
		fmt.Println(err)
	}
	return string(bytes)
}

func Hash(password string) string {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 12)
	if err != nil {
		fmt.Println(err)
	}
	return string(bytes)
}

func CheckHash(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}

package auth

import (
	"fmt"

	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
)

func GetAuth(c *gin.Context) {
	session := sessions.Default(c)
	username := session.Get("username")

	c.JSON(200, gin.H{
		"status":  "success",
		"message": fmt.Sprintf("Your username is: %v", username),
	})
}

package admin

import (
	"fmt"

	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
)

func GetAdmin(c *gin.Context) {
	session := sessions.Default(c)
	username := session.Get("username")
	permissions := session.Get("permissions")

	c.JSON(200, gin.H{
		"status":  "success",
		"message": fmt.Sprintf("User %v is an %v.", username, permissions),
	})
}

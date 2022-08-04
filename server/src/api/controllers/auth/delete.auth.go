package auth

import (
	"fmt"
	"net/http"
	"root/src/db"

	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
)

func DeleteAuth(c *gin.Context) {
	session := sessions.Default(c)

	username := session.Get("username")
	id := session.Get("id")

	if username == nil {
		c.JSON(http.StatusOK, gin.H{

			"status":  "success",
			"message": "No User logged in",
		})
		return
	}

	_, err := db.Redis.Do("DEL", id)

	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"status":  "Failure",
			"message": fmt.Sprintf("err: %v", err),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status":  "success",
		"message": fmt.Sprintf("%v logged out", username),
	})
}

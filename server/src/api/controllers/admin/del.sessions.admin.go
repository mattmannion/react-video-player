package admin

import (
	"net/http"
	"root/src/db"

	"github.com/gin-gonic/gin"
)

func DeleteSessionAdmin(c *gin.Context) {
	db.Redis.Do("flushall")

	c.JSON(http.StatusOK, gin.H{
		"status":  "success",
		"message": "All users logged out",
	})
}

package auth

import (
	"fmt"
	"net/http"
	"root/src/db"
	"root/src/db/models"
	"root/src/util"

	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"github.com/gomodule/redigo/redis"
)

func PostAuth(c *gin.Context) {
	body := models.Users{}

	err := c.BindJSON(&body)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"status":  "failure",
			"message": "Please enter a Username and Password",
		})
		return
	}

	session := sessions.Default(c)

	username := fmt.Sprint(session.Get("username"))
	id := session.Get("id")

	user := &models.Users{}

	if body.Username == "" || body.Password == "" {
		c.JSON(http.StatusNotFound, gin.H{
			"status":  "failure",
			"message": "Please enter a Username and Password",
		})
		return
	}

	db.DB.Find(&user, &models.Users{Username: body.Username})
	if user.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{
			"status":  "failure",
			"message": "Username not found",
		})
		return
	}

	if !util.CheckHash(body.Password, user.Password) {

		session.Clear()

		session.Save()

		c.JSON(http.StatusNotFound, gin.H{
			"status":  "failure",
			"message": "Incorrect Password",
		})
		return
	}

	if id != nil {
		if username != body.Username {
			c.JSON(http.StatusNotAcceptable, gin.H{
				"status":  "failure",
				"message": fmt.Sprintf("%v is already logged in. Please log %v out and try again.", username, username),
			})
			return
		} else {

			c.JSON(http.StatusOK, gin.H{
				"status":  "success",
				"message": fmt.Sprintf("%v is already logged in", user.Username),
			})
			return
		}
	}

	// creates session
	session.Set("username", user.Username)
	session.Set("permissions", user.Permissions)
	session.Save()

	val, err := redis.Values(db.Redis.Do("keys", "*"))
	res, _ := redis.Strings(val, err)

	id = res[0]

	// adds id to session
	session.Set("id", id)
	session.Save()

	c.JSON(http.StatusOK, gin.H{
		"status":  "success",
		"message": fmt.Sprintf("%v logged in", user.Username),
	})
}

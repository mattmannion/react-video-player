package users

import (
	"fmt"
	"net/http"
	"root/src/db"
	"root/src/db/models"

	"github.com/gin-gonic/gin"
)

func GetUsers(c *gin.Context) {

	username := c.Query("username")

	// Gets one user
	if username != "" {

		var user models.Users

		res := db.DB.First(&user, &models.Users{Username: username})
		if res.Error != nil {
			c.JSON(http.StatusNotFound, gin.H{
				"status":  "failure",
				"message": fmt.Sprintf("%s...", res.Error),
			})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"status": "success",
			"user": models.JsonUser{
				ID:        user.ID,
				Firstname: user.Firstname,
				Lastname:  user.Lastname,
				Email:     user.Email,
				Username:  user.Username,
			},
		})

		// Gets all users
	} else {

		var users []models.Users

		res := db.DB.Select("id", "firstname", "lastname", "email", "username").Order("id").Find(&users)
		if res.Error != nil {
			c.JSON(http.StatusNotFound, gin.H{
				"status":  "failure",
				"message": fmt.Sprintf("%s...", res.Error),
			})
			return
		}

		var jsonUsers []models.JsonUser

		for _, user := range users {
			jsonUsers = append(jsonUsers, models.JsonUser{
				ID:        user.ID,
				Firstname: user.Firstname,
				Lastname:  user.Lastname,
				Email:     user.Email,
				Username:  user.Username,
			})
		}

		c.JSON(http.StatusOK, gin.H{
			"status": "success",
			"users":  jsonUsers,
		})
	}

}

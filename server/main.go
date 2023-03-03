package main

import (
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/krishnalagad/golang-react-calorie-tracker/routes"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "4000"
	}

	router := gin.New()
	router.Use(gin.Logger())
	router.Use(cors.Default())

	router.POST("/api/entry", routes.AddEntry)
	router.GET("/api/entries", routes.GetEntries)
	router.GET("/api/entry/:id", routes.GetEntryById)
	router.GET("/api/ingradient/:ingradient", routes.GetEntryByIngradient)
	router.PUT("api/entry/:id", routes.UpdateEntryById)
	router.PUT("/api/update/ingradient/:id", routes.UpdateIngradientById)
	router.DELETE("/api/entry/:id", routes.DeleteEntryById)
	router.Run(":" + port)
}

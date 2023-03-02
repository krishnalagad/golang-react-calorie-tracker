package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Entry struct {
	ID primitive.ObjectID
	Dish
	Fat
	Ingredients
	Calories
}
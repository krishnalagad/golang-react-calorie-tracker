package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Entry struct {
	ID          primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Dish        *string            `json:"dish"`
	Fat         *float64           `json:"fat"`
	Ingredients *string            `json:"ingredients"`
	Calories    *string            `json:"calories"`
}
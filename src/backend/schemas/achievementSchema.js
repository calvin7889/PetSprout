const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AchievementSchema = new Schema(
	{
        user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'user',
		},
        login_streak: {
            type: Number,
            default: 0
        },
        pet_health_streak: {
            type: Number,
            default: 0
        },
		achievements: 
            {
                streaks: {
                    commitment:{
                        type: Number,
                        default: 0
                    },
                    habit_count: {
                        type: Number,
                        default: 0
                    },
					mastery:{
						type: Number,
						default: 0
					}
                },
                habipet: {
                    caretaker: {
                        type: Number,
                        default: 0
                    },
                    maturity: {
                        type: Number,
                        default: 0
                    },
                    pet_count :{
                        type: Number,
                        default: 1
                    },
                },
                accountability: {
                    health: {
                        type: Number,
                        default: 0
                    },
                    login: {
                        type: Number,
                        default: 0
                    },
					// No friends feature 
					/*
                    friends_count: {
                        type: Number,
                        default: 0
                    },
                    supportive: {
                        type: Number,
                        default: 0
                    }*/
                }
            }
    }
);

const achievement = mongoose.model('achievement', AchievementSchema);
module.exports = achievement;

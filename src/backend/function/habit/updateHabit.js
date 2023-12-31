const Habit = require('../../schemas/habitSchema');
const User = require('../../schemas/userSchema');
const alarmLib = require('../common/alarm');

const { validationResult } = require('express-validator');

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 *
 * Modify a particular habit and return back the habit after modification.
 *
 */
module.exports = async (req, res) => {
	try {
		let user = await User.findById(req.user.id).select('-password');
		if (!user) return res.status(404).json({ error: 'User could not found' });

		let userHabit = await Habit.findById(req.params.user_habit_id);
		if (!userHabit)
			return res.status(404).json({ error: "User's habits could not find" });

		const habitFromDB = userHabit.habitList.find(
			(habit) => habit._id.toString() === req.params.habit_id.toString(),
		);
		if (!habitFromDB)
			return res
				.status(404)
				.json({ error: "Habit could not find in user's habits" });

		if(process.env.NOTIFICATIONTOGGLE === 'true') {
			// Remove scheduled alarms.
			alarmLib.unscheduleHabitAlarms(req.user.id, habitFromDB.analyze);
		}

		let { title, description, reason, schedule, times, alarm, date, timezone } = req.body;

		let errors = [];
		if (title === '') errors.push('title');
		if (
			JSON.stringify(schedule) ==
			JSON.stringify([false, false, false, false, false, false, false])
		) {
			errors.push('schedule');
		}
		if (date === '') errors.push('date');

		if (errors.length != 0) return res.status(403).json({ error: errors });

		let newSchedule = [];
		let i = 0;
		for (const element of schedule) {
			if (element === true) newSchedule.push(i.toString());
			i++;
		}

		let current = new Date(date);
		let current_date = current.getDate();
		let current_day = current.getDay();
		let nextSignInDate = null;
		if (newSchedule.includes(current_day.toString())) {
			nextSignInDate = current;
		} else {
			let index = current_day;
			let interval = 0;
			while (!newSchedule.includes(index.toString())) {
				if (index === 6) index = 0;
				else index++;
				interval++;
			}
			nextSignInDate = current.setDate(current_date + interval);
			nextSignInDate = new Date(nextSignInDate);
		}

		// Generate Alarm List (to preserve ids)
		let alarm_list = []
		for (const a of alarm) {
			alarm_list.push({date: a,
				timezone: timezone})
		}

		habitFromDB.title = title;
		habitFromDB.description = description;
		habitFromDB.reason = reason;
		habitFromDB.schedule = newSchedule;
		habitFromDB.times = times;
		habitFromDB.alarm = alarm_list;
		habitFromDB.nextSignInDate = nextSignInDate;

		await userHabit.save();

		if(process.env.NOTIFICATIONTOGGLE === 'true') {
			// Re-scheduled alarms.
			alarmLib.scheduleHabitAlarms(req.user.id, habitFromDB.analyze);
		}

		res.json(habitFromDB);
	} catch (error) {
		console.error(error);
		res.status(500).json('Server error');
	}
};

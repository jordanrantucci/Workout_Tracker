const db = require("../models");

module.exports = (app) => {
app.get("/api/workouts", (req, res) => {
    db.Workout.find({}).then(dbWorkout => {
        dbWorkout.forEach(workout => {
            var total = 0;
            workout.exercises.forEach(e => {
                total += e.duration
            });
            workout.totalDuration = total;
        });
        res.json(dbWorkout)
    }).catch(err => {
        res.json(err)
    })
})

app.put("/api/workouts:id", ({ body }, res) => {
    db.Workout.findOneAndUpdate(
        {_id: body.id},
        {
            $inc: { totalDuration: body.duration },
            $push: { exercises: body }
        },
        { new: true }).then(dbWorkout => {
            res.json(dbWorkout)
        }).catch(err => {
            res.json(err)
        })
})

app.post("/api/workouts", ({ body }, res) => {
    db.Workout.create(body)
        .then((dbWorkout => {
            res.json(dbWorkout)
        }))
        .catch(err => {
            res.json(err);
        })
    })

app.get("/api/workouts/range", ({ body }, res) => {
    db.Workout.find({ body }).then(dbWorkout => {
        res.json(dbWorkout)
    }).catch(err => {
        res.json(err)
    })
})

}


Models
  -User, has many workouts, has many exercises through workouts
  -Workout, has many exercises, has many users through exercises
  -Exercise, belongs to workout and user

  -User
    first name, last name, email, password
  -Workout
    date, name, duration
  -Exercise
    name, weight
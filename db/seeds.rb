puts 'seeding user'

u1 = User.create(first_name: 'John', last_name: 'Ly', email: 'johnly@gmail.com')

puts 'user seeded!'

puts 'seeding workout'

w1 = Workout.create(day: Date.today, name: 'Chest', duration: '1 hour 15 mins')

puts 'workout seeded!'

puts 'seeding exercises'

e1 = Exercise.create(name: 'Bench Press', weight: 225, sets: 4, user_id: u1.id, workout_id: w1.id)
e1 = Exercise.create(name: 'Incline Dumbell Press', weight: 65, sets: 4, user_id: u1.id, workout_id: w1.id)
e1 = Exercise.create(name: 'Fly Machine', weight: 80, sets: 4, user_id: u1.id, workout_id: w1.id)

puts 'exercises seeded!'
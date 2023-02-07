puts 'seeding users'
user1 = User.create(
    first_name: 'John',
    last_name: 'Ly',
    email: 'john@gmail.com',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaY9NCY7uqhdrALyjkFvWyO2HYlmeeITwcJg&usqp=CAU',
    password: '1234'
),
user2 = User.create(
    first_name: 'Olivia',
    last_name: 'Lockhart',
    email: 'liv@gmail.com',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaY9NCY7uqhdrALyjkFvWyO2HYlmeeITwcJg&usqp=CAU',
    password: '1234'
)

puts 'user seeded!'

puts 'seeding event'
event1 = Event.create(
    user_id: User.last.id,
    name: 'Soccer Party!',
    address: '75 Champ Blvd',
    city: 'Manheim',
    state: 'PA',
    zipcode: 17545,
    time: '7:00 PM',
    date: '2/10/23',
    description: 'Come play soccer!'
)

puts 'event seeded!'

puts 'seeding attendance'

attendance1 = Attendance.create(user_id: User.first.id, event_id: Event.first.id)

puts 'attendance seeded!'

puts 'seeding comments'

comment1 = Comment.create(body: "can't wait!", user_id: User.first.id, event_id: Event.first.id)

puts 'comments seeded!'
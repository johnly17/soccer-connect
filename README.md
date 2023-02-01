SOCCER CONNECT, an app that allows soccer players to create and join pick up soccer matches

Models
  -User, has many workouts, has many exercises through workouts
  -Event, has many exercises, has many users through exercises
  -Attendance, belongs to workout and user
  -Comment, 

  -User
    first name, last name, email, password
  -Event
    date, name, duration
  -
    name, weight


To Do List
  -add user name to who created the event on EventPage
  -organize events on EventPage better
  -add map api to EventPage
  -add EventDetailPage
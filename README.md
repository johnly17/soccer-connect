SOCCER CONNECT, an app that allows soccer players to create and join pick up soccer matches

Models
  -User, has many events, attendances, comments, and attending_events and user_comments, through attendances and comments
  -Event, belongs to a user, has many attendances, attending_users through attendances, has many user comments through comments
  -Attendance, belongs to event and user
  -Comment, belongs to event and user

  -User
    first name, last name, image, email, password
    users can create events, join events, create comments
  -Event
    name, address, city, state, zipcode, time, date, description
  -Attendance
    user_id, event_id
  -Comment
  user_id, event_id, body

Google Maps API and a Geocoder API
  -the maps api will have markers on the map that display where events are being held
  -addresses will be reverse geocoded to coordinates in order to place markers


To Do List
  -add user name to who created the event on EventPage
  -organize events on EventPage better
  -add markers on map of where events are being held
  -add EventDetailPage
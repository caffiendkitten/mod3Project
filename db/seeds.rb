# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

user_a = User.create(name: "Black-Capped Chickadee")
user_b = User.create(name: "Grackle Star")
user_c = User.create(name: "Common Starling")
user_d = User.create(name: "Mourning Dove")

taskList_a = Tasklist.create(title: "Kitchen stuff", user: user_a )
taskList_b = Tasklist.create(title: "Personal stuff", user: user_b )

task_a = Task.create(item: "chop wood", tasklist: taskList_a)
task_b = Task.create(item: "cook food", tasklist: taskList_b)
task_c = Task.create(item: "make bread", tasklist: taskList_b)

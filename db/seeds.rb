# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

password = "password"
# create 1 admin accounts
User.create!(
    name: Faker::Name.unique.name,
    email: "admin#1@email.com",
    password: password,
    password_confirmation: password,
    account_types: 3
)

# create 5 staff accounts
5.times do |n|
    User.create!(
        name: Faker::Name.unique.name,
        email: "support#{n+1}@email.com",
        password: password,
        password_confirmation: password,
        account_types: 2
    )
end
# create 5 user accounts
5.times do |n|
    User.create!(
        name: Faker::Name.unique.name,
        email: "user#{n+1}@email.com",
        password: password,
        password_confirmation: password,
        account_types: 1
    )
end
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Like.destroy_all
Comment.destroy_all
Image.destroy_all
User.destroy_all

kevin = User.create(username: "Kevin")
louis = User.create(username: "Louis")
zed = User.create(username: "Zed")
femi = User.create(username: "Femi")

img1 = Image.create(src: "https://dev-to-uploads.s3.amazonaws.com/uploads/articles/jd4zsat1abi1ns7qshfc.jpg", alt: "Portrait: a man facing his right", )
img2 = Image.create(src: "https://dev-to-uploads.s3.amazonaws.com/uploads/articles/oparij485sb6rtt723oh.jpg", alt: "Portrait: a man drawing")
img3 = Image.create(src: "https://dev-to-uploads.s3.amazonaws.com/uploads/articles/bi3f52r3c0flku1i0w8g.jpg", alt: "Portrait: a smiling woman, big sur background")
img4 = Image.create(src: "https://dev-to-uploads.s3.amazonaws.com/uploads/articles/c1wrk5z459jljt367ere.jpg", alt: "US Capitol Building looking down Pennsylvania ave")

zed.images.push(img1, img2, img3, img4)
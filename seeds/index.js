const  mongoose  = require('mongoose');
const cities = require('./cities');
const {places,descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser:true,
    useUnifiedTopology:true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console,"connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
   for(let i = 0; i<300; i++) {
       const random1000 = Math.floor(Math.random() * 1000);
       const price = Math.floor(Math.random() * 20) + 10;
       const camp = new Campground ({
           //YOUR USER ID
           author: '621b7987bc2c4da1e9016290',
           location: `${cities[random1000].city}, ${cities[random1000].state}`,
           title: `${sample(descriptors)} ${sample(places)}`,
           description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
           price,
           geometry: {
               type: "Point",
               coordinates: [
                   cities[random1000].longitude,
                   cities[random1000].latitude,
               ]
           },
           images: [
            {
              url: 'https://res.cloudinary.com/dn8x1gl90/image/upload/v1646134403/YelpCamp/yhznwezstximtfmpbesk.jpg',
              filename: 'YelpCamp/yhznwezstximtfmpbesk'
            },
            {
              url: 'https://res.cloudinary.com/dn8x1gl90/image/upload/v1646134406/YelpCamp/d5thyv0lggrst7f3y9yp.jpg',
              filename: 'YelpCamp/d5thyv0lggrst7f3y9yp'
            }
                   ]
       })
       await camp.save();
   }
}

seedDB().then(() => {
    mongoose.connection.close();
})
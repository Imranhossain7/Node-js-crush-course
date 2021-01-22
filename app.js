const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const { result } = require('lodash');

// express app
const app = express();

//connect to mongodb

const dbURI = 'mongodb+srv://imran:20212020@nodecrush.vl8rl.mongodb.net/notes?retryWrites=true&w=majority' ;
mongoose.connect(dbURI,{useNEWUrlParser: true,useUnifiedTopology: true})
.then((result) => app.listen(3000))
.catch((err) => console.log(err));

// register view engine
app.set('view engine', 'ejs');


//middelware & static

app.use(express.static('public'));
app.use(morgan('dev'));

// //moongooose and mongo sandbox routes
// app.get('/add-blog', (req, res) => {
//   const blog = new Blog({
//     title: 'new blog',
//     snippet: 'about my new blog',
//     body: 'more about my new blog'
//   })

//   blog.save()
//     .then(result => {
//       res.send(result);
//     })
//     .catch(err => {
//       console.log(err);
//     });
// });

// app.get('/all-blogs', (req, res) => {
//   Blog.find()
//     .then(result => {
//       res.send(result);
//     })
//     .catch(err => {
//       console.log(err);
//     });
// });

// app.get('/single-blog', (req, res) => {
//   Blog.findById('600ae6c2b8da9c1f80ea160b')
//     .then(result => {
//       res.send(result);
//     })
//     .catch(err => {
//       console.log(err);
//     });
// });

// app.set('views', 'myviews');

app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

//blog route

app.get('/blogs' ,(req,res) => {
  Blog.find().sort({createdAt: -1})
  .then((result) => {
   res.render('index',{title: 'All blogs',blogs:result})
  })
  .catch((err) => {
    console.log(err);
  })
})

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new blog' });
});

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
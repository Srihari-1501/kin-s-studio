import express from 'express';
import bodyParser from 'body-parser';
import { experiments } from './views/utils/experiments.js';
import { laws } from './views/utils/laws.js';
import { physicist } from './views/utils/Physicist.js';

// import { dirname } from "path";
// import { fileURLToPath } from "url";

const app = express();
const port = 3000;
var posts = [];
var editTit, contEdit, descEdit, searchTit, contSearch, descSearch;
//console.log(physicist);

app.use(express.static('public'));

// const __dirname = dirname(fileURLToPath(import.meta.url));

function linearSearch(arr, item) {
  // Go through all the elements of arr to look for item.
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].title === item) {
      // Found it!
      return i;
    }
  }

  // Item not found in the array.
  return null;
}

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('partials/index.ejs');
});

app.get('/formula', (req, res) => {
  res.render('formula.ejs');
});

app.get('/experiments', (req, res) => {
  res.render('compose.ejs');
});

app.get('/authors', (req, res) => {
  res.render('author.ejs');
});

app.get('/compose', (req, res) => {
  res.render('compose.ejs');
});

app.post('/compose', (req, res) => {
  var postTitle = req.body.postTitle;
  var postContent = req.body.postContent;
  var postDescr = req.body.postDesc;

  var postObj = {
    title: postTitle,
    Description: postDescr,
    content: postContent,
  };

  posts.push(postObj);

  res.redirect('/post');
});

// app.post('/experiments', (req, res) => {
//   var expTitle = req.body.postTitle;
//   var expContent = req.body.postContent;
//   var expDescr = req.body.postDesc;

//   var expObj = {
//     title: expTitle,
//     Description: expDescr,
//     content: expContent,
//   };

//   exps.push(expObj);

//   res.redirect('/exps');
// });

app.get('/post', (req, res) => {
  res.render('post.ejs', {
    postObj: posts,
  });
});

app.get('/exps', (req, res) => {
  res.render('exps.ejs', {
    articles: experiments,
  });
});

app.get('/law', (req, res) => {
  res.render('laws.ejs', {
    laws: laws,
  });
});

app.get('/physicist', (req, res) => {
  res.render('physicist.ejs', {
    phys: physicist,
  });
});

app.get('/delete', (req, res) => {
  res.render('delete.ejs');
});

app.post('/delete', (req, res) => {
  var delTitle = req.body.deleteTile;
  var index = linearSearch(posts, delTitle);

  posts.splice(index, 1);

  res.redirect('/');
});

app.get('/edit', (req, res) => {
  res.render('edit.ejs');
});

app.post('/edit', (req, res) => {
  editTit = req.body.editTile;
  var indexE = linearSearch(posts, editTit);

  contEdit = posts[indexE].content;
  descEdit = posts[indexE].Description;

  res.redirect('/editpage');
});

app.get('/editpage', (req, res) => {
  res.render('editpage.ejs', {
    edTitle: editTit,
    edDesc: descEdit,
    edCont: contEdit,
  });
});

app.post('/editpage', (req, res) => {
  var eT = req.body.editedTitle;
  var cT = req.body.editedContent;
  var dT = req.body.editedDecs;
  var indexE1 = linearSearch(posts, editTit);

  posts[indexE1].title = eT;
  posts[indexE1].content = cT;
  posts[indexE1].Description = dT;

  res.redirect('/post');
});

app.get('/search', (req, res) => {
  res.render('searchpost.ejs');
});

app.post('/search', (req, res) => {
  searchTit = req.body.searchTitle;
  var indexS = linearSearch(posts, searchTit);

  contSearch = posts[indexS].content;
  descSearch = posts[indexS].Description;

  res.render('postexpand.ejs', {
    seTitle: searchTit,
    seDesc: descSearch,
    seCont: contSearch,
  });
});

app.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}/`);
});

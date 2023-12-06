import express from 'express';
import cors from 'cors';
import {connectKorbe, getConnection} from "./connection.js"
const app= express();
const port=5000;
let db;
import { ObjectId } from 'mongodb';


app.use(cors());
app.use(express.json());

connectKorbe(function(err){
    if(!err){
        app.listen(port);
        db=getConnection();
    }
    else{
        console.error('Database Connection Error Zarif');
    }
});


app.get("/getusers", function(req, res) {

    let users=[];
    db.collection('user').find().forEach(element => {
        users.push(element);
    }).then(function(){
        res.json(users);
    }).catch(function(err){
        res.json('Error hoye gese');
    })
})

// app.get("/getusers/:email", function(req, res) {
//     const email=req.params.email;

//     db.collection('user').findOne({email: email},{projection:{password:1,_id:0}}).then(function(data){
//         res.json(data);
//     }).catch(function(err){
//         res.json('Error hoye gese');
//     })
// })
app.get("/getusers/:email", function(req, res) {
    const email = req.params.email; // Get the email from the URL parameter

    db.collection('user').findOne(
        { email: email }, // Search for a document with the specified email
        { _id: 0 } // Exclude the _id field (if desired)
    ).then(function(data) {
        if (data) {
            res.json(data); // Send the entire user document as a JSON response
        } else {
            res.status(404).json('User not found'); // Send a 404 response if the user is not found
        }
    }).catch(function(err) {
        res.status(500).json('Error hoye gese'); // Send a 500 response in case of an error
    });
});

app.post("/insertuser", function(req, res) {
    const user=req.body;
    db.collection('user').insertOne(user).then(function(result){
        res.json(result);
    }).catch(function(err){
        res.json('Error hoye gese');
    })
})

// app.post("/appendrequest", function(req, res) {
//     const buy_request=req.body;
//     const bookID=buy_request.bookID;
//     const modifiedBuyRequest = { ...buy_request };
//     delete modifiedBuyRequest.bookID;
//     db.collection('buy_requests').updateOne(
//         { book_id: bookID },
//         { $push: { "requests": modifiedBuyRequest } }
//       ).then(function(result){
//         res.json(result);
//     }).catch(function(err){
//         res.json('Error hoye gese');
//     })
// })

app.post("/appendrequest", function (req, res) {
  const buy_request = req.body;
  const bookID = buy_request.bookID;
  const modifiedBuyRequest = { ...buy_request };
  delete modifiedBuyRequest.bookID;

  db.collection('buy_requests').updateOne(
    { book_id: bookID },
    {
      $push: { "requests": modifiedBuyRequest },
      $setOnInsert: { book_id: bookID } // This sets the book_id only if the document is newly inserted
    },
    { upsert: true } // This enables upsert (insert if not exists)
  ).then(function (result) {
    res.json(result);
  }).catch(function (err) {
    res.json('Error hoye gese');
  });
});

app.post("/appendrequestborrow", function (req, res) {
  const buy_request = req.body;
  const bookID = buy_request.bookID;
  const modifiedBuyRequest = { ...buy_request };
  delete modifiedBuyRequest.bookID;

  db.collection('borrow_requests').updateOne(
    { book_id: bookID },
    {
      $push: { "requests": modifiedBuyRequest },
      $setOnInsert: { book_id: bookID } // This sets the book_id only if the document is newly inserted
    },
    { upsert: true } // This enables upsert (insert if not exists)
  ).then(function (result) {
    res.json(result);
  }).catch(function (err) {
    res.json('Error hoye gese');
  });
});

app.get("/searchByTitle", function(req, res) {
    const title = req.query.title; // Get the title from the query parameter
    const genre = req.query.genre;
    const owner = req.query.owner;
    const author = req.query.author;
    const find = {
        author:{$regex:".*"},
        genres:{$regex:".*"}, 
    };

    if(title) find["title"]=title;
    if(author!=="Author") find["author"]=author;
    if(genre!=="Category") find["genres"]=genre;
    db.collection('books').find(find).toArray()
        .then(function(data) {
            if (data.length > 0) {
                res.json(data); // Send the matching books as a JSON response
            } else {
                res.status(404).json('No books found with the given title'); // Send a 404 response if no matching books are found
            }
        })
        .catch(function(err) {
            res.status(500).json('Error occurred while searching'); // Send a 500 response in case of an error
        });
});

app.get("/getUser/:email", function (req, res) {
    const userEmail = req.params.email; // Get the email from the URL parameter

    // Query the database to find the user by their email
    db.collection('user').findOne({ email: userEmail }, function (err, user) {
      if (err) {
        // Handle any errors here
        res.status(500).json({ error: "An error occurred while fetching user information" });
      } else if (user) {
        // User found, send the user's information in the response
        res.json(user);
      } else {
        // User not found
        res.status(404).json({ error: "User not found" });
      }
    });
});

app.get("/getUser", function(req, res) {

    let users=[];
    db.collection('user').find().forEach(element => {
        users.push(element);
    }).then(function(){
        res.json(users);
    }).catch(function(err){
        res.json('Error hoye gese');
    })
})

app.get("/getBooks", function(req, res) {

    let books=[];
    db.collection('books').find().forEach(element => {
        books.push(element);
    }).then(function(){
        res.json(books);
    }).catch(function(err){
        res.json('Error hoye gese');
    })
})

app.get("/getBuyRequests", function(req, res) {

    let books=[];
    const book_id = req.query.book_id;
    db.collection('buy_requests').find().forEach(element => {
        books.push(element);
    }).then(function(){
        res.json(books);
    }).catch(function(err){
        res.json('Error hoye gese');
    })
})

// app.get('/getCopies', async (req, res) => {
//     try {
//       let bookIds = [];
//       let copies = [];
  
//       // First, fetch book IDs from buy_requests
//       await db.collection('buy_requests').find().forEach(element => {
//         bookIds.push(element.book_id);
//       });
  
//       // Second, fetch copies based on book IDs from books
//       await db.collection('books').find().forEach(element => {
//         const allCopies = element.copies;
//         for (let i = 0; i < allCopies.length; i++) {
//           for (let j = 0; j < bookIds.length; j++) {
//             if (allCopies[i]._id.equals(bookIds[j])) {
                // const copyWithBookTitle = {
                //     ...allCopies[i],
                //     // title: element.title
                // };
                // copies.push(copyWithBookTitle);
//             }
//           }
//         }
//       });
  
//       // Finally, send the copies as a response
//       res.json(copies);
//     } catch (err) {
//       res.json('Error omg');
//     }
//   });

  app.get('/getCopies', async (req, res) => {
    try {
      let bookIds = [];
      let copies = [];
  
      // First, fetch book IDs from buy_requests
      await db.collection('buy_requests').find().forEach(element => {
        bookIds.push(element.book_id);
      });
  
      // Second, fetch copies based on book IDs from books
      await db.collection('books').find().forEach(element => {
        const allCopies = element.copies;
        for (let i = 0; i < allCopies.length; i++) {
          for (let j = 0; j < bookIds.length; j++) {
            if (allCopies[i]._id.equals(bookIds[j])) {
            //   copies.push(allCopies[i]);

              const copyWithBookTitle = {
                ...allCopies[i],
                 title: element.title,
                 image: element.image,
            };
            copies.push(copyWithBookTitle);
            }
          }
        }
      });
  
      // Finally, send the copies as a response
      res.json(copies);
    } catch (err) {
      res.json('Error hoye gese');
    }
  });

  app.get('/getCopiesBorrow', async (req, res) => {
    try {
      let bookIds = [];
      let copies = [];
  
      // First, fetch book IDs from buy_requests
      await db.collection('borrow_requests').find().forEach(element => {
        bookIds.push(element.book_id);
      });
  
      // Second, fetch copies based on book IDs from books
      await db.collection('books').find().forEach(element => {
        const allCopies = element.copies;
        for (let i = 0; i < allCopies.length; i++) {
          for (let j = 0; j < bookIds.length; j++) {
            if (allCopies[i]._id.equals(bookIds[j])) {
            //   copies.push(allCopies[i]);

              const copyWithBookTitle = {
                ...allCopies[i],
                 title: element.title,
                 image: element.image,
            };
            copies.push(copyWithBookTitle);
            }
          }
        }
      });
  
      // Finally, send the copies as a response
      res.json(copies);
    } catch (err) {
      res.json('Error hoye gese');
    }
  });
  
  app.get("/currentOwnerRequests", function(req, res) {
    try {
        const owner = req.query.owner; // Get the title from the query parameter
        const copies = req.query.copies;
        const requests=[];
        for(let i = 0; i < copies.length; i++) {
            if(copies[i].owner === owner){
                requests.push(copies[i]);
            }
        }
        res.json(requests);
    } catch (err) {
        res.json('Error hoye gese');
    }
});

app.get('/getTitleFromId', async (req, res) => {
    try {
      const bookId = req.params.bookId;
  
      // Find the book with the given book ID in the "books" collection
      const book = await db.collection('books').findOne({ 'copies._id': ObjectId(bookId) });
  
      if (!book) {
        return res.status(404).json({ error: 'Book not found for the given book ID' });
      }
  
      const title = book.title;
  
      res.json({ title });
    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.get('/getRequests/:bookId', async (req, res) => {
    try {
      const bookId = req.params.bookId;
  
      // Assuming you have a MongoDB collection named 'buy_requests'
      const buyRequest = await db.collection('buy_requests').findOne({ book_id: bookId });
  
      if (!buyRequest) {
        return res.status(404).json({ error: 'Buy requests not found for the given book ID' });
      }
  
      const requests = buyRequest.requests;
  
      res.json({ requests });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.get('/getRequestsBorrow/:bookId', async (req, res) => {
    try {
      const bookId = req.params.bookId;
  
      // Assuming you have a MongoDB collection named 'buy_requests'
      const buyRequest = await db.collection('borrow_requests').findOne({ book_id: bookId });
  
      if (!buyRequest) {
        return res.status(404).json({ error: 'Buy requests not found for the given book ID' });
      }
  
      const requests = buyRequest.requests;
  
      res.json({ requests });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  app.get('/getTitleFromCopyId/:copyId', async (req, res) => {
    try {
      const copyId = req.params.copyId;
  
      // Find the book that contains the copy with the given copy ID
      const book = await db.collection('books').findOne({ 'copies._id': new ObjectId(copyId) });
  
      if (!book) {
        return res.status(404).json({ error: 'Book not found for the given copy ID' });
      }
  
      // Find the specific copy within the book's copies array
      const copy = book.copies.find(c => c._id.toString() === copyId);
  
      if (!copy) {
        return res.status(404).json({ error: 'Copy not found for the given copy ID' });
      }
  
      const title = book.title;
  
      res.json({ title });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
//   app.post("/insertbook", function(req, res) {
//     const requestBody = {
//         title: req.body.title,
//         author: req.body.author,
//         genres: req.body.genres,
//         copies: req.body.copies.map(copy => ({
//             owner: copy.owner,
//             current_holder: copy.current_holder,
//             selling_price: copy.selling_price * 1,
//             rental_price: copy.rental_price * 1,
//         })),
//     };

//     db.collection('books').insertOne(requestBody).then(function(result) {
//         res.json(result);
//     }).catch(function(err) {
//         res.json('Error hoye gese');
//     });
// });

app.delete('/deleteCopy/:copyId', async (req, res) => {
  try {
    const copyId = req.params.copyId;

    // Find the book that contains the copy with the given copy ID
    const book = await db.collection('books').findOne({ 'copies._id': new ObjectId(copyId) });

    if (!book) {
      return res.status(404).json({ success: false,error: 'Book not found for the given copy ID' });
    }

    // Remove the specific copy from the book's copies array
    const result = await db.collection('books').updateOne(
      { 'copies._id': new ObjectId(copyId) },
      { $pull: { copies: { _id: new ObjectId(copyId) } } }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ success: false,error: 'Copy not found for the given copy ID' });
    }

    res.json({ success: true, message: 'Copy deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});




app.get('/bookByTitle/:title', async (req, res) => {
  try {
    const title = req.params.title;

    // Find the book with the specified title
    const book = await db.collection('books').findOne({ title });

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.json(book);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/getTrade/:useremail', async (req, res) => {
  try {
    const useremail = req.params.useremail;

    // Find the book with the specified title
    const trade = await db.collection('trade_list').findOne({ useremail });

    // if (!book) {
    //   return res.status(404).json({ error: 'Book not found' });
    // }

    res.json(trade);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post("/insertbook", function(req, res) {
  const requestBody = {
    title: req.body.title,
    author: req.body.author,
    genres: Array.isArray(req.body.genres) ? req.body.genres : [req.body.genres], // Ensure genres is an array
    rating: req.body.rating,
    pages: req.body.pages,
    image: req.body.image,
    price: req.body.price,
    copies: req.body.copies.map(copy => ({
      _id: new ObjectId(),
      owner: copy.owner,
      current_holder: copy.current_holder,
      selling_price: copy.selling_price * 1,
      rental_price: copy.rental_price * 1,
    })),
    reviews: req.body.reviews.map(review => ({
      name: review.name,
      comment: review.comment,
    })),
  };
  
  db.collection('books').insertOne(requestBody)
    .then(function(result) {
      res.json(result);
    })
    .catch(function(err) {
      res.json('Error hoye gese');
    });
});


app.post("/addCopiesToBook", async function(req, res) {
  const title = req.body.title;
  const copiesData = req.body.copies;

  try {
      // Find the existing book by title
      const existingBook = await db.collection('books').findOne({ title: title });

      if (existingBook) {
          // Extract existing copy IDs
          const existingCopyIds = existingBook.copies.map(copy => copy._id);

          // Add new copies with unique IDs
          copiesData.forEach(copy => {
              copy._id = new ObjectId(); // Assuming you are using ObjectId
          });

          // Update the existing book by adding new copies
          const updatedBook = await db.collection('books').updateOne(
              { title: title },
              { $push: { copies: { $each: copiesData } } }
          );

          res.json({ acknowledged: true, message: 'Copies added successfully' });
      } else {
          res.json({ acknowledged: false, message: 'Book not found' });
      }
  } catch (err) {
      console.error('Error:', err);
      res.status(500).json('Internal Server Error');
  }
});

app.post('/addReviewsToBook', async (req, res) => {
  const { title, reviews } = req.body;

  try {
    const result = await db.collection('books').updateOne(
      { title: title },
      { $push: { reviews: { $each: reviews } } }
    );

    if (result.modifiedCount > 0) {
      res.json({ acknowledged: true, message: 'Reviews added successfully' });
    } else {
      res.json({ acknowledged: false, message: 'Book not found or no reviews added' });
    }
  } catch (error) {
    console.error('MongoDB Error:', error);
    res.status(500).json({ acknowledged: false, message: 'Internal server error' });
  }
});
app.put('/updateBookRating', async (req, res) => {
  const { currentUserRating, bookTitle } = req.body;

  try {
    // 1. Find the book in MongoDB
    const book = await db.collection('books').findOne({ title: bookTitle });

    if (book) {
      // 2. Calculate the average of the current user's rating and the existing rating of the book
      const existingRating = book.rating || 0; // Assume 0 if no rating exists
      const averageRating = (currentUserRating + existingRating) / 2;

      // 3. Update the rating attribute of the book in MongoDB
      const result = await db.collection('books').updateOne(
        { title: bookTitle },
        { $set: { rating: averageRating } }
      );

      if (result.modifiedCount > 0) {
        res.json({ acknowledged: true, message: 'Book rating updated successfully' });
      } else {
        res.json({ acknowledged: false, message: 'Book not found or rating not updated' });
      }
    } else {
      res.json({ acknowledged: false, message: 'Book not found' });
    }
  } catch (error) {
    console.error('MongoDB Error:', error);
    res.status(500).json({ acknowledged: false, message: 'Internal server error' });
  }
});

app.delete('/buyRrequestsDelete/:book_id', async (req, res) => {
  const { book_id } = req.params;
  console.log(book_id);
  try {
    const result = await db.collection('buy_requests').deleteOne({ book_id });
    if (result.deletedCount > 0) {
      res.json({ success: true, message: 'Buy request deleted successfully.' });
    } else {
      res.status(404).json({ success: false, message: 'Buy request not found.' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

app.put("/api/update-profile", async function(req, res) {
  try {
      const updatedUser = req.body;
      const _id = updatedUser._id // Assuming you're updating based on _id

      // Filter out properties with empty values
      const validUpdate = {};
      Object.keys(updatedUser).forEach(key => {
          if (updatedUser[key] !== '') {
              validUpdate[key] = updatedUser[key];
          }
      });

      delete validUpdate._id;
      console.log(validUpdate);

      const result = await db.collection('user').findOneAndUpdate(
         { _id: new ObjectId(_id) },
          {$set: validUpdate },
      );
          console.log("result",result);
      res.json(result); // Send back the updated user
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error hoye gese', error: err });
  }
});

app.get("/",(req,res)=>{
  res.send("Hello World");
})


app.get("/api/get-user/:id", function(req, res) {
  const userId = req.params.id;

  // Validate if the provided ID is a valid MongoDB ObjectId
  if (!ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
  }

  const filter = { _id: new ObjectId(userId) };

  db.collection('user').findOne(filter)
      .then(function(user) {
          if (user) {
              res.json(user);
          } else {
              res.status(404).json({ message: 'User not found' });
          }
      })
      .catch(function(err) {
          console.log(err);
          res.status(500).json({ message: 'Error occurred while fetching user', err });
      });
});


app.get("/getTrades", function(req, res) {

  let books=[];
  db.collection('trade_list').find().forEach(element => {
      books.push(element);
  }).then(function(){
      res.json(books);
  }).catch(function(err){
      res.json('Error hoye gese');
  })
})
app.post('/addTradesToTradelist', async (req, res) => {
  const { useremail, copies } = req.body;

  try {
    const result = await db.collection('trade_list').updateOne(
      { useremail: useremail },
      { $push: { copies: { $each: copies } } }
    );

    if (result.modifiedCount > 0) {
      res.json({ acknowledged: true, message: 'Reviews added successfully' });
    } else {
      res.json({ acknowledged: false, message: 'Book not found or no reviews added' });
    }
  } catch (error) {
    console.error('MongoDB Error:', error);
    res.status(500).json({ acknowledged: false, message: 'Internal server error' });
  }
});
app.post("/inserttrade", function(req, res) {
  const requestBody = {
      useremail: req.body.useremail,
      
      copies: req.body.copies.map(copy => ({
          activity: copy.activity,
          counterpart: copy.counterpart,
          book: copy.book,
          price: copy.price ,
          date: copy.date,
      })),
    
  };
      db.collection('trade_list').insertOne(requestBody).then(function(result) {
          res.json(result);
      }).catch(function(err) {
          res.json('Error hoye gese');
      });
  });

  app.put('/updateUserRating', async (req, res) => {
    const { currentUserRating, counterpart } = req.body;
   
    try {
      // 1. Find the book in MongoDB
      const book = await db.collection('user').findOne({ email: counterpart });
   
      if (book) {
        // 2. Calculate the average of the current user's rating and the existing rating of the book
        const existingRating = book.rating || 0; // Assume 0 if no rating exists
        const averageRating = (currentUserRating + existingRating) / 2;
   
        // 3. Update the rating attribute of the book in MongoDB
        const result = await db.collection('user').updateOne(
          { email: counterpart},
          { $set: { rating: averageRating } }
        );
   
        if (result.modifiedCount > 0) {
          res.json({ acknowledged: true, message: 'User rating updated successfully' });
        } else {
          res.json({ acknowledged: false, message: 'User not found or rating not updated' });
        }
      } else {
        res.json({ acknowledged: false, message: 'User not found' });
      }
    } catch (error) {
      console.error('MongoDB Error:', error);
      res.status(500).json({ acknowledged: false, message: 'Internal server error' });
    }
  });
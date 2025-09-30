# 📚 MongoDB Books Collection

This project contains a set of **MongoDB shell commands** for querying, updating, aggregating, and indexing a `books` collection.
Follow this guide to set up the database and run the provided scripts.

---

* [ ] 🛠️ Prerequisites

Before running the commands, make sure you have:

- [MongoDB Community Server](https://www.mongodb.com/try/download/community) **installed** and running.
- [Mongo Shell (mongosh)](https://www.mongodb.com/docs/mongodb-shell/install/) or MongoDB Compass for executing commands.
- A `books` collection inside a MongoDB database (e.g., `library`).

---

## ⚡ Setup Instructions

1. **Start the MongoDB server**

   - On Windows:

     ```bash
     net start MongoDB
     ```

     or, if installed via `mongod`:

     ```bash
     mongod
     ```
   - On macOS/Linux (Homebrew or service):

     ```bash
     brew services start mongodb-community
     ```

     or

     ```bash
     sudo systemctl start mongod
     ```
2. **Connect to MongoDB**
   Open your terminal and run:

   ```bash
   mongosh


   ```

Or connect to a specific database:

```
mongosh "mongodb://127.0.0.1:27017/plp_bokestore"
```

3. Create and populate the books collection
   Example dataset:

```
use plp_bookstore;db.books.insertMany([{
title: "Boys over flower",
author: "Harper Lee",
genre: "Fiction",
published_year: 1960,
price: 12.99,
in_stock: true,
pages: 336,
publisher: "J. B. Lippincott & Co.",
},
{
title: "Boys over flower",
author: "Harper Lee",
genre: "Fiction",
published_year: 1960,
price: 12.99,
in_stock: true,
pages: 336,
publisher: "J. B. Lippincott & Co.",
},
{
title: "The Barrista",
author: "Lee jong-suk",
genre: "Fiction",
published_year: 1980,
price: 22.99,
in_stock: true,
pages: 300,
publisher: "J. B. Lippincott & Co.",
},
{
title: "Legend of the blue sea",
author: " Lee Min-ho",
genre: "Fiction",
published_year: 2000,
price: 32.99,
in_stock: true,
pages: 256,
publisher: "J. B. Lippincott & Co.",
},
{
title: "Jumong",
author: "George Orwell",
genre: "Dystopian",
published_year: 1949,
price: 10.99,
in_stock: true,
pages: 328,
publisher: "Secker & Warburg",
},
{
title: "City Hunter",
author: "F. Scott Fitzgerald",
genre: "Fiction",
published_year: 1925,
price: 9.99,
in_stock: true,
pages: 180,
publisher: "Charles Scribner's Sons",
},
{
title: "The Editor",
author: "Aldous Huxley",
genre: "Dystopian",
published_year: 1932,
price: 11.5,
in_stock: false,
pages: 311,
publisher: "Chatto & Windus",
},
{
title: "Alchemy of Souls",
author: "J.R.R. Tolkien",
genre: "Fantasy",
published_year: 1937,
price: 14.99,
in_stock: true,
pages: 310,
publisher: "George Allen & Unwin",
},
{
title: "Coffee Prince",
author: "J.D. Salinger",
genre: "Fiction",
published_year: 1951,
price: 8.99,
in_stock: true,
pages: 224,
publisher: "Little, Brown and Company",
},
{
title: "Pride and Prejudice",
author: "Jane Austen",
genre: "Romance",
published_year: 1813,
price: 7.99,
in_stock: true,
pages: 432,
publisher: "T. Egerton, Whitehall",
},
{
title: "The Lord of the Rings",
author: "J.R.R. Tolkien",
genre: "Fantasy",
published_year: 1954,
price: 19.99,
in_stock: true,
pages: 1178,
publisher: "Allen & Unwin",
}]);
```

▶️ Running the Scripts

Copy and paste each command into mongosh while connected to the plp_bookstore database.

1️⃣ Basic Queries

```
// Find all books in a specific genre
db.books.find({ genre: "Dystopian" });// Find books published before the year 2000
db.books.find({ published_year: { $lt: 2000 } });// Find books by a specific author
db.books.find({ author: "Thomas Cautley Newby" });
```

2️⃣ Updates and Deletion

/

```
/ Update the price of a specific book
db.books.updateOne({ title: "Boys over flower" }, { $set: { price: 42.99 } });// Delete a book by its title
db.books.deleteOne({ title: "Legend of the blue sea" });
```

3️⃣ Advanced Queries

```
// Books in stock and published after 2010
db.books.find({ in_stock: true, published_year: { $gt: 2010 } });// Projection: show only title, author, and price
db.books.find({}, { title: 1, author: 1, price: 1, _id: 0 });// Sort by price
db.books.find().sort({ price: 1 });  // Ascending
db.books.find().sort({ price: -1 }); // Descending// Pagination (5 books per page)
db.books.find().skip(0).limit(5);  // Page 1
db.books.find().skip(5).limit(5);  // Page 2
db.books.find().skip(10).limit(5); // Page 3
```

4️⃣ Aggregation Pipelines

```
// Average price of books by genre
db.books.aggregate([
  { group: { _id: "group: { _id: "genre", averagePrice: { avg: "avg:"price" } } }
]);// Author with the most books
db.books.aggregate([
  { group: { _id: "group: { _id: "author", bookCount: { $sum: 1 } } },
  { $sort: { bookCount: -1 } },
  { $limit: 1 }
]);// Group books by publication decade
db.books.aggregate([
  {
    $group: {
      _id: { multiply: [10, { multiply: [10, { floor: { divide: ["divide:["published_year", 10] } }] },
      bookCount: { $sum: 1 }
    }
  }
]);
```

5️⃣ Indexing

```
// Create an index on the title field
db.books.createIndex({ title: 1 });// Create a compound index on author and published_year
db.books.createIndex({ author: 1, published_year: -1 });// Demonstrate performance improvements
db.books.find({ title: "Jumong" }).explain("executionStats");
```

💡 Tips

* Use updateMany() if you need to update multiple documents at once.
* Indexes improve query speed but can slow down inserts/updates slightly.
* To reset the collection:

`db.books.drop();`

License

This project is for learning and demonstration purposes.
You may use and modify the code freely.

---

`This `.

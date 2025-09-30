// Find all books in a specific genre
db.books.find({ genre: "Dystopian" });

// Find books published after a certain year
db.books.find({ published_year: { $lt: 2000 } });

// Find books by a specific author
db.books.find({ author: "Thomas Cautley Newby" });

// Update the price of a specific book
db.books.updateOne({ title: "Boys over flower" }, { $set: { price: 42.99 } });

// Delete a book by its title
db.books.deleteOne({ title: "Legend of the blue sea" });

// Task 3: Advanced Queries

// - Write a query to find books that are both in stock and published after 2010
db.books.find({ in_stock: true, published_year: { $gt: 2010 } });

// Use projection to return only the title, author, and price fields in your queries
db.books.find({}, { title: 1, author: 1, price: 1, _id: 0 });

// Implement sorting to display books by price (both ascending and descending)
db.books.find().sort({ price: 1 }); // Ascend).sort({ price: -1 }) // Descending
db.books.find().sort({ price: -1 }); // Descending

// Use the `limit` and `skip` methods to implement pagination (5 books per page)
db.books.find().skip(0).limit(5); // Page 1
db.books.find().skip(5).limit(5); // Page 2
db.books.find().skip(10).limit(5); // Page 3

// Task 4: Aggregation Pipeline
// Create an aggregation pipeline to calculate the average price of books by genre
db.books.aggregate([
  { $group: { _id: "$genre", averagePrice: { $avg: "$price" } } },
]);

// Create an aggregation pipeline to find the author with the most books in the collection
db.books.aggregate([
  { $group: { _id: "$author", bookCount: { $sum: 1 } } },
  { $sort: { bookCount: -1 } },
  { $limit: 1 },
]);

// Implement a pipeline that groups books by publication decade and counts them
db.books.aggregate([
  {
    $group: {
      _id: { $floor: { $divide: ["$published_year", 10] } },
      bookCount: { $sum: 1 },
    },
  },
]);

// Task 5: Indexing
// Create an index on the `title` field for faster searches
db.books.createIndex({ title: 1 });

// Create a compound index on `author` and `published_year`
db.books.createIndex({ author: 1, published_year: -1 });

// Use the `explain()` method to demonstrate the performance improvement with your indexes
db.books.find({ title: "Jumong" }).explain("executionStats");

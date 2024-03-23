// Import necessary modules
const csv = require("csv-parser");
const createCsvStringifier = require("csv-writer").createObjectCsvStringifier;
const fs = require('fs');
const Transform = require("stream").Transform;

// Define the CSV cleaner class
class CSVCleaner extends Transform {
  constructor(options) {
    super(options);
  }

  _transform(chunk, encoding, next) {
    // Clean and transform the data here
    // Example: Remove whitespace and filter out non-numeric characters
    // Write the cleaned data to the output stream
    // Call the callback function to proceed to the next chunk
    for (let key in chunk) {
      // Trims whitespace
      let trimKey = key.trim();
      chunk[trimKey] = chunk[key];
      if (key !== trimKey) {
        delete chunk[key];
      }
    }
    // Filters out all non-number characters
    let onlyNumbers = chunk.default_price.replace(/\D/g, "");
    chunk.default_price = onlyNumbers;
    // Uses our csvStringifier to turn our chunk into a csv string
    chunk = csvStringifier.stringifyRecords([chunk]);
    this.push(chunk);
    next();
  }
}

// Define the CSV stringifier for headers
const csvStringifier = createCsvStringifier({
  header: [
    { id: "id", title: "id" },
    { id: "name", title: "name" },
    { id: "slogan", title: "slogan" },
    { id: "description", title: "description" },
    { id: "category", title: "category" },
    { id: "default_price", title: "default_price" },
  ],
});

// Define paths for read and write streams
let readStream = fs.createReadStream("./data/product.csv");
let writeStream = fs.createWriteStream("./data/cleanproduct.csv");

// Create an instance of the CSV cleaner with writable object mode set to true
const transformer = new CSVCleaner({ writableObjectMode: true });

// Write the header to the output CSV file
writeStream.write(csvStringifier.getHeaderString());

// Pipe the read stream through the CSV parser, transformer, and write stream
readStream
  .pipe(csv())
  .pipe(transformer)
  .pipe(writeStream)
  .on("finish", () => {
    console.log("Data cleaning finished.");
  });

import { MongoClient } from 'mongodb';
import XLSX from 'xlsx';

const uri = 'mongodb://localhost:27017/';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function processData(data) {
  try {
    await client.connect();
    const database = client.db('webdb');
    const collection = database.collection('tests');

    for (const row of data) {
      const existingRecord = await collection.findOne({ phone: row.phone });

      if (existingRecord) {
        // Update existing record and add remarks for additional fields
        const updateOperations = {
          $set: row,
          $addToSet: { remarks: getNewFieldsRemarks(existingRecord, row) }
        };
        await collection.updateOne({ phone: row.phone }, updateOperations);
      } else {
        // Insert new record into the collection
        await collection.insertOne(row);
      }
    }
  } finally {
    await client.close();
  }
}

function getNewFieldsRemarks(existingRecord, newRow) {
  const remarks = [];
  for (const key in newRow) {
    if (!existingRecord.hasOwnProperty(key)) {
      remarks.push(`Added ${key}: ${newRow[key]}`);
    }
  }
  return remarks;
}

// Read Excel data
const workbook = XLSX.readFile('DATA UPLOAD.xlsx');
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const data = XLSX.utils.sheet_to_json(sheet);
console.log("data :", data);

// Process and update data
processData(data);

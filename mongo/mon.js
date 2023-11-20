const { MongoClient } = require('mongodb');

const sourceDataA = [
  { id: 'a1', price: 100, quantity: 10 },
  { id: 'a2', price: 200, quantity: 5 },
  { id: 'a3', price: 250, quantity: 15 },
];

const sourceDataB = [
  { id: 'b1', price: 150, quantity: 25 },
  { id: 'b3', price: 220, quantity: 13 },
  { id: 'b5', price: 120, quantity: 30 },
];

const mongoUrl = 'mongodb://localhost:27017';
const dbName = 'myDB';

async function insertDataToDB(collectionName, data) {
  const client = new MongoClient(mongoUrl);

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // 데이터 추가
    const result = await collection.insertMany(data);
    console.log(`${result.insertedCount} documents inserted into ${collectionName} collection.`);
    
    const updatedDocuments = await collection.find().toArray();
    console.log(`Updated documents in ${collectionName} collection:`, updatedDocuments);

  } finally {
    // 연결 종료
    await client.close();
  }
}

async function main() {
  // A상점 데이터를 myDB에 추가
  await insertDataToDB('Astore', sourceDataA);

  // B상점 데이터를 myDB에 추가
  await insertDataToDB('Bstore', sourceDataB);
}

main().catch((err) => console.error('Error:', err));

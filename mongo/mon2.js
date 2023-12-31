const { MongoClient } = require('mongodb');

const sourceDataA = [
  { id: 'a1', price: 120, quantity: 5 },
  { id: 'a2', price: 200, quantity: 15 },
  { id: 'a5', price: 500, quantity: 50 },
];

const mongoUrl = 'mongodb://localhost:27017';
const dbName = 'myDB';

async function updateDataInDB(collectionName, newData) {
  const client = new MongoClient(mongoUrl);

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // 기존 데이터 업데이트 또는 새로운 데이터 추가
    for (const data of newData) {
      const filter = { id: data.id };
      const update = { $set: { price: data.price, quantity: data.quantity } };
      const options = { upsert: true }; // upsert 옵션을 통해 문서가 없으면 새로 생성
      await collection.updateOne(filter, update, options);
    }

    // 업데이트된 DB 리스트 출력
    const updatedDocuments = await collection.find().toArray();
    console.log(`Updated documents in ${collectionName} collection:`, updatedDocuments);
  } finally {
    // 연결 종료
    await client.close();
  }
}

async function main() {
  // A상점 데이터를 myDB에 업데이트
  await updateDataInDB('Astore', sourceDataA);
}

main().catch((err) => console.error('Error:', err));

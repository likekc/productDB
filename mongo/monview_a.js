const { MongoClient } = require('mongodb');

const mongoUrl = 'mongodb://localhost:27017';
const dbName = 'myDB';
const collectionName = 'Astore'; // 출력하려는 컬렉션 이름

async function showCollectionData() {
  const client = new MongoClient(mongoUrl);

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // 컬렉션의 모든 문서 조회
    const documents = await collection.find().toArray();
    
    console.log(`Documents in ${collectionName} collection:`);
    console.log(documents);
  } finally {
    // 연결 종료
    await client.close();
  }
}

async function main() {
  // Astore 컬렉션의 모든 문서 출력
  await showCollectionData();
}

main().catch((err) => console.error('Error:', err));

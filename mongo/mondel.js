const { MongoClient } = require('mongodb');

const mongoUrl = 'mongodb://localhost:27017';
const dbName = 'myDB';

async function deleteAllDocuments() {
  const client = new MongoClient(mongoUrl);

  try {
    await client.connect();
    const db = client.db(dbName);

    // DB의 모든 컬렉션 조회
    const collections = await db.listCollections().toArray();

    for (const collectionInfo of collections) {
      const collectionName = collectionInfo.name;
      const collection = db.collection(collectionName);

      // 각 컬렉션의 모든 문서 삭제
      const deleteResult = await collection.deleteMany({});

      console.log(`Deleted ${deleteResult.deletedCount} documents from ${collectionName} collection.`);
    }
  } finally {
    // 연결 종료
    await client.close();
  }
}

async function main() {
  // myDB의 모든 컬렉션과 각 컬렉션의 모든 문서 삭제
  await deleteAllDocuments();
}

main().catch((err) => console.error('Error:', err));

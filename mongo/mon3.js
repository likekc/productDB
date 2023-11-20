const { MongoClient } = require('mongodb');
const readlineSync = require('readline-sync');

const mongoUrl = 'mongodb://localhost:27017';
const dbName = 'myDB';
const collectionName = 'allProducts'; // 하나의 컬렉션으로 가정

// 새로운 DB의 데이터
const sourceData = [
  { id: 'b1', price: 200, quantity: 0 },
  { id: 'a2', price: 150, quantity: 20 },
  { id: 'a3', price: 230, quantity: 5 },
  { id: 'b4', price: 300, quantity: 20 }
];

async function updateDataInDB(newData) {
  const client = new MongoClient(mongoUrl);

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // 기존 데이터 업데이트
    for (const data of newData) {
      const existingDocument = await collection.findOne({ id: data.id });

      // 상품의 2번째 열 값이 0인 경우 출력
      if (data.quantity === 0) {
        console.log(`Product with id ${data.id} has quantity 0.`);
      }

      // 데이터가 이미 존재하면 업데이트
      if (existingDocument) {
        await collection.updateOne({ id: data.id }, { $set: { price: data.price, quantity: data.quantity } });
        console.log(`Product with id ${data.id} updated in ${collectionName} collection.`);
      } else {
        console.log(`Product with id ${data.id} does not exist in ${collectionName}.`);

        // "y"를 입력하면 컬렉션에 추가
        const userInput = readlineSync.question(`Do you want to add this product to ${collectionName}? (y/n)`);
        if (userInput.toLowerCase() === 'y') {
          await collection.insertOne(data);
          console.log(`Product with id ${data.id} added to ${collectionName}.`);
        }
      }
    }

    console.log(`Documents in ${collectionName} collection updated.`);
  } finally {
    // 연결 종료
    await client.close();
  }
}

async function main() {
  // 데이터를 allProducts 컬렉션에 업데이트
  await updateDataInDB(sourceData);
}

main().catch((err) => console.error('Error:', err));

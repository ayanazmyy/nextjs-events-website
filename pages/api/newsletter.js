import { MongoClient } from 'mongodb';

async function connectDatabase() {
  const client = await MongoClient.connect('mongodb+srv://ayanazmy:HqdnGAxNlOGooQKo@next-events.kjsuynp.mongodb.net/events?retryWrites=true&w=majority');
  return client;
}

async function insertDocument(client, document) {
  const db = client.db();
  await db.collection('emails').insertOne(document);
}

async function handler(req, res) {
  if (req.method === 'POST') {
    const email = req.body.email;

    if (!email || !email.includes('@')) {
      res.status(422).json({ message: 'Invalid email address' });
      return;
    }


    let client;

    try {
      client = await connectDatabase();
    } catch(error) {
      res.status(500).json({message: 'Connecting to database failed!'});
      return;
    }

    try {
      await insertDocument(client, { email: email });
      client.close();
    } catch(error) {
      res.status(500).json({message: 'Inserting data failed!'});
      return;
    }
    



    res.status(201).json({ message: 'success' });
  }
}

export default handler;
import { MongoClient } from 'mongodb';

async function connectDatabase() {
    const client = await MongoClient.connect('mongodb+srv://ayanazmy:HqdnGAxNlOGooQKo@next-events.kjsuynp.mongodb.net/events?retryWrites=true&w=majority');
    return client;
}

async function insertDocument(client, document) {
    const db = client.db();
    const result = await db.collection('comments').insertOne(document);
    return result;
}

async function getDocuments(client) {
    const db = client.db();
    const documents = await db.collection('comments').find().sort({ _id: -1 }).toArray();
    return documents;
}

async function handler(req, res) {
    const eventId = req.query.eventId;


    let client;
    try {
        client = await connectDatabase();
    } catch(error) {
        res.status(500).json({message: 'Connecting to database failed!'});
        return;
    }

    if (req.method === 'POST') {
        const { email, name, text } = req.body;

        if (!email.includes('@') || !name || name.trim() == "" || !text || text.trim() == "") {
            res.status(422).json({ message: "please enter valid data" });
            return;
        }

        const newComment = {
            email,
            name,
            text,
            eventId
        }


        let result;
        try {
            result = await insertDocument(client, newComment);
            client.close();
        } catch(error) {
            res.status(500).json({message: 'Inserting comment failed!'});
            return;
        }
        

        newComment._id = result.insertedId;

        res.status(201).json({ message: 'comment added', comment: newComment })

    }

    if (req.method === "GET") {
        let documents;
        try {
            documents = await getDocuments(client);
        } catch {
            res.status(500).json({message: "Connecting to database failed"})
        }
        

        res.status(200).json({ message: "success", comments: documents })
    }

    client.close();
}

export default handler;
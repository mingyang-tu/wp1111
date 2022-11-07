import { Router } from "express";
import ScoreCard from "../models/ScoreCard";

const saveScoreCard = async (name, subject, score) => {
    try {
        const existing = await ScoreCard.findOne({ name, subject });
        if (existing) {
            await ScoreCard.updateOne({ name, subject }, { score });

            const msg = `Updating (${name}, ${subject}, ${score})`;
            console.log(msg);
            return msg;
        }
        else {
            const newScoreCard = new ScoreCard({ name, subject, score });
            await newScoreCard.save();

            const msg = `Adding (${name}, ${subject}, ${score})`;
            console.log(msg);
            return msg;
        }
    }
    catch (e) {
        throw new Error("ScoreCard updating/adding error: " + e);
    }
};
const deleteDB = async () => {
    try {
        await ScoreCard.deleteMany({});

        const msg = "Database cleared";
        console.log(msg);
        return msg;
    }
    catch (e) {
        throw new Error("Database deletion failed: " + e);
    }
};
const findScoreCard = async (type, queryString) => {
    try {
        let msgList = [];
        const existing = await ScoreCard.find({ [type]: {$eq: queryString} });
        for (const item of existing) {
            msgList.push(`Found card with ${type}: (${item.name}, ${item.subject}, ${item.score})`)
        }

        if (msgList.length === 0) {
            return [`${type[0].toUpperCase() + type.slice(1)} (${queryString}) not found!`];
        }
        else {
            return msgList;
        }
    }
    catch (error) {
        throw new Error("ScoreCard Finding error: " + e);
    }
}

const router = Router();
router.delete("/cards", async (_, res) => {
    try {
        const msg = await deleteDB();
        res.status(200).send({ message: msg });
    }
    catch (error) {
        res.status(500).send({ message: error });
    }
});
router.post("/card", async (req, res) => {
    try {
        const { name, subject, score } = req.body;
        const msg = await saveScoreCard(name, subject, score);
        res.status(200).send({ message: msg, card: true });
    }
    catch (error) {
        res.status(500).send({ message: error, card: false });
    }
});
router.get("/cards", async (req, res) => {
    try {
        const { type, queryString } = req.query;
        const msg = await findScoreCard(type, queryString);
        res.status(200).send({ messages: msg, message: "Query success" });
    }
    catch (error) {
        res.status(500).send({ messages: null, message: "Query error" });
    }
});

export default router;
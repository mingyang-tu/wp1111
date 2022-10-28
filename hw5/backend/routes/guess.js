import express from 'express'
import { genNumber, getNumber } from '../core/getNumber'

const router = express.Router();

router.post('/start', (_, res) => {
    genNumber();
    res.json({ msg: "The game has started." });
})

router.get('/guess', (req, res) => {
    const target = getNumber();
    const guessed = req.query.number.split('');
    const count = req.query.count;
    if (guessed.length != 4) {
        res.status(406).send({ msg: "Input Length Error" });
    }
    else {
        let A = 0;
        let C = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (let i = 0; i < guessed.length; i++) {
            if (guessed[i] === target[i]) A++;
            else {
                C[parseInt(target[i])]++;
                C[parseInt(guessed[i])]--;
            }
        }
        let B = 4 - A;
        for (const i of C) {
            if (i > 0) B = B - i;
        }
        if (A !== 4 && count >= 9) {
            res.status(200).send({ msg: `Lose,${target.join('')}` });
        }
        else {
            res.status(200).send({ msg: `${A}A${B}B` });
        }
    }
})

router.post('/restart', (_, res) => {
    genNumber();
    res.json({ msg: 'The game has restarted.' })
})

export default router;
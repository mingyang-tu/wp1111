import axios from 'axios';

const instance = axios.create({ baseURL: "http://localhost:4000/api/guess" });

const startGame = async () => {
    try {
        const { data: { msg } } = await instance.post('/start');
        // console.log(msg);
        return msg;
    }
    catch (error) {
        const msg = "HTTP 500. The server is not responding.";
        // console.log(msg);
        return msg;
    }
}

const guess = async (number, count) => {
    try {
        try {
            const { data: { msg } } = await instance.get('/guess', { params: { number, count } });
            // console.log(msg);
            return msg;
        }
        catch (error) {
            if (error.response.status === 406) {
                const msg = `The length of the input = ${number.length}, which is not a legal input.`;
                // console.log(msg);
                return msg;
            }
        }
    }
    catch (error) {
        const msg = "HTTP 500. The server is not responding.";
        // console.log(msg);
        return msg;
    }
}

const restart = async () => {
    try {
        const { data: { msg } } = await instance.post('/restart');
        // console.log(msg);
        return msg;
    }
    catch (error) {
        const msg = "HTTP 500. The server is not responding.";
        // console.log(msg);
        return msg;
    }
}
export { startGame, guess, restart };
import { makeChatName } from "./utils";

const Subscription = {
    message: {
        subscribe: (parent, { name1, name2 }, { pubsub }) => {
            return pubsub.subscribe(`chatBox ${makeChatName([name1, name2])}`);
        },
    },
};

export default Subscription;
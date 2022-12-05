const printChatBox = (chatBoxes) => {
    console.log("=========================");
    console.log("ChatBoxes: ");
    for (const key in chatBoxes) {
        if (Object.hasOwnProperty.call(chatBoxes, key)) {
            console.log(`  ${key}:`);
            console.log(`    Active: ${chatBoxes[key]["active"].size} client`);
            console.log(`    Inactive: ${chatBoxes[key]["inactive"].size} client`);
        }
    }
    console.log("=========================");
}

export { printChatBox }
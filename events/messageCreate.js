module.exports = (client, message) => {
    if (message.content.startsWith(client.prefix)) {
        const command = message.content.split(" ")[0].slice(client.prefix.length).toLowerCase();
        const args = message.content.split(" ").slice(1);
        let cmd;
        if (client.commands.has(command)){
            cmd=client.commands.get(command);
        }else if(client.aliases.has(command)){
            cmd=client.commands.get(client.aliases.get(command));
        }
        if (!cmd) return;
        cmd.run(client,message,args);
    }
}
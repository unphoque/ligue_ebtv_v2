import { Message, Collection } from 'discord.js';

export type command = {
    name: string,
    description: string,
    usage: string,
    category: string,
    aliases: Array<string>,
    run: (message: Message, args: Array<string>, commands: Collection<string, command>) => void
}

import { Store, Chat, UserId } from "./Store";

let globalChatId = 0;
export interface Room {
    roomId: string;
    chats: Chat[];
}

export class InMemoryStore implements Store {
    private store: Map<string, Room>
    constructor() {
        this.store = new Map<string, Room>
    }

    initRoom(roomId: string) {
        this.store.set(roomId, {
            roomId,
            chats: [],
        });
    }

    getChats(roomId: string, limit: number, offset: number) {
        const room = this.store.get(roomId)
        if (!room) 
            return []

        return room.chats.reverse().slice(offset).slice(0, limit)
    }

    addChat(roomId: string, userId: UserId, name: string, message: string) {
        const room = this.store.get(roomId)
        if (!room)
            return []

        room.chats.push({
                id: (globalChatId++).toString(),
                userId,
                name,
                message,
                upvotes: []
        })
    }

    upvote(roomId: string, userId: string, chatId: string) {
        const room = this.store.get(roomId)
        if (!room)
            return []

        // Todo: Make this Faster
        const chat = room.chats.find(({id}) => id == chatId)

        if (chat) {
            chat.upvotes.push(userId)
        }
    }
}
export interface Message {
    message: string;
    sender: string;
    type: MessageType;
}

// src/types/MessageType.ts

export enum MessageType {
    CHAT = "CHAT",
    JOIN = "JOIN",
    LEAVE = "LEAVE"
}
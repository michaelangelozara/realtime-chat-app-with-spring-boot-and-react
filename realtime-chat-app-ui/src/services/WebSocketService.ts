import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs"
import { Message } from "../types/Message";

const WebSocketService = (callback: (message: Message) => void) => {
    const socket = new SockJS('http://localhost:8080/ws'); // Adjust to your Spring Boot WebSocket endpoint
    const stompClient = new Client({
        webSocketFactory: () => socket,
        onConnect: () => {
            console.log('Connected to WebSocket');
            stompClient.subscribe('/topic/public', (message) => {
                callback(JSON.parse(message.body));
            });
        },
        onStompError: (frame) => {
            console.error('Broker reported error: ' + frame.headers['message']);
        },
    });

    stompClient.activate();

    return stompClient;
}

export default WebSocketService
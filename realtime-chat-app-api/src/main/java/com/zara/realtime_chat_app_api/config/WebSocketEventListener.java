package com.zara.realtime_chat_app_api.config;

import com.zara.realtime_chat_app_api.message.Message;
import com.zara.realtime_chat_app_api.message.MessageType;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Component
@Slf4j
public class WebSocketEventListener {

    private final SimpMessagingTemplate simpMessagingTemplate;

    public WebSocketEventListener(SimpMessagingTemplate simpMessagingTemplate) {
        this.simpMessagingTemplate = simpMessagingTemplate;
    }

    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        log.info("User disconnects");
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        String username = (String) headerAccessor.getSessionAttributes().get("username");
        if (username != null) {
            log.info("User {} is disconnected", username);
            var message = Message.builder()
                    .message(username + " has been leaved")
                    .type(MessageType.LEAVE)
                    .sender(username)
                    .build();

            this.simpMessagingTemplate.convertAndSend("/topic/public", message);
        }
    }
}

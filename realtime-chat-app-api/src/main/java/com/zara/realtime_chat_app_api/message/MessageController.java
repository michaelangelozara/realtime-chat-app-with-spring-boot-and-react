package com.zara.realtime_chat_app_api.message;

import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

@Slf4j
@Controller
@CrossOrigin("http://localhost:5173")
public class MessageController {

    private final MessageService messageService;

    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @MessageMapping("/chat.sendMessage")
    @SendTo("/topic/public")
    public Message sendMessage(
            @Payload Message message
    ) {
        log.info("{} sends a message.", message.getSender());
        return message;
    }

    @MessageMapping("/chat.addUser")
    @SendTo("/topic/public")
    public Message addUser(
            @Payload Message message,
            SimpMessageHeaderAccessor headerAccessor
    ) {

        log.info("{} is entered the room.", message.getSender());
        // add username in websocket session
        headerAccessor.getSessionAttributes().put("username", message.getSender());
        return message;
    }
}

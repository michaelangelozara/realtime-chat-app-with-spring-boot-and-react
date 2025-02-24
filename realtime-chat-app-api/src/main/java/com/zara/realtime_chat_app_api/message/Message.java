package com.zara.realtime_chat_app_api.message;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class Message {

    private String message;
    private String sender;
    private MessageType type;
}

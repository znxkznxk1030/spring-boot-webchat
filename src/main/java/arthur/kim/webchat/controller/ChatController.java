package arthur.kim.webchat.controller;

import arthur.kim.webchat.pojo.ChatMessage;
import arthur.kim.webchat.pubsub.RedisPublisher;
import arthur.kim.webchat.registry.ChatRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.*;


@RequiredArgsConstructor
@RestController
@CrossOrigin("*")
public class ChatController {

    private final RedisPublisher redisPublisher;
    private final ChatRoomRepository chatRoomRepository;

    @MessageMapping("/chat/message")
    public void message(ChatMessage message) {
        if (ChatMessage.MessageType.JOIN.equals(message.getType())) {
            chatRoomRepository.enterChatRoom(message.getRoomId());
            message.setMessage(message.getSender() + "님이 입장하셨습니다.");
        }

        ChannelTopic chatTopic = chatRoomRepository.getTopic(message.getRoomId());
        redisPublisher.publish(chatTopic, message);
    }
}


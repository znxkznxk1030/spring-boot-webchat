package arthur.kim.webchat.dto;

import arthur.kim.webchat.pojo.ChatMessage;
import arthur.kim.webchat.service.ChatService;
import lombok.Builder;
import lombok.Getter;
import org.springframework.web.socket.WebSocketSession;

import java.util.HashSet;
import java.util.Set;

@Getter
public class ChatRoom {
    private final String roomId;
    private final String name;
    private final Set<WebSocketSession> sessions = new HashSet<>();

    @Builder
    public ChatRoom(String roomId, String name) {
        this.roomId = roomId;
        this.name = name;
    }

    public void handleActions(WebSocketSession session, ChatMessage chatMessage, ChatService chatService) {
        if (chatMessage.getType().equals(ChatMessage.MessageType.ENTER)) {
            sessions.add(session);
            chatMessage.setMessage(chatMessage.getSender() + "님이 입장하셨습니다.");
        }

        sendMessage(chatMessage, chatService);
    }

    public <T> void sendMessage(T message, ChatService chatService) {

        sessions.parallelStream().forEach(session -> chatService.sendMessage(session, message));
    }


}

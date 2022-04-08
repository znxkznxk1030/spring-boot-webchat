package arthur.kim.webchat.dto;

import lombok.Builder;
import lombok.Getter;
import java.util.UUID;

@Getter
public class ChatRoom {
    private String roomId;
    private String name;

    @Builder
    public ChatRoom(String roomId, String name) {
        this.roomId = roomId;
        this.name = name;
    }

    public ChatRoom(String name) {
        ChatRoom.builder().roomId(UUID.randomUUID().toString()).name(name);
    }

    public static ChatRoom create(String name) {
        return new ChatRoom(name);
    }
}

package arthur.kim.webchat.dto;

import lombok.Getter;
import java.util.UUID;

@Getter
public class ChatRoom {
    private String roomId;
    private String name;

    public ChatRoom(String roomId, String name) {
        this.roomId = roomId;
        this.name = name;
    }

    public ChatRoom(String name) {
        this(UUID.randomUUID().toString(), name);
    }

    public static ChatRoom create(String name) {
        return new ChatRoom(name);
    }
}

package arthur.kim.webchat.registry;

import arthur.kim.webchat.dto.ChatRoom;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;
import java.util.*;
import java.util.stream.Collectors;

@Repository
public class ChatRoomRepository {

    private Map<String, ChatRoom> chatRoomMap;

    @PostConstruct
    private void init() {
        chatRoomMap = new LinkedHashMap<>();
    }

    public List<ChatRoom> findAllRoom() {
        return new ArrayList<>(chatRoomMap.values())
                .stream()
                .sorted(Collections.reverseOrder())
                .collect(Collectors.toList());
    }

    public ChatRoom findRoomById(String id) {
        return chatRoomMap.get(id);
    }

    public ChatRoom createChatRoom(String name) {
        ChatRoom chatRoom = new ChatRoom(name);
        return chatRoomMap.put(chatRoom.getRoomId(), chatRoom);
    }
}

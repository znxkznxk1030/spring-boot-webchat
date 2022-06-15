package arthur.kim.webchat.dto;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.UUID;

/**
 * Redis에 저장되는 객체들은 Serialize 가능해야하기 때문에, Serializable 을 구현한다.
 *
 * @serial
 **/
@Getter
@Setter
public class ChatRoom implements Serializable {

  private static final long serialVersionUID = 1234567L;

  private String roomId;
  private String name;

  public static ChatRoom create(String name) {
    ChatRoom _this = new ChatRoom();
    _this.roomId = UUID.randomUUID().toString();
    _this.name = name;
    return _this;
  }
}

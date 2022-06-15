# Spring-Boot Web Chat Using Redis

Followed by [spring-websocket-chatting](https://daddyprogrammer.org/post/4077/spring-websocket-chatting/) by [Daddy Programmer](https://daddyprogrammer.org/)

## Run

### Back-End : Run WebchatApplication.java

Runs the app in the development mode.\
Use [http://localhost:8080](http://localhost:8080) to communicate with web socket.

### FrontEnd : `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Redis

### Redis 의 옵션

```yml
spring:
  redis:
    host: localhost # redis 서버 호스트
    port: 6379 # redis 서버 포트
    database: 0 # 커넥션 팩토리에 사용되는 데이터베이스 인덱스
    password: # redis 서버 로그인 패스워드
    timeout: 0 # 커넥션 타임아웃 ( ms )
    pool:
      max-active: 8 # pool에 할당될 수 있는 커넥션 최대수 ( 음수로 하면 무제한 )
      max-idle: 8 # pool의 "idle" 커넥션 최대수 ( 음수로 하면 무제한 )
      min-idle: 0 # pool에서 관리하는 idle 커넥션의 최소 개수 ( 양수일때만 유효 )
      max-wait: -1 # pool이 부족할 때, 커넥션 할당 차단 최대 대기 시간 ( ms, 음수로 하면 무제한)
    sentinel:
      master: # redis 서버 이름
      nodes: # host: 포트 쌍 목록 ( 콤마로 구분 )
```

### RedisTemplate 를 이용한 사용법

Redis를 사용하기 위해서는 RedisTemplate 이나 RedisRepository를 이용하여 사용한다.

- [How to use Redis-Template in Java Spring Boot?](https://medium.com/@hulunhao/how-to-use-redis-template-in-java-spring-boot-647a7eb8f8cc)

#### setKeySerializer, setValueSerializer

- setKeySerializer, setValueSerializer 를 설정해 주는 이유는 RedisTemplate를 사용할 때 Spring - Redis간 데이터 직렬화, 역직렬화 시 사용하는 방식이 JDK의 직렬화 방식이기 때문
- 동작에는 문제가 없지만 redis-cli를 통해 직접 데이터를 보려고 하면 알아볼수 없는 형태로 출력되기 때문에 적용한 설정

#### sendAndConvert

#### Redis Hash Type으로 사용하기 ( opsForHash )

```java
private HashOperations<String, String, ChatRoom> opsHashChatRoom = redisTemplate.opsForHash();
Map<String, Object> topics = new HashMap<>();

```

### RedisMessageListenerContainer

- Redis를 보고있다가 메시지 발행 (publish)가 되면 Listener가 처리

## Reference

- [Spring Boot Redis 사용 방법 (RedisTemplate, RedisRepository)](https://wildeveloperetrain.tistory.com/32)

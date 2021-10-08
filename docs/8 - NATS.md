NATS и NATS Streaming Server - не одно и тоже
NATS - простая реализация, а Nats Streaming Server реализация над NATS

В кубере юзаем nats-streaming image

Depl:

```yaml
spec:
      containers:
        - name: nats
          image: nats-streaming:0.17.0
          args:
            [
              '-p',
              '4222',
              '-m',
              '8222',
              '-hbi',
              '5s',
              '-hbt',
              '5s',
              '-hbf',
              '2',
              '-SD',
              '-cid',
              'ticketing',
            ]
```

Service:

```
  ports:
    - name: client
      protocol: TCP
      port: 4222
      targetPort: 4222
    - name: monitoring
      protocol: TCP
      port: 8222
      targetPort: 8222
```

- На ноде можно использовать node-nats-streaming, которая event-base.
- nats отправляет все event во все сервисы
- В nats нужно пробрасывать эвенты в каналы. сервисы подписанные к этим каналам будут получать эвент.
- Nats хранит все эвенты в памяти по дефолту, но может в файле или в базе (mysql, postgresql)

port forwarding k8s: `kubectl port-forward srvc 4222:4222`

nats:
- subject - канал в который мы хотим что-то вкинуть
- chanel - это канал который мы слушаем
- subscription - прослушка канала и получение оттуда данных

все данные в nats ходят в виде строки

публикация:
```yaml
stan.publish(subject, message, callback)
```

подписка:

```yaml
const subscription = stan.subscribe(subject)

subscription.on('message', (msg) => {})
```

у каждого подключившегося клиента есть id.

```yaml
nats.connect('ticketing', 'тут уникальный id', { url: 'http://localhost:4222' });
```

### Queue group

Queue group - это группа клиентов в канале, для которых отправка события должна обработаться только одним клиентом из этой группы. 
Те nats отправит событие только одному клиенту из группы. 

const subscription = stan.subscribe(subject, **queueGroup**)


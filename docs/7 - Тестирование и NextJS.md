Мы будем тестировать:
1. Обработку запросов
2. Логику вокруг моделей
3. Обработку событий и отравку событий в event bus

Для простоты тестирования выносим app логику в отдельный файл.
Для базы используем in memory копиию базы

Подрубая nextjs мы можем столкнуться с проблемой. Если мы будем делать запросы на стороне сервера, то сервер не будет резолвить пути и будет ходить на localhost:80 внутри контейнера. При этом нам нужно сохранить куксы.
Чтобы этого избежать есть 2 варианта:
1. На nextjs подставлять пути (но придется знать все роуты сервисов и при этом понимать куда отправлять запрос, короче имитировать ингресс)
2. Или обратиться к ingress nginx 

Как нам обратиться к ингресу?

## Namespace

Все сервисы могут получить к друг другу доступ, если находяться в одном Namespace. По сути Namespace - это sandbox, изолирующий доступ к сервисам по доменам. Стандартный namespace = default.
Ингрес же находится в namespace ingress-nginx. И чтоб получить к нему доступ, нужно обратиться к `http://NAMEOFSERVICE.NAMESPACE.svc.cluster.local`.

Проверяем какие сервисы есть в namespace ингресса: `kubectl get services -n ignress-nginx`
И вставляем в наш урл `http://ingress-nginx-controller.ingress-nginx.svc.cluster.local`.

Можно также создать external name space. он мапит урл к внешнему namespace.

## Мы на сервере?

Итак, мы разобрались с Namespace. Теперь нужно настроить переключение на нужный урл в случае, если мы рендерим приложение на сервере. 
(ведь getInitialProps может отрисовываться, как на сервере, так и на клиенте в случае перехода через push в уже загруженному приложении)
Сделать это можно с помощью `typeof window === 'undefined'`.

## Coookies
Делая запрос в axios, важно еще указать domain, который прописан в ingress, в хедерах. иначе он сделает отлуп.
Но так как мы пробрасываем полностью хедеры из req, то Host и Coookie проксируются далее.

## Ticketing
Напомним, как создать сервис:
1. package.json + install deps
2. Dockerfile
3. index.ts для запуска проекта
4. Создаем image, пушим в докерхаб 
5. пишем k8s конфиги
6. обновляем skaffold.dev
7. пишем деплоймент для mongodb

При тестировании авторизации придется ручками создавать jwe сессию.

# google cloud
1. Создаем проект
2. Подрубаем кубер
3. Создаем кластер
4. Указываем кол-во нод + тип тачек

# настройка локально
1. ставим sdk
2. авторизуемся gcloud auth application-default login
3. указываем проект и зону
4. gcloud container clusters get-credentials ticketing-dev
5. чекаем kubectl get pods  

# google cloud build
1. врубаем google cloud build
2. меняем все имена image
3. установить ingress https://kubernetes.github.io/ingress-nginx/deploy/#gce-gke (по степам с 1 по gce-gke)
4. лезим в Networking => Networking Services => Load Balancer
5. жмакаем на созданный ingress load balancer и копируем ip. после меняем hosts.
6. после апаем skaffold dev. переходим на ticketing.dev и вводим thisisunsafe.

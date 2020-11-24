## Set env variables

kubectl create secret generic jwt-secret --from-literal=JWT_KEY=your_key

## Publish npm module

npm publish --access public
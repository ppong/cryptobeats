docker-compose-up:
	docker-compose -f docker-compose.yaml up --remove-orphans

docker-compose-down:
	docker-compose -f docker-compose.yaml down

docker-stop:
	docker stop $$(docker ps -aq)

docker-clean:
	make docker-stop
	docker system prune -a

postgres-local:
	export PGPASSWORD='kudos'; psql -h localhost -p 5432 -U kudos kudos

run-server:
	go run cmd/server/main.go

generate-database-models:
	go run cmd/codegen/main.go generate-database-model


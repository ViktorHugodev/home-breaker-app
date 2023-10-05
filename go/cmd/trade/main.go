package main

import (
	"sync"

	ckafka "github.com/confluentinc/confluent-kafka-go/kafka"
	"github.com/viktorhugodev/home-breaker-app/go/internal/infra/kafka"
	"github.com/viktorhugodev/home-breaker-app/go/internal/market/entity"
)

func main() {
	ordersIn := make(chan *entity.Order)
	ordersOut := make(chan *entity.Order)
	wg := &sync.WaitGroup{}
	defer wg.Wait()

	kafkaMsgChan := make(chan *ckafka.Message)
	configMap := &ckafka.ConfigMap{
		"bootstrap.servers": "host.docker.internal:9094",
		"group.id":          "myGroup",
		"auto.offset.reset": "earliest",
	}

	producer := kafka.NewKafkaProducer(configMap)
	kafka := kafka.NewConsumer(configMap, []string{"input"})

	go kafka.Consume(kafkaMsgChan) //T2

	book := entity.NewBook(ordersIn, ordersOut, wg)
}

'use strict';

const { Consumer } = require('sqs-consumer');
const { Prodcucer } = require('sqs-producer');

const faker = require('faker');

cont application = Consumer.create({
  queueUrl: '',
  handleMessage: async(message) => {
    const messageTo = JSON.parse(message.Body);
    const parcel = JSON.parse(messageTo.Message)
    console.log('Out for Delivery:', parcel);

    setTimeout(async () => {
      const producer = Producer.create({
        queueUrl: parcel.venderId,
        region:'us-east-2'
      });

      await producer.send({
        id: faker.datatype.uuid(),
        body: JSON.stringify(parcel)
      });
      console.log(`Parcel Delivered ${parcel.id} to ${parcel.name} `)
    }, 2000)
  },

});

app.start();
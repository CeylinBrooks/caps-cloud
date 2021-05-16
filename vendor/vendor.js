'use strict':

const faker = require('faker');
const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-2'});
const { Consumer } = require('sqs-consumer');

const sns = new AWS.SNS();

setInterval(async () => {
  const parcel = { 
    id: faker.datatype.uuid(),
    vendorId: vendor,
    storeName: store,
    name: faker.name.findName(),
    address: faker.address.streetAddress
  };

  let payload = {
    Message: JSON.stringify(parcel),
  }
  console.log('Delivery Requested');
})
  .catch(console.error);
}, 3000);

const app = Consumer.create({
  queueUrl: vendor,
  handleMessage: async(message) => {
    console.log('Parcel Delivered:' message.Body)
  },

})

app.start();
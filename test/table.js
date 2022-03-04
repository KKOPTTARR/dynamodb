// aws dynamodb create-table \
//     --table-name Music \
//     --attribute-definitions \
//         AttributeName=Artist,AttributeType=S \
//         AttributeName=SongTitle,AttributeType=S \
//     --key-schema \
//         AttributeName=Artist,KeyType=HASH \
//         AttributeName=SongTitle,KeyType=RANGE \
//     --provisioned-throughput \
//         ReadCapacityUnits=10,WriteCapacityUnits=5 \
//     --table-class STANDARD

const AWS = require('aws-sdk');
const uuid = require('uuid');

AWS.config.update({
    aws_access_key_id: "aws-account",
    aws_secrect_access_key: "aws-account",
    region: "en-west-1"
})

dyn = new AWS.DynamoDB({
    endpoint: new AWS.Endpoint('http://localhost:8000')
});

const params = {
    AttributeDefinitions: [
        {
            AttributeName: 'Artist',
            AttributeType: 'S'
        },
        {
            AttributeName: 'SongTitle',
            AttributeType: 'S'
        },
    ],
    TableName: 'Music',
    KeySchema: [
        {
            AttributeName: 'Artist',
            KeyType: 'HASH'
        },
        {
            AttributeName: 'SongTitle',
            KeyType: 'RANGE'
        },
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 5,

    }
}

dyn.createTable(params, function (err, data) {
    if (err) {
        console.error('Unable to create table. Error JSON:', JSON.stringify(err, null, 2))
    } else {
        console.log('create the table:', JSON.stringify(data, null, 2));
    }
});

dyn.listTables(function (err, data) {
    console.log('listTable', err, data);
});

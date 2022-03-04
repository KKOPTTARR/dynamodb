/**
 * Created by andy on 2015/9/11.
 */
const AWS = require('aws-sdk');
const uuid = require('uuid');

/* Auth Config */
AWS.config.update({
    aws_access_key_id: "aws-account",
    aws_secret_access_key: "aws-account",
    region: "eu-west-1"
})

dyn = new AWS.DynamoDB({ endpoint: new AWS.Endpoint('http://localhost:8000') });

/* Create A Table*/
var params = {
    AttributeDefinitions: [
        {
            AttributeName: 'ID',
            AttributeType: 'S'
        },
        {
            AttributeName: 'NAME',
            AttributeType: 'S'
        }
        /* more items */
    ],
    TableName: 'DNMDB',
    KeySchema: [
        {
            AttributeName: 'ID',
            KeyType: 'HASH'
        },
        {
            AttributeName: "NAME",
            KeyType: "RANGE"
        }
        /* more items */
    ],
    LocalSecondaryIndexes: [
        {
            IndexName: 'Index1',
            KeySchema: [
                {
                    AttributeName: 'ID',
                    KeyType: 'HASH'
                },
                {
                    AttributeName: 'NAME',
                    KeyType: 'RANGE'
                }
                /* more items */
            ],
            Projection: {
                NonKeyAttributes: [
                    'ID'
                    /* more items */
                ],
                ProjectionType: 'INCLUDE'
            }
        }
        /* more items */
    ],
    StreamSpecification: {
        StreamEnabled: true,
        StreamViewType: 'NEW_IMAGE'
    },
    ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1
    },
    GlobalSecondaryIndexes: [
        {
            IndexName: 'GIND1',
            KeySchema: [
                {
                    AttributeName: 'ID',
                    KeyType: 'HASH'
                },
                /* more items */
            ],
            Projection: {
                NonKeyAttributes: [
                    'NAME'
                    /* more items */
                ],
                ProjectionType: 'INCLUDE'
            },
            ProvisionedThroughput: {
                ReadCapacityUnits: 1,
                WriteCapacityUnits: 1
            }
        }
        /* more items */
    ]
};
dyn.createTable(params, function (err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else console.log(data);           // successful response
})

//console.log('AccessKey: ', process.env.AWS_ACCESS_KEY_ID);

dyn.listTables(function (err, data) {
    console.log('listTables', err, data);
});

import request from 'supertest';

//import request from 'supertest';

import app from '../src/app.js';
import { mongoConnect, mongoDisconnect } from '../src/services/mongo.js';

describe('Launches', () => {
    beforeAll( async () => {
        await mongoConnect();
    })

    afterAll( async () => {
        await mongoDisconnect()
    })

    describe('Test Get /launches route', () => {
        test('it should return 200', async() => {
            let response = await request(app)
                .get('/v1/launches')
                .expect('Content-Type', /json/)
                .expect(200)
            expect(response.statusCode).toBe(200);

        })
    })

    describe('Test post /Launches route', () => {
        test('it should create launch given all valid parameters', (done) => {
            request(app)
                .post('/v1/launches')
                .send({ 
                    mission: 'jolly', 
                    rocket: 'space X',
                    launchDate: '2023-12-01', 
                    target: 'mars'
                })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(201)
                .end(function(err, res) {
                    if (err) return done(err);
                    return done();
                });

        })

        
        test('it should throw error given invalid date', async () => {
            let response =  await request(app)
                .post('/v1/launches')
                .send({ 
                    mission: 'jolly', 
                    rocket: 'space X',
                    launchDate: 'hello', 
                    target: 'mars'
                })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(400)
            
            expect(response.body.error).toBe('Invalid launch date');
        })

        test('it should throw an error when  given incomplete data', async () => {
            let response =  await request(app)
                .post('/v1/launches')
                .send({ 
                    mission: 'jolly', 
                    target: 'mars'
                })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(404)
            
            expect(response.body.error).toBe('missing required launch property');
        })
        
    })
})
    
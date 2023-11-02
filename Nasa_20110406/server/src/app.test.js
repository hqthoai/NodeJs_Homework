const request = require('supertest');
const app = require('./app')

describe ('Test API endpoints', ()=> {

    it('should return status code 200 for GET /planets',async () => {
        const respone = await request(app).get('/planets');
        expect(respone.statusCode).toBe(200);
    })

    it('should return status code 200 for GET /launches',async () => {
        const respone = await request(app).get('/launches');
        expect(respone.statusCode).toBe(200);
    })

    it('should return status code 201 for POST /launches',async () => {
        const newLaunch = {
            mission: 'Misson test',
            rocket: 'Rocket 24h', 
            target: 'Nasa',
            launchDate: 'December 27, 2035'
        }
        const respone = await request(app).post('/launches').send(newLaunch);
        expect(respone.statusCode).toBe(201);
    })

    it('should return status code 400 for POST /launches when missing required field',async () => {
        const newLaunch = {
            mission: 'Misson test',
            rocket: 'Rocket 24h', 
            target: 'Nasa',
        }
        const respone = await request(app).post('/launches').send(newLaunch);
        expect(respone.statusCode).toBe(400);
    })

    it('should return status code 400 for POST /launches when launchDate not valid',async () => {
        const newLaunch = {
            mission: 'Misson test',
            rocket: 'Rocket 24h', 
            target: 'Nasa',
            launchDate: 'abc 27, 2035'
        }
        const respone = await request(app).post('/launches').send(newLaunch);
        expect(respone.statusCode).toBe(400);
    })

    it('should return status code 200 for DELETE /launches/:id ',async () => {
        const launchId = 100;
        const respone = await request(app).delete(`/launches/${launchId}`);
        expect(respone.statusCode).toBe(200);
    })

    it('should return status code 404 for DELETE /launches/:id when id not found ',async () => {
        const launchId = 1002;
        const respone = await request(app).delete(`/launches/${launchId}`);
        expect(respone.statusCode).toBe(404);
    })

})
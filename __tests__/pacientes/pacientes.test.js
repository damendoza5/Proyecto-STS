const app = require('../../app');
const supertest = require("supertest");
describe('Tst suite de api v1 pacientes endpoint', () =>{
    it("GET /api/v1/pacientes/", async () => {
        await supertest(app).get('/api/v1/pacientes')
        .set({apitoken:'1302c06a-755d-4dc0-996a-9c221a125120'})
        .expect(200);
    })
});
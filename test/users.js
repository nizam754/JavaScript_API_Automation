import supertest from 'supertest';
const request = supertest('https://gorest.co.in/public-api/');

import {expect} from 'chai';

const TOKEN = 'c02177b60339dcc1d981da685bdfd5a6546606e03d3c158b99d2d686c7fd4e40';

describe('Users', () => {
    it('GET /users', (done) => {
        request.get(`users?access-token=${TOKEN}`).end((err, res) => {
            //console.log(err);
            //console.log(res.body);
            expect(res.body.data).to.not.be.empty;
            done();
        });
    });
});
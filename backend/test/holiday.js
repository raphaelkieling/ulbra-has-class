const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('../config/express');

chai.use(chaiHttp);

let token;
let idCreated;

describe('Holiday', () => {
    it('Should login with an user', done => {
        chai.request(app)
            .post("/api/v1/user/auth")
            .send({
                username: "adm",
                password: "adm"
            })
            .end((err, res) => {
                let tokenBody = res.body.token;
                if (tokenBody) token = tokenBody;

                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object')
                done();
            })

    }),
        it('Should create a Holiday in db', done => {
            chai.request(app)
                .post("/api/v1/holiday")
                .send({
                    dateHoliday: "1998/05/05",
                    description: 231321321
                })
                .set('x-auth', `Bearer ${token}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    idCreated = res.body.id
                    done();
                })
        });
})
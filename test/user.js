const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('../config/express');

chai.use(chaiHttp);

let token;

describe('User', () => {
    it('Should login with a user', done => {
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
        it('Should show an error in create user', done => {
            chai.request(app)
                .post("/api/v1/user/register")
                .send({
                    username: "adm",
                    password: "adm"
                })
                .end((err, res) => {
                    expect(res).to.have.status(500);
                    done();
                })

        }),
        it('Should get a list of users', done => {
            chai.request(app)
                .get("/api/v1/user")
                .set('x-auth', `Bearer ${token}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    done();
                })
        }),
        it('Should get a user with ID', done => {
            chai.request(app)
                .get("/api/v1/user/4a31cc80-4cfb-11e8-a360-353b5e838cbf")
                .set('x-auth', `Bearer ${token}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    done();
                })
        }),
        it('Should get an error in auth requisition with wrong parameters', done => {
            chai.request(app)
                .post("/api/v1/user/auth")
                .send({
                    username: 21331,
                    password: 12
                })
                .end((err, res) => {
                    let tokenBody = res.body.token;
                    if (tokenBody) token = tokenBody;

                    expect(res).to.have.status(400);
                    done();
                })
        })
})
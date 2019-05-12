const app = require('../../app');
const chaiHttp = require('chai-http');
const chai = require('chai');
const expect = chai.expect;
const User = require('../../models/user');

chai.use(chaiHttp);

describe('testiamo la gestione degli utenti',function () {

    it("testiamo la lista di tutti gli utenti ", function (done) {
        chai.request(app)
        .get('/users')
        .end(function (err,res) {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.a('array');
            done();
        });
    });

    it("testiamo l'aggiunta di un nuovo utente ", function (done) {
        let user=  {
            name: "Tiberio",
            surname: "Timperi",
            email: "butterfly01@hotmail.it",
            dateOfBirth: "22-03-2001",
            sex: "Maschio"
        };
        chai.request(app)
        .post('/users')
        .send(user)
        .end(function (err,res) {
            expect(res.status).to.equal(201);
            expect(res.body).to.be.a('object');
            done();
        });
    })

    it('testiamo un utente selezionato per id: ', function (done) {
        let user = new User ({
            name: "Arrigo",
            surname: "Sacchi",
            email: "milanistaDOC@libero.it",
            dateOfBirth: "02-11-1950",
            sex: "Maschio"
        });
        user.save(function (err, data) {
            chai.request(app)
            .get('/users/' + data.id)
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                expect(res.body).to.be.a('object');
                expect(res.body._id).to.equal(data.id);
                done();
            });
        });
    });

    it("testiamo l'eliminazione di un utente ", function (done) {

        const response = { message: 'Utente eliminato correttamente' };

        let user = new User ({
            name: "Pinco",
            surname: "Pallino",
            email: "pinco.pallino@gmail.com",
            dateOfBirth: "13-09-1999",
            sex: "Maschio"
        });
        user.save((err, user) => {
            chai.request(app)
            .del('/users/' + user.id)
            .end((err, res) => {
                expect(res.body).to.be.deep.equal(response);
                expect(res.status).to.equal(200);
                done();
            });
        });
    });

    it('Dovrebbe aggiornare un singolo User cercato per id: PUT', function (done) {
        
        let user = new User ({
            name: "Salvo",
            surname: "Palladino",
            email: "salvo.palladino@gmail.com",
            dateOfBirth: "28-02-1988",
            sex: "Maschio"
        });

        user.save(function (err, data) {
            chai.request(app)
            .put('/users/' + data.id)
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                expect(res.body).to.be.a('object');
                expect(res.body._id).to.equal(data.id);
                done();
            });
        });
    });

})

const chai = require('chai');
const expect = chai.expect;
const User = require('../../models/user');

describe('User.create()', () => {

    after('Delete all users from DB test', async () => {
        await User.deleteMany({});
    
    });

    it('Create new User Document', async () => {
        let newUser=  {
            name: "Tiberio",
            surname: "Timperi",
            email: "butter99@hotmail.it",
            dateOfBirth: "29-06-2012",
            sex: "Maschio"
        };
        const user = await User.create(newUser);
        expect(user).has.property('name', newUser.name);
        expect(user).has.property('surname', newUser.surname);
        expect(user).has.property('email', newUser.email);
        expect(user).has.property('dateOfBirth', newUser.dateOfBirth);
        expect(user).has.property('sex', newUser.sex);
        expect(user).has.property('_id');
    });
});
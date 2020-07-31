import { Document, Schema, Model, model } from 'mongoose';
import * as assert from 'assert';

const schema = new Schema<IPerson>({ firstName: String, lastName: String });

export interface IPerson extends Document {
    firstName: string;
    lastName: string;
    fullName: string;
}

class PersonClass extends Model {
    firstName!: string;
    lastName!: string;

    // `fullName` becomes a virtual
    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }

    set fullName(v) {
        const firstSpace = v.indexOf(' ');
        this.firstName = v.split(' ')[0];
        this.lastName = firstSpace === -1 ? '' : v.substr(firstSpace + 1);
    }

    // `getFullName()` becomes a document method
    getFullName() {
        return `${this.firstName} ${this.lastName}`;
    }

    // `findByFullName()` becomes a static
    static findByFullName(name: string) {
        const firstSpace = name.indexOf(' ');
        const firstName = name.split(' ')[0];
        const lastName = firstSpace === -1 ? '' : name.substr(firstSpace + 1);
        return this.findOne({ firstName, lastName });
    }
}

schema.loadClass(PersonClass);
const Person = model<IPerson>('Person', schema);

(async () => {
    let doc = await Person.create({ firstName: 'Jon', lastName: 'Snow', fullName: 'd' });
    assert.equal(doc.fullName, 'Jon Snow');
    doc.fullName = 'Jon Stark';
    assert.equal(doc.firstName, 'Jon');
    assert.equal(doc.lastName, 'Stark');

    doc = (<any>Person).findByFullName('Jon Snow');
    assert.equal(doc.fullName, 'Jon Snow');
    
})();
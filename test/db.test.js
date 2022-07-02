require('dotenv').config();
const db = require('../db');
const expect = require("chai").expect;

describe('Database', () => {
    describe('Setting Values', () => {
        it('should set the values to database', () => {
            db.set('foo', 'bar');
        });
        it('should get { foo: bar } from database', () => {
            setTimeout(async () => {
                let result = await db.get('foo');
                expect(result).to.equal('bar');
            }, 2000)
        });
    });
    describe('Replacement', () => {
        it('should replace values with new values', () => {
            db.set('foo', 'rab');
        });
        it('should get { foo: rab } from database', () => {
            setTimeout(async () => {
                const result = await db.get('foo');
                expect(result).to.equal('rab');
            }, 2000)

        });
        it('should not get { foo: ger } from database', () => {
            setTimeout(async () => {
                const result = await db.get('foo');
                expect(result).to.not.equal('ger');
            }, 2000)
        })
    });
    describe('Clearing database', () => {
        it('should clear the Database', async () => {
            await db.purge();
        });
        it('should not have any values in Database', async () => {
            const result = await db.getAll();
            expect(result.foo).to.equal(undefined);
        });
    });
});
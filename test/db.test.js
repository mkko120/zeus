require('dotenv').config();
const db = require('../db');
const expect = require("chai").expect;

describe('Database', () => {
    describe('Setting Values', () => {
        it('should set the values to database', async () => {
            await db.set('foo', 'bar');
        });
        it('should get { foo: bar } from database', async () => {
            let result = await db.get('foo');
            expect(result).to.equal('bar');
        });
    });
    describe('Replacement', () => {
        it('should replace values with new values', async () => {
            await db.set('foo', 'rab');
        });
        it('should get { foo: rab } from database', async () => {
            const result = await db.get('foo');
            expect(result).to.equal('rab');
        });
        it('should not get { foo: ger } from database', async () => {
            const result = await db.get('foo');
            expect(result).to.not.equal('ger');
        })
    });
    describe('Clearing database', () => {
        it('should clear the Database', async () => {
            await db.purge();
        });
        it('should not have any values in Database [get]', async () => {
            const result = await db.get('foo');
            expect(result).to.be.null;
        });
        it('should not have any values in Database [getAll]', async () => {
            const result = await db.getAll();
            expect(result.foo).to.be.undefined;
        });
    });
});
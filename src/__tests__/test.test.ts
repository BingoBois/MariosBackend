import DataHandler from '../handler/dataHandler'
import {Item, FoodOrder, User} from '../types/pizzaTypes'
const dataHandler = new DataHandler();

afterAll(() => {
    dataHandler.closeConnection();
});

describe('Marios Pizza Tests', () => {
    test('Throw an error when user does not exist', async (done) => {
        try {
            const login = await dataHandler.login("vikto@sutter", "1234");
        } catch (error) {
            expect(error).toEqual("No such user");
        } finally {
            done();
        }
    });

    test('Throw an error when login email format is wrong', async (done) => {
        try {
            const login = await dataHandler.login("vikto sutter", "1234");
        } catch (error) {
            expect(error).toEqual("Email must be valid");
        } finally {
            done();
        }
    });

    test('Throw an error when register email format is wrong', async (done) => {
        try {
            const login = await dataHandler.register({email: "du er maskin", password: "ih no"});
        } catch (error) {
            expect(error).toEqual("Email must be valid");
        } finally {
            done();
        }
    });

    test("Trying to get orders while not being granted", async (done) => {
        try{
            const orders = await dataHandler.getOrders("sutmig");
        }catch(err){
            expect(err).toEqual("Invalid Token");
        } finally{
            done();
        }
    });

    test("Successfully getting orders", async (done) => {
        try{
            const user = await dataHandler.login("vikto@live.com", "sutmig");
            if(user.token){
                const orders = await dataHandler.getOrders(user.token);
            }
        }catch(err){
            expect(err).toEqual(null);
        } finally{
            done();
        }
    });

    test("Successfully getting orders", async (done) => {
        try{
            const user = await dataHandler.login("vikto@live.com", "sutmig");
            if(user.token){
                const orders = await dataHandler.getOrders(user.token);
                expect(orders.length).toBeGreaterThan(0);
            }
        }catch(err){
            
        } finally{
            done();
        }
    });

    test("Verify that orders can be created", async (done) => {
            
    })
})

var Test = require('../config/testConfig.js');
var BigNumber = require('bignumber.js');

contract('ExerciseC6B', async (accounts) => {

  var config;
  before('setup contract', async () => {
    config = await Test.Config(accounts);
  });

  it('contract owner has 1,000,000 AWSM tokens', async () => {
    
    // ARRANGE
    let caller = accounts[0]; 

    // ACT
    let result = await config.exerciseC6B.balanceOf.call(caller);

    // ASSERT
    assert.equal(result.toNumber(), new BigNumber(1000000).toNumber(), "Contract owner initial tokens incorrect");

  });

  it('can buy AWSM tokens', async () => {
    
    // ARRANGE
    let buyer = accounts[1]; 
    let tokenPrice = (new BigNumber(10)).pow(9);
    let buy = 1;

    // ACT
    await config.exerciseC6B.buy(buyer, { value: buy * tokenPrice });
    let result = await config.exerciseC6B.balanceOf.call(buyer);

    // ASSERT
    assert.equal(result.toNumber(), buy, "Incorrect tokens for buy() transaction ");

  });
});

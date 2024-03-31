module.exports = {
  randomProductId: function(context, events, done) {
    // Generate a random product ID from 1 to 1,000,000
    const productId = Math.floor(Math.random() * 1000000) + 1;
    // Set the generated product ID in the context
    context.vars.productId = productId;
    // Call the done() function to indicate completion
    return done();
  }
};
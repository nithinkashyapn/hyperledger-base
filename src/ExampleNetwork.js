var fabricClient = require('./Config/FabricClient');
// var FabricCAClient = require('./Config/FabricCAClient');

class ExampleNetwork {

  constructor(userName) {
    this.currentUser;
    this.issuer;
    this.userName = userName;
    this.connection = fabricClient;
  }

  init() {

    console.log("Inside Init of Example Network");

    var isAdmin = false;
    if (this.userName == "admin") {
      isAdmin = true;
    }
    return this.connection.initCredentialStores().then(() => {
      return this.connection.getUserContext(this.userName, true)
    }).then((user) => {
      this.issuer = user;
      if (isAdmin) {
        return user;
      }
      return this.ping();
    }).then((user) => {
      this.currentUser = user;
      return user;
    })
  }

   sell(data) {

    console.log("Inside Sell of Example Network");

    console.log(this.connection.newTransactionID());

    var tx_id = this.connection.newTransactionID();

    var requestData = {
      fcn: 'createProduct',
      args: [data.from, data.to, data.product, data.quantity],
      txId: tx_id
    };

    console.log(requestData);

    var request = FabricModel.requestBuild(requestData);
    return this.connection.submitTransaction(request);
  }
}

module.exports = ExampleNetwork;
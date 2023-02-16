const main = async () => {
    const feedbackContractFactory = await hre.ethers.getContractFactory("FeedBack");
    const feedbackContract = await feedbackContractFactory.deploy();
    await feedbackContract.deployed();
    console.log("Contract addy:", feedbackContract.address);
  
    let feedbackCount;
    feedbackCount = await feedbackContract.getTotalFeedback();
    console.log(feedbackCount.toNumber());
  
    /**
     * Let's send a few waves!
     */
    let feedbackTxn = await feedbackContract.newFeedback("A message!");
    await feedbackTxn.wait(); // Wait for the transaction to be mined
  
    const [_, randomPerson] = await hre.ethers.getSigners();
    feedbackTxn = await feedbackContract.connect(randomPerson).newFeedback("Another message!");
    await feedbackTxn.wait(); // Wait for the transaction to be mined
  
    let allFeedbacks = await feedbackContract.getAllFeedback();
    console.log(allFeedbacks);
  };
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  
  runMain();
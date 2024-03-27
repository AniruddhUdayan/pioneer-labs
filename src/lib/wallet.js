 const connectWallet = async () => {
    if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          const account = accounts[0];
          alert(`Connected: ${account}`);
        } catch (error) {
          console.error("Error connecting to MetaMask", error);
          alert("Error connecting to MetaMask");
        }
      } else {
        alert("Please install MetaMask!");
      }
 }

 export { connectWallet };
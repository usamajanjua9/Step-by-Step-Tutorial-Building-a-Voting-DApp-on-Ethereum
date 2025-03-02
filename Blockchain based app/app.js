// ✅ Ensure Web3 is loaded
if (typeof Web3 === "undefined") {
    alert("⚠️ Web3.js is not loaded! Please check your internet connection or Web3 provider.");
    throw new Error("❌ Web3.js is not defined.");
}

// ✅ Initialize Web3
const web3 = new Web3(window.ethereum);
const contractAddress = "0xaDEB4B29d82a8D7255018B797eE216b641a63201"; // Replace with your actual contract address
const contractABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "pollId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "question",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string[]",
				"name": "options",
				"type": "string[]"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "deadline",
				"type": "uint256"
			}
		],
		"name": "PollCreated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "pollId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "optionIndex",
				"type": "uint256"
			}
		],
		"name": "Voted",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_question",
				"type": "string"
			},
			{
				"internalType": "string[]",
				"name": "_options",
				"type": "string[]"
			},
			{
				"internalType": "uint256",
				"name": "_duration",
				"type": "uint256"
			}
		],
		"name": "createPoll",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_pollId",
				"type": "uint256"
			}
		],
		"name": "getPoll",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_pollId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_optionIndex",
				"type": "uint256"
			}
		],
		"name": "getVotes",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "pollCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "polls",
		"outputs": [
			{
				"internalType": "string",
				"name": "question",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "deadline",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "exists",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_pollId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_optionIndex",
				"type": "uint256"
			}
		],
		"name": "vote",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

// ✅ Initialize Contract
let contract = new web3.eth.Contract(contractABI, contractAddress);
let userAccount = null;

// ✅ Connect Wallet & Load Polls
async function connectWallet() {
    try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        userAccount = accounts[0];
        document.getElementById("walletAddress").textContent = userAccount;
        console.log("✅ Connected wallet:", userAccount);
        await loadPolls(); // Load polls after connecting wallet
    } catch (error) {
        alert(`Error connecting to MetaMask: ${error.message}`);
    }
}

// ✅ Auto-connect wallet on page load
window.addEventListener("load", connectWallet);

// ✅ Create a New Poll
async function createPoll() {
    try {
        if (!userAccount) return alert("⚠️ Please connect your wallet first!");

        const question = document.getElementById("question").value;
        const option1 = document.getElementById("option1").value;
        const option2 = document.getElementById("option2").value;
        const duration = document.getElementById("duration").value;

        if (!question || !option1 || !option2 || !duration) {
            alert("⚠️ All fields are required.");
            return;
        }

        const options = [option1, option2];

        console.log("📢 Creating poll:", { question, options, duration });

        await contract.methods.createPoll(question, options, duration).send({ from: userAccount });

        alert("🎉 Poll Created Successfully!");
        await loadPolls(); // Reload polls after creation
    } catch (error) {
        alert("Error creating poll. Check console.");
        console.error("❌ Error creating poll:", error);
    }
}

// ✅ Load Polls into Dropdowns
async function loadPolls() {
    try {
        console.log("📢 Loading polls...");

        const pollCount = await contract.methods.pollCount().call();
        console.log(`📊 Total polls: ${pollCount}`);

        const pollSelect = document.getElementById("pollSelect");
        const votePollSelect = document.getElementById("votePollSelect");

        // Clear existing options
        pollSelect.innerHTML = `<option value="">Select a Poll</option>`;
        votePollSelect.innerHTML = `<option value="">Select a Poll</option>`;

        for (let i = 0; i < pollCount; i++) {
            const poll = await contract.methods.getPoll(i).call();

            if (poll[0]) {
                console.log(`🗳️ Poll ${i}:`, poll);

                const pollOption = new Option(poll[0], i);
                pollSelect.add(pollOption);
                votePollSelect.add(pollOption.cloneNode(true));
            }
        }
    } catch (error) {
        console.error("❌ Error loading polls:", error);
    }
}

// ✅ Handle Poll Selection
document.getElementById("votePollSelect").addEventListener("change", async function () {
    const pollId = this.value;
    const voteOptionSelect = document.getElementById("voteOptionSelect");

    voteOptionSelect.innerHTML = `<option value="">Select an Option</option>`; // Reset options

    if (pollId) {
        try {
            const poll = await contract.methods.getPoll(pollId).call();
            poll[1].forEach((option, index) => {
                const optElement = new Option(option, index);
                voteOptionSelect.add(optElement);
            });
        } catch (error) {
            console.error("❌ Error fetching poll options:", error);
        }
    }
});

// ✅ Vote in a Poll
async function vote() {
    try {
        if (!userAccount) return alert("⚠️ Please connect your wallet first!");

        const pollId = document.getElementById("votePollSelect").value;
        const optionIndex = document.getElementById("voteOptionSelect").value;

        if (!pollId || !optionIndex) {
            alert("⚠️ Please select a Poll and an Option.");
            return;
        }

        console.log(`🗳️ Voting on poll ${pollId}, option ${optionIndex}`);

        await contract.methods.vote(pollId, optionIndex).send({ from: userAccount });

        alert("🎉 Vote Successfully Cast!");
        await loadPolls(); // Reload polls to reflect votes
    } catch (error) {
        alert("Error voting. Check console.");
        console.error("❌ Error voting:", error);
    }
}

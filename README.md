# Step-by-Step-Tutorial-Building-a-Voting-DApp-on-Ethereum
Step-by-Step Tutorial: Building a Voting DApp on Ethereum

```md
# 🗳 Blockchain Voting DApp
A **full-stack decentralized voting application** built with **Solidity, Node.js, Express.js, and Web3.js**.  
Supports **MetaMask**, works on **desktop & mobile**, and runs on **Ethereum Sepolia Testnet**. 🚀  

---

## **📌 Features**
✅ **Create Polls** with multiple options  
✅ **Vote** securely using blockchain transactions  
✅ **View Live Results** using Web3.js  
✅ **Works on Mobile & Desktop**  
✅ **No Infura/Alchemy Required** (Direct MetaMask interaction)  
✅ **Fully Responsive UI**  

---

## **🛠 Tech Stack**
| Technology | Usage |
|------------|----------------|
| **Solidity** | Smart contract for voting |
| **Node.js + Express.js** | Backend API |
| **Web3.js** | Blockchain interaction |
| **MetaMask** | Wallet for transactions |
| **MongoDB (Optional)** | Store voting history |

---

## **📌 Setup Guide**
### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/YOUR_USERNAME/Voting-DApp.git
cd Voting-DApp
```

### **2️⃣ Install Dependencies**
```sh
npm install
```

### **3️⃣ Deploy Smart Contract**
1. Open [Remix IDE](https://remix.ethereum.org/)
2. Paste `Voting.sol` contract
3. Compile and **deploy on Sepolia Testnet**
4. Copy the **contract address**
5. Replace `CONTRACT_ADDRESS` in `.env`

### **4️⃣ Configure Backend**
1. **Create `.env` file**  
```sh
PORT=5000
CONTRACT_ADDRESS="YOUR_SMART_CONTRACT_ADDRESS"
INFURA_URL="https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID"
```

2. **Start Backend**  
```sh
node server.js
```

---

## **📌 Running the Frontend**
### **1️⃣ Host Locally**
Simply open `frontend/index.html` in a browser.

### **2️⃣ Host Online for Mobile Access**
| Hosting Platform | Steps |
|----------------|--------------------------------------|
| **GitHub Pages** | Upload `index.html` & `app.js` and enable GitHub Pages |
| **Netlify** | Drag & drop frontend files to deploy |

---

## **📱 Running on Mobile**
1️⃣ **Install MetaMask Mobile**  
2️⃣ **Go to "Browser" tab** in MetaMask  
3️⃣ **Enter DApp URL (GitHub Pages / Netlify)**  
4️⃣ **Connect Wallet & Start Voting! 🎉**  

---

## **📌 API Endpoints**
| Method | Endpoint | Description |
|--------|-------------|-------------|
| GET | `/poll/:id` | Get poll details |
| GET | `/poll/:id/votes` | Get vote count |


---

## **📜 License**
This project is open-source under the **MIT License**.

---

## **📧 Contact**
For questions or contributions, feel free to contact me at:  
🔗 **LinkedIn:** [Dr. Usama Arshad](https://www.linkedin.com/in/usamajanjua9/)  
```

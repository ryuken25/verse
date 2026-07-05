export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
  quiz: QuizQuestion[];
}

export interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  students: string;
  rating: number;
  icon: string;
  color: string;
  prerequisites: string[];
  modules: Module[];
}

export const courses: Course[] = [
  // ═══════════════════════════════════════════════════════════════
  // COURSE 1: INTRODUCTION TO CRYPTO
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'intro-to-crypto',
    title: 'Introduction to Crypto',
    description: 'A beginner-friendly journey through the fundamentals of cryptocurrency, blockchain technology, and digital assets. No prior knowledge required.',
    difficulty: 'Beginner',
    duration: '8 hours',
    students: '12,450',
    rating: 4.8,
    icon: 'BookOpen',
    color: 'from-purple-500 to-indigo-500',
    prerequisites: [],
    modules: [
      // ── Module 1: What is Blockchain? ──
      {
        id: 'what-is-blockchain',
        title: 'What is Blockchain?',
        description: 'Understand the foundational technology behind cryptocurrency and how distributed ledgers work.',
        lessons: [
          {
            id: 'history-of-money',
            title: 'History of Money',
            content: `## The Evolution of Money

Money has been one of humanity's most important inventions, evolving dramatically over thousands of years. Understanding this history helps us grasp why cryptocurrency represents such a significant innovation.

### Barter to Commodity Money
Before money existed, people traded goods directly through barter. A farmer might trade wheat for a blacksmith's tools. However, barter required a "double coincidence of wants" — both parties needed to want what the other had. This limitation drove the creation of commodity money: items with intrinsic value like shells, salt, cattle, and eventually precious metals like gold and silver.

### Metallic Money and Coinage
Around 600 BCE, the kingdom of Lydia (modern-day Turkey) created the first standardized coins from electrum, a natural gold-silver alloy. Coins solved a critical problem: they provided a standardized, portable, and durable medium of exchange. Governments quickly realized they could control money supply by minting coins, establishing the first monetary systems.

### Paper Money and Banking
China's Tang Dynasty (618–907 CE) introduced paper money, originally as receipts for deposited gold and silver. European merchants in the Middle Ages developed banking systems with goldsmiths issuing paper receipts for stored gold. These receipts became the first banknotes — promissory notes backed by physical gold reserves.

### The Gold Standard and Fiat Money
For centuries, currencies were backed by gold reserves (the gold standard). In 1971, President Nixon ended the US dollar's convertibility to gold, creating the modern fiat system. Fiat money — like the US dollar or Euro — has no intrinsic value. Its worth comes from government decree and collective trust.

### Enter Cryptocurrency
In 2008, an anonymous person (or group) named Satoshi Nakamoto published the Bitcoin whitepaper, proposing a digital currency that required no central authority. Bitcoin combined cryptography, distributed computing, and economic incentives to create "electronic peer-to-peer cash." This was the first time in history that money could exist without any trusted intermediary.

### Why It Matters
Each evolution in money addressed limitations of the previous system. Cryptocurrency addresses problems of the fiat system: censorship, inflation, exclusion of unbanked populations, and reliance on trusted third parties. Understanding this trajectory helps explain why millions of people worldwide are adopting digital currencies today.`,
            quiz: [
              {
                question: 'What was the primary limitation of the barter system?',
                options: ['Items were too heavy to carry', 'Double coincidence of wants', 'Governments banned barter', 'People preferred gold'],
                correctIndex: 1,
                explanation: 'The barter system required a "double coincidence of wants" — both parties had to want what the other was offering at the same time. This made trade extremely inefficient.'
              },
              {
                question: 'When were the first standardized coins created?',
                options: ['2000 BCE in Egypt', '600 BCE in Lydia', '100 CE in Rome', '800 CE in China'],
                correctIndex: 1,
                explanation: 'The kingdom of Lydia (modern-day Turkey) created the first standardized coins around 600 BCE from electrum, a natural gold-silver alloy.'
              },
              {
                question: 'What event ended the gold standard for the US dollar?',
                options: ['The Great Depression', 'World War II', 'The Nixon Shock of 1971', 'The 2008 Financial Crisis'],
                correctIndex: 2,
                explanation: 'In 1971, President Nixon suspended the convertibility of the US dollar to gold, an event known as the "Nixon Shock," which created the modern fiat currency system.'
              },
              {
                question: 'What gives fiat money its value?',
                options: ['Gold reserves in government vaults', 'Government decree and collective trust', 'The paper it is printed on', 'International treaties'],
                correctIndex: 1,
                explanation: 'Fiat money has no intrinsic value — it derives its worth from government decree (legal tender laws) and the collective trust of the people who use it.'
              }
            ]
          },
          {
            id: 'how-blockchain-works',
            title: 'How Blockchain Works',
            content: `## Understanding Blockchain Technology

A blockchain is a distributed, immutable digital ledger that records transactions across a network of computers. Think of it as a shared database that no single entity controls, yet everyone can verify.

### The Basic Structure
A blockchain consists of blocks linked together in chronological order. Each block contains:

- **Transaction Data**: Records of transfers, contracts, or other information
- **Timestamp**: When the block was created
- **Hash**: A unique fingerprint of the block's contents (like a digital signature)
- **Previous Block's Hash**: This is what creates the "chain" — each block references the one before it

If someone tries to alter a transaction in an old block, its hash changes, which breaks the link to the next block. This makes tampering immediately detectable.

### How a Transaction Gets Added
1. **Initiation**: Someone creates a transaction (e.g., "Alice sends 1 BTC to Bob")
2. **Broadcasting**: The transaction is broadcast to the peer-to-peer network
3. **Validation**: Network nodes verify the transaction is legitimate (correct signatures, sufficient balance)
4. **Block Creation**: Valid transactions are grouped into a candidate block
5. **Consensus**: The network agrees on the block through a consensus mechanism (like Proof of Work or Proof of Stake)
6. **Chaining**: The new block is added to the chain with a reference to the previous block
7. **Propagation**: The updated blockchain is distributed across all nodes

### Key Properties
- **Decentralized**: No single point of failure; thousands of nodes maintain copies
- **Immutable**: Once data is recorded, it's practically impossible to alter
- **Transparent**: Anyone can audit the entire transaction history
- **Trustless**: You don't need to trust any individual participant — the math and protocol ensure honesty

### Real-World Example
When you send Bitcoin, no bank processes the transaction. Instead, thousands of computers worldwide independently verify that you own the Bitcoin and haven't already spent it. Once verified, the transaction is permanently recorded. This takes roughly 10 minutes for Bitcoin and about 12 seconds for Ethereum.

### Beyond Finance
While cryptocurrency is the most famous application, blockchain technology is used for supply chain tracking (Walmart tracks food origins), digital identity (self-sovereign identity systems), voting systems, NFTs for digital ownership, and decentralized applications (dApps) that run without central servers.`,
            quiz: [
              {
                question: 'What links blocks together in a blockchain?',
                options: ['Digital signatures from miners', 'The previous block\'s hash', 'Timestamps only', 'Transaction amounts'],
                correctIndex: 1,
                explanation: 'Each block contains the hash of the previous block, creating a chain. If any data in a previous block is altered, its hash changes, breaking the chain and making tampering immediately detectable.'
              },
              {
                question: 'What does "trustless" mean in the context of blockchain?',
                options: ['The system cannot be trusted', 'No one uses the system', 'You don\'t need to trust individual participants — the protocol ensures honesty', 'All transactions are anonymous'],
                correctIndex: 2,
                explanation: '"Trustless" means the system works without requiring trust in any individual party. The cryptographic proofs and consensus mechanisms ensure that transactions are valid without relying on any trusted intermediary.'
              },
              {
                question: 'Which property makes it practically impossible to alter recorded blockchain data?',
                options: ['Transparency', 'Decentralization', 'Immutability', 'Speed'],
                correctIndex: 2,
                explanation: 'Immutability is the property that makes blockchain data practically impossible to alter once recorded. Changing any data would require re-computing all subsequent blocks and controlling the majority of the network.'
              },
              {
                question: 'How long does it typically take for a Bitcoin transaction to be confirmed?',
                options: ['About 12 seconds', 'About 1 minute', 'About 10 minutes', 'About 1 hour'],
                correctIndex: 2,
                explanation: 'Bitcoin produces a new block approximately every 10 minutes. A transaction is typically confirmed once it is included in a block, which means the average confirmation time is around 10 minutes.'
              }
            ]
          },
          {
            id: 'consensus-mechanisms',
            title: 'Consensus Mechanisms',
            content: `## How Networks Agree: Consensus Mechanisms

A consensus mechanism is the process by which a blockchain network agrees on the current state of the ledger. Since there is no central authority, the network needs rules for determining which transactions are valid and in what order they occurred.

### The Byzantine Generals Problem
This famous computer science problem illustrates the challenge: imagine several generals surrounding a city who must agree on whether to attack or retreat. They can only communicate by messenger, and some generals might be traitors. How do loyal generals reach agreement despite potential traitors? Blockchain consensus mechanisms solve this problem for digital networks.

### Proof of Work (PoW)
Used by Bitcoin, Proof of Work requires miners to solve complex mathematical puzzles. The first miner to find the solution gets to add the next block and receives a reward (currently 3.125 BTC).

**How it works:**
- Miners compete to find a number (nonce) that, when combined with block data and hashed, produces a result below a target threshold
- This requires enormous computational power — Bitcoin uses more electricity than many countries
- The difficulty adjusts every 2,016 blocks (~2 weeks) to maintain ~10-minute block times

**Pros**: Extremely secure, battle-tested since 2009, fully decentralized
**Cons**: Energy-intensive, slow transaction throughput, expensive hardware requirements

### Proof of Stake (PoS)
Used by Ethereum (since "The Merge" in September 2022), Cardano, and Solana, Proof of Stake selects validators based on how much cryptocurrency they have "staked" (locked up as collateral).

**How it works:**
- Validators lock up tokens as a security deposit
- The protocol pseudo-randomly selects a validator to propose the next block
- Other validators attest to the block's validity
- Honest validators earn rewards; dishonest ones lose their stake ("slashing")

**Pros**: ~99.95% less energy than PoW, faster transactions, lower barrier to entry
**Cons**: Potential wealth concentration, "nothing at stake" concerns, less battle-tested

### Other Consensus Mechanisms
- **Delegated Proof of Stake (DPoS)**: Token holders vote for delegates who validate transactions (EOS, Tron)
- **Proof of Authority (PoA)**: Pre-approved validators with known identities (private/consortium chains)
- **Proof of History (PoH)**: Solana's innovation that creates a verifiable time sequence before consensus

### Why It Matters
The consensus mechanism determines a blockchain's security, speed, cost, and degree of decentralization. Understanding these trade-offs helps you evaluate different blockchain projects and their suitability for various applications.`,
            quiz: [
              {
                question: 'What problem do consensus mechanisms solve?',
                options: ['How to encrypt transactions', 'How to reach agreement without a central authority', 'How to create new tokens', 'How to speed up the internet'],
                correctIndex: 1,
                explanation: 'Consensus mechanisms solve the problem of how distributed network participants can agree on the state of the ledger without needing a trusted central authority.'
              },
              {
                question: 'How are miners rewarded in Proof of Work?',
                options: ['Transaction fees only', 'Newly created coins and transaction fees', 'Governance voting rights', 'Free network access'],
                correctIndex: 1,
                explanation: 'In Proof of Work, miners receive both a block reward (newly minted coins) and the transaction fees from all transactions included in the block they mine.'
              },
              {
                question: 'What is "slashing" in Proof of Stake systems?',
                options: ['A way to reduce gas fees', 'Cutting block sizes in half', 'Penalizing dishonest validators by taking their staked tokens', 'Splitting the blockchain into shards'],
                correctIndex: 2,
                explanation: 'Slashing is a penalty mechanism in PoS systems where validators who act dishonestly have part or all of their staked tokens destroyed, incentivizing honest behavior.'
              },
              {
                question: 'Approximately how much less energy does Proof of Stake use compared to Proof of Work?',
                options: ['50% less', '75% less', '90% less', '99.95% less'],
                correctIndex: 3,
                explanation: 'When Ethereum transitioned from PoW to PoS in "The Merge" (September 2022), it reduced its energy consumption by approximately 99.95%.'
              }
            ]
          }
        ]
      },
      // ── Module 2: Bitcoin Basics ──
      {
        id: 'bitcoin-basics',
        title: 'Bitcoin Basics',
        description: 'Learn the fundamentals of Bitcoin — the original cryptocurrency that started it all.',
        lessons: [
          {
            id: 'what-is-bitcoin',
            title: 'What is Bitcoin',
            content: `## Bitcoin: Digital Gold

Bitcoin (BTC) is the world's first and most valuable cryptocurrency. Created in 2009 by the pseudonymous Satoshi Nakamoto, it introduced the concept of digital money that works without banks or governments.

### The Origin Story
On October 31, 2008, Satoshi Nakamoto published a nine-page whitepaper titled "Bitcoin: A Peer-to-Peer Electronic Cash System." On January 3, 2009, the genesis block was mined, containing the text: "The Times 03/Jan/2009 Chancellor on brink of second bailout for banks" — a reference to the 2008 financial crisis that inspired Bitcoin's creation.

### Key Properties
- **Fixed Supply**: Only 21 million Bitcoin will ever exist. This scarcity is hard-coded into the protocol and makes Bitcoin deflationary by design.
- **Decentralized**: No company, government, or individual controls Bitcoin. It is maintained by thousands of nodes worldwide.
- **Pseudonymous**: Transactions are linked to addresses (strings of letters and numbers), not personal identities.
- **Divisible**: Each Bitcoin can be divided into 100 million units called satoshis (sats). You can start with as little as $1 worth.
- **Borderless**: Send Bitcoin to anyone, anywhere in the world, 24/7/365, without permission from any bank or government.

### How to Acquire Bitcoin
1. **Exchanges**: Platforms like Coinbase, Kraken, or Binance let you buy Bitcoin with fiat currency
2. **Peer-to-Peer**: Direct trades with other individuals through platforms like Bisq or HodlHodl
3. **Bitcoin ATMs**: Physical kiosks where you can buy Bitcoin with cash
4. **Mining**: Running specialized hardware to process transactions and earn Bitcoin rewards
5. **Earning**: Accepting Bitcoin as payment for goods or services

### Store of Value Thesis
Many proponents view Bitcoin as "digital gold" — a hedge against inflation and monetary policy uncertainty. Unlike gold, Bitcoin is easily divisible, verifiable, transportable (you can carry billions of dollars in your memory with a seed phrase), and has a perfectly predictable supply schedule.

### The Lightning Network
Bitcoin's base layer processes about 7 transactions per second. The Lightning Network is a Layer 2 solution built on top of Bitcoin that enables near-instant, nearly free transactions. It is like building a highway system on top of local roads for fast, high-volume traffic.`,
            quiz: [
              {
                question: 'What is the maximum number of Bitcoin that will ever exist?',
                options: ['1 million', '10 million', '21 million', '100 million'],
                correctIndex: 2,
                explanation: 'Bitcoin has a hard cap of 21 million coins, written into its protocol. This fixed supply is one of the key properties that makes Bitcoin deflationary.'
              },
              {
                question: 'What was embedded in Bitcoin\'s genesis block?',
                options: ['A map of the internet', 'A newspaper headline about bank bailouts', 'Satoshi Nakamoto\'s real name', 'The Bitcoin whitepaper'],
                correctIndex: 1,
                explanation: 'The genesis block contained the text "The Times 03/Jan/2009 Chancellor on brink of second bailout for banks" — a newspaper headline referencing the 2008 financial crisis.'
              },
              {
                question: 'What is a satoshi?',
                options: ['Bitcoin\'s creator', 'The smallest unit of Bitcoin (0.00000001 BTC)', 'A type of Bitcoin wallet', 'A Bitcoin mining algorithm'],
                correctIndex: 1,
                explanation: 'A satoshi is the smallest divisible unit of Bitcoin, equal to 0.00000001 BTC (one hundred millionth of a Bitcoin). Named after Satoshi Nakamoto.'
              },
              {
                question: 'What is the Lightning Network?',
                options: ['Bitcoin\'s consensus mechanism', 'A Layer 2 solution for fast, cheap Bitcoin transactions', 'Bitcoin\'s mining hardware', 'A Bitcoin exchange'],
                correctIndex: 1,
                explanation: 'The Lightning Network is a Layer 2 protocol built on top of Bitcoin that enables near-instant, nearly free transactions by creating payment channels between users.'
              }
            ]
          },
          {
            id: 'how-bitcoin-transactions-work',
            title: 'How Transactions Work',
            content: `## Inside a Bitcoin Transaction

Understanding how Bitcoin transactions work under the hood gives you a deeper appreciation of this technology and helps you use it more effectively.

### The UTXO Model
Bitcoin uses an Unspent Transaction Output (UTXO) model rather than an account balance model. Think of UTXOs like individual bills in your wallet. If you have a $20 bill and want to pay $13, you give the $20 and receive $7 in change. Similarly, if you have a UTXO worth 1 BTC and want to send 0.3 BTC, you spend the 1 BTC UTXO, sending 0.3 BTC to the recipient and 0.7 BTC (minus fees) back to yourself as a new UTXO.

### Anatomy of a Transaction
Every Bitcoin transaction contains:
- **Inputs**: References to previous UTXOs you are spending (where the money comes from)
- **Outputs**: New UTXOs being created (where the money goes)
- **Amount**: The value being transferred
- **Script**: A small program that defines the conditions for spending the output
- **Transaction Fee**: The difference between input and output values (paid to miners)

### Transaction Lifecycle
1. **Creation**: Your wallet constructs a transaction using your available UTXOs
2. **Signing**: You digitally sign the transaction with your private key, proving ownership
3. **Broadcasting**: The transaction is sent to the Bitcoin network
4. **Verification**: Nodes check that inputs are unspent, signatures are valid, and amounts balance
5. **Mempool**: Valid transactions wait in the "memory pool" for miners to include in a block
6. **Mining**: A miner includes your transaction in a block and solves the proof-of-work puzzle
7. **Confirmation**: Once the block is added, your transaction has 1 confirmation (6 confirmations are considered fully settled)

### Transaction Fees
Fees are determined by transaction size in bytes (not amount sent) and network congestion. During busy periods, fees rise as users compete for limited block space. Typical fees range from $0.50 to $5 but can spike during high demand.

### Practical Tips
- **Wait for confirmations**: For large amounts, wait for 3-6 confirmations before considering the payment final
- **Check the mempool**: Sites like mempool.space show current fee rates and congestion levels
- **Use SegWit addresses**: Segregated Witness addresses (starting with bc1 or 3) reduce transaction sizes and fees
- **Batch transactions**: If sending to multiple recipients, batching saves fees`,
            quiz: [
              {
                question: 'What model does Bitcoin use to track ownership?',
                options: ['Account balance model', 'UTXO (Unspent Transaction Output) model', 'Database ledger model', 'Credit-debit model'],
                correctIndex: 1,
                explanation: 'Bitcoin uses the UTXO model, where transactions consume previous unspent outputs and create new ones. Think of it like spending bills and receiving change.'
              },
              {
                question: 'How many confirmations are generally considered fully settled for a Bitcoin transaction?',
                options: ['1', '3', '6', '12'],
                correctIndex: 2,
                explanation: '6 confirmations are generally considered fully settled because the probability of a transaction being reversed after 6 blocks is astronomically low.'
              },
              {
                question: 'What determines Bitcoin transaction fees?',
                options: ['The amount being sent', 'The transaction size in bytes and network congestion', 'The time of day', 'Your wallet provider'],
                correctIndex: 1,
                explanation: 'Bitcoin transaction fees are based on the transaction size in bytes (not the amount sent) and current network congestion.'
              },
              {
                question: 'What is the mempool?',
                options: ['Bitcoin\'s mining hardware', 'Where unconfirmed transactions wait to be included in a block', 'The Bitcoin blockchain itself', 'A type of Bitcoin wallet'],
                correctIndex: 1,
                explanation: 'The mempool (memory pool) is where valid, unconfirmed transactions wait to be picked up by miners and included in a block.'
              }
            ]
          },
          {
            id: 'mining-and-halving',
            title: 'Mining & Halving',
            content: `## Bitcoin Mining and the Halving

Bitcoin mining is the process that secures the network, validates transactions, and creates new bitcoins. The halving is a built-in mechanism that controls Bitcoin's supply schedule.

### What is Mining?
Mining is the competitive process of adding new blocks to the Bitcoin blockchain. Miners use specialized hardware (ASICs — Application-Specific Integrated Computers) to repeatedly guess random numbers (nonces) until they find one that produces a hash meeting the network's difficulty target.

**The process:**
1. Collect pending transactions from the mempool
2. Organize them into a candidate block
3. Repeatedly hash the block data with different nonces
4. When a valid hash is found, broadcast the block to the network
5. Other nodes verify and accept the block
6. The miner receives the block reward + transaction fees

### Mining Economics
Mining requires significant investment in hardware and electricity. Key metrics:
- **Hash Rate**: How many guesses per second your hardware can compute (measured in TH/s, PH/s, or EH/s)
- **Difficulty**: A network-wide measure that adjusts every 2,016 blocks to maintain ~10-minute block times
- **Electricity Cost**: Mining's primary ongoing expense — miners seek the cheapest power sources
- **Block Reward**: Currently 3.125 BTC per block (as of 2024)

### The Halving
Every 210,000 blocks (approximately 4 years), the block reward is cut in half. This is called the "halving."

**Historical halvings:**
- 2009: 50 BTC per block (genesis)
- 2012: 25 BTC per block (first halving)
- 2016: 12.5 BTC per block
- 2020: 6.25 BTC per block
- 2024: 3.125 BTC per block
- ~2028: 1.5625 BTC per block (next halving)

### Why the Halving Matters
The halving reduces the rate of new Bitcoin supply entering the market, creating a supply shock. Historically, Bitcoin's price has increased significantly in the 12-18 months following each halving, though past performance does not guarantee future results.

### Mining's Environmental Debate
Bitcoin mining's energy consumption is a controversial topic. Critics point to its carbon footprint; proponents argue that mining increasingly uses renewable energy and stranded energy. The Bitcoin Mining Council estimates that over 58% of Bitcoin mining uses sustainable energy sources.`,
            quiz: [
              {
                question: 'What is the current Bitcoin block reward (as of 2024)?',
                options: ['50 BTC', '6.25 BTC', '3.125 BTC', '12.5 BTC'],
                correctIndex: 2,
                explanation: 'After the April 2024 halving, the block reward was reduced from 6.25 BTC to 3.125 BTC.'
              },
              {
                question: 'How often does the Bitcoin halving occur?',
                options: ['Every year', 'Every 2 years', 'Every 4 years (approximately)', 'Every 10 years'],
                correctIndex: 2,
                explanation: 'The halving occurs every 210,000 blocks, which is approximately every 4 years. It cuts the block reward in half.'
              },
              {
                question: 'What is the purpose of Bitcoin mining?',
                options: ['To create graphics for NFTs', 'To secure the network, validate transactions, and create new bitcoins', 'To encrypt user data', 'To store blockchain backups'],
                correctIndex: 1,
                explanation: 'Bitcoin mining serves three purposes: securing the network through Proof of Work, validating and ordering transactions, and distributing newly created bitcoins.'
              },
              {
                question: 'When is the last Bitcoin expected to be mined?',
                options: ['2040', '2080', '2140', '2200'],
                correctIndex: 2,
                explanation: 'Due to the halving mechanism, the last bitcoin (the last satoshi) is expected to be mined around the year 2140.'
              }
            ]
          }
        ]
      },
      // ── Module 3: Ethereum & Smart Contracts ──
      {
        id: 'ethereum-smart-contracts',
        title: 'Ethereum & Smart Contracts',
        description: 'Explore the world\'s leading smart contract platform and understand how programmable blockchain works.',
        lessons: [
          {
            id: 'what-is-ethereum',
            title: 'What is Ethereum',
            content: `## Ethereum: The World Computer

Ethereum is the second-largest cryptocurrency by market capitalization and the most actively used blockchain for decentralized applications. While Bitcoin was designed as digital money, Ethereum was designed as a programmable platform.

### Vitalik's Vision
In 2013, 19-year-old Vitalik Buterin proposed Ethereum after recognizing that blockchain technology could do far more than just transfer money. He envisioned a "world computer" — a global, decentralized platform where anyone could build applications that run exactly as programmed.

### How Ethereum Differs from Bitcoin
- **Primary Purpose**: Bitcoin = Digital money; Ethereum = Programmable platform
- **Programming**: Bitcoin has limited scripting; Ethereum has a full Turing-complete language (Solidity)
- **Supply**: Bitcoin is fixed at 21 million; Ethereum has no hard cap (but is deflationary post-EIP-1559)
- **Consensus**: Bitcoin uses Proof of Work; Ethereum uses Proof of Stake
- **Block Time**: Bitcoin ~10 minutes; Ethereum ~12 seconds

### Ether (ETH) — The Native Currency
ETH is Ethereum's native cryptocurrency. It is used to:
- **Pay for transactions**: Every operation on Ethereum requires gas (paid in ETH)
- **Stake for security**: Validators must stake 32 ETH to participate in consensus
- **Store value**: ETH is the second-largest cryptocurrency by market cap
- **Access DeFi**: ETH is the primary collateral in decentralized finance applications

### Ethereum's Ecosystem
Ethereum hosts thousands of decentralized applications including DeFi (Uniswap, Aave, MakerDAO), NFTs (OpenSea), DAOs, and Layer 2 scaling solutions (Arbitrum, Optimism, Base).

### The Merge and Beyond
In September 2022, Ethereum transitioned from Proof of Work to Proof of Stake ("The Merge"), reducing energy consumption by ~99.95%. Future upgrades include danksharding for massive scalability improvements.`,
            quiz: [
              {
                question: 'Who proposed Ethereum?',
                options: ['Satoshi Nakamoto', 'Vitalik Buterin', 'Charles Hoskinson', 'Gavin Wood'],
                correctIndex: 1,
                explanation: 'Vitalik Buterin proposed Ethereum in 2013 at age 19, envisioning a programmable blockchain platform.'
              },
              {
                question: 'What consensus mechanism does Ethereum currently use?',
                options: ['Proof of Work', 'Proof of Stake', 'Delegated Proof of Stake', 'Proof of Authority'],
                correctIndex: 1,
                explanation: 'Ethereum transitioned to Proof of Stake in September 2022 during "The Merge," reducing its energy consumption by approximately 99.95%.'
              },
              {
                question: 'What is ETH primarily used for on Ethereum?',
                options: ['Only as a store of value', 'Paying for gas/transactions, staking, and DeFi collateral', 'Mining rewards only', 'Voting in elections'],
                correctIndex: 1,
                explanation: 'ETH serves multiple purposes: paying gas fees, staking to secure the network, and serving as the primary collateral asset in DeFi applications.'
              },
              {
                question: 'What is Ethereum\'s approximate block time?',
                options: ['10 minutes', '1 minute', '12 seconds', '1 second'],
                correctIndex: 2,
                explanation: 'Ethereum produces a new block approximately every 12 seconds, enabling much faster transaction confirmations than Bitcoin.'
              }
            ]
          },
          {
            id: 'smart-contracts-explained',
            title: 'Smart Contracts Explained',
            content: `## Smart Contracts: Self-Executing Agreements

Smart contracts are programs stored on a blockchain that automatically execute when predetermined conditions are met. They are the foundation of all decentralized applications.

### The Concept
Nick Szabo first proposed smart contracts in 1994 using the analogy of a vending machine. A vending machine is a simple "smart contract": you insert money, select an item, and the machine automatically delivers it. No human intermediary needed. Blockchain smart contracts extend this concept to any digital agreement.

### How They Work
A smart contract is written in code (typically Solidity for Ethereum) and deployed to the blockchain. Once deployed, it:
1. Lives at a specific address on the blockchain
2. Has functions that can be called by users or other contracts
3. Maintains its own storage (state)
4. Executes deterministically — the same inputs always produce the same outputs
5. Cannot be altered once deployed (immutable)
6. Runs on every node in the network for verification

### Real-World Examples
- **Insurance**: A crop insurance smart contract could automatically pay farmers if weather data shows rainfall below a threshold
- **Escrow**: A smart contract holds the buyer's payment and releases it only when both parties confirm conditions are met
- **Voting**: A DAO smart contract allows token holders to vote on proposals with automatic execution
- **Supply Chain**: A smart contract tracks products from manufacturer to consumer with an immutable audit trail

### Limitations
- **Immutability is a double-edged sword**: Bugs cannot be easily fixed after deployment
- **Oracle problem**: Smart contracts cannot access off-chain data directly — they need oracles like Chainlink
- **Scalability**: Complex contracts can be expensive to execute during network congestion
- **Legal status**: Smart contracts are not legally recognized in most jurisdictions

### The "Code is Law" Debate
Smart contracts execute exactly as written. This was demonstrated in the 2016 DAO hack, where an attacker exploited a code vulnerability to drain $60 million. The Ethereum community controversially hard-forked to reverse the hack.`,
            quiz: [
              {
                question: 'Who first proposed the concept of smart contracts?',
                options: ['Vitalik Buterin', 'Satoshi Nakamoto', 'Nick Szabo', 'Hal Finney'],
                correctIndex: 2,
                explanation: 'Nick Szabo first proposed smart contracts in 1994, long before blockchain technology existed.'
              },
              {
                question: 'What does it mean that smart contracts are "deterministic"?',
                options: ['They can be updated anytime', 'The same inputs always produce the same outputs', 'They only work during business hours', 'They require human approval'],
                correctIndex: 1,
                explanation: 'Deterministic means that given the same inputs, a smart contract will always produce the same output on every node in the network.'
              },
              {
                question: 'What is the "oracle problem" in smart contracts?',
                options: ['Smart contracts are too expensive', 'Smart contracts cannot access off-chain data directly', 'Smart contracts are too slow', 'Smart contracts cannot handle money'],
                correctIndex: 1,
                explanation: 'Smart contracts cannot access real-world data on their own. They need oracles (services like Chainlink) to feed external data into the blockchain.'
              },
              {
                question: 'What programming language is primarily used to write Ethereum smart contracts?',
                options: ['JavaScript', 'Python', 'Solidity', 'Rust'],
                correctIndex: 2,
                explanation: 'Solidity is the primary programming language for writing Ethereum smart contracts.'
              }
            ]
          },
          {
            id: 'gas-fees',
            title: 'Gas Fees',
            content: `## Understanding Gas Fees

Gas is the fuel that powers the Ethereum network. Every operation — from a simple ETH transfer to a complex DeFi transaction — requires gas to execute.

### What is Gas?
Gas measures the computational effort required to perform operations on Ethereum. Each operation has a fixed gas cost:
- Simple ETH transfer: 21,000 gas
- ERC-20 token transfer: ~65,000 gas
- Swapping on Uniswap: ~150,000-300,000 gas
- Minting an NFT: ~100,000-200,000 gas

### How Gas Fees Are Calculated
After the London upgrade (EIP-1559, August 2021), gas fees work as follows:

**Total Fee = Gas Units x (Base Fee + Priority Fee)**

- **Gas Units**: The amount of computational work (e.g., 21,000 for a simple transfer)
- **Base Fee**: The minimum price per gas unit, set by the network based on demand. This fee is burned (destroyed).
- **Priority Fee (Tip)**: An optional tip to incentivize faster inclusion by validators

For example, if the base fee is 20 gwei and you add a 2 gwei tip: 21,000 x (20 + 2) = 462,000 gwei = 0.000462 ETH

### Gas Fluctuations
Gas prices vary dramatically based on network demand:
- **Low demand** (weekends, off-peak): 5-20 gwei
- **Normal**: 20-50 gwei
- **High demand** (popular NFT mints, market volatility): 100-500+ gwei

### Saving on Gas
1. **Time your transactions**: Use during off-peak hours (weekends, early morning UTC)
2. **Use Layer 2 solutions**: Arbitrum, Optimism, and Base offer 10-100x lower fees
3. **Set gas limits wisely**: Set the maximum you are willing to pay; unused gas is refunded
4. **Use gas tracking tools**: Etherscan Gas Tracker, ultrasound.money

### EIP-1559 and ETH Burn
The London upgrade introduced a base fee that gets burned with every transaction. This means during periods of high activity, more ETH is destroyed than created, making ETH deflationary.`,
            quiz: [
              {
                question: 'What does gas measure on Ethereum?',
                options: ['The amount of ETH in your wallet', 'The computational effort required for operations', 'The speed of your internet connection', 'The number of transactions per block'],
                correctIndex: 1,
                explanation: 'Gas is a unit that measures the computational effort required to execute operations on Ethereum.'
              },
              {
                question: 'What happens to the base fee in EIP-1559?',
                options: ['It goes to miners', 'It is burned (destroyed)', 'It is saved in a treasury', 'It is returned to the sender'],
                correctIndex: 1,
                explanation: 'Under EIP-1559, the base fee is burned (destroyed), reducing the total ETH supply.'
              },
              {
                question: 'Which of these would typically cost the most gas?',
                options: ['Sending ETH to a friend', 'Swapping tokens on Uniswap', 'Checking your balance', 'Connecting your wallet'],
                correctIndex: 1,
                explanation: 'Swapping tokens on a DEX involves multiple smart contract interactions, typically costing 150,000-300,000 gas.'
              },
              {
                question: 'What is the priority fee (tip) used for?',
                options: ['Paying for the transaction amount', 'Incentivizing validators for faster inclusion', 'Funding Ethereum development', 'Paying for wallet services'],
                correctIndex: 1,
                explanation: 'The priority fee (tip) is an optional payment to validators to incentivize them to include your transaction in the next block.'
              }
            ]
          }
        ]
      },
      // ── Module 4: Wallets & Security ──
      {
        id: 'wallets-security',
        title: 'Wallets & Security',
        description: 'Learn how to safely store, manage, and protect your cryptocurrency assets.',
        lessons: [
          {
            id: 'types-of-wallets',
            title: 'Types of Wallets',
            content: `## Cryptocurrency Wallets: Your Gateway to Web3

A cryptocurrency wallet does not actually "store" your coins — your assets live on the blockchain. Instead, a wallet stores your private keys, which prove ownership and allow you to sign transactions.

### Hot Wallets (Software)
Hot wallets are connected to the internet, offering convenience but higher risk.

**Browser Extensions:** MetaMask (most popular Ethereum wallet with 30+ million users), Phantom (leading Solana wallet), Rabby (advanced Ethereum wallet with security checks).

**Mobile Wallets:** Trust Wallet (multi-chain), Rainbow (Ethereum-focused), Coinbase Wallet (self-custody from Coinbase).

**Desktop Wallets:** Exodus (beautiful multi-asset wallet), Electrum (Bitcoin-only power-user wallet).

### Cold Wallets (Hardware)
Hardware wallets store private keys offline, providing the highest security.

**Ledger Nano S Plus / Nano X**: Most popular hardware wallets supporting thousands of cryptocurrencies. Cost: $79-$149.

**Trezor Model One / Model T / Safe 3**: The original hardware wallet, fully open-source. Cost: $69-$219.

**GridPlus Lattice1**: Large screen, SafeCard system for multiple wallets. Cost: $397.

### Custodial vs. Self-Custody
- **Custodial**: An exchange or service holds your keys (e.g., Coinbase, Binance). Convenient but risky — "not your keys, not your coins."
- **Self-Custody**: You control your own private keys. Full sovereignty but full responsibility.

### Best Practices
1. Never share your seed phrase or private keys with anyone
2. Use a hardware wallet for amounts you cannot afford to lose
3. Test with small amounts before sending large transactions
4. Bookmark official wallet websites to avoid phishing sites
5. Keep wallet software updated to the latest version`,
            quiz: [
              {
                question: 'What does a cryptocurrency wallet actually store?',
                options: ['Your coins and tokens', 'Your private keys', 'The entire blockchain', 'Your bank account information'],
                correctIndex: 1,
                explanation: 'A cryptocurrency wallet stores your private keys, not the actual coins. Your assets exist on the blockchain.'
              },
              {
                question: 'What is the main advantage of a hardware wallet over a software wallet?',
                options: ['It is free to use', 'It stores private keys offline for maximum security', 'It is faster for transactions', 'It supports more cryptocurrencies'],
                correctIndex: 1,
                explanation: 'Hardware wallets store your private keys offline (cold storage), making them immune to online hacking attempts.'
              },
              {
                question: 'What does "not your keys, not your coins" mean?',
                options: ['You need a key to open your wallet app', 'If someone else holds your private keys, you do not truly own your crypto', 'Coins come with physical keys', 'You must unlock your coins with a password'],
                correctIndex: 1,
                explanation: 'This popular phrase means that if you do not control your private keys, you do not truly own your cryptocurrency.'
              },
              {
                question: 'Which is the most popular Ethereum browser wallet?',
                options: ['Phantom', 'MetaMask', 'Trust Wallet', 'Ledger Live'],
                correctIndex: 1,
                explanation: 'MetaMask is the most popular Ethereum wallet with over 30 million users.'
              }
            ]
          },
          {
            id: 'private-keys-seed-phrases',
            title: 'Private Keys & Seed Phrases',
            content: `## Private Keys & Seed Phrases: The Keys to Your Kingdom

Your private keys and seed phrase are the most critical pieces of information in cryptocurrency.

### Private Keys Explained
A private key is a 256-bit number, usually represented as a 64-character hexadecimal string. It is mathematically related to your public key and wallet address through elliptic curve cryptography.

**The relationship:**
- Private Key generates Public Key generates Wallet Address
- This is a one-way function: you can derive the public key from the private key, but not vice versa
- The private key is what signs (authorizes) transactions — whoever holds it controls the funds

### Seed Phrases (Mnemonic Phrases)
Remembering a 64-character private key is impossible for humans. Seed phrases solve this problem. A seed phrase is a set of 12 or 24 common English words (from a standardized list of 2,048 words) that can regenerate all your private keys.

This human-readable format was introduced by Bitcoin Improvement Proposal 39 (BIP-39) and is now the industry standard.

### How Seed Phrases Work
1. When you create a new wallet, it generates 128-256 bits of random entropy
2. This entropy is converted into 12-24 words from the BIP-39 word list
3. The seed phrase is used to derive a master private key
4. From this master key, all your individual private keys are generated deterministically
5. One seed phrase can back up unlimited wallets across multiple blockchains

### Protecting Your Seed Phrase
**DO:** Write it on paper or stamp it into metal (fire/water resistant). Store in a secure location. Keep multiple backups in different locations. Use a passphrase (25th word) for additional security.

**DON'T:** Store it digitally (no photos, no cloud, no email). Enter it on any website. Share it with anyone, even "support staff." Store it near your hardware wallet.

### Advanced: Passphrase (25th Word)
Most wallets support an optional passphrase that acts as a 25th word added to your seed phrase. This creates an entirely different set of wallets, providing plausible deniability and additional security.`,
            quiz: [
              {
                question: 'How many words are in a standard BIP-39 seed phrase?',
                options: ['6 or 8', '12 or 24', '32 or 48', '100'],
                correctIndex: 1,
                explanation: 'Standard BIP-39 seed phrases consist of either 12 or 24 words chosen from a list of 2,048 common English words.'
              },
              {
                question: 'Why should you never store your seed phrase digitally?',
                options: ['Digital storage is too slow', 'It could be hacked, accessed by malware, or exposed in data breaches', 'It uses too much storage space', 'Digital formats are not compatible with crypto'],
                correctIndex: 1,
                explanation: 'Digital storage can be hacked, compromised by malware, or exposed in data breaches. Physical storage on paper or metal is recommended.'
              },
              {
                question: 'What is the relationship between private keys and wallet addresses?',
                options: ['They are the same thing', 'Private key generates Public key generates Wallet address (one-way derivation)', 'Wallet addresses generate private keys', 'There is no mathematical relationship'],
                correctIndex: 1,
                explanation: 'Private keys generate public keys through elliptic curve cryptography, and public keys generate wallet addresses through hashing.'
              },
              {
                question: 'What is a passphrase (25th word) used for?',
                options: ['Making transactions faster', 'Creating a hidden wallet with additional security', 'Encrypting the blockchain', 'Recovering lost funds'],
                correctIndex: 1,
                explanation: 'An optional passphrase acts as a 25th word added to your seed phrase, creating an entirely different set of wallets for additional security and plausible deniability.'
              }
            ]
          },
          {
            id: 'common-scams',
            title: 'Common Scams',
            content: `## Common Crypto Scams & How to Avoid Them

The cryptocurrency space is unfortunately rife with scams. Since blockchain transactions are irreversible, falling victim to a scam usually means permanent loss.

### Phishing Attacks
The most common crypto scam. Attackers create fake websites, emails, or messages that look identical to legitimate services. You receive an email claiming your account needs "verification," the link leads to a perfect replica of MetaMask or Coinbase, and you enter your seed phrase or sign a malicious transaction.

**Prevention:** Always verify URLs character by character. Bookmark official sites. Never enter your seed phrase on any website. Use hardware wallets.

### Rug Pulls
Project creators disappear with investor funds after building hype. A new token launches with exciting promises, early investors buy in, then the developers sell everything at once and the token price crashes to near zero. The Squid Game token rose 23,000,000% before developers drained $3.4 million.

**Prevention:** Research the team. Check if liquidity is locked. Verify the contract. Be skeptical of guaranteed returns.

### Giveaway Scams
"Send me 1 ETH, I will send back 2 ETH!" Fake celebrity accounts on social media promise to double any crypto sent. You send crypto and receive nothing. No legitimate entity asks you to send crypto first.

### Airdrop Scams
You receive unsolicited tokens in your wallet. When you try to sell, you are prompted to sign a malicious transaction that drains your wallet. Never interact with unknown tokens.

### General Security Rules
1. **Never share your seed phrase** — not with anyone, ever
2. **Verify everything** — URLs, contracts, transactions
3. **Use a hardware wallet** for significant holdings
4. **Enable 2FA** on all exchange accounts
5. **Stay skeptical** — if something seems too good to be true, it is`,
            quiz: [
              {
                question: 'What is a "rug pull" in crypto?',
                options: ['Removing liquidity from a pool', 'When developers abandon a project and take investor funds', 'A type of hardware wallet', 'A blockchain upgrade'],
                correctIndex: 1,
                explanation: 'A rug pull is when cryptocurrency project developers suddenly abandon the project and disappear with investor funds.'
              },
              {
                question: 'What should you do if you receive unknown tokens in your wallet?',
                options: ['Sell them immediately for profit', 'Interact with them to learn more', 'Never interact with them and research before taking any action', 'Send them to a friend'],
                correctIndex: 2,
                explanation: 'Unsolicited tokens could be part of a scam. Interacting with them might trigger malicious smart contract functions that drain your wallet.'
              },
              {
                question: 'Why is 2FA important for exchange accounts?',
                options: ['It makes transactions faster', 'It adds an extra security layer beyond just a password', 'It reduces trading fees', 'It is required by law'],
                correctIndex: 1,
                explanation: '2FA adds a second verification step beyond your password, making it much harder for attackers to access your account.'
              },
              {
                question: 'What is the most important rule for crypto security?',
                options: ['Use the same password everywhere', 'Never share your seed phrase with anyone', 'Always invest in new tokens', 'Only use mobile wallets'],
                correctIndex: 1,
                explanation: 'Never sharing your seed phrase is the most critical security rule. Anyone with your seed phrase has complete control over all your funds.'
              }
            ]
          }
        ]
      }
    ]
  },
  // ═══════════════════════════════════════════════════════════════
  // COURSE 2: DEFI DEEP DIVE
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'defi-deep-dive',
    title: 'DeFi Deep Dive',
    description: 'Master decentralized finance protocols, from DEXs and lending platforms to yield farming and governance.',
    difficulty: 'Intermediate',
    duration: '10 hours',
    students: '8,230',
    rating: 4.9,
    icon: 'Coins',
    color: 'from-blue-500 to-cyan-500',
    prerequisites: ['intro-to-crypto'],
    modules: [
      {
        id: 'understanding-defi',
        title: 'Understanding DeFi',
        description: 'Get a solid foundation in decentralized finance concepts and how they compare to traditional finance.',
        lessons: [
          {
            id: 'what-is-defi',
            title: 'What is DeFi',
            content: `## Decentralized Finance: The Open Financial System

DeFi (Decentralized Finance) is an umbrella term for financial services built on blockchain technology that operate without traditional intermediaries like banks, brokerages, or insurance companies. Instead of trusting institutions, users trust smart contracts.

### The Core Idea
Traditional finance relies on centralized institutions to hold money, execute trades, provide loans, and offer insurance. DeFi replaces these intermediaries with smart contracts that execute automatically based on predefined rules. Anyone with an internet connection can access these services 24/7/365.

### The DeFi Stack
1. **Blockchain Layer**: Ethereum, Solana — the settlement layer
2. **Asset Layer**: ETH, USDC, DAI — the tokens being used
3. **Protocol Layer**: Uniswap, Aave, MakerDAO — the smart contract logic
4. **Application Layer**: Zapper, DeBank — frontend interfaces
5. **Aggregation Layer**: 1inch, Paraswap — finding best rates across protocols

### Key DeFi Primitives
- **Decentralized Exchanges (DEXs)**: Swap tokens without intermediaries (Uniswap, Curve)
- **Lending Protocols**: Borrow and lend without banks (Aave, Compound)
- **Stablecoins**: Dollar-pegged tokens for stability (USDC, DAI, USDT)
- **Derivatives**: Synthetic assets and perpetual futures (GMX, Synthetix)
- **Insurance**: Smart contract coverage (Nexus Mutual)

### Total Value Locked (TVL)
TVL measures the total assets deposited in DeFi protocols. At its peak in November 2021, DeFi TVL exceeded $180 billion.

### Why It Matters
DeFi democratizes finance. A farmer in Kenya can access the same lending rates as a Wall Street trader. There are no credit checks, no account minimums, no business hours, and no gatekeepers.`,
            quiz: [
              {
                question: 'What replaces traditional financial intermediaries in DeFi?',
                options: ['Banks', 'Smart contracts', 'Government agencies', 'Insurance companies'],
                correctIndex: 1,
                explanation: 'In DeFi, smart contracts replace traditional intermediaries. These transparent programs execute financial operations automatically.'
              },
              {
                question: 'What does TVL stand for in DeFi?',
                options: ['Token Volume Level', 'Total Value Locked', 'Transaction Verification Layer', 'Trading Volume Limit'],
                correctIndex: 1,
                explanation: 'TVL (Total Value Locked) measures the total assets deposited in DeFi protocols — a key metric for ecosystem size.'
              },
              {
                question: 'What is the primary advantage of DeFi over traditional finance?',
                options: ['Higher interest rates', 'Faster customer service', 'Permissionless, 24/7 access without intermediaries', 'Government insurance'],
                correctIndex: 2,
                explanation: 'DeFi provides permissionless access — anyone with an internet connection can use services 24/7 without approval from banks.'
              }
            ]
          },
          {
            id: 'defi-vs-tradfi',
            title: 'DeFi vs TradFi',
            content: `## DeFi vs Traditional Finance: A Comparison

Understanding how DeFi compares to traditional finance helps you appreciate the advantages and trade-offs of each system.

### Accessibility
**TradFi**: Requires bank accounts, credit checks, government IDs. Approximately 1.4 billion adults worldwide are unbanked.

**DeFi**: Requires only an internet connection and a wallet. No credit checks, no minimum deposits, no paperwork. Available 24/7/365 globally.

### Transparency
**TradFi**: Banks operate as "black boxes." You cannot verify their solvency or how they use deposits.

**DeFi**: Every transaction, smart contract, and protocol parameter is publicly visible on the blockchain.

### Speed and Settlement
**TradFi**: Stock trades settle in T+1 (one business day). International wire transfers take 3-5 business days.

**DeFi**: Transactions settle in seconds to minutes. International transfers are near-instant.

### Key Trade-offs
- **Regulation**: TradFi is heavily regulated; DeFi regulation is evolving
- **Consumer Protection**: TradFi has strong protections; DeFi has minimal
- **Innovation Speed**: TradFi is slow; DeFi is rapid
- **Access**: TradFi is restricted; DeFi is permissionless
- **Composability**: TradFi is limited; DeFi has high "money legos" potential`,
            quiz: [
              {
                question: 'What does "permissionless" mean in the context of DeFi?',
                options: ['You need special permission to use it', 'Anyone can use it without approval from gatekeepers', 'Only developers can access it', 'It is illegal to use'],
                correctIndex: 1,
                explanation: 'Permissionless means anyone with an internet connection and wallet can access DeFi services without needing approval.'
              },
              {
                question: 'How long does a stock trade typically take to settle in traditional finance?',
                options: ['Instantly', 'T+1 (one business day)', 'One week', 'One month'],
                correctIndex: 1,
                explanation: 'Stock trades settle on a T+1 basis. DeFi transactions typically settle in seconds to minutes.'
              },
              {
                question: 'What does "composability" mean in DeFi?',
                options: ['Writing music on the blockchain', 'The ability to combine different protocols like building blocks', 'Composing smart contracts in Solidity', 'Creating new cryptocurrencies'],
                correctIndex: 1,
                explanation: 'Composability ("money legos") means DeFi protocols can be combined and integrated with each other for complex financial operations.'
              }
            ]
          },
          {
            id: 'key-defi-protocols',
            title: 'Key DeFi Protocols',
            content: `## The Major DeFi Protocols

The DeFi ecosystem is built on foundational protocols that each serve a specific purpose.

### Uniswap — Decentralized Exchange
The largest DEX by volume, facilitating token swaps through automated market makers. TVL: $4-6 billion. Token: UNI (governance).

### Aave — Lending and Borrowing
A decentralized lending protocol where users lend assets to earn interest or borrow against collateral. Features include variable and stable interest rates and flash loans. TVL: $10-15 billion.

### MakerDAO — Stablecoin and Lending
Issues DAI, a decentralized stablecoin pegged to the US dollar. Users deposit collateral into "vaults" to mint DAI. TVL: $8-10 billion.

### Curve Finance — Stablecoin Trading
Specializes in efficient swaps between similar assets (stablecoins, wrapped tokens) with minimal slippage. TVL: $2-4 billion.

### Lido — Liquid Staking
Allows users to stake ETH without running a validator, receiving stETH in return. Largest DeFi protocol by TVL.

### Chainlink — Oracle Network
Provides real-world data to smart contracts (price feeds, weather data). Essential infrastructure securing billions in assets.

### Ecosystem Dynamics
These protocols are interconnected: Aave accepts stETH as collateral, Curve liquidity is incentivized by Convex, Chainlink price feeds protect MakerDAO vaults. This composability creates powerful network effects but also systemic risk.`,
            quiz: [
              {
                question: 'What is Uniswap\'s primary innovation?',
                options: ['Hardware wallets', 'Automated Market Makers (AMMs) for decentralized trading', 'Stablecoin issuance', 'Oracle networks'],
                correctIndex: 1,
                explanation: 'Uniswap pioneered the AMM model, replacing traditional order books with liquidity pools.'
              },
              {
                question: 'What are "flash loans" in Aave?',
                options: ['Very fast regular loans', 'Uncollateralized loans that must be repaid in one transaction', 'Loans with flash sale interest rates', 'Emergency loans for hacked protocols'],
                correctIndex: 1,
                explanation: 'Flash loans are uncollateralized loans that must be borrowed and repaid within the same blockchain transaction.'
              },
              {
                question: 'What is DAI?',
                options: ['A centralized exchange', 'A decentralized stablecoin issued by MakerDAO', 'A hardware wallet', 'A mining pool'],
                correctIndex: 1,
                explanation: 'DAI is a decentralized stablecoin pegged to the US dollar, issued by MakerDAO through overcollateralized vaults.'
              },
              {
                question: 'Why is Chainlink important for DeFi?',
                options: ['It provides fast transactions', 'It supplies real-world data (like prices) to smart contracts', 'It creates new cryptocurrencies', 'It stores NFTs'],
                correctIndex: 1,
                explanation: 'Chainlink provides real-world data to smart contracts. Price feeds are essential for lending, liquidations, and trading.'
              }
            ]
          }
        ]
      },
      {
        id: 'decentralized-exchanges',
        title: 'Decentralized Exchanges',
        description: 'Understand how DEXs work, from order books to automated market makers and liquidity pools.',
        lessons: [
          {
            id: 'how-dexs-work',
            title: 'How DEXs Work',
            content: `## Decentralized Exchanges Explained

Decentralized exchanges (DEXs) allow users to trade cryptocurrencies directly from their wallets without depositing funds into a centralized platform.

### CEX vs DEX
**Centralized Exchanges (CEX)** like Coinbase or Binance hold your funds (custodial), use order books, require KYC, and can freeze accounts.

**Decentralized Exchanges (DEXs)** like Uniswap or Curve let you keep control of your funds (non-custodial), use smart contracts, require no KYC, and cannot freeze accounts.

### How DEX Trading Works
1. Connect Wallet (MetaMask or similar)
2. Select tokens (what you are selling and buying)
3. Get Quote (the DEX calculates the exchange rate)
4. Approve (sign a transaction allowing the DEX to spend your token)
5. Swap (execute the trade)
6. Confirmation (new tokens appear in your wallet)

### Types of DEXs
- **Automated Market Makers (AMMs)**: Use liquidity pools and math formulas (Uniswap, SushiSwap)
- **Order Book DEXs**: Like traditional exchanges but on-chain (dYdX)
- **Aggregators**: Search multiple DEXs for the best price (1inch, Paraswap)
- **Concentrated Liquidity**: LPs provide liquidity within specific price ranges (Uniswap v3)

### Challenges
- **MEV**: Sophisticated traders can front-run your transactions
- **Impermanent Loss**: LPs can lose value compared to simply holding
- **Slippage**: Large trades can move prices in low-liquidity pools
- **Gas Fees**: On-chain trades can be expensive (mitigated by Layer 2s)`,
            quiz: [
              {
                question: 'What is the main difference between a CEX and a DEX?',
                options: ['CEXs are faster', 'DEXs are non-custodial — you keep control of your funds', 'CEXs have lower fees', 'DEXs require KYC verification'],
                correctIndex: 1,
                explanation: 'The fundamental difference is custody: CEXs hold your funds, DEXs let you trade directly from your wallet.'
              },
              {
                question: 'What does "slippage" mean on a DEX?',
                options: ['The exchange rate changes between request and execution', 'Your wallet disconnects', 'The transaction fails', 'Gas fees increase'],
                correctIndex: 0,
                explanation: 'Slippage is the difference between the expected price and the actual execution price, caused by large trades shifting pool ratios.'
              },
              {
                question: 'What must you do before swapping a token on a DEX for the first time?',
                options: ['Create an account', 'Approve the token for the DEX contract to spend it', 'Deposit tokens to the exchange', 'Complete KYC verification'],
                correctIndex: 1,
                explanation: 'You must sign an "approve" transaction giving the DEX smart contract permission to spend that specific token.'
              }
            ]
          },
          {
            id: 'amm-explained',
            title: 'AMM Explained',
            content: `## Automated Market Makers (AMMs)

AMMs are the engine behind most decentralized exchanges. Instead of matching buyers with sellers through order books, AMMs use mathematical formulas and liquidity pools.

### The AMM Innovation
The most famous formula is the Constant Product Market Maker: **x * y = k**

Where x and y are the quantities of two tokens in the pool, and k is a constant.

**Example:** A pool has 1,000 ETH and 2,000,000 USDC (k = 2,000,000,000). If someone buys 10 ETH, the new ETH becomes 990, and new USDC = 2,000,000,000 / 990 = 2,020,202. Cost: $20,202 for 10 ETH ($2,020.20/ETH). The price increased slightly — this is slippage.

### Uniswap v3: Concentrated Liquidity
Uniswap v3 allows LPs to concentrate liquidity within specific price ranges instead of the entire price curve (0 to infinity). This provides up to 4,000x more capital efficiency.

**Trade-off:** Requires active management. If price moves out of your range, you stop earning fees.

### Other AMM Models
- **StableSwap (Curve)**: Optimized for like-kind swaps with minimal slippage
- **Virtual AMMs**: Uses virtual reserves for derivatives trading
- **Proactive Market Makers (dYdX)**: Combines order book and AMM elements

### The Role of Arbitrageurs
When an AMM price differs from external markets, arbitrageurs profit by trading on the difference, which brings the AMM price back in line. This is a crucial function.`,
            quiz: [
              {
                question: 'What is the formula for Uniswap v2\'s constant product AMM?',
                options: ['x + y = k', 'x * y = k', 'x / y = k', 'x^2 + y^2 = k'],
                correctIndex: 1,
                explanation: 'The constant product formula x * y = k ensures the product of two token quantities in a pool remains constant.'
              },
              {
                question: 'What is "concentrated liquidity" in Uniswap v3?',
                options: ['Liquidity concentrated on one blockchain', 'LPs provide liquidity within specific price ranges for higher capital efficiency', 'All liquidity in one pool', 'Concentrated trading volume'],
                correctIndex: 1,
                explanation: 'Concentrated liquidity allows LPs to allocate capital to specific price ranges, providing up to 4,000x more capital efficiency.'
              },
              {
                question: 'What causes slippage in an AMM?',
                options: ['Network congestion', 'Large trades shifting the ratio of tokens in the pool', 'Smart contract bugs', 'Oracle failures'],
                correctIndex: 1,
                explanation: 'Slippage occurs because buying tokens from a pool reduces their supply and increases the other token supply, changing the ratio and price.'
              }
            ]
          },
          {
            id: 'liquidity-pools',
            title: 'Liquidity Pools',
            content: `## Liquidity Pools: The Foundation of DeFi

Liquidity pools are collections of tokens locked in smart contracts that enable trading, lending, and other DeFi activities.

### What is a Liquidity Pool?
A liquidity pool is a smart contract containing paired tokens that traders can swap against. Liquidity providers (LPs) deposit tokens and receive LP tokens representing their share.

### How LPs Earn Money
LPs earn fees from every trade. Uniswap v3 fee tiers: 0.01% (stablecoin pairs), 0.05% (major pairs), 0.30% (standard pairs), 1.00% (exotic pairs).

### Impermanent Loss (IL)
The biggest risk for LPs. When the price of one token changes relative to the other, the LP ends up with more of the less valuable token and less of the more valuable one.

**Example:** You deposit 1 ETH ($2,000) + 2,000 USDC. If ETH doubles to $4,000: If you just held: $6,000. As an LP: ~$5,656. Impermanent Loss: $344 (5.7%).

Why "impermanent"? If the price returns to the original ratio, the loss disappears. But if you withdraw while prices have diverged, the loss becomes permanent.

### Strategies to Minimize IL
1. Provide liquidity to correlated pairs (ETH/stETH, USDC/USDT)
2. Use concentrated liquidity wisely
3. Choose high-fee pools
4. Use protocols with IL protection (Bancor)
5. Farm incentivized pools where rewards offset IL`,
            quiz: [
              {
                question: 'What do liquidity providers receive for depositing tokens?',
                options: ['Interest payments', 'LP tokens representing their share of the pool', 'Governance tokens', 'Cryptocurrency rewards'],
                correctIndex: 1,
                explanation: 'LPs receive LP tokens representing their proportional share of the pool, redeemable later plus accumulated fees.'
              },
              {
                question: 'What is impermanent loss?',
                options: ['Fees paid to the protocol', 'Loss from price divergence between pooled tokens vs. simply holding', 'Loss from smart contract bugs', 'Loss from failed transactions'],
                correctIndex: 1,
                explanation: 'Impermanent loss occurs when the price ratio of pooled tokens changes compared to deposit time, resulting in lower value than holding.'
              },
              {
                question: 'Which type of pool typically has the lowest impermanent loss?',
                options: ['ETH/MEME coin pairs', 'Stablecoin pairs like USDC/USDT', 'ETH/BTC pairs', 'New token pairs'],
                correctIndex: 1,
                explanation: 'Stablecoin pairs have minimal IL because both tokens maintain nearly the same price, so the price ratio barely changes.'
              }
            ]
          }
        ]
      },
      {
        id: 'lending-borrowing',
        title: 'Lending & Borrowing',
        description: 'Learn how DeFi lending works, understand collateral requirements, and explore yield farming strategies.',
        lessons: [
          {
            id: 'how-lending-works',
            title: 'How Lending Works',
            content: `## DeFi Lending Protocols

DeFi lending allows anyone to lend crypto assets to earn interest or borrow by providing collateral — all without banks, credit checks, or paperwork.

### How It Works
Lenders deposit assets into pools and receive interest-bearing tokens that accrue interest automatically. Borrowers take loans by providing collateral. Interest rates adjust algorithmically based on supply and demand (utilization rate).

### Overcollateralization
Unlike traditional loans, DeFi loans are overcollateralized — you must deposit more value than you borrow. Example: Deposit $15,000 worth of ETH, borrow $10,000 USDC (150% collateral ratio).

**Why?** Since there is no credit score or legal enforcement, collateral is the only guarantee lenders have.

### Use Cases
1. **Earn passive income**: Deposit stablecoins to earn 3-8% APY
2. **Leverage**: Deposit ETH, borrow USDC, buy more ETH
3. **Tax efficiency**: Borrow against crypto without selling (avoiding taxable events)
4. **Short selling**: Borrow ETH, sell it, buy back later at a lower price
5. **Working capital**: Access liquidity without selling holdings

### Major Lending Protocols
- **Aave**: Most popular, supports many assets, pioneered flash loans
- **Compound**: One of the earliest, introduced the cToken model
- **MakerDAO**: Specialized for DAI stablecoin generation

### Risks
- **Liquidation risk**: If collateral value drops below the minimum ratio
- **Smart contract risk**: Bugs could compromise the protocol
- **Interest rate risk**: Variable rates can spike unexpectedly
- **Oracle risk**: Incorrect price feeds could trigger wrongful liquidations`,
            quiz: [
              {
                question: 'Why are DeFi loans overcollateralized?',
                options: ['To earn more interest', 'Because there is no credit score or legal enforcement — collateral is the only guarantee', 'Because of regulatory requirements', 'To make the loan process slower'],
                correctIndex: 1,
                explanation: 'DeFi loans are overcollateralized because the system is pseudonymous and lacks credit scores or legal enforcement.'
              },
              {
                question: 'What determines interest rates in DeFi lending?',
                options: ['Central bank decisions', 'Supply and demand — the utilization rate of the lending pool', 'Fixed predetermined rates', 'Government regulations'],
                correctIndex: 1,
                explanation: 'Interest rates are algorithmically determined based on the utilization rate (percentage of pool assets currently borrowed).'
              },
              {
                question: 'What is a common use case for borrowing in DeFi without selling crypto?',
                options: ['Buying groceries', 'Accessing liquidity while avoiding taxable events', 'Mining cryptocurrency', 'Creating NFTs'],
                correctIndex: 1,
                explanation: 'Many users borrow against crypto to access cash without selling, avoiding a taxable capital gains event.'
              }
            ]
          },
          {
            id: 'collateral-liquidation',
            title: 'Collateral & Liquidation',
            content: `## Collateral and Liquidation in DeFi

Understanding collateral requirements and the liquidation process is critical for safely using DeFi lending protocols.

### Collateral Ratios
Every lending protocol specifies a Loan-to-Value (LTV) ratio — the maximum percentage of collateral you can borrow. Higher volatility and lower liquidity mean lower LTV ratios to protect lenders.

### How Liquidation Works
When your collateral value drops too close to your borrowed amount, your position enters the liquidation zone.

1. A liquidator (usually a bot) repays part or all of your debt
2. In return, they receive your collateral at a discount (typically 5-10%)
3. You receive any remaining collateral after the debt is repaid
4. You also pay a liquidation penalty

### Avoiding Liquidation
1. Monitor your health factor (keep it well above 1.0)
2. Over-collateralize generously (borrow less than maximum)
3. Set up alerts using tools like DeFi Saver
4. Add collateral proactively before reaching the threshold
5. Use stablecoins as collateral (less likely to drop)

### Liquidation Cascades
During rapid market crashes, mass liquidations can create a death spiral: price drops trigger liquidations, liquidators sell collateral pushing prices lower, triggering more liquidations. This happened during "Black Thursday" (March 2020) when ETH dropped 50% in one day.`,
            quiz: [
              {
                question: 'What happens during a DeFi liquidation?',
                options: ['Your wallet is deleted', 'A liquidator repays your debt and receives your collateral at a discount', 'The protocol freezes your account', 'You receive a warning email'],
                correctIndex: 1,
                explanation: 'During liquidation, a liquidator repays your debt and receives your collateral at a discount (typically 5-10%).'
              },
              {
                question: 'What is a "health factor" in DeFi lending?',
                options: ['A measure of interest earned', 'A ratio indicating how close your position is to liquidation', 'The APY of your deposit', 'Your credit score in DeFi'],
                correctIndex: 1,
                explanation: 'The health factor indicates how safe your position is. A health factor of 1.0 means you are at the liquidation threshold.'
              },
              {
                question: 'What is a "liquidation cascade"?',
                options: ['A waterfall of profits', 'A chain reaction where liquidations cause price drops triggering more liquidations', 'A security feature of smart contracts', 'A type of DeFi protocol'],
                correctIndex: 1,
                explanation: 'A liquidation cascade occurs when mass liquidations force collateral sales, pushing prices lower and triggering more liquidations.'
              }
            ]
          },
          {
            id: 'yield-farming',
            title: 'Yield Farming',
            content: `## Yield Farming: Maximizing DeFi Returns

Yield farming is the practice of strategically moving crypto assets across DeFi protocols to maximize returns.

### Common Strategies
1. **Simple Lending**: Deposit stablecoins on Aave for 3-8% APY with low risk
2. **Liquidity Provision**: Provide tokens to DEX pools for 10-50% APY (with IL risk)
3. **Yield Aggregation**: Use Yearn Finance for automated strategies (5-20% APY)
4. **Leveraged Yield Farming**: Borrow against deposits to farm with more capital (3-5x amplification)
5. **Curve + Convex**: Deposit in Curve, stake LP tokens on Convex for boosted rewards

### Evaluating Opportunities
- **APY vs APR**: APY includes compounding; APR does not
- **Token emissions**: Is the yield paid in a depreciating token?
- **Audit status**: Has the protocol been audited?
- **TVL**: Higher TVL generally means more trust
- **Lock-up periods**: Some strategies require locking tokens

### Risks
1. Impermanent loss in LP positions
2. Smart contract risk (more protocols = more attack surface)
3. Rug pulls from unsustainable yields
4. Liquidation risk in leveraged positions
5. Token depreciation (high APY in a crashing token = net loss)
6. Gas costs eating into profits

### Sustainable vs Unsustainable Yields
- **Sustainable**: Trading fees, real interest from borrowers, protocol revenue
- **Unsustainable**: Token emissions that dilute value, Ponzi-like structures

If a yield seems too good to be true (100%+ APY on an unknown token), it probably is.`,
            quiz: [
              {
                question: 'What is yield farming?',
                options: ['Mining new cryptocurrencies', 'Strategically deploying crypto assets across DeFi protocols to maximize returns', 'Growing vegetables using crypto', 'A type of NFT collection'],
                correctIndex: 1,
                explanation: 'Yield farming is strategically moving crypto across DeFi protocols to maximize returns through fees, interest, and incentives.'
              },
              {
                question: 'What is the difference between APY and APR?',
                options: ['They are the same thing', 'APY includes compounding; APR does not', 'APR includes compounding; APY does not', 'APY is for lending; APR is for borrowing'],
                correctIndex: 1,
                explanation: 'APY includes the effect of compounding interest, while APR does not. APY will always be higher than APR for the same rate.'
              },
              {
                question: 'What is a red flag in yield farming?',
                options: ['Low APY from established protocols', 'Extremely high APY (100%+) from unknown protocols', 'Yields from trading fees', 'Returns from lending on Aave'],
                correctIndex: 1,
                explanation: 'Extremely high APYs from unknown protocols are a major red flag — often unsustainable, funded by token emissions, or scams.'
              }
            ]
          }
        ]
      },
      {
        id: 'advanced-defi',
        title: 'Advanced DeFi',
        description: 'Explore flash loans, governance, and sophisticated risk management in DeFi.',
        lessons: [
          {
            id: 'flash-loans',
            title: 'Flash Loans',
            content: `## Flash Loans: Uncollateralized DeFi Magic

Flash loans are one of DeFi's most unique innovations — loans that require no collateral but must be borrowed and repaid within a single transaction.

### How Flash Loans Work
A flash loan exploits the atomic nature of blockchain transactions. A transaction either fully succeeds or fully reverts. If you cannot repay by the end of the transaction, the entire transaction reverts as if it never happened.

**The process:** Borrow funds from a flash loan pool (Aave), use the borrowed funds for any purpose within the same transaction, return the borrowed amount plus a small fee (typically 0.09%), and keep any profit.

### Use Cases
1. **Arbitrage**: Exploit price differences between DEXs
2. **Collateral Swap**: Refinance a DeFi loan without closing it
3. **Liquidation**: Liquidate undercollateralized positions for the bonus
4. **Self-Liquidation**: Liquidate your own position before someone else does

### Flash Loan Attacks
Flash loans have been weaponized in numerous exploits: borrow massive amounts, manipulate an oracle or exploit a vulnerability, extract value, repay the flash loan. Notable attacks include bZx ($1M, 2020), Pancake Bunny ($45M, 2021), and Mango Markets ($114M, 2022).

### The Debate
Supporters argue flash loans democratize finance by giving anyone access to large capital. Critics argue they enable sophisticated attacks and create systemic risk.`,
            quiz: [
              {
                question: 'What makes flash loans unique?',
                options: ['They charge high interest rates', 'They require no collateral but must be repaid in one transaction', 'They take 24 hours to process', 'They require KYC verification'],
                correctIndex: 1,
                explanation: 'Flash loans require no collateral — they exploit the atomic nature of blockchain transactions where everything either succeeds or reverts.'
              },
              {
                question: 'What happens if a flash loan cannot be repaid within the transaction?',
                options: ['The borrower goes into debt', 'The lender takes a loss', 'The entire transaction reverts as if it never happened', 'The borrower pays a late fee'],
                correctIndex: 2,
                explanation: 'If the flash loan cannot be repaid, the entire transaction reverts — no funds ever change hands.'
              },
              {
                question: 'How have flash loans been used maliciously?',
                options: ['To mine new tokens', 'To manipulate oracles or exploit smart contract vulnerabilities', 'To create fake wallets', 'To spam the network'],
                correctIndex: 1,
                explanation: 'Flash loan attacks typically involve borrowing massive amounts to manipulate price oracles or exploit vulnerabilities.'
              }
            ]
          },
          {
            id: 'governance-tokens',
            title: 'Governance Tokens',
            content: `## Governance Tokens: Decentralized Decision Making

Governance tokens give holders the right to participate in protocol decision-making. They are a key mechanism for decentralizing control of DeFi protocols.

### What They Do
Governance token holders can propose and vote on changes including fee structures, new features, treasury allocation, risk parameters, and smart contract upgrades.

### Major Governance Tokens
- **UNI** (Uniswap), **AAVE** (Aave), **MKR** (MakerDAO), **COMP** (Compound), **CRV** (Curve)

### How Governance Works
1. Discussion on governance forums
2. Temperature check (informal poll on Snapshot)
3. Formal proposal with specifications
4. On-chain vote requiring quorum
5. Execution via Timelock contract (delay for security)

### Vote-Escrowed Models (veTokens)
Curve pioneered the veToken model: lock CRV for up to 4 years for more voting power and rewards. Longer locks = more influence. This aligns incentives with long-term protocol health.

### The Curve Wars
The veCRV model led to "Curve Wars" — protocols competing to accumulate CRV to direct liquidity incentives. Convex Finance allows depositing CRV without locking for boosted rewards.

### Criticisms
1. **Plutocracy**: Wealthy holders dominate voting
2. **Low participation**: Most holders do not vote
3. **Short-termism**: Speculators may vote for short-term gains
4. **Complexity**: Average users cannot evaluate technical proposals`,
            quiz: [
              {
                question: 'What can governance token holders do?',
                options: ['Mine new tokens', 'Vote on protocol decisions like fees, upgrades, and treasury allocation', 'Trade on the protocol for free', 'Receive guaranteed dividends'],
                correctIndex: 1,
                explanation: 'Governance token holders participate in decision-making including fee structures, upgrades, and treasury allocation.'
              },
              {
                question: 'What is the veToken model pioneered by Curve?',
                options: ['Tokens that expire after a set time', 'Locking tokens for longer periods to gain more voting power and rewards', 'Very expensive tokens', 'Virtual tokens for testing'],
                correctIndex: 1,
                explanation: 'The veToken model requires locking tokens for a period, with longer locks granting more voting power and rewards.'
              },
              {
                question: 'What is a major criticism of token-based governance?',
                options: ['It is too slow', 'It is plutocratic — wealthy holders dominate voting power', 'It requires government approval', 'It only works on Ethereum'],
                correctIndex: 1,
                explanation: 'Token governance is often criticized as plutocratic because voting power is proportional to holdings.'
              }
            ]
          },
          {
            id: 'risk-management',
            title: 'Risk Management',
            content: `## DeFi Risk Management

Smart risk management separates successful DeFi users from those who lose their capital.

### Types of Risk
1. **Smart Contract Risk**: Bugs or vulnerabilities in protocol code. Mitigate by using audited protocols with high TVL.
2. **Oracle Risk**: Incorrect price data could trigger wrongful liquidations. Mitigate by using decentralized oracles (Chainlink).
3. **Liquidation Risk**: Collateral value dropping below required ratio. Mitigate by maintaining high health factors.
4. **Impermanent Loss**: Price divergence in LP positions. Mitigate by providing liquidity to correlated pairs.
5. **Composability Risk**: Interconnected protocol failures cascading. Mitigate by diversifying across independent protocols.
6. **Regulatory Risk**: Government restrictions. Stay informed about regulations.
7. **Key Management Risk**: Lost keys mean lost funds. Use hardware wallets and secure seed phrases.

### Risk Management Framework
- **Position Sizing**: Never put more than 10-20% in a single protocol
- **The Sleep Test**: If a position keeps you up at night, it is too large
- **Research Checklist**: Audit status, TVL, team, governance, insurance, sustainable yield sources
- **Monitoring**: Track positions daily, set up alerts, follow governance

### Insurance Options
DeFi insurance protocols offer coverage against smart contract failures:
- **Nexus Mutual**: Covers smart contract failures and hacks
- **InsurAce**: Multi-chain coverage
- Costs typically range from 2-10% annually`,
            quiz: [
              {
                question: 'What is smart contract risk in DeFi?',
                options: ['The risk that smart contracts are too expensive', 'The risk that bugs or vulnerabilities could be exploited', 'The risk of losing your password', 'The risk of high gas fees'],
                correctIndex: 1,
                explanation: 'Smart contract risk is the possibility that bugs or vulnerabilities in code could be exploited, resulting in fund loss.'
              },
              {
                question: 'What is a good rule of thumb for position sizing in DeFi?',
                options: ['Put everything in one protocol', 'Never put more than 10-20% in a single protocol', 'Only invest what you cannot afford to lose', 'Always use maximum leverage'],
                correctIndex: 1,
                explanation: 'Never put more than 10-20% of your portfolio in a single protocol to limit exposure if any protocol fails.'
              },
              {
                question: 'What does DeFi insurance cover?',
                options: ['Your personal health', 'Smart contract failures and protocol hacks', 'Lost seed phrases', 'Market price drops'],
                correctIndex: 1,
                explanation: 'DeFi insurance covers smart contract failures, protocol hacks, and exploits — not market losses or user mistakes.'
              }
            ]
          }
        ]
      }
    ]
  },
  // ═══════════════════════════════════════════════════════════════
  // COURSE 3: SMART CONTRACT DEVELOPMENT
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'smart-contract-dev',
    title: 'Smart Contract Development',
    description: 'Learn to build, test, and deploy smart contracts on Ethereum using Solidity. From your first contract to production-ready security.',
    difficulty: 'Advanced',
    duration: '14 hours',
    students: '5,670',
    rating: 4.7,
    icon: 'Code2',
    color: 'from-orange-500 to-red-500',
    prerequisites: ['intro-to-crypto'],
    modules: [
      {
        id: 'solidity-basics',
        title: 'Solidity Basics',
        description: 'Set up your development environment and learn the fundamentals of Solidity programming.',
        lessons: [
          {
            id: 'setting-up',
            title: 'Setting Up Your Environment',
            content: `## Setting Up Your Solidity Development Environment

Before writing smart contracts, set up a proper development environment. Modern Solidity development has excellent tooling.

### Option 1: Remix IDE (Recommended for Beginners)
Remix (remix.ethereum.org) is a browser-based IDE requiring zero installation. Visit remix.ethereum.org, create a new file (e.g., HelloWorld.sol), write Solidity code, compile with the built-in compiler, and deploy to JavaScript VM (local simulation) or a testnet.

### Option 2: Hardhat (Professional Standard)
The most popular professional development framework for Ethereum. Install with:
mkdir my-project && cd my-project && npm init -y && npm install --save-dev hardhat && npx hardhat init

Key features: local Ethereum network, Solidity debugging with stack traces, built-in testing with Mocha/Chai, gas reporting, TypeScript support.

### Option 3: Foundry (Performance-Focused)
A blazing-fast, Solidity-native toolkit. Install with: curl -L https://foundry.paradigm.xyz | bash && foundryup. Key features: write tests in Solidity, extremely fast execution, built-in fuzz testing.

### Essential Tools
- **MetaMask**: Browser wallet for interacting with contracts
- **Etherscan**: Block explorer for verifying contracts
- **OpenZeppelin**: Library of secure, reusable smart contract components
- **Alchemy/Infura**: RPC providers to connect to Ethereum networks

### Test Networks
Never deploy directly to mainnet during development. Use Sepolia (primary Ethereum testnet) or local networks (Hardhat Network, Anvil) for instant testing.`,
            quiz: [
              {
                question: 'What is Remix IDE?',
                options: ['A hardware wallet', 'A browser-based IDE for Solidity development requiring no installation', 'A testing framework for JavaScript', 'A block explorer'],
                correctIndex: 1,
                explanation: 'Remix is a browser-based IDE for Solidity development with a built-in compiler, debugger, and deployment tools.'
              },
              {
                question: 'Why should you never deploy directly to Ethereum mainnet during development?',
                options: ['Mainnet does not support smart contracts', 'Mainnet deployment costs real ETH and mistakes are permanent', 'Mainnet is too slow', 'Mainnet requires government approval'],
                correctIndex: 1,
                explanation: 'Deploying to mainnet costs real ETH and smart contracts are immutable once deployed. Always test on testnets first.'
              },
              {
                question: 'What is OpenZeppelin?',
                options: ['A new blockchain', 'A library of secure, reusable smart contract components', 'An exchange platform', 'A mining pool'],
                correctIndex: 1,
                explanation: 'OpenZeppelin provides battle-tested, audited smart contract components that developers can import and build upon.'
              }
            ]
          },
          {
            id: 'first-contract',
            title: 'Your First Contract',
            content: `## Writing Your First Smart Contract

Let us write a complete Solidity smart contract from scratch.

### The Contract
A simple storage contract stores and retrieves a number:

The first line specifies the license (SPDX-License-Identifier: MIT).
The pragma directive specifies the compiler version (pragma solidity ^0.8.20).

The contract "SimpleStorage" has:
- A state variable (uint256 private myNumber) stored permanently on the blockchain
- An event (NumberChanged) for off-chain logging
- A constructor that runs once when deployed, setting the initial value
- A setNumber function (public) that updates the value and emits an event
- A getNumber function (public view) that reads the value for free

### Key Concepts
- **State variables** are stored permanently on the blockchain (expensive)
- **Events** are logged cheaply for off-chain consumption
- **Constructors** run once during deployment for initial setup
- **Public functions** are callable by anyone
- **View functions** only read state and do not cost gas when called externally
- **msg.sender** is a global variable representing the caller's address

### Deploying with Hardhat
Use a deployment script that gets the contract factory, deploys with constructor arguments, and waits for confirmation. Verify on Etherscan for transparency.`,
            quiz: [
              {
                question: 'What does the SPDX license identifier do?',
                options: ['Compiles the contract', 'Specifies the open-source license for the code', 'Deploys the contract', 'Creates tests'],
                correctIndex: 1,
                explanation: 'The SPDX license identifier specifies the open-source license. It is required by the Solidity compiler.'
              },
              {
                question: 'What is the difference between a "view" function and a regular function?',
                options: ['View functions are faster', 'View functions only read state and do not cost gas; regular functions modify state and cost gas', 'Regular functions cannot return values', 'View functions can only be called by the owner'],
                correctIndex: 1,
                explanation: 'View functions only read blockchain state and are free to call. Regular functions modify state and require gas.'
              },
              {
                question: 'What does "msg.sender" represent in Solidity?',
                options: ['The contract address', 'The address of whoever called the function', 'The previous block miner', 'The Ethereum Foundation'],
                correctIndex: 1,
                explanation: 'msg.sender represents the address of the account or contract that initiated the current function call.'
              }
            ]
          },
          {
            id: 'data-types',
            title: 'Data Types',
            content: `## Solidity Data Types

Understanding Solidity data types is fundamental to writing effective smart contracts.

### Value Types (Copied When Assigned)
- **Booleans**: bool isActive = true;
- **Integers**: uint256 for non-negative, int256 for signed. uint256 is the default and most gas-efficient.
- **Addresses**: 20-byte Ethereum addresses. address payable can receive ETH.
- **Bytes**: bytes32 for fixed 32-byte data, bytes for dynamic size.
- **Enums**: Custom types with named values (enum Status { Pending, Active, Completed }).

### Reference Types (Referenced by Location)
- **Arrays**: Dynamic (uint[]) or fixed-size (uint[5]). Use push() to add elements.
- **Mappings**: Key-value storage like a hash table (mapping(address => uint256) balances). Not iterable.
- **Structs**: Custom data structures grouping multiple fields (struct User { string name; uint age; }).

### Data Location
Variables can be stored in three locations:
- **storage**: Persistent on blockchain (most expensive)
- **memory**: Temporary during function execution (cheaper)
- **calldata**: Read-only function arguments (cheapest)

### Gas Optimization Tips
1. Use uint256 instead of smaller uints
2. Use bytes32 instead of string when possible
3. Minimize storage reads/writes (most expensive operations)
4. Use mappings over arrays for lookups
5. Pack struct members to fit in fewer storage slots`,
            quiz: [
              {
                question: 'What is the difference between uint and int in Solidity?',
                options: ['They are the same', 'uint is unsigned (non-negative only); int can be negative', 'int is unsigned; uint can be negative', 'uint is for small numbers; int is for large numbers'],
                correctIndex: 1,
                explanation: 'uint can only hold non-negative values, while int can hold both positive and negative values.'
              },
              {
                question: 'What is a mapping in Solidity?',
                options: ['A geographic map', 'A key-value data structure similar to a hash table', 'An array with sorting', 'A visual chart of data'],
                correctIndex: 1,
                explanation: 'A mapping is a key-value data structure where you associate any key type with any value type.'
              },
              {
                question: 'What is the difference between storage, memory, and calldata?',
                options: ['They are the same thing', 'Storage is persistent on-chain; memory is temporary during execution; calldata is read-only input', 'Storage is cheapest; calldata is most expensive', 'Memory persists between function calls'],
                correctIndex: 1,
                explanation: 'Storage persists on the blockchain (most expensive), memory is temporary during execution, calldata is read-only input (cheapest).'
              }
            ]
          }
        ]
      },
      {
        id: 'contract-design',
        title: 'Contract Design',
        description: 'Learn professional smart contract design patterns including functions, modifiers, events, errors, and inheritance.',
        lessons: [
          {
            id: 'functions-modifiers',
            title: 'Functions & Modifiers',
            content: `## Functions and Modifiers in Solidity

Functions are the building blocks of smart contracts. Modifiers add reusable conditions to functions.

### Function Visibility
- **public**: Callable from anywhere (inside and outside the contract)
- **external**: Only callable from outside (gas efficient for large arrays)
- **internal**: Callable from within the contract and inheritors
- **private**: Only callable from within the contract

### Function Modifiers
- **pure**: Does not read or modify state
- **view**: Reads state but does not modify it
- **payable**: Can receive ETH (msg.value contains the amount)

### Custom Modifiers
Modifiers add reusable conditions using the underscore placeholder:
The onlyOwner modifier checks msg.sender == owner before executing the function body.
The nonReentrant modifier prevents reentrancy attacks using a lock variable.

### Return Values
Functions can return single values, multiple values, or named returns. Named returns automatically assign to return variable names.

### OpenZeppelin's Ownable
Instead of writing access control from scratch, import Ownable from OpenZeppelin for battle-tested owner-only access control.`,
            quiz: [
              {
                question: 'What is the difference between "public" and "external" function visibility?',
                options: ['There is no difference', 'Public is callable from anywhere; external is only callable from outside the contract', 'External is callable from anywhere; public is only internal', 'Public costs more gas'],
                correctIndex: 1,
                explanation: 'Public functions can be called internally and externally. External functions can only be called from outside.'
              },
              {
                question: 'What does the underscore symbol represent in a modifier?',
                options: ['A variable declaration', 'The placeholder where the function body executes', 'A comment marker', 'An error handler'],
                correctIndex: 1,
                explanation: 'The underscore in a modifier indicates where the modified function body will be executed.'
              },
              {
                question: 'What does the "payable" keyword do on a function?',
                options: ['Makes the function free to call', 'Allows the function to receive ETH', 'Pays the caller', 'Reduces gas costs'],
                correctIndex: 1,
                explanation: 'The payable keyword allows a function to receive Ether. Without it, any ETH sent with the call will be refunded.'
              }
            ]
          },
          {
            id: 'events-errors',
            title: 'Events & Errors',
            content: `## Events and Custom Errors in Solidity

Events and errors are crucial for building user-friendly and gas-efficient smart contracts.

### Events
Events are logs stored on the blockchain that off-chain applications can listen to. Up to 3 parameters can be indexed for efficient filtering. Events are much cheaper than storage and are the primary way contracts communicate with the outside world.

### Custom Errors (Solidity 0.8.4+)
Custom errors are more gas-efficient than require strings. Instead of storing full text messages in bytecode, custom errors use a 4-byte selector plus parameters.

Example: error NotOwner(address caller, address owner);
Usage: if (msg.sender != owner) revert NotOwner(msg.sender, owner);

### Error Handling Patterns
- Use revert with custom errors for clear, gas-efficient error handling
- Try-catch handles failures in external calls gracefully without reverting the entire transaction

### Best Practices
1. Emit events for all state changes
2. Use indexed for addresses and IDs
3. Prefer custom errors over require strings
4. Include context in errors for debugging
5. Use standard events (ERC-20 Transfer/Approval)`,
            quiz: [
              {
                question: 'Why are events cheaper than storage in Solidity?',
                options: ['Events are stored off-chain', 'Events are logs stored more efficiently than contract storage', 'Events do not use gas', 'Events are compressed'],
                correctIndex: 1,
                explanation: 'Events are stored as logs in the transaction receipt, which is much cheaper than contract storage (8 gas per byte vs 20,000 gas per slot).'
              },
              {
                question: 'Why are custom errors more gas efficient than require strings?',
                options: ['They skip validation', 'They use a 4-byte selector instead of storing full string messages', 'They are stored off-chain', 'They do not revert the transaction'],
                correctIndex: 1,
                explanation: 'Custom errors only store a 4-byte selector plus parameters, while require strings store entire text messages in bytecode.'
              }
            ]
          },
          {
            id: 'inheritance',
            title: 'Inheritance & Interfaces',
            content: `## Inheritance and Interfaces in Solidity

Inheritance and interfaces are key concepts for writing modular, reusable smart contracts.

### Contract Inheritance
Solidity supports multiple inheritance using C3 linearization. A contract can extend functionality from parent contracts, gaining all their state variables, functions, and modifiers.

### The override and virtual Keywords
- **virtual**: Parent function must be marked virtual to allow overriding
- **override**: Child function must use override when overriding a parent function

### Abstract Contracts
Contracts that cannot be deployed directly — they must be inherited. Functions without implementation make a contract abstract.

### Interfaces
Interfaces define a contract's external API without implementation:
- Cannot have state variables
- Cannot have constructors
- All functions must be external
- Cannot inherit contracts (but can inherit interfaces)

### OpenZeppelin Contracts
The most widely-used library for Solidity, providing battle-tested implementations of ERC-20, ERC-721, access control, and security utilities. Import and extend them instead of writing from scratch.`,
            quiz: [
              {
                question: 'What does the "virtual" keyword do in Solidity?',
                options: ['Makes a function run in a virtual machine', 'Marks a function as overridable by child contracts', 'Creates a virtual copy of the function', 'Makes the function free to call'],
                correctIndex: 1,
                explanation: 'The virtual keyword marks a function as overridable. Parent functions must be virtual for children to override them.'
              },
              {
                question: 'What is the difference between an interface and an abstract contract?',
                options: ['They are the same', 'Interfaces have no implementation and only external functions; abstract contracts can have implemented functions', 'Abstract contracts have no functions', 'Interfaces can have state variables'],
                correctIndex: 1,
                explanation: 'Interfaces define only function signatures with no implementation. Abstract contracts can have both implemented and unimplemented functions.'
              },
              {
                question: 'Why are OpenZeppelin contracts widely used?',
                options: ['They are the cheapest to deploy', 'They are audited, battle-tested, and provide secure standard implementations', 'They are required by Ethereum', 'They have the most features'],
                correctIndex: 1,
                explanation: 'OpenZeppelin contracts are industry standard because they are thoroughly audited and battle-tested in production.'
              }
            ]
          }
        ]
      },
      {
        id: 'security',
        title: 'Smart Contract Security',
        description: 'Learn the most critical security vulnerabilities and how to prevent them.',
        lessons: [
          {
            id: 'common-vulnerabilities',
            title: 'Common Vulnerabilities',
            content: `## Common Smart Contract Vulnerabilities

Smart contract security is paramount — bugs can lead to permanent loss of funds.

### 1. Reentrancy
The most infamous vulnerability (The DAO hack, 2016). Occurs when a contract makes an external call before updating state, allowing the called contract to re-enter. Fix: update state before external calls (Checks-Effects-Interactions pattern).

### 2. Access Control Failures
Missing or incorrect permissions on sensitive functions. Always use modifiers like onlyOwner for restricted functions.

### 3. Front-Running (MEV)
Transactions in the mempool are visible before being mined. Bots place trades before yours to profit from price impact. Mitigation: use slippage limits, private mempools (Flashbots).

### 4. Oracle Manipulation
Manipulating price feeds to exploit protocols. Flash loans can temporarily distort DEX spot prices. Fix: use TWAP oracles or Chainlink.

### 5. Denial of Service (DoS)
Making a contract unusable, often through unbounded loops or reverting external calls.

### 6. tx.origin Phishing
Using tx.origin for authorization instead of msg.sender. An attacker can trick the owner into calling a malicious contract that calls your vulnerable function.

### Security Checklist
- Use Checks-Effects-Interactions pattern
- Never use tx.origin for authorization
- Check all external call return values
- Use OpenZeppelin libraries
- Implement reentrancy guards
- Use SafeERC20 for token transfers
- Validate all inputs
- Get professional audits`,
            quiz: [
              {
                question: 'What is the Checks-Effects-Interactions pattern?',
                options: ['A testing methodology', 'Check conditions, update state, then make external calls — in that order', 'A way to organize code files', 'A gas optimization technique'],
                correctIndex: 1,
                explanation: 'This pattern prevents reentrancy by updating state before making external calls.'
              },
              {
                question: 'Why is tx.origin dangerous for authorization?',
                options: ['It is slower than msg.sender', 'It represents the original external account, which can be manipulated through phishing', 'It costs more gas', 'It is deprecated'],
                correctIndex: 1,
                explanation: 'tx.origin represents the original external account, not the immediate caller. An attacker can trick the authorized account into calling a malicious contract.'
              },
              {
                question: 'What was The DAO hack?',
                options: ['A Bitcoin exchange hack', 'A reentrancy attack that drained $60 million from a smart contract in 2016', 'A phishing attack on developers', 'A hardware wallet exploit'],
                correctIndex: 1,
                explanation: 'The DAO hack in 2016 exploited a reentrancy vulnerability, draining approximately $60 million and leading to the Ethereum/Ethereum Classic hard fork.'
              }
            ]
          },
          {
            id: 'reentrancy',
            title: 'Reentrancy Attacks',
            content: `## Reentrancy: The Most Dangerous Smart Contract Vulnerability

Reentrancy is behind some of the largest hacks in DeFi history.

### How It Works
1. Attacker deploys a malicious contract with a receive() function
2. Attacker calls withdraw() on the vulnerable contract
3. Vulnerable contract sends ETH to the attacker (external call)
4. Attacker's receive() is triggered, calling withdraw() again
5. Since the balance has not been updated yet, the withdrawal succeeds
6. This repeats until the contract is drained

### Cross-Function Reentrancy
More subtle: reentrancy into a different function in the same contract. The guard on one function does not protect another.

### Cross-Contract Reentrancy
Even more dangerous: reentrancy across multiple interconnected contracts.

### Prevention Strategies
1. **Checks-Effects-Interactions**: Update state before external calls
2. **Reentrancy Guard (Mutex)**: A lock variable that prevents re-entry
3. **OpenZeppelin's ReentrancyGuard**: Battle-tested protection

### Real-World Attacks
- The DAO (2016): $60 million drained
- Cream Finance (2021): $130 million lost
- Curve/Vyper exploit (2023): $70 million drained

### Key Takeaway
Always update state before making external calls. Use reentrancy guards as defense in depth.`,
            quiz: [
              {
                question: 'In a reentrancy attack, what happens during the malicious contract\'s receive() function?',
                options: ['It receives ETH and stores it', 'It calls back into the vulnerable contract to withdraw again', 'It logs the transaction', 'It pauses the contract'],
                correctIndex: 1,
                explanation: 'The malicious contract calls back into the vulnerable contract before state is updated, allowing repeated withdrawals.'
              },
              {
                question: 'What is the most reliable way to prevent reentrancy?',
                options: ['Using complex math', 'Checks-Effects-Interactions pattern and reentrancy guards', 'Making functions private', 'Using only view functions'],
                correctIndex: 1,
                explanation: 'Combine the Checks-Effects-Interactions pattern with reentrancy guards for defense in depth.'
              },
              {
                question: 'How much was stolen in The DAO reentrancy attack?',
                options: ['$1 million', '$10 million', '$60 million', '$500 million'],
                correctIndex: 2,
                explanation: 'The DAO hack drained approximately $60 million, leading to a contentious hard fork of Ethereum.'
              }
            ]
          },
          {
            id: 'auditing',
            title: 'Smart Contract Auditing',
            content: `## Smart Contract Auditing

Auditing is the process of systematically reviewing smart contract code for vulnerabilities before deployment.

### What is an Audit?
1. Manual review by security experts
2. Automated analysis with tools like Slither and Mythril
3. Formal verification (mathematical proofs)
4. Comprehensive testing including edge cases
5. Detailed report with severity levels

### Major Auditing Firms
Trail of Bits, OpenZeppelin, Consensys Diligence, Sigma Prime, Code4rena, Sherlock.

### Automated Tools
- **Slither**: Static analysis for known vulnerability patterns
- **Mythril**: Symbolic execution for finding bugs
- **Echidna/Foundry**: Fuzz testing with random inputs

### Finding Severity Levels
- **Critical**: Direct loss of funds, contract takeover
- **High**: Indirect loss, temporary freezing of funds
- **Medium**: Potential loss under specific conditions
- **Low**: Minor issues, best practice violations
- **Informational**: Suggestions for improvement

### Writing Auditable Code
- Clear naming and NatSpec documentation
- Events emitted for all state changes
- Custom errors instead of require strings
- Access control on all sensitive functions
- Test coverage above 95%
- No floating pragma (exact version)`,
            quiz: [
              {
                question: 'What is the purpose of a smart contract audit?',
                options: ['To optimize gas usage', 'To systematically review code for vulnerabilities before deployment', 'To compile the contract', 'To deploy to mainnet'],
                correctIndex: 1,
                explanation: 'An audit systematically reviews code for vulnerabilities before deployment — essential for contracts handling real funds.'
              },
              {
                question: 'What tool would you use for static analysis of Solidity code?',
                options: ['Remix', 'Slither', 'MetaMask', 'Etherscan'],
                correctIndex: 1,
                explanation: 'Slither is a popular static analysis tool that scans Solidity code for known vulnerability patterns.'
              },
              {
                question: 'What severity level indicates direct loss of funds?',
                options: ['Low', 'Medium', 'High', 'Critical'],
                correctIndex: 3,
                explanation: 'Critical severity indicates vulnerabilities that could lead to direct loss of funds or contract takeover.'
              }
            ]
          }
        ]
      },
      {
        id: 'deployment',
        title: 'Deployment',
        description: 'Learn to test, deploy, and interact with smart contracts in production environments.',
        lessons: [
          {
            id: 'testing',
            title: 'Testing Smart Contracts',
            content: `## Testing Smart Contracts

Thorough testing is critical for smart contract security. Unlike web applications, smart contract bugs can lead to permanent loss of funds.

### Testing Pyramid
1. **Unit Tests**: Test individual functions in isolation
2. **Integration Tests**: Test interactions between contracts
3. **Fuzz Tests**: Test with random inputs to find edge cases
4. **Invariant Tests**: Verify properties that should always hold true

### Writing Tests with Hardhat
Tests use Mocha/Chai framework. Structure tests with describe blocks and beforeEach for fresh contract state. Test the happy path, edge cases, access control, reentrancy, events, and failure cases.

### Writing Tests with Foundry
Foundry tests are written in Solidity (test functions prefixed with test). Built-in fuzz testing uses the testFuzz prefix. Use vm.prank to simulate different callers and vm.expectRevert for failure cases.

### Test Coverage
Run coverage to see which lines are tested. Aim for above 95% line coverage. Remember: high coverage does not guarantee correctness — you still need to test the right scenarios.

### Best Practices
1. Test the happy path and edge cases
2. Test access control (unauthorized users cannot call restricted functions)
3. Test reentrancy (malicious contracts cannot exploit external calls)
4. Test events are emitted correctly
5. Test failure cases with proper error messages
6. Use fixtures for consistent test environments`,
            quiz: [
              {
                question: 'Why is thorough testing especially important for smart contracts?',
                options: ['Smart contracts are harder to write', 'Bugs can lead to permanent loss of funds since contracts are immutable', 'Testing is free', 'Users expect perfect code'],
                correctIndex: 1,
                explanation: 'Smart contracts are immutable once deployed — bugs cannot be easily fixed and exploited vulnerabilities mean permanent fund loss.'
              },
              {
                question: 'What is fuzz testing?',
                options: ['Testing with predefined inputs', 'Testing with randomly generated inputs to find edge cases', 'Testing the user interface', 'Testing deployment scripts'],
                correctIndex: 1,
                explanation: 'Fuzz testing generates random inputs to discover edge cases that might cause unexpected behavior.'
              },
              {
                question: 'What test coverage percentage should you aim for?',
                options: ['50%', '75%', 'Above 95%', '100% is always achievable'],
                correctIndex: 2,
                explanation: 'Aim for above 95% coverage, but high coverage does not guarantee correctness — test the right scenarios too.'
              }
            ]
          },
          {
            id: 'deploying-to-testnet',
            title: 'Deploying to Testnet',
            content: `## Deploying to Testnet

After thorough local testing, deploy to a testnet to test in a real blockchain environment without risking real funds.

### Choosing a Testnet
- **Sepolia**: The primary Ethereum testnet (recommended)
- **Holesky**: For staking and validator testing

### Setting Up for Deployment
1. Get test ETH from a faucet (sepoliafaucet.com, Alchemy faucet)
2. Configure Hardhat with the testnet RPC URL and private key in .env
3. NEVER commit .env to git (add to .gitignore)

### Writing a Deployment Script
The script gets the contract factory, deploys with constructor arguments, waits for deployment, and optionally verifies on Etherscan.

### Deploying
Run: npx hardhat run scripts/deploy.ts --network sepolia

### Verifying on Etherscan
Verification publishes your source code on Etherscan, allowing anyone to read and audit it. Run: npx hardhat verify --network sepolia DEPLOYED_ADDRESS constructor_arg

### Post-Deployment Checklist
- Contract deployed and verified on Etherscan
- Constructor parameters are correct
- Test all functions through Etherscan interface
- Transfer ownership if needed
- Document the deployment (address, network, parameters)
- Test with small amounts before going to mainnet

### Mainnet Deployment
Get a professional audit, use a multisig for ownership, deploy with small initial amounts, and monitor closely.`,
            quiz: [
              {
                question: 'Why deploy to a testnet before mainnet?',
                options: ['Testnets are faster', 'To test in a real blockchain environment without risking real funds', 'Testnets have better features', 'It is required by Ethereum'],
                correctIndex: 1,
                explanation: 'Testnets simulate the real Ethereum environment using test ETH with no real value, allowing thorough testing without financial risk.'
              },
              {
                question: 'Why should you verify your contract on Etherscan?',
                options: ['To make it run faster', 'To publish source code so anyone can read and audit it', 'To reduce gas costs', 'To make it official'],
                correctIndex: 1,
                explanation: 'Verifying on Etherscan publishes your source code and matches it to deployed bytecode, enabling transparency and auditing.'
              },
              {
                question: 'What should you NEVER commit to version control?',
                options: ['Solidity files', 'Test files', 'Your .env file with private keys', 'Deployment scripts'],
                correctIndex: 2,
                explanation: 'Never commit .env files or any file containing private keys. Exposure means exposure of all associated funds.'
              }
            ]
          },
          {
            id: 'interacting-with-contracts',
            title: 'Interacting with Contracts',
            content: `## Interacting with Deployed Smart Contracts

Once deployed, you need to interact with your contract both programmatically and through user interfaces.

### Using Etherscan
The simplest way: go to the contract page, click "Read Contract" for view functions (free) or "Write Contract" for state-changing functions (requires wallet connection).

### Using Ethers.js
The most popular JavaScript library for Ethereum interaction. Connect to a provider, create a contract instance with the ABI and address, then call read functions (free) or send write transactions (costs gas). Listen for events in real-time.

### Using Viem (Modern Alternative)
A lighter, TypeScript-first library with excellent type safety and a functional API.

### Building a Frontend with React
Use wagmi hooks (useContractRead, useContractWrite) for seamless React integration with smart contracts.

### Working with ABIs
The ABI (Application Binary Interface) is a JSON description of a contract's functions, events, and parameters. It tells applications how to encode/decode data when calling functions.

### Transaction Lifecycle
1. Estimate gas (check if the transaction will succeed)
2. Send transaction (submit to the network)
3. Wait for confirmation (monitor the mempool)
4. Check receipt (verify success and logs)

### Best Practices
- Always estimate gas before sending
- Implement proper error handling
- Use event listeners for real-time updates
- Cache read results to reduce RPC calls
- Display transaction status to users`,
            quiz: [
              {
                question: 'What is an ABI?',
                options: ['A blockchain explorer', 'An Application Binary Interface that defines how to interact with a contract', 'A type of smart contract', 'A consensus mechanism'],
                correctIndex: 1,
                explanation: 'The ABI is a JSON description of a contract\'s functions, events, and parameters for encoding/decoding data.'
              },
              {
                question: 'What is the difference between reading and writing to a contract?',
                options: ['There is no difference', 'Reading is free; writing costs gas and requires a transaction', 'Writing is free; reading costs gas', 'Both cost the same amount of gas'],
                correctIndex: 1,
                explanation: 'Reading (view/pure functions) queries state and is free. Writing (state-changing functions) modifies the blockchain and requires gas.'
              },
              {
                question: 'What is Ethers.js used for?',
                options: ['Mining Ethereum', 'Interacting with the Ethereum blockchain from JavaScript', 'Creating new blockchains', 'Storing private keys'],
                correctIndex: 1,
                explanation: 'Ethers.js is the most popular JavaScript library for interacting with the Ethereum blockchain.'
              }
            ]
          }
        ]
      }
    ]
  },
  // ═══════════════════════════════════════════════════════════════
  // COURSE 4: TRADING & SECURITY
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'trading-security',
    title: 'Trading & Security',
    description: 'Master crypto trading fundamentals, portfolio management, and advanced security practices to protect and grow your digital assets.',
    difficulty: 'Intermediate',
    duration: '10 hours',
    students: '9,870',
    rating: 4.6,
    icon: 'TrendingUp',
    color: 'from-green-500 to-emerald-500',
    prerequisites: ['intro-to-crypto'],
    modules: [
      {
        id: 'technical-analysis',
        title: 'Technical Analysis',
        description: 'Learn to read charts, identify patterns, and use technical indicators for crypto trading.',
        lessons: [
          {
            id: 'chart-patterns',
            title: 'Chart Patterns',
            content: `## Chart Patterns in Crypto Trading

Chart patterns are visual formations on price charts that traders use to predict future price movements.

### Support and Resistance
**Support**: A price level where buying pressure prevents further decline (a "floor").
**Resistance**: A price level where selling prevents further rise (a "ceiling").
When support breaks, it often becomes resistance (and vice versa) — this is a "role reversal."

### Bullish Patterns
- **Inverse Head and Shoulders**: Three troughs with the middle lowest. Signals reversal from downtrend to uptrend.
- **Double Bottom (W Pattern)**: Price tests support twice and bounces. Confirmed when price breaks above resistance.
- **Cup and Handle**: Rounded bottom followed by a small pullback, indicating accumulation before breakout.

### Bearish Patterns
- **Head and Shoulders**: Three peaks with the middle highest. Signals reversal from uptrend to downtrend.
- **Double Top (M Pattern)**: Price tests resistance twice and fails. Confirmed when price breaks below support.
- **Rising Wedge**: Higher highs and higher lows with narrowing range, usually breaks downward.

### Continuation Patterns
- **Flags and Pennants**: Brief consolidation after a strong move, usually continuing in the original direction.
- **Triangles**: Ascending (usually breaks up), descending (usually breaks down), symmetrical (breaks either way).

### Volume Confirmation
Always check volume: breakouts with high volume are more reliable; low-volume breakouts often fail. Volume should decrease during consolidation and increase during breakouts.`,
            quiz: [
              {
                question: 'What happens when a support level is broken?',
                options: ['The price always recovers', 'It often becomes a resistance level (role reversal)', 'The market closes', 'Support levels cannot be broken'],
                correctIndex: 1,
                explanation: 'When support breaks, it often becomes resistance because traders who bought at that level are underwater and may sell when price returns.'
              },
              {
                question: 'What does a Head and Shoulders pattern indicate?',
                options: ['Continuation of the current trend', 'Potential reversal from uptrend to downtrend', 'The market is closed', 'A buying opportunity'],
                correctIndex: 1,
                explanation: 'Head and Shoulders (three peaks with the middle highest) signals a potential change from uptrend to downtrend.'
              },
              {
                question: 'Why is volume important when analyzing chart patterns?',
                options: ['Volume determines the price', 'Breakouts with high volume are more reliable; low volume breakouts often fail', 'Volume does not matter for crypto', 'Volume shows the number of wallets'],
                correctIndex: 1,
                explanation: 'Volume confirms the strength of a move. High-volume breakouts indicate strong conviction and are more likely to succeed.'
              }
            ]
          },
          {
            id: 'indicators',
            title: 'Technical Indicators',
            content: `## Technical Indicators for Crypto Trading

Technical indicators are mathematical calculations that help traders make informed decisions. The best approach combines multiple indicators.

### Moving Averages
- **SMA (Simple Moving Average)**: Average price over a period. 50-day for short-term, 200-day for long-term trend.
- **EMA (Exponential Moving Average)**: Gives more weight to recent prices. Common periods: 9, 21, 50, 200.
- **Golden Cross**: 50-day crosses above 200-day (bullish). **Death Cross**: Opposite (bearish).

### RSI (Relative Strength Index)
Measures speed and change of price movements (0-100). Above 70: overbought (potential pullback). Below 30: oversold (potential bounce).

### MACD (Moving Average Convergence Divergence)
Shows the relationship between two EMAs. Bullish when MACD crosses above signal line. Bearish when it crosses below.

### Bollinger Bands
Three lines: middle (20-day SMA) and two standard deviation bands. Squeeze = expect volatility. Price near upper band = potentially overbought.

### Fibonacci Retracement
Key levels: 23.6%, 38.2%, 50%, 61.8% (golden ratio, most important), 78.6%.

### Important Warnings
- Indicators are lagging — they follow price, not predict it
- No indicator works 100% of the time
- Crypto markets can be manipulated, distorting indicators
- Always use risk management regardless of indicator signals`,
            quiz: [
              {
                question: 'What does a Golden Cross signal?',
                options: ['A new cryptocurrency launch', 'The 50-day MA crossing above the 200-day MA — a bullish signal', 'A security breach', 'A new all-time high'],
                correctIndex: 1,
                explanation: 'A Golden Cross occurs when the short-term MA crosses above the long-term MA, signaling potential upward momentum.'
              },
              {
                question: 'What does an RSI reading above 70 indicate?',
                options: ['The asset is oversold', 'The asset is overbought and may be due for a pullback', 'The market is closed', 'It is a strong buy signal'],
                correctIndex: 1,
                explanation: 'RSI above 70 indicates overbought conditions — the asset has risen quickly and may be due for a pullback.'
              },
              {
                question: 'What is the most important Fibonacci retracement level?',
                options: ['23.6%', '38.2%', '50%', '61.8%'],
                correctIndex: 3,
                explanation: 'The 61.8% level (golden ratio) is the most important. Price often finds support or resistance at this level.'
              }
            ]
          },
          {
            id: 'risk-reward',
            title: 'Risk/Reward',
            content: `## Risk/Reward Ratios in Crypto Trading

Understanding risk/reward ratios is the single most important skill for long-term trading success.

### What is Risk/Reward?
Risk/Reward Ratio (R:R) compares potential loss to potential gain.

Formula: R:R = (Entry Price - Stop Loss) / (Take Profit - Entry Price)

Example: Buy BTC at $40,000, stop loss at $38,000 (risk $2,000), take profit at $46,000 (reward $6,000). R:R = 1:3.

### Why R:R Matters
With a 1:3 R:R, you only need to win 25% of trades to break even. This demonstrates why R:R is more important than win rate.

### Setting Stop Losses
Methods: percentage-based (risk 1-2% per trade), technical-based (below key support), ATR-based (volatility-adjusted), structure-based (below last swing low).

### Position Sizing with R:R
Position Size = (Portfolio x Risk%) / (Entry - Stop Loss). This ensures you never risk more than your predetermined percentage.

### Common Mistakes
1. Moving stop loss further away (increases risk)
2. Taking profits too early (reduces R:R)
3. Not setting a stop loss (one bad trade can wipe out many winners)
4. Risking too much per trade (above 5% is gambling)
5. Revenge trading (trying to make back losses)`,
            quiz: [
              {
                question: 'What is a 1:3 risk/reward ratio?',
                options: ['Risking $3 to make $1', 'Risking $1 to potentially make $3', 'A 33% win rate requirement', 'Three trades per day'],
                correctIndex: 1,
                explanation: 'A 1:3 R:R means risking $1 to potentially make $3. With this ratio, you need only a 25% win rate to break even.'
              },
              {
                question: 'What is the recommended risk per trade?',
                options: ['10-20%', '5-10%', '1-2%', '0.01%'],
                correctIndex: 2,
                explanation: 'Professional traders risk only 1-2% per trade, ensuring a string of losses does not devastate the portfolio.'
              },
              {
                question: 'What is a common risk management mistake?',
                options: ['Setting stop losses', 'Using proper position sizing', 'Moving stop losses further away to avoid being stopped out', 'Tracking trades in a journal'],
                correctIndex: 2,
                explanation: 'Moving stop losses further away increases risk and destroys your pre-calculated R:R ratio.'
              }
            ]
          }
        ]
      },
      {
        id: 'portfolio-management',
        title: 'Portfolio Management',
        description: 'Learn to build and manage a diversified crypto portfolio with proper position sizing and rebalancing.',
        lessons: [
          {
            id: 'diversification',
            title: 'Diversification',
            content: `## Crypto Portfolio Diversification

Diversification spreads investments across different assets to reduce risk. In crypto, proper diversification protects you from the failure of any single project.

### Why Diversify?
In 2022 alone: LUNA/UST collapsed from $60B market cap to near zero, FTX went bankrupt, and multiple major funds collapsed. Concentrated positions meant total loss.

### Diversification Layers
1. **By Category**: Store of Value (BTC), Smart Contract Platforms (ETH, SOL), DeFi Tokens (UNI, AAVE), Stablecoins (USDC, DAI)
2. **By Market Cap**: Large Cap (>$10B, lower risk), Mid Cap ($1-10B), Small Cap (<$1B, higher risk/reward)
3. **By Risk Level**: Conservative (60% BTC, 30% ETH, 10% stablecoins) to Aggressive (30% BTC, 25% ETH, 30% alts, 15% stablecoins)

### The Core-Satellite Approach
Core (60-80%): Bitcoin and Ethereum as your foundation. Satellite (20-40%): Altcoins for higher growth potential.

### Common Mistakes
1. Over-diversification (50+ tokens you cannot track)
2. Correlated assets (10 different L1 tokens is not real diversification)
3. Ignoring stablecoins (no buffer against volatility)
4. Following hype without research
5. Not rebalancing (letting winners concentrate risk)`,
            quiz: [
              {
                question: 'What is the "Core-Satellite" approach?',
                options: ['Investing only in satellites', 'Core (60-80%) in BTC/ETH for stability, Satellite (20-40%) in altcoins for growth', 'Putting everything in one token', 'Only investing in stablecoins'],
                correctIndex: 1,
                explanation: 'The Core-Satellite approach uses BTC/ETH as the stable foundation with a smaller allocation to higher-risk altcoins.'
              },
              {
                question: 'What happened to LUNA/UST in 2022?',
                options: ['It became the largest cryptocurrency', 'It collapsed from $60B market cap to near zero', 'It was acquired by Ethereum', 'Nothing notable'],
                correctIndex: 1,
                explanation: 'LUNA and UST collapsed in May 2022, wiping out approximately $60 billion. Concentrated positions meant total loss.'
              },
              {
                question: 'What is over-diversification in crypto?',
                options: ['Owning too many stablecoins', 'Holding too many tokens to effectively track and manage', 'Investing in too many blockchains', 'Spreading investments across different categories'],
                correctIndex: 1,
                explanation: 'Over-diversification occurs when you hold so many tokens that you cannot effectively research and manage each position.'
              }
            ]
          },
          {
            id: 'position-sizing',
            title: 'Position Sizing',
            content: `## Position Sizing in Crypto

Position sizing determines how much capital to allocate to each trade. It is the most important factor in long-term survival.

### Fixed Percentage Risk
Risk X% of portfolio per trade (typically 1-2%).

Formula: Position Size = (Portfolio Value x Risk %) / (Entry Price - Stop Loss Price)

Example: Portfolio $50,000, risk 1% ($500), entry $40,000, stop $38,000. Position size = $500 / $2,000 = 0.25 BTC ($10,000).

### Scaling In and Out
Enter positions in stages at different price levels (averaging your entry). Take partial profits at different targets. This reduces timing risk.

### Portfolio Allocation Models
- **Barbell Strategy**: 80% safe assets (BTC, ETH, stablecoins), 20% very risky assets. Nothing in the middle.
- **Equal Weight**: Divide equally among all holdings.
- **Market Cap Weight**: Allocate based on market cap. Naturally overweights BTC and ETH.

### Common Mistakes
1. Betting too big (above 5% risk per trade is gambling)
2. Doubling down on losing positions
3. FOMO sizing (bigger trades when afraid of missing out)
4. Not adjusting position size as portfolio changes
5. Ignoring correlation between positions`,
            quiz: [
              {
                question: 'What is the recommended risk per trade using fixed percentage risk?',
                options: ['10-20%', '5-10%', '1-2%', '0.01%'],
                correctIndex: 2,
                explanation: 'Professional traders risk 1-2% per trade, preserving capital even through strings of losses.'
              },
              {
                question: 'What is "scaling in" to a position?',
                options: ['Buying everything at once', 'Entering a position in stages at different price levels', 'Selling gradually', 'Moving your stop loss'],
                correctIndex: 1,
                explanation: 'Scaling in means entering in stages at different price levels, averaging your entry price.'
              },
              {
                question: 'What does the "Barbell Strategy" involve?',
                options: ['Investing in medium-risk assets', '80% safe assets and 20% very risky assets, nothing in between', 'Putting everything in one asset', 'Only investing in stablecoins'],
                correctIndex: 1,
                explanation: 'The Barbell Strategy allocates 80% to safe assets and 20% to very risky, high-reward assets.'
              }
            ]
          },
          {
            id: 'rebalancing',
            title: 'Rebalancing',
            content: `## Portfolio Rebalancing in Crypto

Rebalancing is the process of realigning your portfolio to its target allocation. It enforces "buy low, sell high" systematically.

### Why Rebalance?
Without rebalancing, your portfolio drifts from its target. If BTC rallies from 50% to 70% of your portfolio, your risk profile has changed dramatically.

### Rebalancing Methods
1. **Calendar Rebalancing**: Rebalance at fixed intervals (monthly or quarterly)
2. **Threshold Rebalancing**: Rebalance when any asset deviates by a set percentage (5-10%)
3. **Hybrid Approach**: Check at fixed intervals, only rebalance if threshold is exceeded

### Example
Initial: 50% BTC, 30% ETH, 20% SOL. After BTC rallies: 67% BTC, 20% ETH, 13% SOL.
Rebalance by selling BTC high and buying ETH and SOL low.

### Tax Considerations
Rebalancing triggers taxable events. Strategies: rebalance using new investments (buy underweight assets), use stablecoins as a buffer, harvest losses to offset gains.

### Best Practices
1. Set clear target allocations based on risk tolerance
2. Choose a method and stick to it
3. Consider tax implications before selling
4. Account for transaction costs
5. Do not rebalance too frequently
6. Document your strategy and track results`,
            quiz: [
              {
                question: 'What is portfolio rebalancing?',
                options: ['Buying more of your best-performing asset', 'Realigning your portfolio to its target allocation by selling winners and buying laggards', 'Selling everything and starting over', 'Converting all crypto to stablecoins'],
                correctIndex: 1,
                explanation: 'Rebalancing brings your portfolio back to target by selling overperforming assets and buying underperforming ones.'
              },
              {
                question: 'What is threshold rebalancing?',
                options: ['Rebalancing at fixed time intervals', 'Rebalancing when any asset deviates from target by a set percentage', 'Rebalancing only during bear markets', 'Never rebalancing'],
                correctIndex: 1,
                explanation: 'Threshold rebalancing triggers when any asset deviates from target by a predetermined percentage.'
              },
              {
                question: 'What is a disadvantage of frequent rebalancing?',
                options: ['Higher returns', 'Tax implications and transaction costs', 'Lower risk', 'Better diversification'],
                correctIndex: 1,
                explanation: 'Frequent rebalancing generates more taxable events and transaction costs that can eat into returns.'
              }
            ]
          }
        ]
      },
      {
        id: 'crypto-security',
        title: 'Crypto Security',
        description: 'Advanced security practices for protecting your crypto assets from theft, loss, and unauthorized access.',
        lessons: [
          {
            id: 'hardware-wallets',
            title: 'Hardware Wallets',
            content: `## Hardware Wallets: Maximum Security for Your Crypto

Hardware wallets store private keys offline in a secure chip, providing the highest level of security.

### How They Work
1. Generate and store private keys in a secure chip (never leaves the device)
2. Sign transactions internally (private keys never touch your computer)
3. Display transaction details on their own screen for verification
4. Communicate via USB or Bluetooth

### Major Brands
- **Ledger** ($79-$279): Most popular, uses custom secure element (closed-source firmware)
- **Trezor** ($69-$219): Original hardware wallet, fully open-source
- **GridPlus** ($397): Large screen, SafeCard system
- **Keystone** ($169): Air-gapped (QR code only), fully open-source

### Best Practices
- Purchase from official sources only (never eBay or third parties)
- Never enter your seed phrase on a computer — only on the device
- Always verify addresses on the device screen (malware can change addresses on your screen)
- Keep firmware updated
- Store seed phrase securely (metal backup recommended)
- Use a passphrase (25th word) for additional security

### When to Use One
Use a hardware wallet for any amount you cannot afford to lose. Use a hot wallet for small daily amounts and hardware wallet for savings.`,
            quiz: [
              {
                question: 'How does a hardware wallet protect your private keys?',
                options: ['By encrypting them with a password', 'By storing them offline in a secure chip that never exposes them to your computer', 'By backing them up to the cloud', 'By sharing them across multiple devices'],
                correctIndex: 1,
                explanation: 'Hardware wallets store private keys in a secure chip. Transaction signing happens internally, so even compromised computers cannot access your keys.'
              },
              {
                question: 'Why should you never buy a hardware wallet from eBay?',
                options: ['They are more expensive', 'The device could be tampered with to steal your funds', 'They do not come with a warranty', 'They have fewer features'],
                correctIndex: 1,
                explanation: 'Devices from unofficial sources could be tampered with — pre-configured with an attacker\'s seed phrase or modified to leak keys.'
              },
              {
                question: 'Why verify addresses on the hardware wallet screen?',
                options: ['The screen is bigger', 'Malware could display a different address on your computer than the actual one', 'It looks more professional', 'It is faster'],
                correctIndex: 1,
                explanation: 'Address-changing malware can modify addresses on your screen. The hardware wallet shows the actual address being used.'
              }
            ]
          },
          {
            id: 'multi-sig',
            title: 'Multi-Signature Wallets',
            content: `## Multi-Signature (Multi-Sig) Wallets

Multi-sig wallets require multiple private keys to authorize a transaction. They are the gold standard for organizational treasury management and high-security storage.

### What is Multi-Sig?
A smart contract that requires M-of-N signatures to execute. Common: 2-of-3 (any 2 of 3 must sign), 3-of-5, 2-of-2.

### Benefits
- No single point of failure (one compromised key does not compromise funds)
- Shared control (multiple people must agree)
- Theft prevention (attacker needs multiple keys)
- Disaster recovery (lose one key, others can still access funds)

### Safe (formerly Gnosis Safe)
The most widely-used multi-sig wallet on Ethereum, securing billions of dollars. Features include multi-sig, spending limits, and modules. Used by most major DAOs and crypto companies.

### Multi-Sig for Individuals
Even individuals benefit: 2-of-3 with one key on hardware wallet, one in a safe, one with a trusted person. If you lose one key, you can still access funds.

### Best Practices
1. Geographically distribute keys
2. Use different people with different security setups
3. Test the recovery process regularly
4. Document procedures for signing and recovery
5. Use hardware wallets for each signer
6. Consider time locks for large transactions`,
            quiz: [
              {
                question: 'What does "2-of-3" mean in a multi-sig wallet?',
                options: ['Two wallets hold three cryptocurrencies', 'Any 2 of 3 key holders must sign to authorize a transaction', 'The wallet costs $23', 'It takes 2 to 3 days to process'],
                correctIndex: 1,
                explanation: 'A 2-of-3 multi-sig requires any 2 out of 3 key holders to sign before a transaction executes.'
              },
              {
                question: 'What is the primary benefit of a multi-sig wallet?',
                options: ['Lower transaction fees', 'No single point of failure — multiple keys must be compromised', 'Faster transactions', 'Better privacy'],
                correctIndex: 1,
                explanation: 'Multi-sig eliminates single points of failure. An attacker would need to compromise multiple keys in different locations.'
              },
              {
                question: 'Should individuals use multi-sig wallets?',
                options: ['No, only organizations should use them', 'Yes, for significant holdings — it provides better security and recovery options', 'No, they are too complicated', 'Yes, but only for Bitcoin'],
                correctIndex: 1,
                explanation: 'Individuals with significant holdings benefit from multi-sig for better security and recovery options.'
              }
            ]
          },
          {
            id: 'phishing-defense',
            title: 'Phishing Defense',
            content: `## Defending Against Crypto Phishing

Phishing is the most common attack vector in crypto. Attackers use increasingly sophisticated methods to steal your assets.

### Types of Crypto Phishing
1. **Fake Websites**: Perfect replicas of DeFi platforms with slightly different URLs. Defense: bookmark official sites, check URLs character by character.
2. **Fake Support**: Attackers posing as support on Discord/Telegram. Defense: real support NEVER DMs first, NEVER asks for seed phrases.
3. **Malicious Airdrops**: Unsolicited tokens that drain your wallet when you interact. Defense: do not interact with unknown tokens.
4. **Malicious Transactions**: "Claim rewards" that actually transfer your tokens. Defense: read transaction details before signing.
5. **Clipboard Malware**: Changes crypto addresses in your clipboard. Defense: verify addresses after pasting.
6. **Ice Phishing**: Getting you to approve unlimited token spending to an attacker. Defense: check spender addresses, set specific approval amounts.

### Security Tools
- **Revoke.cash**: Review and revoke token approvals
- **Pocket Universe**: Browser extension warning about malicious transactions
- **ScamSniffer**: Detects phishing sites

### Golden Rules
1. Never share your seed phrase — no exceptions
2. Verify URLs — bookmark and use only bookmarks
3. Read transactions before signing
4. Be skeptical — if it sounds too good to be true, it is
5. Do not rush — urgency is a red flag
6. Use hardware wallets
7. Keep software updated`,
            quiz: [
              {
                question: 'What is "ice phishing"?',
                options: ['Phishing in cold weather', 'Tricking you into approving unlimited token spending to an attacker', 'A type of hardware wallet', 'Phishing through email only'],
                correctIndex: 1,
                explanation: 'Ice phishing involves tricking victims into signing token approval transactions that grant an attacker unlimited access to their tokens.'
              },
              {
                question: 'What should you do if someone DMs you claiming to be support?',
                options: ['Share your seed phrase to verify', 'Ignore them — real support never DMs first and never asks for seed phrases', 'Click their link immediately', 'Send them crypto for help'],
                correctIndex: 1,
                explanation: 'Real support never DMs first and never asks for seed phrases. Anyone who does is a scammer.'
              },
              {
                question: 'What is Revoke.cash used for?',
                options: ['Converting crypto to cash', 'Reviewing and revoking token approvals granted to smart contracts', 'Creating new wallets', 'Buying cryptocurrency'],
                correctIndex: 1,
                explanation: 'Revoke.cash lets you review and revoke token approvals, an important security practice.'
              }
            ]
          }
        ]
      },
      {
        id: 'tax-compliance',
        title: 'Tax & Compliance',
        description: 'Understand crypto tax obligations, record-keeping best practices, and the evolving regulatory landscape.',
        lessons: [
          {
            id: 'record-keeping',
            title: 'Record Keeping',
            content: `## Crypto Record Keeping

Accurate record keeping is essential for tax compliance, portfolio tracking, and dispute resolution.

### What to Record
For every transaction: date/time, type (buy, sell, swap, receive, send), asset, amount, fiat value at the time, fees, counterparty, and purpose.

### Taxable Events
- Selling crypto for fiat
- Trading one crypto for another
- Spending crypto on goods or services
- Receiving crypto as income
- Mining and staking rewards
- Airdrops (in many jurisdictions)

### Non-Taxable Events
- Buying crypto with fiat (but establish cost basis)
- Transferring between your own wallets
- Holding (no tax until you sell)

### Tools for Record Keeping
- **Koinly**: Supports 800+ integrations, generates tax reports
- **CoinTracker**: Integrates with TurboTax
- **TokenTax**: Full-service with tax professional support
- **CoinLedger**: Easy-to-use with DeFi support

### Cost Basis Methods
- **FIFO** (First In, First Out): Sell oldest coins first
- **LIFO** (Last In, First Out): Sell newest coins first
- **HIFO** (Highest In, First Out): Sell highest-cost coins first
- **Specific Identification**: Choose exactly which lots to sell`,
            quiz: [
              {
                question: 'What information should you record for every crypto transaction?',
                options: ['Only the amount', 'Date, type, asset, amount, fiat value, fees, and purpose', 'Just the wallet address', 'Only taxable transactions'],
                correctIndex: 1,
                explanation: 'Record date/time, type, asset, amount, fiat value, fees, counterparty, and purpose for complete compliance.'
              },
              {
                question: 'Which is typically a taxable event?',
                options: ['Buying Bitcoin with USD', 'Transferring between your own wallets', 'Trading ETH for USDC', 'Holding without selling'],
                correctIndex: 2,
                explanation: 'Trading one crypto for another is a taxable event — you are disposing of one asset and acquiring another.'
              },
              {
                question: 'What does FIFO mean for crypto taxes?',
                options: ['First In, First Out — selling the oldest coins first', 'Fees In, Fees Out', 'First Investment, Final Outcome', 'Fully Insured Financial Operations'],
                correctIndex: 0,
                explanation: 'FIFO means when you sell, you are considered to be selling the coins you acquired first.'
              }
            ]
          },
          {
            id: 'tax-basics',
            title: 'Tax Basics',
            content: `## Crypto Tax Basics

Understanding cryptocurrency taxation is crucial for every investor. Most jurisdictions treat crypto as property, not currency.

### Capital Gains Tax
When you sell, trade, or spend crypto, you realize a capital gain or loss.
- **Short-term** (held less than 1 year): Taxed at ordinary income rates (10-37% in the US)
- **Long-term** (held more than 1 year): Taxed at lower rates (0-20% in the US)

### Income Tax Events
Some activities are taxed as ordinary income: mining rewards, staking rewards, airdrops, getting paid in crypto, referral rewards.

### Crypto-to-Crypto Trades
Trading one crypto for another is taxable: calculate gain/loss on the disposed crypto, and the new crypto gets a cost basis equal to its value at the time of the swap.

### Tax-Loss Harvesting
Sell losing positions to offset gains. Net losses can offset up to $3,000 of ordinary income (US). Excess losses carry forward.

### Common Mistakes
1. Not reporting (ignoring crypto taxes leads to penalties)
2. Ignoring small trades (every trade is taxable)
3. Forgetting DeFi (yield farming, LP rewards are taxable)
4. Wrong cost basis method
5. Not tracking fees (transaction fees are part of cost basis)

### Disclaimer
Tax laws vary significantly by jurisdiction. Always consult a qualified tax professional.`,
            quiz: [
              {
                question: 'What is the difference between short-term and long-term capital gains?',
                options: ['There is no difference', 'Short-term (held less than 1 year) is taxed at higher rates; long-term at lower rates', 'Long-term gains are not taxed', 'Short-term gains are always tax-free'],
                correctIndex: 1,
                explanation: 'Short-term gains are taxed at ordinary income rates, while long-term gains receive preferential lower rates.'
              },
              {
                question: 'Is trading one cryptocurrency for another a taxable event?',
                options: ['No, only converting to fiat is taxable', 'Yes, it is treated as disposing one asset and acquiring another', 'Only if profitable', 'Only in certain countries'],
                correctIndex: 1,
                explanation: 'Crypto-to-crypto trades are taxable events — you dispose of one asset and acquire another with a new cost basis.'
              },
              {
                question: 'What is tax-loss harvesting?',
                options: ['Avoiding taxes entirely', 'Selling losing positions to offset capital gains and reduce tax liability', 'Harvesting crypto from mining', 'Claiming fake losses'],
                correctIndex: 1,
                explanation: 'Tax-loss harvesting sells positions at a loss to offset capital gains from profitable sales, reducing overall tax liability.'
              }
            ]
          },
          {
            id: 'regulatory-landscape',
            title: 'Regulatory Landscape',
            content: `## Crypto Regulatory Landscape

The regulatory environment for cryptocurrency is rapidly evolving worldwide.

### United States
- **SEC**: Treats many tokens as securities. Has pursued enforcement against Ripple, Coinbase, Binance.
- **CFTC**: Considers Bitcoin and Ethereum as commodities.
- **IRS**: Treats crypto as property for tax purposes.
- Bitcoin and Ethereum spot ETFs approved in 2024.

### European Union
**MiCA (Markets in Crypto-Assets)**: Comprehensive framework covering licensing, stablecoin regulations, consumer protections, and market abuse prevention. Fully implemented by end of 2024.

### Asia
- **Japan**: Progressive regulation, licensed exchanges
- **Singapore**: Regulates crypto under the Payment Services Act
- **China**: Banned crypto trading and mining (2021)
- **Hong Kong**: Opening up with licensed exchange framework

### Key Regulatory Themes
1. **KYC/AML**: Exchanges must verify identities and report suspicious activity
2. **Stablecoin Regulation**: Growing focus on reserves, auditing, and redemption rights
3. **DeFi Regulation**: How to regulate decentralized protocols (targeting frontends, developers, or users)
4. **CBDCs**: Over 100 countries exploring digital versions of national currencies

### Staying Compliant
Use regulated exchanges, keep records, report honestly, stay informed, consult professionals, and use compliance tools.`,
            quiz: [
              {
                question: 'What is MiCA?',
                options: ['A cryptocurrency', 'The EU\'s comprehensive crypto regulatory framework', 'A mining algorithm', 'A type of wallet'],
                correctIndex: 1,
                explanation: 'MiCA (Markets in Crypto-Assets) is the EU\'s comprehensive regulatory framework covering licensing, stablecoins, and consumer protection.'
              },
              {
                question: 'What does KYC stand for?',
                options: ['Keep Your Crypto', 'Know Your Customer', 'Key Yield Calculation', 'Knowledge Year Certification'],
                correctIndex: 1,
                explanation: 'KYC (Know Your Customer) refers to identity verification requirements that financial institutions must follow.'
              },
              {
                question: 'How does the SEC view most crypto tokens?',
                options: ['As commodities', 'As securities that should be regulated under securities law', 'As currency', 'As property with no regulation'],
                correctIndex: 1,
                explanation: 'The SEC has taken the position that many crypto tokens are securities subject to securities law regulation.'
              }
            ]
          }
        ]
      }
    ]
  },
];

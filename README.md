# Soroban React template

## Description

Soroban React template is a React template designed for Soroban smart contracts.

## Installation

```bash
# Clone the Repository
git clone https://github.com/your-username/soroban-react-template.git

# Alternatively, use stellar-contract-init
stellar-contract-init -f https://github.com/capatinprinz/soroban-react-template.git
```
## Setting Up Environment Variables

To configure the Soroban React template for your environment, follow these steps:

1. **Create `.env` File**: 
   - Open your favorite text editor.
   - Create a new file named `.env` in the root directory of your project.

2. **Specify Environment Variables**:
   - Inside the `.env` file, define the following variables:
     ```bash
     NETWORK=<network-name>
     ACCOUNT=<account-name>
     NETWORK_PASSPHRASE=<network-passphrase>
     RPC_URL=<rpc-url>
     ```
     Replace `<network-name>`, `<account-name>`, `<network-passphrase>`, and `<rpc-url>` with the specific values relevant to your project.

3. **Save the File**:
   - Save the `.env` file in the root directory of your project.

These environment variables are crucial for configuring your Soroban React template to communicate with the Stellar network via the CLI. They ensure that your application can securely access and interact with the necessary network resources.

## Running the Project

To run the Soroban React template project, follow these steps:

1. **Initialize Project**:
   - Open your terminal.
   - Run the following command to initialize the project:
     ```bash
     npm install
     npm run setup
     ```
   - This command executes the `initialize.js` file, which performs the following tasks:
     - Initializes the network configuration for the project.
     - Creates necessary accounts and funds them.
     - Generates WebAssembly (wasm) files for contract building.
     - Deploys the contracts on the registered network.
     - Builds TypeScript bindings for the contracts.

2. **Start Frontend Server**:
   - After initializing the project, start the frontend development server by running:
     ```bash
     npm run dev
     ```
   - This command launches the React frontend, making it accessible at the specified localhost address.

These steps ensure that your Soroban React template project is set up correctly and ready for development and interaction with the deployed smart contracts.

## Interacting with the Contract

Once the Soroban React template project is set up and the contracts are deployed, developers can interact with them by importing and utilizing TypeScript bindings that have been generated earlier. This template does not automatically generate client libraries but instead provides developers with the flexibility to import these clients from the TypeScript bindings.

1. **Import TypeScript Bindings**:
   Developers can import the TypeScript bindings generated for the contracts into their project. These bindings provide access to the contract functions and data structures defined in the smart contracts.

2. **Access and Interact with Contracts**:
   Utilize the imported TypeScript bindings to interact with the deployed smart contracts. This includes calling contract functions, querying contract states, and handling transactions directly from the application logic.

3. **Customization via Environment Variables**:
   Customize the behavior of the Soroban React template by modifying the environment variables. These variables are typically stored in a `.soroban` directory or a `.env` file in the project root. They control aspects such as network configuration (`NETWORK`, `ACCOUNT`, `NETWORK_PASSPHRASE`, `RPC_URL`) necessary for interacting with the Stellar blockchain and the deployed contracts.

The `.soroban` directory maintains records of deployed contract IDs, providing transparency and accountability for the contracts that have been deployed and are currently active within the application.

This approach ensures that developers have full control over contract interaction and project customization, leveraging TypeScript bindings and environment variables effectively to integrate Soroban smart contracts into their React applications.




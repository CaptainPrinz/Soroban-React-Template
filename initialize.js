import "dotenv/config"
import { execSync } from "child_process"
import { globSync } from "glob"
import path from "path"
import { writeFileSync, rmSync } from "fs"

//Create An object to hold the Contract IDs and Alias
const contractsObject = {};

//Create a wrapper around execSync function to handle errors and makes its return easily available withing the script
const run = (command) => {
    try {
        const output = execSync(command, { stdio: ['inherit', 'pipe', 'pipe'] });
        console.log("Here comes the output\n")
        return output.toString();
    } catch (error) {
        console.error('Error executing command: \n', error.message);
        return null; // or throw error if you want to propagate it
    }
}

//Configure the network for the project
console.log("Configuring Network")
run(`stellar network add ${process.env.NETWORK} --rpc-url ${process.env.RPC_URL} --network-passphrase "${process.env.NETWORK_PASSPHRASE}"`)

//Generate and fund the Wallet Profile for the project
run(`stellar keys generate ${process.env.ACCOUNT} --network ${process.env.NETWORK}`)

//Delete Remove all pre-existing Wasm Files


const existingFiles = globSync("target/**.wasm");

console.log(`Existing Files ${existingFiles}`);

existingFiles.forEach((filePath, index) => {
    try {
        console.log(`Deleting ${path.basename(filePath)} ${index+1} out of ${existingFiles.length}`)
        rmSync(filePath)
    } catch(err) {
        console.error(`Error while deleting Files \n ${err}`)
    }
});

//Build Wasm Contract Files
run("stellar contract build")

//Deploy Contract Wasm and save the contact Ids and Aliases
const files =  globSync("target/wasm32-unknown-unknown/release/*.wasm");
let alias, contractId;
console.log(files);
files.forEach((file) => {
    alias = path.basename(file).split(".")[0];
    console.log(`Deploying Contract ${alias}`)
    contractId = run(`stellar contract deploy --network ${process.env.NETWORK} --source ${process.env.ACCOUNT} --wasm ${file} --alias ${alias}`)
    //save contractId and alias to contracts Object
    contractsObject[alias] = {
        alias,
        id: contractId
    }
});

//Create a json File to store the contract name as key and contract id and contract alias contained in an object as value
const contractsJSONPath = "./contracts.json";
const contractsJSONData = JSON.stringify(contractsObject);

try {
    writeFileSync(contractsJSONPath, contractsJSONData);
    console.log(`JSON file has been saved to ${contractsJSONPath}`);
} catch (err) {
    console.error('Error writing JSON file: ', err);
}

//Generate Contract Typescript Bindings
let filename, output_dir;
files.forEach((file) => {
    filename = path.basename(file).split(".")[0];
    output_dir = `./packages/${filename}`;
    run(`stellar contract bindings typescript --output-dir ${output_dir} --overwrite --network ${process.env.NETWORK} --contract-id ${contractsObject[alias]["id"]}`)
});

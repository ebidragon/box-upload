const path = require('path');
require('dotenv').config({path: path.join(__dirname, '.env')});
const fs = require('fs');
const boxSDK = require('box-node-sdk');
const TokenStore = require('./token-store.js');
const sdkConfig = {
  boxAppSettings: {
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
  }
};
const sdk = boxSDK.getPreconfiguredInstance(sdkConfig);

const [nodePath, scriptPath, subCommand, userID, folderID, filePath] = process.argv;
if (!subCommand || !['get', 'getItems', 'upload'].includes(subCommand) || !userID || !folderID) {
  console.error(`Usage: ${path.basename(nodePath)} ${path.basename(scriptPath)} {get|getItems|upload} <userID> <folderID> [<filePath>]`);
  process.exit(1);
} else if (subCommand === 'upload' && !filePath) {
  console.error(`Usage: ${path.basename(nodePath)} ${path.basename(scriptPath)} upload <userID> <folderID> <filePath>`);
  process.exit(1);
} else if (subCommand === 'upload' && !fs.existsSync(filePath)) {
  console.error('filePath not exists');
  process.exit(1);
}

const tokenStore = new TokenStore(userID);
const tokenInfo = (() => {
  let readData;
  tokenStore.read((err, data) => {
    if (err) {
      console.error(err);
      process.exit(1);
    } else {
      readData = data;
    }
  });
  return readData;
})();
const client = sdk.getPersistentClient(tokenInfo, tokenStore);

(async () => {
  switch (subCommand) {
    case 'get':
      await client.folders.get(folderID)
        .then(folder => {
          console.log(folder.name);
        })
        .catch(err => {
          console.error(err);
          process.exit(1);
        });
      break;
    case 'getItems':
      await client.folders.getItems(folderID)
        .then(items => {
          console.log(items.entries.map(item => item.name));
        })
        .catch(err => {
          console.error(err);
          process.exit(1);
        });
      break;
    case 'upload': {
      const fileName = path.basename(filePath);
      const stream = fs.createReadStream(filePath);
      await client.files.uploadFile(folderID, fileName, stream)
        .then(file => {
          console.log(file.entries[0].name + ' (' + file.entries[0].size + ')');
        })
        .catch(err => {
          console.error(err);
          process.exit(1);
        });
      break;
    }
  }
})();

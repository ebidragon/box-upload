# box-upload

## Installation
```bash
npm install
```

## Configuration
### .env
```bash
cp .env.example .env
```
1. Get your app credentials in the [Box Developer Console](https://app.box.com/developers/console)
2. Copy `Client ID` to [.env](.env) `CLIENT_ID`
3. Copy `Client Secret` to [.env](.env) `CLIENT_SECRET`
### token (user_id.json)
- [user_id](https://developer.box.com/platform/appendix/locating-values/#user-ids)
```bash
cp token/user_id.json.example token/2267862105.json
```
1. Get token info using [Box-node.js-SKD-with-OAuth-2.0](https://github.com/box-community/Box-node.js-SKD-with-OAuth-2.0/)
2. Execute method `console.log(req.session.user_token);` at [line 51](https://github.com/box-community/Box-node.js-SKD-with-OAuth-2.0/blob/5058878c7658c9f78e06c3ac798dd0f33bea2871/index.js#L51)
3. Copy token info to [token/user_id.json](token/user_id.json) `accessToken` `refreshToken` `accessTokenTTLMS` `acquiredAtMS`

## Usage
- [user_id](https://developer.box.com/platform/appendix/locating-values/#user-ids)
- [folder_id](https://developer.box.com/platform/appendix/locating-values/#content-ids)
```bash
USER_ID='2267862105'
FOLDER_ID='9876543210'
FILE_PATH='/home/username/test.txt'

node index.js get $USER_ID $FOLDER_ID
node index.js getItems $USER_ID $FOLDER_ID
node index.js upload $USER_ID $FOLDER_ID $FILE_PATH
```

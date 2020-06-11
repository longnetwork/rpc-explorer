# LONG RPC Explorer http://explorer.crypton.cf/


# Features

* Browse blocks
* View block details
* View transaction details, with navigation "backward" via spent transaction outputs
* View JSON content used to generate most pages
* Search by transaction ID, block hash/height, and address
* Optional transaction history for addresses by querying configurable ElectrumX servers
* Mempool summary, with fee, size, and age breakdowns
* RPC command browser and terminal
* Supports Electrum Specific commands included in longcoin node

## Prerequisites

Required options in the longcoin.conf:
`txindex=1`
`addressindex=1`
`timestampindex=1`
`spentindex=1`
`maxmempool=300`
`dbcache=450`
`maxconnections=125`
`rpcuser=user`
`rpcpassword=password`
`rpcport=8878`
`rpcthreads=2`
`rpcworkqueue=1024`

## Instructions for Installation

```bash
git clone https://github.com/longnetwork/rpc-explorer.git
cd rpc-explorer
npm install
npm audit fix
npm update
sudo npm install -g n
sudo n 9.11.2
sudo npm install -g forever
```
## Instructions for Start

```bash
cd rpc-explorer
export BTCEXP_IPSTACK_APIKEY="Your API KEY on https://ipstack.com/signup/free"
n use 9.11.2 ./bin/cli.js -p 8080 -C LONG -H 127.0.0.1 -P 8878 -u user -w password -E standalone
```
See http://localhost:8080

## Launch as a process (see start-rpcexplorer.sh)

```bash
cd rpc-explorer
export BTCEXP_IPSTACK_APIKEY="Your API KEY on https://ipstack.com/signup/free"
forever start --id "rpcexplorer" \
-a -l ./rpcexplorer.log -o ./rpcexplorer.log -e ./rpcexplorer.log \
--minUptime 10000 --spinSleepTime 10000 \
-c "n use 9.11.2" ./bin/cli.js -p 8080 -C LONG -H 127.0.0.1 -P 8878 -u user -w password -E standalone
```
for control: `forever list`
for stop: `forever stop rpcexplorer`


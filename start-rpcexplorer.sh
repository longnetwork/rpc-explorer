#!/bin/bash

# sudo npm install -g n
# sudo n 9.11.2
# sudo npm install -g forever



#cd /root/rpc-explorer/


export BTCEXP_IPSTACK_APIKEY="Your API KEY on https://ipstack.com/signup/free"

forever start --id "rpcexplorer" \
-a -l ./rpcexplorer.log -o ./rpcexplorer.log -e ./rpcexplorer.log \
--minUptime 10000 --spinSleepTime 10000 \
-c "n use 9.11.2" ./bin/cli.js -i 127.0.0.1 -p 8080 -C LONG -H 127.0.0.1 -P 8878 -u user -w password -E standalone


# forever list
# forever stop rpcexplorer


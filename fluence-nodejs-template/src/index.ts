import { Fluence, KeyPair } from '@fluencelabs/fluence';
import { krasnodar } from '@fluencelabs/fluence-network-environment';
import { 
  getRelayTimestamp,
  getGossipDelay1,
  getGossipDelay2,
  getGossipDelay3,
  getGossipDelay4,
  getGossipDelay5

 } from './_aqua/export';

// a node in Krasnodar network to connect to
// NOTE: please, choose another index for your app :)
const relay = krasnodar[3];

// private key for own peer
// NOTE: please, create a new one with `npx aqua create_keypair` command
const sk = Buffer.from('SVz4T4yW718wt0rziDVOfiv6+WQbS4lvEtJHEieXcAk=', 'base64');

async function main() {
    // Here is where we create our peer and connect to the network
    await Fluence.start({
        KeyPair: await KeyPair.fromEd25519SK(sk),
        connectTo: relay,
    });

    // Fluence.getStatus() returns useful information about peer and it's connection
    console.log('own peer id: ', Fluence.getStatus().peerId);
    console.log('connected to relay: ', Fluence.getStatus().relayPeerId);
    console.log('---\n');

    // here we call aqua function from typescript
    const timestamp = await getRelayTimestamp();
   
    let node = null
    let id = 0

    for(let i=0; i<4; i++){
   id = Math.floor(Math.random()*(5-1+1)+1)
    switch(id){
      case 1:
      const node1 = await getGossipDelay1()
      console.log('gossip-srv-',id,node + 1)
      break
      case 2:
      const node2 = await getGossipDelay2()
      console.log('gossip-srv-',id,node + 1)
      break
      case 3:
      const node3 = await getGossipDelay3()
      console.log('gossip-srv-',id,node + 1)
      break
      case 4:
      const node4 = await getGossipDelay4()
      console.log('gossip-srv-',id,node + 1)
      break
      case 5:
      const node5 = await getGossipDelay5()
      console.log('gossip-srv-',id,node5 + 1)
      break
    }
    console.log('gossip-srv-',id,node + 1)
  }

    console.log(new Date(timestamp));

    console.log('\n\npress any key to quit...');

    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.on('data', async () => {
        // Stopping the peer before exiting application \ unit test \ etc is a good practice
        await Fluence.stop();
        process.exit(0);
    });
}




main().catch((err) => console.error(err));

import ganache, { JsonRpcPayload, JsonRpcResponse } from "ganache-core"
import memdown from "memdown"
import promisify from "util.promisify"
    
export interface Transaction {
    to: string,
    value: string,
    data: string
}

export class SimulatorEngine {

    provider: ganache.Provider
    sendAsync: (arg: JsonRpcPayload) => Promise<JsonRpcResponse | undefined>

    constructor(nodeUrl: string) {
        const db: any = memdown()
        const options: any = { db, db_path: "/", fork: nodeUrl, gasLimit: 100000000, gasPrice: 0 }
        this.provider = ganache.provider(options)
        this.sendAsync = promisify(this.provider.send.bind(this.provider))
    }
    
    async send (method: string, params: any[]) {
        return (await this.sendAsync({ jsonrpc: "2.0", method, params }))?.result
    }
    
    async sendTransaction (from: string, tx: Transaction) {
        return await this.send("eth_sendTransaction", [{...tx, from, gasPrice: 0, gasLimit: 10000000}])
    }
    
    async unlock (account: string) {
        await this.send("evm_unlockUnknownAccount", [account])
    }
}
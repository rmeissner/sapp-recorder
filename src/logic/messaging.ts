import {
    getSDKVersion,
    SDKMessageEvent,
    MethodToResponse,
    Methods,
    SafeInfo,
    MessageFormatter,
    RequestId,
    Transaction,
    RPCPayload
} from '@gnosis.pm/safe-apps-sdk'
import { SimulatorEngine } from './simulator'

export interface MessageHandlers {
    onTransactionProposal: (transactions: Transaction[], requestId: RequestId) => Promise<string>
}

export class FrameCommunicator {
    constructor(
        readonly frame: React.RefObject<HTMLIFrameElement>,
        readonly engine: SimulatorEngine,
        readonly appUrl: string,
        readonly info: SafeInfo,
        readonly handlers: MessageHandlers
    ) { }

    handleMessage(
        method: Methods,
        params: unknown,
        requestId: RequestId
    ) {
        console.log(`Received ${method} (${requestId}) with ${JSON.stringify(params)}`)
        if (!method) {
            console.error('ThirdPartyApp: A message was received without message id.')
            return
        }

        switch (method) {
            case 'sendTransactions': {
                if (params) {
                    const communicator = this
                    this.handlers.onTransactionProposal(
                        // @ts-expect-error explore ways to fix this
                        params.txs as Transaction[],
                        requestId,
                    ).then(
                        (resp: any) => {
                            communicator.sendResponse({ safeTxHash: resp}, requestId)
                        }, (err: any) => {
                            communicator.sendError(err, requestId)
                        }
                    )
                }
                break
            }

            case 'getEnvInfo': {
                this.sendResponse({ txServiceUrl: "" }, requestId)
                break
            }

            case 'getSafeInfo': {
                this.sendResponse(this.info, requestId)
                break
            }

            case 'rpcCall': {
                const payload = params as RPCPayload
                const communicator = this
                try {
                    this.engine.send(payload.call, payload.params).then(
                        (resp: any) => {
                            communicator.sendResponse(resp, requestId)
                        }, (err: any) => {
                            communicator.sendError(err, requestId)
                        }
                    )
                } catch (err) {
                    communicator.sendError(err, requestId)
                }
                break
            }

            default: {
                console.error(`ThirdPartyApp: A message was received with an unknown method ${method}.`)
                this.sendError(`Unknown method ${method}.`, requestId)
                break
            }
        }
    }

    onMessage(message: SDKMessageEvent) {
        if (message.source === window) {
            return
        }
        if (!this.appUrl.includes(message.origin)) {
            console.error(`ThirdPartyApp: A message was received from an unknown origin ${message.origin}`)
            return
        }
        this.handleMessage(message.data.method, message.data.params, message.data.id)
    }

    sendResponse(
        data: MethodToResponse[Methods],
        requestId: RequestId
    ) {
        const frameWindow = this.frame.current?.contentWindow
        if (!frameWindow) return
        const sdkVersion = getSDKVersion()
        const msg = MessageFormatter.makeResponse(requestId, data, sdkVersion)
        frameWindow.postMessage(msg, this.appUrl)
    }

    sendError(
        error: string,
        requestId: RequestId
    ) {
        const frameWindow = this.frame.current?.contentWindow
        if (!frameWindow) return
        const sdkVersion = getSDKVersion()
        const msg = MessageFormatter.makeErrorResponse(requestId, error, sdkVersion)
        frameWindow.postMessage(msg, this.appUrl)
    }

    connect(defaultWindow?: Window): (() => void) | undefined {
        const eventWindow = defaultWindow || this.frame.current?.contentWindow
        if (!eventWindow) return
        const callback = (ev: MessageEvent<any>) => { this.onMessage(ev) }
        eventWindow.addEventListener('message', callback)
        return () => {
            eventWindow.removeEventListener('message', callback)
        }
    }
}
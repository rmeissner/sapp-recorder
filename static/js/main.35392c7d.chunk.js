(this["webpackJsonpsapp-browser"]=this["webpackJsonpsapp-browser"]||[]).push([[0],{1002:function(e,n){},1019:function(e,n){},1023:function(e,n){},1050:function(e,n){},1169:function(e,n){},1171:function(e,n){},1179:function(e,n){},1181:function(e,n){},1256:function(e,n){},1302:function(e,n){},1308:function(e,n){},1337:function(e,n){},1346:function(e,n){},1362:function(e,n){},1372:function(e,n,t){"use strict";t.r(n);var r,a=t(0),o=t.n(a),c=t(30),s=t.n(c),i=t(191),u=t(121),f=t(153),d=t.n(f),l=t(602),p=t(603),h=t(604),b=Object(i.createGlobalStyle)(r||(r=Object(l.a)(["\n    html {\n        height: 100%\n    }\n\n    body {\n       height: 100%;\n       margin: 0px;\n       padding: 0px;\n    }\n\n    #root {\n        height: 100%;\n        padding-right: 0.5rem;\n    }\n\n    .MuiFormControl-root,\n    .MuiInputBase-root {\n        width: 100% !important;\n    }\n\n    @font-face {\n        font-family: 'Averta';\n        src: local('Averta'), local('Averta Bold'),\n        url(",") format('woff2'),\n        url(",") format('woff');\n    }\n"])),p.a,h.a),j=t(92),v=t(593),m=t(6),g=t(23),O=t.n(g),w=t(83),k=t(360),x=t(15),y=t(17),S=t(605),A=t.n(S),C=t(608),E=t.n(C),M=t(149),T=t.n(M),U=function(){function e(n){Object(x.a)(this,e),this.provider=void 0,this.sendAsync=void 0;var t={db:E()(),db_path:"/",fork:n,gasLimit:1e8,gasPrice:0};this.provider=A.a.provider(t),this.sendAsync=T()(this.provider.send.bind(this.provider))}return Object(y.a)(e,[{key:"send",value:function(){var e=Object(w.a)(O.a.mark((function e(n,t){var r;return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.sendAsync({jsonrpc:"2.0",method:n,params:t});case 2:if(e.t1=r=e.sent,e.t0=null===e.t1,e.t0){e.next=6;break}e.t0=void 0===r;case 6:if(!e.t0){e.next=10;break}e.t2=void 0,e.next=11;break;case 10:e.t2=r.result;case 11:return e.abrupt("return",e.t2);case 12:case"end":return e.stop()}}),e,this)})));return function(n,t){return e.apply(this,arguments)}}()},{key:"sendTransaction",value:function(){var e=Object(w.a)(O.a.mark((function e(n,t){return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.send("eth_sendTransaction",[Object(k.a)(Object(k.a)({},t),{},{from:n,gasPrice:0,gasLimit:1e7})]);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e,this)})));return function(n,t){return e.apply(this,arguments)}}()},{key:"unlock",value:function(){var e=Object(w.a)(O.a.mark((function e(n){return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.send("evm_unlockUnknownAccount",[n]);case 2:case"end":return e.stop()}}),e,this)})));return function(n){return e.apply(this,arguments)}}()}]),e}(),_=t(158),I=function(){function e(n,t,r,a,o){Object(x.a)(this,e),this.frame=n,this.engine=t,this.appUrl=r,this.info=a,this.handlers=o}return Object(y.a)(e,[{key:"handleMessage",value:function(e,n,t){if(console.log("Received ".concat(e," (").concat(t,") with ").concat(JSON.stringify(n))),e)switch(e){case"sendTransactions":if(n){var r=this;this.handlers.onTransactionProposal(n.txs,t).then((function(e){r.sendResponse({safeTxHash:e},t)}),(function(e){r.sendError(e,t)}))}break;case"getEnvInfo":this.sendResponse({txServiceUrl:""},t);break;case"getSafeInfo":this.sendResponse(this.info,t);break;case"rpcCall":var a=n,o=this;try{this.engine.send(a.call,a.params).then((function(e){o.sendResponse(e,t)}),(function(e){o.sendError(e,t)}))}catch(c){o.sendError(c,t)}break;default:console.error("ThirdPartyApp: A message was received with an unknown method ".concat(e,".")),this.sendError("Unknown method ".concat(e,"."),t)}else console.error("ThirdPartyApp: A message was received without message id.")}},{key:"onMessage",value:function(e){e.source!==window&&(this.appUrl.includes(e.origin)?this.handleMessage(e.data.method,e.data.params,e.data.id):console.error("ThirdPartyApp: A message was received from an unknown origin ".concat(e.origin)))}},{key:"sendResponse",value:function(e,n){var t,r=null===(t=this.frame.current)||void 0===t?void 0:t.contentWindow;if(r){var a=Object(_.getSDKVersion)(),o=_.MessageFormatter.makeResponse(n,e,a);r.postMessage(o,this.appUrl)}}},{key:"sendError",value:function(e,n){var t,r=null===(t=this.frame.current)||void 0===t?void 0:t.contentWindow;if(r){var a=Object(_.getSDKVersion)(),o=_.MessageFormatter.makeErrorResponse(n,e,a);r.postMessage(o,this.appUrl)}}},{key:"connect",value:function(e){var n,t=this,r=e||(null===(n=this.frame.current)||void 0===n?void 0:n.contentWindow);if(r){var a=function(e){t.onMessage(e)};return r.addEventListener("message",a),function(){r.removeEventListener("message",a)}}}}]),e}(),R=t(27),P=Object(v.a)({appContainer:{border:0,frameborder:0,width:"100%",height:"100%"}}),N=Object(m.a)(P)((function(e){var n=e.classes,t=e.node,r=e.account,c=e.appUrl,s=e.resetNode,i=Object(f.useSafeAppsSDK)(),d=i.safe,l=i.sdk,p=Object(a.useState)([]),h=Object(j.a)(p,2),b=h[0],v=h[1],m=Object(a.useState)([]),g=Object(j.a)(m,2),k=g[0],x=g[1],y=Object(a.useRef)(null),S=""!==d.safeAddress,A=Object(a.useMemo)((function(){return new U(t)}),[t]),C=Object(a.useCallback)(Object(w.a)(O.a.mark((function e(){return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!S){e.next=5;break}return e.next=3,l.txs.send({txs:k});case 3:e.next=6;break;case 5:console.log("Recorded Transactions:",k);case 6:case"end":return e.stop()}}),e)}))),[d,k]),E=Object(a.useCallback)(function(){var e=Object(w.a)(O.a.mark((function e(n){var t,a;return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(n.length>1)){e.next=2;break}throw Error("Currently multiple txs are not supported");case 2:return t=n[0],e.next=5,A.sendTransaction(r,{to:t.to,value:t.value,data:t.data});case 5:return a=e.sent,v(n),e.abrupt("return",a);case 8:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),[A,r,v]);o.a.useEffect((function(){b&&(x(k.concat(b)),v(void 0))}),[b,v,k,x]);var M=Object(a.useMemo)((function(){return new I(y,A,c,S?d:{safeAddress:r,network:"MAINNET"},{onTransactionProposal:E})}),[y,r,c,E]);return Object(a.useEffect)((function(){return M.connect(window)}),[M]),Object(a.useEffect)((function(){(function(){var e=Object(w.a)(O.a.mark((function e(){return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,A.unlock(r);case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[A,r]),Object(R.jsxs)(R.Fragment,{children:[Object(R.jsxs)(R.Fragment,{children:["\xa0Transactions in queue ",k.length,Object(R.jsx)(u.Button,{size:"md",color:"primary",onClick:C,children:S?"Submit":"Log"}),Object(R.jsx)(u.Button,{size:"md",color:"primary",onClick:s,children:"Reset"})]}),Object(R.jsx)("iframe",{title:"App",ref:y,src:c,className:n.appContainer})]})})),B=t(592),F=Object(v.a)({appContainer:{border:0,frameborder:0,width:"100%",height:"100%"}}),L="sapp_browser_config_node",D="sapp_browser_config_account",K="sapp_browser_config_app",z=Object(m.a)(F)((function(e){var n=e.onConfigSet,t=Object(f.useSafeAppsSDK)().safe,r=Object(a.useState)(localStorage.getItem(L)||""),o=Object(j.a)(r,2),c=o[0],s=o[1],i=Object(a.useState)(t.safeAddress||localStorage.getItem(D)||""),d=Object(j.a)(i,2),l=d[0],p=d[1],h=Object(a.useState)(localStorage.getItem(K)||""),b=Object(j.a)(h,2),v=b[0],m=b[1],g=Object(a.useCallback)(function(){var e=Object(w.a)(O.a.mark((function e(t,r,a){return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:console.log({node:t,account:r,appUrl:a}),localStorage.setItem(L,t),localStorage.setItem(D,r),localStorage.setItem(K,a),n(t&&r&&a?{node:t,account:r,appUrl:a}:void 0);case 5:case"end":return e.stop()}}),e)})));return function(n,t,r){return e.apply(this,arguments)}}(),[n]),k=t.safeAddress||l;return Object(R.jsxs)(R.Fragment,{children:[Object(R.jsx)(B.a,{value:k,onChange:function(e){return p(e.target.value)},label:"Account address",disabled:!!t.safeAddress}),Object(R.jsx)(B.a,{value:c,onChange:function(e){return s(e.target.value)},label:"Node url"}),Object(R.jsx)(B.a,{value:v,onChange:function(e){return m(e.target.value)},label:"App url"}),Object(R.jsx)(u.Button,{size:"md",color:"primary",onClick:function(){return g(c,k,v)},children:"Start"})]})})),J=Object(v.a)({appContainer:{border:0,frameborder:0,width:"100%",height:"100%"}}),W=Object(m.a)(J)((function(){var e=Object(a.useState)(void 0),n=Object(j.a)(e,2),t=n[0],r=n[1];return t?Object(R.jsx)(N,{account:t.account,node:t.node,appUrl:t.appUrl,resetNode:function(){r(void 0)}}):Object(R.jsx)(z,{onConfigSet:r})}));s.a.render(Object(R.jsx)(o.a.StrictMode,{children:Object(R.jsxs)(i.ThemeProvider,{theme:u.theme,children:[Object(R.jsx)(b,{}),Object(R.jsx)(d.a,{children:Object(R.jsx)(W,{})})]})}),document.getElementById("root"))},701:function(e,n){},703:function(e,n){},716:function(e,n){},717:function(e,n){},736:function(e,n){},739:function(e,n){},741:function(e,n){},743:function(e,n){},801:function(e,n){},812:function(e,n){},821:function(e,n){},870:function(e,n){},883:function(e,n){},911:function(e,n){},913:function(e,n){},920:function(e,n){},921:function(e,n){},965:function(e,n){},982:function(e,n){},989:function(e,n){},994:function(e,n){}},[[1372,1,2]]]);
//# sourceMappingURL=main.35392c7d.chunk.js.map
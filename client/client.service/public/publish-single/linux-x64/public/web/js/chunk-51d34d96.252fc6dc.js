(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-51d34d96"],{3476:function(e,t,n){"use strict";n.r(t);var c=n("7a23"),a={class:"socks5-wrap"},o={class:"form"},r={class:"w-100"},l={class:"w-100"},u=Object(c["createTextVNode"])("确 定"),i={class:"w-100"};function b(e,t,n,b,f,d){var s=Object(c["resolveComponent"])("el-alert"),m=Object(c["resolveComponent"])("el-input"),O=Object(c["resolveComponent"])("el-form-item"),j=Object(c["resolveComponent"])("el-col"),p=Object(c["resolveComponent"])("el-option"),V=Object(c["resolveComponent"])("el-select"),N=Object(c["resolveComponent"])("el-row"),C=Object(c["resolveComponent"])("el-checkbox"),h=Object(c["resolveComponent"])("el-tooltip"),w=Object(c["resolveComponent"])("el-button"),x=Object(c["resolveComponent"])("el-form");return Object(c["openBlock"])(),Object(c["createElementBlock"])("div",a,[Object(c["createVNode"])(s,{class:"alert",type:"warning","show-icon":"",closable:!1,title:"socks5代理，如果服务端开启，则也可以代理到服务端",description:"仅实现了tcp，可代理tcp及上层协议，适用于ftp双通道"}),Object(c["createElementVNode"])("div",o,[Object(c["createVNode"])(x,{ref:"formDom",model:b.state.form,rules:b.state.rules,"label-width":"80px"},{default:Object(c["withCtx"])((function(){return[Object(c["createVNode"])(O,{label:"","label-width":"0"},{default:Object(c["withCtx"])((function(){return[Object(c["createElementVNode"])("div",r,[Object(c["createVNode"])(N,{gutter:10},{default:Object(c["withCtx"])((function(){return[Object(c["createVNode"])(j,{span:6},{default:Object(c["withCtx"])((function(){return[Object(c["createVNode"])(O,{label:"监听端口",prop:"ListenPort"},{default:Object(c["withCtx"])((function(){return[Object(c["createVNode"])(m,{modelValue:b.state.form.ListenPort,"onUpdate:modelValue":t[0]||(t[0]=function(e){return b.state.form.ListenPort=e})},null,8,["modelValue"])]})),_:1})]})),_:1}),Object(c["createVNode"])(j,{span:6},{default:Object(c["withCtx"])((function(){return[Object(c["createVNode"])(O,{label:"buffersize",prop:"BufferSize"},{default:Object(c["withCtx"])((function(){return[Object(c["createVNode"])(m,{modelValue:b.state.form.BufferSize,"onUpdate:modelValue":t[1]||(t[1]=function(e){return b.state.form.BufferSize=e})},null,8,["modelValue"])]})),_:1})]})),_:1}),Object(c["createVNode"])(j,{span:6},{default:Object(c["withCtx"])((function(){return[Object(c["createVNode"])(O,{label:"通信通道",prop:"TunnelType"},{default:Object(c["withCtx"])((function(){return[Object(c["createVNode"])(V,{modelValue:b.state.form.TunnelType,"onUpdate:modelValue":t[2]||(t[2]=function(e){return b.state.form.TunnelType=e}),placeholder:"选择类型"},{default:Object(c["withCtx"])((function(){return[(Object(c["openBlock"])(!0),Object(c["createElementBlock"])(c["Fragment"],null,Object(c["renderList"])(b.shareData.tunnelTypes,(function(e,t){return Object(c["openBlock"])(),Object(c["createBlock"])(p,{key:t,label:e,value:t},null,8,["label","value"])})),128))]})),_:1},8,["modelValue"])]})),_:1})]})),_:1}),Object(c["createVNode"])(j,{span:6},{default:Object(c["withCtx"])((function(){return[Object(c["createVNode"])(O,{label:"目标端",prop:"TargetName"},{default:Object(c["withCtx"])((function(){return[Object(c["createVNode"])(V,{modelValue:b.state.form.TargetName,"onUpdate:modelValue":t[3]||(t[3]=function(e){return b.state.form.TargetName=e}),placeholder:"选择目标"},{default:Object(c["withCtx"])((function(){return[(Object(c["openBlock"])(!0),Object(c["createElementBlock"])(c["Fragment"],null,Object(c["renderList"])(b.targets,(function(e,t){return Object(c["openBlock"])(),Object(c["createBlock"])(p,{key:t,label:e.label,value:e.Name},null,8,["label","value"])})),128))]})),_:1},8,["modelValue"])]})),_:1})]})),_:1})]})),_:1})])]})),_:1}),Object(c["createVNode"])(O,{label:"","label-width":"0"},{default:Object(c["withCtx"])((function(){return[Object(c["createElementVNode"])("div",l,[Object(c["createVNode"])(N,{gutter:10},{default:Object(c["withCtx"])((function(){return[Object(c["createVNode"])(j,{span:5},{default:Object(c["withCtx"])((function(){return[Object(c["createVNode"])(O,{"label-width":"0",prop:"ListenEnable"},{default:Object(c["withCtx"])((function(){return[Object(c["createVNode"])(C,{modelValue:b.state.form.ListenEnable,"onUpdate:modelValue":t[4]||(t[4]=function(e){return b.state.form.ListenEnable=e}),label:"开启端口监听"},null,8,["modelValue"])]})),_:1})]})),_:1}),Object(c["createVNode"])(j,{span:5},{default:Object(c["withCtx"])((function(){return[Object(c["createVNode"])(O,{"label-width":"0",prop:"ConnectEnable"},{default:Object(c["withCtx"])((function(){return[Object(c["createVNode"])(C,{modelValue:b.state.form.ConnectEnable,"onUpdate:modelValue":t[5]||(t[5]=function(e){return b.state.form.ConnectEnable=e}),label:"允许被连接"},null,8,["modelValue"])]})),_:1})]})),_:1}),Object(c["createVNode"])(j,{span:5},{default:Object(c["withCtx"])((function(){return[Object(c["createVNode"])(O,{"label-width":"0",prop:"IsPac"},{default:Object(c["withCtx"])((function(){return[Object(c["createVNode"])(h,{class:"box-item",effect:"dark",content:"勾选则设置系统代理，不勾选则需要自己设置",placement:"top-start"},{default:Object(c["withCtx"])((function(){return[Object(c["createVNode"])(C,{modelValue:b.state.form.IsPac,"onUpdate:modelValue":t[6]||(t[6]=function(e){return b.state.form.IsPac=e}),label:"设置系统代理"},null,8,["modelValue"])]})),_:1})]})),_:1})]})),_:1}),Object(c["createVNode"])(j,{span:5},{default:Object(c["withCtx"])((function(){return[Object(c["createVNode"])(O,{"label-width":"0",prop:"IsCustomPac"},{default:Object(c["withCtx"])((function(){return[Object(c["createVNode"])(h,{class:"box-item",effect:"dark",content:"自定义pac还是使用预制的pac规则",placement:"top-start"},{default:Object(c["withCtx"])((function(){return[Object(c["createVNode"])(C,{modelValue:b.state.form.IsCustomPac,"onUpdate:modelValue":t[7]||(t[7]=function(e){return b.state.form.IsCustomPac=e}),label:"自定义pac"},null,8,["modelValue"])]})),_:1})]})),_:1})]})),_:1}),Object(c["createVNode"])(j,{span:4},{default:Object(c["withCtx"])((function(){return[Object(c["createVNode"])(O,{"label-width":"0"},{default:Object(c["withCtx"])((function(){return[Object(c["createVNode"])(w,{type:"primary",loading:b.state.loading,onClick:b.handleSubmit},{default:Object(c["withCtx"])((function(){return[u]})),_:1},8,["loading","onClick"])]})),_:1})]})),_:1})]})),_:1})])]})),_:1}),Object(c["createVNode"])(O,{"label-width":"0"},{default:Object(c["withCtx"])((function(){return[Object(c["createElementVNode"])("div",i,[Object(c["createVNode"])(m,{modelValue:b.state.pac,"onUpdate:modelValue":t[8]||(t[8]=function(e){return b.state.pac=e}),rows:22,type:"textarea",placeholder:"写pac内容",resize:"none"},null,8,["modelValue"])])]})),_:1})]})),_:1},8,["model","rules"])])])}n("d3b7"),n("25f0"),n("99af"),n("d81d"),n("a9e3"),n("e9c4");var f=n("a1e9"),d=n("97af"),s=function(){return Object(d["c"])("socks5/get")},m=function(e){return Object(d["c"])("socks5/set",e)},O=function(){return Object(d["c"])("socks5/getpac")},j=function(e){return Object(d["c"])("socks5/setpac",e)},p=n("5c40"),V=n("3ef4"),N=n("3fd2"),C=n("8286"),h={setup:function(){var e=Object(N["a"])(),t=Object(C["a"])(),n=function(){s().then((function(e){r.form.ListenEnable=e.ListenEnable,r.form.ListenPort=e.ListenPort,r.form.BufferSize=e.BufferSize,r.form.ConnectEnable=e.ConnectEnable,r.form.IsCustomPac=e.IsCustomPac,r.form.IsPac=e.IsPac,r.form.TunnelType=e.TunnelType.toString(),r.form.TargetName=e.TargetName}))},c=function(){O().then((function(e){r.pac=e}))},a=function(){j({IsCustom:r.form.IsCustomPac,Pac:r.pac}).then((function(){}))};Object(p["rb"])((function(){n(),c()}));var o=Object(f["c"])((function(){return[{Name:"",label:"服务器"}].concat(e.clients.map((function(e){return{Name:e.Name,label:e.Name}})))})),r=Object(f["p"])({loading:!1,pac:"",form:{ListenEnable:!1,ListenPort:5412,ConnectEnable:!1,IsPac:!1,IsCustomPac:!1,BufferSize:8192,TunnelType:"8",TargetName:""},rules:{ListenPort:[{required:!0,message:"必填",trigger:"blur"},{type:"number",min:1,max:65535,message:"数字 1-65535",trigger:"blur",transform:function(e){return Number(e)}}],BufferSize:[{required:!0,message:"必填",trigger:"blur"},{type:"number",min:1,max:1048576,message:"数字 1-1048576",trigger:"blur",transform:function(e){return Number(e)}}]}}),l=Object(f["r"])(null),u=function(){l.value.validate((function(e){if(!e)return!1;r.loading=!0;var t=JSON.parse(JSON.stringify(r.form));t.ListenPort=Number(t.ListenPort),t.BufferSize=Number(t.BufferSize),t.TunnelType=Number(t.TunnelType),m(t).then((function(){r.loading=!1,t.IsPac&&a(),V["a"].success("操作成功！")})).catch((function(e){r.loading=!1}))}))};return{targets:o,shareData:t,state:r,formDom:l,handleSubmit:u}}},w=(n("96ea"),n("6b0d")),x=n.n(w);const g=x()(h,[["render",b],["__scopeId","data-v-f0fddea0"]]);t["default"]=g},"96ea":function(e,t,n){"use strict";n("d73f")},d73f:function(e,t,n){}}]);
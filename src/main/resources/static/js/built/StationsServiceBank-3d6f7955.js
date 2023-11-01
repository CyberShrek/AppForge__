import{u as s}from"./userInfo-4f3aa991.js";import{J as e,u as t}from"./UserCheck-19371e53.js";class i extends e{constructor(s){super(),this.path=s,this.method="POST",this.errorFooter="Не удалось загрузить список опций"}fetch(s){return super.fetch(s).then((s=>t(s)))}}class r extends i{constructor(){super(`${document.location.origin}/servicebank/getdata`),this.dataCondition=()=>{var s,e;return(null===(e=null===(s=this.properties)||void 0===s?void 0:s.date)||void 0===e?void 0:e.length)>0}}fetch(e){if(this.properties=e,this.mainConditions.find((s=>!1===s())))return new Promise((s=>s(new Map)));{const e=()=>{var s,e;return this.setServiceBankBody(this.requestStep.listName,null===(e=(s=this.requestStep).specificBodiesFn)||void 0===e?void 0:e.call(s)),this.fetchServiceBankOptions(this.responseStep.parseItemToOptionFn,this.responseStep.filterFn)};return!s.superUser&&this.userCheckPermission&&(this.properties[this.userCheckPermission.propertyName]=this.userCheckPermission.propertyValue),e()}}setServiceBankBody(s,e=[{}]){const t=Object.assign({},this.properties);t.date=t.roads=t.countries=t.postSoviet=t.carriers=void 0,this.body={[s]:[...e.map((s=>Object.assign(Object.assign({data:this.properties.date[0]},s),t)))]}}fetchServiceBankOptions(s,e){return super.fetch().then((t=>new Map(t[Object.keys(t)[0]].filter((s=>!e||e(s))).map((e=>{const t=s(e);return t[1]=t[1].trim(),t})))))}}class o extends r{constructor(){super(...arguments),this.mainConditions=[this.dataCondition],this.requestStep={listName:"perList",specificBodiesFn:()=>this.properties.countries.map((s=>({gos:s})))},this.responseStep={parseItemToOptionFn:s=>{var e;return[`${(null===(e=this.properties.countries)||void 0===e?void 0:e.length)>=2?s.gos+".":""}${s.skp}`,s.nazvp]},errorMessageEnding:"перевозчиков"},this.userCheckPermission={propertyName:"skp",propertyValue:s.carrier},this.userAssociatedOptionKeys=[`${s.carrier}`]}}class n extends r{constructor(){super(...arguments),this.mainConditions=[this.dataCondition],this.requestStep={listName:"gosList"},this.responseStep={parseItemToOptionFn:s=>[s.g_kod,s.g_name],filterFn:s=>{var e;return!(null===(e=this.properties)||void 0===e?void 0:e.postSoviet)||"1"==s.g_prsng},errorMessageEnding:"государств"},this.userCheckPermission={propertyName:"gos",propertyValue:s.country},this.userAssociatedOptionKeys=[]}}class p extends r{constructor(){super(...arguments),this.mainConditions=[this.dataCondition],this.requestStep={listName:"sfList"},this.responseStep={parseItemToOptionFn:s=>[s.sf_kod2,s.sf_name],errorMessageEnding:"субъектов"},this.userAssociatedOptionKeys=[]}}class a extends r{constructor(){super(...arguments),this.mainConditions=[this.dataCondition,()=>{var s;return(null===(s=this.properties.countries)||void 0===s?void 0:s.length)>0}],this.requestStep={listName:"dorList",specificBodiesFn:()=>this.properties.countries.map((s=>({gos:s})))},this.responseStep={parseItemToOptionFn:s=>[`${s.d_kod}`,s.d_name],errorMessageEnding:"дорог"},this.userCheckPermission={propertyName:"dor",propertyValue:s.road},this.userAssociatedOptionKeys=[s.road]}}class d extends r{constructor(){super(...arguments),this.mainConditions=[this.dataCondition],this.errorMessageEnding="станций",this.requestStep={listName:"stanList",specificBodiesFn:()=>this.properties.roads.map((s=>({dor:this.properties.roads})))},this.responseStep={parseItemToOptionFn:s=>[s.stan,s.pnazv],errorMessageEnding:"станций"},this.userAssociatedOptionKeys=[]}}export{n as C,i as O,a as R,d as S,p as a,o as b};
//# sourceMappingURL=StationsServiceBank-3d6f7955.js.map

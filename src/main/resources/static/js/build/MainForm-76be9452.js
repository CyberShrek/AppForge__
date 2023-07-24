import{r as e}from"./index.js";import{F as t,b as s}from"./Fragment-1c4a9340.js";import{s as i,n,i as r,a as o,t as l}from"./easePick-d69004c3.js";import{f as a}from"./wretch-40d1f204.js";import"./sweetAlert2-f9822954.js";function c(e,t="",...s){const i=document.createElement(e);return t&&(i.textContent=t),null==s||s.forEach((e=>i.setAttribute(Object.keys(e)[0],String(Object.values(e)[0])))),i}function u(...e){return c("div","",...e)}function d(e="element"){let t,s=-1;do{t=e+"-"+s++}while(null!==document.getElementById(t));return t}class h extends t{get value(){return this._value}set value(e){this._value=e,this.valueEventCallbacks.forEach((t=>t(e)))}constructor(e){super(e),this.location=e,this.valueEventCallbacks=[]}subscribe(e,t=!1){this.valueEventCallbacks.push(e),t||e(this.value)}debounce(e,t=100){let s;return()=>{clearTimeout(s),s=setTimeout(e,t)}}}class p extends h{constructor(e){super(e),this.core=function(e="",...t){return c("button",e,...t)}(),this.core.addEventListener("click",(()=>this.value=this.value))}set text(e){this.core.textContent=e}get text(){return this.core.textContent}set image(e){this.imageElement.remove(),e&&(this.imageElement=function(e="",t="not found",...s){return c("img","",{src:e},...s)}(e),this.core.appendChild(this.imageElement))}get image(){var e;return null===(e=this.imageElement)||void 0===e?void 0:e.src}}function b(e){return isNaN(Number(e))?0:Number(e)}function v(e){return null==e?"":"object"!=typeof e?String(e):e instanceof Set?Array.from(e).join(", "):e instanceof Date?m(e):e.toString()}function m(e){const t=e.getFullYear(),s=e.getMonth()+1,i=e.getDate();return`${t}-${s<10?"0":""}${s}-${i<10?"0":""}${i}`}function f(){document.documentElement.style.cursor="wait"}function g(){document.documentElement.style.cursor="default"}e("third-party/easepick");class S extends h{constructor(e,t){super(e),this.core=u({class:"datepicker"}),t.defaultRange||(t.defaultRange=[m(new Date),m(new Date)]),this.value=t.defaultRange,function(e,t,s){new i.create({element:e,format:"DD.MM.YYYY",calendars:2,grid:2,zIndex:100,plugins:[n,r,o],lang:"ru",AmpPlugin:{darkMode:!1,resetButton:!0,dropdown:{minYear:2010,maxYear:null,months:!0,years:!0}},RangePlugin:{startDate:new l(t.defaultRange[0]),endDate:new l(t.defaultRange[1]),locale:{one:"день",few:"дня",many:"дней"},delimiter:" - "},LockPlugin:{minDays:1,maxDays:t.maxDays},css:["css/third-party/easepick.css"],setup(e){e.on("select",(t=>{s([m(t.detail.start),m(t.detail.end)]),setTimeout((()=>e.hide()),10)}))}})}(this.core,t,(e=>{this.value=e}))}}class x extends t{constructor(e,t,s){super(e),this.input=new t({target:e.target,position:"afterbegin"},s)}}class y extends x{constructor(e,t){super(e,S,{maxDays:b(t.getAttribute("max-days"))})}}class E extends h{constructor(e,t){super(e),this.checkBoxElement=function(e,...t){return c("input","",{type:e},...t)}("checkbox",{id:d("checkbox")}),this.labelElement=function(e="",...t){return c("label",e,...t)}("",{for:this.checkBoxElement.id}),this.core=u({class:"checkbox"}),this.core.append(this.checkBoxElement,this.labelElement),this.label=t.label;const s=()=>this.value=this.checkBoxElement.checked;s(),this.checkBoxElement.addEventListener("change",s)}set label(e){this.labelElement.textContent=e}}class k extends x{constructor(e,t){super(e,E,{label:t.getAttribute("label")})}}e("third-party/virtual-select");class w extends h{constructor(e,t){super(e),this.optionsRetrievalCallbacks=new Set,this.core=u({class:"select"}),this.value=null,function(e,t){VirtualSelect.init({ele:e,additionalClasses:"multiselect",disabled:!0,autofocus:!1,markSearchResults:!0,optionsCount:6,multiple:t.multiple,search:t.search,hasOptionDescription:t.showCodes,disableSelectAll:t.disableSelectAll,maxValues:t.maxValues,required:t.required,placeholder:"Выберите",noOptionsText:"Варианты не найдены",noSearchResultsText:"Результатов не найдено",selectAllText:"Выбрать все",searchPlaceholderText:"Поиск...",optionsSelectedText:"(выбрано)",optionSelectedText:"вариант выбран",allOptionsSelectedText:"Все",clearButtonText:"Очистить",moreText:"ещё..."})}(this.core,t),this.core.addEventListener("change",(e=>{const s=!0===t.multiple?new Set("object"==typeof e.currentTarget.value?e.currentTarget.value:[e.currentTarget.value]):e.currentTarget.value;v(this.value)!==v(s)&&(this.value=s)}))}setOptions(e){var t;const s=null===this.value?new Set:this.value instanceof Set?this.value:new Set([this.value]);if(e&&e.size>0){const i=new Set(null===(t=e.get("default"))||void 0===t?void 0:t.split(","));e.delete("default"),this.core.setOptions([...e.entries()].map((e=>({label:e[1],value:e[0],alias:e[0],description:e[0]})))),this.setSelected(s.size>0?s:i),this.core.enable()}else this.core.disable(),this.core.reset(),this.core.blur()}setSelected(e=new Set){this.core.setValue(Array.from(e))}}const F=(e,t)=>(f(),a(e).headers(t?Object.fromEntries(t):{}).get().json((e=>new Map(Object.entries(e)))).catch((e=>(s(e,"Не удалось загрузить список опций"),new Map))).finally((()=>g())));class C extends x{constructor(e,t){var s,i;const n=e=>"true"===t.getAttribute(e);super(e,w,{maxValues:b(t.getAttribute("max-values")),multiple:n("multiselect"),search:n("search"),showCodes:n("show-codes"),disableSelectAll:n("disable-select-all"),required:n("require")}),this.configElement=t,this.optionsRetrieving=!1,this.endpointConfigElement=this.configElement.querySelector("endpoint"),this.endpointUrl=null===(i=null===(s=this.endpointConfigElement)||void 0===s?void 0:s.querySelector("url"))||void 0===i?void 0:i.textContent,this.endpointSubscribedFields=new Map(this.endpointConfigElement?[...this.endpointConfigElement.querySelectorAll("subscriptions field")].map((e=>[e.textContent,null])):null),this.optionsBuffer=new Map}resolveSubscribedFields(e){this.endpointSubscribedFields.forEach(((t,s)=>{this.endpointSubscribedFields.set(s,e(s))}))}listenSubscribedFields(){if(this.endpointUrl)if(this.endpointSubscribedFields.size>0){const e=new Map;this.endpointSubscribedFields.forEach(((t,s)=>t.input.subscribe((t=>{e.set(s,null!=t?v(t):null),!0===this.optionsRetrieving&&this.retrieveOptionsPromise("endpoint",F(this.endpointUrl,e))}))))}else this.retrieveOptionsPromise("endpoint",F(this.endpointUrl))}retrieveOptionsPromise(e,t){t.then((t=>{this.optionsBuffer.set(e,t),this.input.setOptions(function(...e){const t=[];return e.forEach((e=>t.push(...e.entries()))),new Map(t)}(...this.optionsBuffer.values()))}))}}class j extends C{constructor(e,t){var s;super(e,t),this.bankConfigElement=this.configElement.querySelector("bank"),this.dateFieldKey=null===(s=this.bankConfigElement.querySelector("subscriptions date"))||void 0===s?void 0:s.textContent,this.dateFieldSubscription=null}resolveSubscribedFields(e){super.resolveSubscribedFields(e),this.dateFieldSubscription=e(this.dateFieldKey)}resolveBankSubscribing(e,...t){t.forEach((s=>s.input.subscribe((s=>{let i=!1;for(const e of t){if(console.log(e.input.value),null===e.input.value||v(e.input.value).length<=0)return void(i=!0);console.log(i)}i?this.input.setOptions(null):this.retrieveOptionsPromise("bank",e(...t.map((e=>e.input.value))))}))))}}const A=`${document.location.origin}/servicebank/getdata`,B=e=>T("perList",e,(e=>[`${e.gos}.${e.skp}`,e.nazvp]),null,null,"Не удалось загрузить список перевозчиков"),O=(e,t)=>T("gosList",e,(e=>[e.g_kod,e.g_name]),{g_prsng:"1"},(e=>!t||"1"==e.g_prsng),"Не удалось загрузить список государств"),q=async(e,t)=>{const s=t=>T("dorList",e,(e=>[`${t}.${e.d_kod}`,e.d_name]),{gos:t},null,"Не удалось загрузить список дорог");return t instanceof Set?D([...t].map((e=>s(e)))):s(t)},M=async(e,t,s)=>D([...R(t)].map((([t,s])=>T("stanList",e,(e=>[e.stan,e.pnazv]),{gos:t,dor:s.join(","),pr_bo:"1"},null,"Не удалось загрузить список станций")))),T=(e,t,i,n={},r,o)=>(f(),a(A).post({[e]:[Object.assign({data:t[0]},n)]}).json((e=>{const t=Object.keys(e)[0];return new Map(e[t].filter((e=>!r||r(e))).map((e=>i(e))))})).catch((e=>(s(e,o),new Map))).finally((()=>g())));function D(e){return Promise.all(e).then((e=>{const t=new Map;return e.forEach((e=>{e.forEach(((e,s)=>{t.set(s,e)}))})),t})).catch((e=>{}))}function R(e){const t=new Map,s=e=>{var s;const i=e.split("."),n=i[0],r=i[1];t.has(n)||t.set(n,[]),null===(s=t.get(n))||void 0===s||s.push(r)};return e instanceof Set?e.forEach((e=>s(e))):s(e),t}class $ extends j{constructor(e,t){super(e,t)}listenSubscribedFields(){super.listenSubscribedFields(),this.resolveBankSubscribing(B,this.dateFieldSubscription)}}class P extends j{constructor(e,t){var s;super(e,t),this.postSovietKey=null===(s=this.bankConfigElement.querySelector("subscriptions postsoviet"))||void 0===s?void 0:s.textContent}resolveSubscribedFields(e){super.resolveSubscribedFields(e),this.postSovietSubscription=e(this.postSovietKey)}listenSubscribedFields(){super.listenSubscribedFields(),this.resolveBankSubscribing(O,this.dateFieldSubscription,this.postSovietSubscription)}}class L extends j{constructor(e,t){var s;super(e,t),this.countriesKey=null===(s=this.bankConfigElement.querySelector("subscriptions countries"))||void 0===s?void 0:s.textContent}resolveSubscribedFields(e){super.resolveSubscribedFields(e),this.countriesSubscription=e(this.countriesKey)}listenSubscribedFields(){super.listenSubscribedFields(),this.resolveBankSubscribing(q,this.dateFieldSubscription,this.countriesSubscription)}}class _ extends j{constructor(e,t){var s;super(e,t),this.roadsKey=null===(s=this.bankConfigElement.querySelector("subscriptions roads"))||void 0===s?void 0:s.textContent}resolveSubscribedFields(e){super.resolveSubscribedFields(e),this.roadsSubscription=e(this.roadsKey)}listenSubscribedFields(){super.listenSubscribedFields(),this.resolveBankSubscribing(M,this.dateFieldSubscription,this.roadsSubscription)}}e("main-form");class K extends h{constructor(e){super(e),this.fields=new Map,this.core=e.target,this.value=new Map,this.resolveFields(),this.resolveFieldsSubscriptions(),this.confirmButton=new p({target:this.core,position:"afterend"}),this.confirmButton.addClass("confirm"),this.validationUrl=this.core.getAttribute("validation-url")}resolveFields(){this.core.querySelectorAll(".section").forEach((e=>{const t=e.getAttribute("key");e.querySelectorAll(".field").forEach((e=>{const s=e.getAttribute("key");this.fields.set(`${t}.${s}`,function(e){const t=t=>e.classList.contains(t),s={target:e},i=e.querySelector("config");return t("date")?new y(s,i):t("checkbox")?new k(s,i):function(e,t){var s;switch(null===(s=t.querySelector("bank"))||void 0===s?void 0:s.getAttribute("type")){case"carriers":return new $(e,t);case"countries":return new P(e,t);case"roads":return new L(e,t);case"stations":return new _(e,t)}return new C(e,t)}(s,i)}(e))}))}))}resolveFieldsSubscriptions(){this.fields.forEach(((e,t)=>{e instanceof C&&(e.resolveSubscribedFields((e=>this.fields.get(e))),e.listenSubscribedFields(),e.optionsRetrieving=!0),e.input.subscribe((e=>{this.value.set(t,e),this.validateFields()}))}))}validateFields(){var e,t;this.validationUrl&&(e=this.validationUrl,t=Object.fromEntries(this.value),f(),a(e).json(t).post().forbidden((e=>e.json)).text((()=>!0)).catch((e=>(s(e,"Ошибка валидации"),!1))).finally((()=>g())))}}export{K as default};
//# sourceMappingURL=MainForm-76be9452.js.map

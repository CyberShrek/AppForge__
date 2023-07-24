import{r as e}from"./index.js";import{F as t}from"./Fragment-f98e71fe.js";import{s,n as i,i as n,a as r,t as o}from"./easePick-d69004c3.js";import{f as l}from"./wretch-40d1f204.js";import{b as a}from"./modal-95ea77eb.js";import"./sweetAlert2-f9822954.js";function c(e,t="",...s){const i=document.createElement(e);return t&&(i.textContent=t),null==s||s.forEach((e=>i.setAttribute(Object.keys(e)[0],String(Object.values(e)[0])))),i}function u(...e){return c("div","",...e)}function d(e="",...t){return c("label",e,...t)}function h(e="element"){let t,s=-1;do{t=e+"-"+s++}while(null!==document.getElementById(t));return t}class p extends t{get value(){return this._value}set value(e){this._value=e,this.valueEventCallbacks.forEach((t=>t(e)))}constructor(e){super(e),this.location=e,this.valueEventCallbacks=[]}subscribe(e,t=!1){this.valueEventCallbacks.push(e),t||e(this.value)}debounce(e,t=100){let s;return()=>{clearTimeout(s),s=setTimeout(e,t)}}}class b extends p{constructor(e){super(e),this.core=function(e="",...t){return c("button",e,...t)}(),this.core.addEventListener("click",(()=>{this.isAvailable&&(this.value=this.value)}))}set isAvailable(e){e?this.core.classList.remove("unavailable"):this.core.classList.add("unavailable")}get isAvailable(){return!this.core.classList.contains("unavailable")}set text(e){this.core.textContent=e}get text(){return this.core.textContent}set image(e){this.imageElement.remove(),e&&(this.imageElement=function(e="",t="not found",...s){return c("img","",{src:e},...s)}(e),this.core.appendChild(this.imageElement))}get image(){var e;return null===(e=this.imageElement)||void 0===e?void 0:e.src}}function v(e){return isNaN(Number(e))?0:Number(e)}function m(e){return null==e?"":"object"!=typeof e?String(e):e instanceof Set?Array.from(e).join(", "):e instanceof Date?f(e):e.toString()}function f(e){const t=e.getFullYear(),s=e.getMonth()+1,i=e.getDate();return`${t}-${s<10?"0":""}${s}-${i<10?"0":""}${i}`}function g(){document.documentElement.style.cursor="wait"}function S(){document.documentElement.style.cursor="default"}e("third-party/easepick");class x extends p{constructor(e,t){super(e),this.core=u({class:"datepicker"}),t.defaultRange||(t.defaultRange=[f(new Date),f(new Date)]),this.value=t.defaultRange,function(e,t,l){new s.create({element:e,format:"DD.MM.YYYY",calendars:2,grid:2,zIndex:100,plugins:[i,n,r],lang:"ru",AmpPlugin:{darkMode:!1,resetButton:!0,dropdown:{minYear:2010,maxYear:null,months:!0,years:!0}},RangePlugin:{startDate:new o(t.defaultRange[0]),endDate:new o(t.defaultRange[1]),locale:{one:"день",few:"дня",many:"дней"},delimiter:" - "},LockPlugin:{minDays:1,maxDays:t.maxDays},css:["css/third-party/easepick.css"],setup(e){e.on("select",(t=>{l([f(t.detail.start),f(t.detail.end)]),setTimeout((()=>e.hide()),10)}))}})}(this.core,t,(e=>{this.value=e}))}}class E extends t{constructor(e,t,s){super(e),this.core=e.target,this.input=new t({target:e.target,position:"beforeend"},s),this.warningLabel=d(),this.core.appendChild(this.warningLabel)}makeValid(){this.warningLabel.textContent="",this.core.classList.remove("wrong")}makeInvalid(e){this.warningLabel.textContent=e,this.core.classList.add("wrong")}}class w extends E{constructor(e,t){super(e,x,{maxDays:v(t.getAttribute("max-days"))})}}class y extends p{constructor(e,t){super(e),this.checkBoxElement=function(e,...t){return c("input","",{type:e},...t)}("checkbox",{id:h("checkbox")}),this.labelElement=d("",{for:this.checkBoxElement.id}),this.core=u({class:"checkbox"}),this.core.append(this.checkBoxElement,this.labelElement),this.label=t.label;const s=()=>this.value=this.checkBoxElement.checked;s(),this.checkBoxElement.addEventListener("change",s)}set label(e){this.labelElement.textContent=e}}class k extends E{constructor(e,t){super(e,y,{label:t.getAttribute("label")})}}e("third-party/virtual-select");class F extends p{constructor(e,t){super(e),this.optionsRetrievalCallbacks=new Set,this.core=u({class:"select"}),this.value=null,function(e,t){VirtualSelect.init({ele:e,additionalClasses:"multiselect",disabled:!0,autofocus:!1,markSearchResults:!0,optionsCount:6,multiple:t.multiple,search:t.search,hasOptionDescription:t.showCodes,disableSelectAll:t.disableSelectAll,maxValues:t.maxValues,placeholder:"Выберите",noOptionsText:"Варианты не найдены",noSearchResultsText:"Результатов не найдено",selectAllText:"Выбрать все",searchPlaceholderText:"Поиск...",optionsSelectedText:"(выбрано)",optionSelectedText:"вариант выбран",allOptionsSelectedText:"Все",clearButtonText:"Очистить",moreText:"ещё..."})}(this.core,t),this.core.addEventListener("change",(e=>{const s=!0===t.multiple?new Set("object"==typeof e.currentTarget.value?e.currentTarget.value:[e.currentTarget.value]):e.currentTarget.value;m(this.value)!==m(s)&&(this.value=s)}))}setOptions(e){var t;const s=null===this.value?new Set:this.value instanceof Set?this.value:new Set([this.value]);if(e&&e.size>0){const i=new Set(null===(t=e.get("default"))||void 0===t?void 0:t.split(","));e.delete("default"),this.core.setOptions([...e.entries()].map((e=>({label:e[1],value:e[0],alias:e[0],description:e[0]})))),this.setSelected(s.size>0?s:i),this.core.enable()}else this.core.disable(),this.core.reset(),this.core.blur()}setSelected(e=new Set){this.core.setValue(Array.from(e))}}const C=(e,t)=>(g(),l(e).headers(t?Object.fromEntries(t):{}).get().json((e=>new Map(Object.entries(e)))).catch((e=>(a(e,"Не удалось загрузить список опций"),new Map))).finally((()=>S())));class A extends E{constructor(e,t){var s,i;const n=e=>"true"===t.getAttribute(e);super(e,F,{maxValues:v(t.getAttribute("max-values")),multiple:n("multiselect"),search:n("search"),showCodes:n("show-codes"),disableSelectAll:n("disable-select-all")}),this.configElement=t,this.optionsRetrieving=!1,this.endpointConfigElement=this.configElement.querySelector("endpoint"),this.endpointUrl=null===(i=null===(s=this.endpointConfigElement)||void 0===s?void 0:s.querySelector("url"))||void 0===i?void 0:i.textContent,this.endpointSubscribedFields=new Map(this.endpointConfigElement?[...this.endpointConfigElement.querySelectorAll("subscriptions field")].map((e=>[e.textContent,null])):null),this.optionsBuffer=new Map}resolveSubscribedFields(e){this.endpointSubscribedFields.forEach(((t,s)=>{this.endpointSubscribedFields.set(s,e(s))}))}listenSubscribedFields(){if(this.endpointUrl)if(this.endpointSubscribedFields.size>0){const e=new Map;this.endpointSubscribedFields.forEach(((t,s)=>t.input.subscribe((t=>{e.set(s,null!=t?m(t):null),!0===this.optionsRetrieving&&this.retrieveOptionsPromise("endpoint",C(this.endpointUrl,e))}))))}else this.retrieveOptionsPromise("endpoint",C(this.endpointUrl))}retrieveOptionsPromise(e,t){t.then((t=>{this.optionsBuffer.set(e,t),this.input.setOptions(function(...e){const t=[];return e.forEach((e=>t.push(...e.entries()))),new Map(t)}(...this.optionsBuffer.values()))}))}}class j extends A{constructor(e,t){var s;super(e,t),this.bankConfigElement=this.configElement.querySelector("bank"),this.dateFieldKey=null===(s=this.bankConfigElement.querySelector("subscriptions date"))||void 0===s?void 0:s.textContent,this.dateFieldSubscription=null}resolveSubscribedFields(e){super.resolveSubscribedFields(e),this.dateFieldSubscription=e(this.dateFieldKey)}resolveBankSubscribing(e,...t){t.forEach((s=>s.input.subscribe((s=>{for(const e of t)if(null===e.input.value||m(e.input.value).length<=0)return void this.input.setOptions(null);this.retrieveOptionsPromise("bank",e(...t.map((e=>e.input.value))))}))))}}const B=`${document.location.origin}/servicebank/getdata`,O=e=>D("perList",e,(e=>[`${e.gos}.${e.skp}`,e.nazvp]),null,null,"Не удалось загрузить список перевозчиков"),L=(e,t)=>D("gosList",e,(e=>[e.g_kod,e.g_name]),{g_prsng:"1"},(e=>!t||"1"==e.g_prsng),"Не удалось загрузить список государств"),M=async(e,t)=>{const s=t=>D("dorList",e,(e=>[`${t}.${e.d_kod}`,e.d_name]),{gos:t},null,"Не удалось загрузить список дорог");return t instanceof Set?q([...t].map((e=>s(e)))):s(t)},T=async(e,t,s)=>q([...R(t)].map((([t,s])=>D("stanList",e,(e=>[e.stan,e.pnazv]),{gos:t,dor:s.join(","),pr_bo:"1"},null,"Не удалось загрузить список станций")))),D=(e,t,s,i={},n,r)=>(g(),l(B).post({[e]:[Object.assign({data:t[0]},i)]}).json((e=>{const t=Object.keys(e)[0];return new Map(e[t].filter((e=>!n||n(e))).map((e=>s(e))))})).catch((e=>(a(e,r),new Map))).finally((()=>S())));function q(e){return Promise.all(e).then((e=>{const t=new Map;return e.forEach((e=>{e.forEach(((e,s)=>{t.set(s,e)}))})),t})).catch((e=>{}))}function R(e){const t=new Map,s=e=>{var s;const i=e.split("."),n=i[0],r=i[1];t.has(n)||t.set(n,[]),null===(s=t.get(n))||void 0===s||s.push(r)};return e instanceof Set?e.forEach((e=>s(e))):s(e),t}class $ extends j{constructor(e,t){super(e,t)}listenSubscribedFields(){super.listenSubscribedFields(),this.resolveBankSubscribing(O,this.dateFieldSubscription)}}class P extends j{constructor(e,t){var s;super(e,t),this.postSovietKey=null===(s=this.bankConfigElement.querySelector("subscriptions postsoviet"))||void 0===s?void 0:s.textContent}resolveSubscribedFields(e){super.resolveSubscribedFields(e),this.postSovietSubscription=e(this.postSovietKey)}listenSubscribedFields(){super.listenSubscribedFields(),this.resolveBankSubscribing(L,this.dateFieldSubscription,this.postSovietSubscription)}}class _ extends j{constructor(e,t){var s;super(e,t),this.countriesKey=null===(s=this.bankConfigElement.querySelector("subscriptions countries"))||void 0===s?void 0:s.textContent}resolveSubscribedFields(e){super.resolveSubscribedFields(e),this.countriesSubscription=e(this.countriesKey)}listenSubscribedFields(){super.listenSubscribedFields(),this.resolveBankSubscribing(M,this.dateFieldSubscription,this.countriesSubscription)}}class K extends j{constructor(e,t){var s;super(e,t),this.roadsKey=null===(s=this.bankConfigElement.querySelector("subscriptions roads"))||void 0===s?void 0:s.textContent}resolveSubscribedFields(e){super.resolveSubscribedFields(e),this.roadsSubscription=e(this.roadsKey)}listenSubscribedFields(){super.listenSubscribedFields(),this.resolveBankSubscribing(T,this.dateFieldSubscription,this.roadsSubscription)}}e("main-form");class U extends p{constructor(e){super(e),this.fields=new Map,this.core=e.target,this.value=new Map,this.confirmButton=new b({target:this.core,position:"afterend"}),this.confirmButton.addClass("confirm"),this.confirmButton.text=this.core.getAttribute("confirm-button-text"),this.resolveFields(),this.resolveFieldsSubscriptions(),this.validationUrl=this.core.getAttribute("validation-url")}resolveFields(){this.core.querySelectorAll(".section").forEach((e=>{const t=e.getAttribute("key");e.querySelectorAll(".field").forEach((e=>{const s=e.getAttribute("key");this.fields.set(`${t}.${s}`,function(e){const t=t=>e.classList.contains(t),s={target:e},i=e.querySelector("config");return t("date")?new w(s,i):t("checkbox")?new k(s,i):function(e,t){var s;switch(null===(s=t.querySelector("bank"))||void 0===s?void 0:s.getAttribute("type")){case"carriers":return new $(e,t);case"countries":return new P(e,t);case"roads":return new _(e,t);case"stations":return new K(e,t)}return new A(e,t)}(s,i)}(e))}))}))}resolveFieldsSubscriptions(){this.fields.forEach(((e,t)=>{e instanceof A&&(e.resolveSubscribedFields((e=>this.fields.get(e))),e.listenSubscribedFields(),e.optionsRetrieving=!0),e.input.subscribe((e=>{this.value.set(t,e),this.validateFields()}))}))}validateFields(){var e,t;this.confirmButton.isAvailable=!1,this.validationUrl&&(e=this.validationUrl,t=this.value,g(),l(e).json(Object.fromEntries(t)).post().forbidden((e=>new Map(Object.entries(e.json)))).text((()=>!0)).catch((e=>(a(e,"Ошибка валидации"),!1))).finally((()=>S()))).then((e=>{this.fields.forEach((e=>e.makeValid())),e instanceof Map?e.forEach(((e,t)=>this.fields.get(t).makeInvalid(e))):!0===e&&(this.confirmButton.isAvailable=!0)}))}}export{U as default};
//# sourceMappingURL=MainForm-2386b398.js.map

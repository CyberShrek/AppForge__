import{o as create,r as resolveStyle,p as popupList,n as appConfig,v as valueOrDefault,a as popupAction,b as stringifyDate,q as jsonify,j as prettify,c as resolveModule,g as compareMaps,e as concatMaps,J as JsonAccessor,t as jsonifyFields,u as jsonToMap,k as scrollIntoElement,w as popupTimeoutAction,x as toggleFullscreen,y as getFullscreenElement,A as Accessor,z as emptyElement,B as filterMap,C as numberOf,D as popupMessage}from"./UserCheck-19371e53.js";import{a as appInfo}from"./appInfo-8b4c1c18.js";import{t as t$1,s,i,n,a as s$1}from"./easepick-9f33aa1b.js";import{b as CarriersServiceBank,C as CountriesServiceBank,a as RegionsServiceBank,R as RoadsServiceBank,S as StationsServiceBank}from"./StationsServiceBank-3d6f7955.js";class Fragment{constructor(t){this.root=t instanceof HTMLElement?t:create(t)}append(...t){t.forEach((t=>this.root.append(t instanceof Fragment?t.root:t)))}select(t){return this.root.querySelector(t)}selectAll(t){return this.root.querySelectorAll(t)}get hidden(){return!!this.root.hidden}hide(){this.root.style.display="none",this.root.hidden=!0}show(){this.root.style.display="",this.root.hidden=!1}remove(){this.root.remove()}addClass(t){this.root.classList.add(t)}removeClass(t){this.root.classList.remove(t)}toggleClass(t,e){this.root.classList.toggle(t,e)}hasClass(t){return this.root.classList.contains(t)}set className(t){t&&(this.root.className=t)}get className(){return this.root.className}listen(t,e){this.root.addEventListener(t,e)}onMount(t){const e=new MutationObserver((s=>{for(const i of s)if(i.target===this.root||i.target.contains(this.root)){t(),e.disconnect();break}}));e.observe(document.documentElement,{childList:!0,subtree:!0})}}class Button extends Fragment{constructor(t,e){super("<button></button>"),this.enable=()=>this.isAvailable=!0,this.disable=()=>this.isAvailable=!1,this.className=t.className,this.text=t.text,this.image=t.image,this.hint=t.hint,this.listen("click",(t=>{t.preventDefault(),e()}))}set isAvailable(t){t?this.removeClass("unavailable"):this.addClass("unavailable")}get isAvailable(){return!this.hasClass("unavailable")}get hint(){return this.root.getAttribute("title")}set hint(t){t&&this.root.setAttribute("title",t)}set text(t){this.root.textContent=t}get text(){return this.root.textContent}set image(t){var e;null===(e=this.imageElement)||void 0===e||e.remove(),t&&(this.imageElement=create(`<img src="/appforge/img/${t}" alt=""/>`),this.append(this.imageElement))}get image(){var t;return null===(t=this.imageElement)||void 0===t?void 0:t.src}}resolveStyle("header");class Header extends Fragment{constructor(){super('<header id="header"></header>'),this.groupLink=create("<a></a>"),this.appName=create("<p></p>"),this.resetButton=new Button({className:"frameless reset",image:"reset.svg",hint:"Сброс"},(()=>location.reload())),this.infoButton=new Button({className:"frameless info",image:"info.svg",hint:"Информация о приложении"},(()=>this.showAppInfo())),this.helpButton=new Button({className:"frameless help",image:"help.svg",hint:"Руководство пользователя"},(()=>this.showHelpDownloader())),this.append(this.groupLink,"|",this.appName,this.resetButton,this.infoButton,this.helpButton)}setAppInfo(t){this.appInfo=t,this.groupLink.href=t.groupPath,this.groupLink.textContent=t.groupName,this.appName.textContent=t.name}showAppInfo(){var t,e;popupList("Информация",[{icon:"🛈",text:"Версия программы: "+this.appInfo.version},{icon:"🗓",text:"Дата обновления: "+valueOrDefault(null===(t=appConfig.info)||void 0===t?void 0:t.updateDate,this.appInfo.updateDate)},{icon:"👤",text:"Технолог: "+this.appInfo.technologistName}],null===(e=appConfig.info)||void 0===e?void 0:e.additional)}showHelpDownloader(){popupAction("Руководство",valueOrDefault(appConfig.info.description,""),"Скачать инструкцию",(()=>downloadUserManual(this.appInfo.helpPath)))}}function downloadUserManual(t){const e=document.createElement("a");e.href=t,e.target="_blank",document.body.appendChild(e),e.click(),document.body.removeChild(e)}const defaultDateTime=new t$1;class Datepicker extends Fragment{pickDateRange(t){this.config.range&&this.easepick?(this.easepick.setStartDate(t[0]),this.easepick.setEndDate(t[1])):this.easepick.setDate(t[0])}constructor(t,e){super('    \n            <div class="datepicker"><input></div>\n        '),this.config=t,this.pickedDateRange=easepickDetailToDateRange({date:defaultDateTime,start:defaultDateTime,end:defaultDateTime},this.config.range);const s=this.root.querySelector("input");this.append(new Button({text:"📅"},(()=>s.click()))),this.onMount((()=>{this.easepick=createPicker(s,t,(t=>{this.pickedDateRange=t,e(t)}))}))}}function createPicker(t,e,a){return new s.create({element:t,calendars:e.range?2:1,grid:2,zIndex:100,plugins:[e.range?i:null,n,s$1],lang:"ru",date:defaultDateTime,RangePlugin:e.range?{startDate:defaultDateTime,endDate:defaultDateTime,locale:{one:"день",few:"дня",many:"дней"},delimiter:" - "}:null,AmpPlugin:{darkMode:!1,resetButton:!0,dropdown:{minYear:valueOrDefault(e.minYear,2010),maxYear:e.maxYear,months:!0,years:!0}},LockPlugin:{minDays:e.minDays,maxDays:e.maxDays},css:["/appforge/css/third-party/easepick.css"],setup(t){t.on("select",(s=>{a(easepickDetailToDateRange(s.detail,e.range)),setTimeout((()=>t.hide()),10)}))}})}function easepickDetailToDateRange(t,e){return e?[stringifyDate(t.start),stringifyDate(t.end)]:stringifyDate(t.date)}class InlineFragment extends Fragment{constructor(t,e){super(e),this.parent=t,t.append(this)}}class Field extends InlineFragment{triggerValueChange(t){this.value=t,this.onValueChangeCallbacks.forEach((t=>t(this.value)))}get jsonValue(){return jsonify(this.value)}get prettyValue(){return prettify(this.value)}makeValid(){this.removeClass("wrong")}makeInvalid(){this.addClass("wrong")}onValueChange(t){this.onValueChangeCallbacks.push(t)}constructor(t,e,s,i,...n){super(t,`<div class="${e.type}-field field" ${e.size?`style="grid-column: span ${e.size}`:""}"></div>`),this.parent=t,this.onValueChangeCallbacks=[],s&&e.label&&this.append(create(`<p>${e.label}</p>`)),this.append(...n),this.value=i}}class DatepickerField extends Field{constructor(t,e){super(t,e,!0,null),this.config=e,this.calendar=new Datepicker(this.config,(t=>this.triggerValueChange(t))),this.append(this.calendar),this.value=this.calendar.pickedDateRange}triggerValueChange(t){this.calendar.pickDateRange(t),super.triggerValueChange(t)}}class Checkbox extends Fragment{constructor(t,e){super(`\n            <label class="checkbox">\n                <input type="checkbox">\n                ${valueOrDefault(t.label,"")}\n            </label>`),this.checkboxElement=this.select("input"),this.listen("change",(()=>e(this.checked)))}get checked(){return this.checkboxElement.checked}}class Switch extends Checkbox{constructor(t,e){super(t,e),this.className="switch",this.append(create('<span class="slider"></span>'))}}class SwitchField extends Field{constructor(t,e){super(t,e,!1,!1,new Switch(e,(t=>this.triggerValueChange(t))))}}resolveStyle("third-party/virtual-select");const virtualSelectModulePromise=resolveModule("third-party/virtual-select.min");class Select extends Fragment{constructor(t,e){super('<div class="select"></div>'),this.config=t,this.pickedKeys=[],this.modulePromise=virtualSelectModulePromise,this.options=new Map,this.findOptions=t=>new Map(t.map((t=>[t,this.options.get(t)]))),this.modulePromise.then((()=>{applyVirtualSelect(this.root,t)})),this.listen("change",(t=>{const s=t.currentTarget.value,i=s.length>0?"object"==typeof s?s:[s]:[];this.pickedKeys.sort().toString()!==i.sort().toString()&&(this.pickedKeys=i,e(this.pickedKeys))}))}updateOptions(t){if(compareMaps(this.options,t))return;const e=[...this.pickedKeys];return this.modulePromise.then((()=>{t&&t.size>0?(this.options=t,this.root.setOptions(mapToVirtualSelectOptions(t)),this.pickOptions(e),this.root.enable()):(this.root.disable(),this.root.reset(),this.root.blur())}))}pickOptions(t){this.modulePromise.then((()=>{this.root.setValue(t)}))}}function applyVirtualSelect(t,e){VirtualSelect.init({ele:t,additionalClasses:"multiselect",disabled:!0,autofocus:!1,markSearchResults:!0,zIndex:100,optionsCount:6,multiple:!!e.multiple,search:!!e.search,hasOptionDescription:!!e.showCodes,disableSelectAll:!!e.disableSelectAll,maxValues:e.maxValues,maxWidth:"100%",position:"bottom",disableAllOptionsSelectedText:!0,placeholder:"",noOptionsText:"Варианты не найдены",noSearchResultsText:"Результатов не найдено",selectAllText:"Выбрать все",searchPlaceholderText:"Поиск...",optionsSelectedText:"(выбрано)",optionSelectedText:"вариант выбран",allOptionsSelectedText:"Все",clearButtonText:"Очистить",moreText:"ещё..."})}function mapToVirtualSelectOptions(t){return[...t.entries()].map((t=>({label:t[1],value:t[0],alias:t[0],description:t[0]})))}class SelectField extends Field{constructor(t,e){const s=new Select(e,(t=>this.triggerValueChange(t)));super(t,e,!0,[]),this.config=e,this.options=new Map,this.staticOptions=new Map,this.serviceBankOptions=new Map,this.awaitingForServiceBankOptions=!1,this.append(s),this.selectFragment=s}triggerValueChange(t){this.selectFragment.modulePromise.then((()=>{this.selectFragment.pickOptions(t),super.triggerValueChange(this.selectFragment.pickedKeys)}))}get prettyValue(){return prettify(this.selectFragment.findOptions(this.value))}setStaticOptions(t){this.staticOptions=t,this.updateOptions()}setupServiceBank(t,e=[]){this.awaitingForServiceBankOptions=!0,setupServiceBankRetrieving(this.parent.parent,t,((t,s)=>{var i;this.serviceBankOptions=t,null===(i=this.updateOptions())||void 0===i||i.then((()=>{e.length+s.length>0&&this.triggerValueChange([...s,...e])})),this.awaitingForServiceBankOptions=!1}))}updateOptions(){return this.options=concatMaps(this.staticOptions,this.serviceBankOptions),this.selectFragment.updateOptions(this.options)}}function setupServiceBankRetrieving(t,e,s){const i=e.propertiesTriggerKeys?t.findFields(Array.from(Object.values(e.propertiesTriggerKeys))):null,n=createServiceBankAccessor(e);subscribeToFields(i,(()=>{const t=Object.assign({},e.properties);Object.entries(e.propertiesTriggerKeys).forEach((e=>{const s=null==i?void 0:i.get(e[1]);if(s){const i=s.jsonValue;t[e[0]]=s instanceof SelectField&&null!==i?Object.keys(i):i}})),n.fetch(t).then((t=>t?s(t,n.userAssociatedOptionKeys):t))}))}function createServiceBankAccessor(t){const e="carriers"===t.type?new CarriersServiceBank:"countries"===t.type?new CountriesServiceBank:"regions"===t.type?new RegionsServiceBank:"roads"===t.type?new RoadsServiceBank:"stations"===t.type?new StationsServiceBank:new Error("Cannot resolve ServiceBank type: "+t.type);if(e instanceof Error)throw e;return e}function subscribeToFields(t,e,s=!0){null==t||t.forEach((t=>t.onValueChange((()=>{e()})))),s&&e()}SelectField.OptionsRetrievingQuery={};class TextArea extends Fragment{constructor(){super('<div class="textarea" contentEditable spellcheck="false"></div>'),this.shiftIsPressed=!1,this.listen("keydown",(t=>{"Tab"===t.key&&(t.preventDefault(),this.insertTab()),"Shift"===t.key&&(this.shiftIsPressed=!0)})),this.listen("keyup",(t=>{"Shift"===t.key&&(this.shiftIsPressed=!0)}))}onInputEnter(t){this.listen("focusout",(()=>t(this.text))),this.listen("keydown",(t=>{"Enter"===t.key&&this.shiftIsPressed&&(this.text=this.text.trimEnd(),this.root.blur())}))}get text(){return this.root.innerText}set text(t){this.root.innerText=t}insertTab(){if(getSelection){const t=getSelection();if(t.getRangeAt&&t.rangeCount){const e=t.getRangeAt(0);e.deleteContents(),e.insertNode(document.createTextNode("    ")),t.collapseToEnd()}}}}class TextField extends Field{constructor(t,e){super(t,e,!0,"");const s=new TextArea;s.onInputEnter((t=>this.triggerValueChange(t))),this.append(s)}}class Section extends InlineFragment{constructor(t,e,s){super(t,`\n            <div class="section"\n                 style="${e}">\n            </div>`),this.fields=new Map,this.getField=t=>this.fields.get(t),s.title&&this.append(create(`<p>${s.title}</p>`));for(const t in s)t.endsWith("Field")&&this.fields.set(t,this.createField(s[t]))}createField(t){switch(t.type){case"switch":return new SwitchField(this,t);case"datepicker":return new DatepickerField(this,t);case"select":return new SelectField(this,t);case"text":return new TextField(this,t)}}}class FormStatementAccessor extends JsonAccessor{constructor(){super(),this.method="POST",this.errorFooter="Ошибка получения состояния формы"}fetch(t,e){return this.params={trigger:e},super.fetch(t)}}resolveStyle("form");class Form extends Fragment{constructor(t,e){var s;super(`<form class="${t.layout?t.layout:"horizontal"}"></form>`),this.config=t,this.onSubmit=e,this.sections=new Map,this.fields=new Map,this.submitButton=new Button({className:"confirm",text:valueOrDefault(null===(s=this.config)||void 0===s?void 0:s.submitText,"")},(()=>this.onSubmit(this.jsonFieldValues,this.prettyFieldValues))),this.startValidating=!1;for(const e in t)if(e.endsWith("Section")){const s=new Section(this,t.layout,t[e]);this.sections.set(e,s),s.fields.forEach(((t,s)=>this.fields.set(`${e}.${s}`,t)))}this.config.statementPath&&this.startStatementRetrieving(),this.append(this.submitButton),this.submitButton.listen("mouseenter",(()=>{this.startValidating=!0,this.submitButton.disable(),this.validateFields()}))}get jsonFieldValues(){return jsonifyFields(this.fields)}get prettyFieldValues(){const t=new Map;return this.fields.forEach(((e,s)=>{t.set(s,e.prettyValue)})),t}findFields(t){const e=new Map;return t.forEach((t=>e.set(t,this.fields.get(t)))),e}startStatementRetrieving(){this.statementAccessor=new FormStatementAccessor,this.hide(),this.onMount((()=>this.manageFieldsStatement("initial").then((()=>this.show())))),this.fields.forEach(((t,e)=>{t.onValueChange((()=>this.manageFieldsStatement(e)))}))}manageFieldsStatement(t){return this.statementAccessor.path=this.config.statementPath,this.statementAccessor.fetch(this.jsonFieldValues,t).then((t=>{var e,s;t&&(this.currentStatement=t,this.validateFields(),t.setOptions&&Object.entries(t.setOptions).forEach((([t,e])=>{const s=this.fields.get(t);s&&s instanceof SelectField&&s.setStaticOptions(jsonToMap(e))})),t.setupServiceBank&&Object.entries(t.setupServiceBank).forEach((([e,s])=>{var i;const n=this.fields.get(e);if(n&&n instanceof SelectField){const a=t.setValues?null===(i=Object.entries(t.setValues).find((t=>t[0]===e)))||void 0===i?void 0:i[1]:void 0;n.setupServiceBank(s,a)}})),t.setValues&&Object.entries(t.setValues).forEach((([t,e])=>{const s=this.fields.get(t);!s||s instanceof SelectField&&s.awaitingForServiceBankOptions||s.triggerValueChange(e)})),null===(e=t.show)||void 0===e||e.forEach((t=>{t.includes(".")?this.fields.get(t).show():this.sections.get(t).show()})),null===(s=t.hide)||void 0===s||s.forEach((t=>{t.includes(".")?this.fields.get(t).hide():this.sections.get(t).hide()})))}))}validateFields(){this.startValidating&&(this.currentStatement.wrong?this.submitButton.disable():this.submitButton.enable(),this.fields.forEach(((t,e)=>{var s;t.makeValid(),(null===(s=this.currentStatement.wrong)||void 0===s?void 0:s.find((t=>e===t)))&&t.makeInvalid()})))}}class NavigationBar extends Fragment{constructor(t){super('<div class="nav-bar"></div>'),this.tabButtons=new Map,this.tabActions=new Map,t&&Object.entries(t).forEach((t=>{this.add(t[0],t[1])}))}add(t,e){const s=()=>{e(),this.tabButtons.forEach(((e,s)=>{e.removeClass("active"),s===t&&e.addClass("active")}))},i=new Button({className:"tab",text:t},(()=>s()));this.tabButtons.set(t,i),this.tabActions.set(t,s),this.append(i)}pick(t){this.tabActions.get(t)()}}class NavigationBody extends Fragment{constructor(...t){super('<div class="nav-body"></div>'),this.append(...t),this.hide()}}class NavigationContainer extends Fragment{constructor(){super('<div class="nav-container"></div>'),this.naviBar=new NavigationBar,this.naviBodies=[],this.append(this.naviBar)}createTab(t,e,...s){const i=new NavigationBody(...s);this.naviBodies.push(i),this.append(i),this.naviBar.add(t,(()=>{this.naviBodies.forEach((t=>t.hide())),i.show(),e()}))}pickTab(t){this.naviBar.pick(t)}}class Report extends JsonAccessor{constructor(t){super(),this.path=t,this.method="POST",this.errorFooter="Не удалось загрузить отчёт"}}class Head extends InlineFragment{constructor(t,e){super(t,`\n            <div class="head"><p>${e}</p></div>\n        `),this.titleElement=this.select("p"),this.toTopButton=this.createToTopButton(),this.exportButton=this.createXlsxExportButton(),this.collapseButton=this.createCollapseButton(),this.fullscreenButton=this.createFullscreenButton(),this.originTitleText=e,this.append(this.toTopButton,this.exportButton,this.collapseButton,this.fullscreenButton),this.hideButtons()}set title(t){this.titleElement.textContent=t}get title(){return this.titleElement.textContent}showButtons(){this.toTopButton.show(),this.exportButton.show(),this.collapseButton.show(),this.fullscreenButton.show()}hideButtons(){this.toTopButton.hide(),this.exportButton.hide(),this.collapseButton.hide(),this.fullscreenButton.hide()}createToTopButton(){return new Button({hint:"Наверх",image:"to_top_blue.svg"},(()=>scrollIntoElement(document.body)))}createXlsxExportButton(){return new Button({hint:"Экспортировать",image:"download.svg"},(()=>popupTimeoutAction("Экспортировать таблицу в .xlsx?","Подтвердить",(()=>this.parent.body.table.xlsxAccessor.fetch()))))}createCollapseButton(){return createToggleableButton({hint:"Свернуть",image:"collapse.svg"},{hint:"Развернуть",image:"collapse.svg"},(()=>{var t,e;this.parent.body.collapse(),null===(t=this.chartsButton)||void 0===t||t.disable(),null===(e=this.fullscreenButton)||void 0===e||e.disable()}),(()=>{var t,e;this.parent.body.expand(),null===(t=this.chartsButton)||void 0===t||t.enable(),null===(e=this.fullscreenButton)||void 0===e||e.enable()}))}createFullscreenButton(){const t={hint:"Развернуть на весь экран",image:"expand.svg"},e=new Button(t,(()=>toggleFullscreen(this.parent.root)));return addEventListener("fullscreenchange",(()=>{const s=!!getFullscreenElement();e.hint=s?"Выйти из полноэкранного режима":t.hint,e.image=s?"exit.svg":t.image})),e}setTitleOrDefault(t){this.title=t||this.originTitleText}}function createToggleableButton(t,e,s,i){let n=!1;const a=new Button(t,(()=>{!1===n?(t.image!==e.image&&(a.image=e.image),a.hint=e.hint,s()):(t.image!==e.image&&(a.image=t.image),a.hint=t.hint,i()),n=!n}));return a}class TextInput extends Fragment{constructor(t,e){super(`\n            <div class="text input">\n                <input type="text" placeholder="${t}">\n            <div/>\n        `),this.append(new Button({className:"frameless reset",text:"❌",hint:"Сбросить"},(()=>this.text=""))),this.textInputElement=this.select("input"),this.listen("input",(()=>{this.toggleClass("empty",!this.text||0===this.text.length),e&&e(this.text)}))}get text(){return this.textInputElement.value}set text(t){this.textInputElement.value=t}}class BlobAccessor extends Accessor{get request(){return this.requestInit.blob()}}class XlsxAccessor extends BlobAccessor{constructor(t){super(),this.body=t,this.path="/appforge/converter/xlsx",this.method="POST",this.errorFooter="Ошибка экспорта таблицы"}fetch(){return super.fetch().then((t=>{const e=document.createElement("a");e.setAttribute("download",this.body.name+".xlsx");const s=URL.createObjectURL(t);return e.href=s,e.setAttribute("target","_blank"),e.click(),URL.revokeObjectURL(s),t}))}}function executeFormulaForRowData(formula,row,totalRow,matrix){return row.length,totalRow.length,matrix.length,eval(formula)}resolveStyle("table");class Table extends InlineFragment{constructor(t,e,s,i){var n;super(t,'\n            <div class="table">\n                <table>\n                    <thead></thead>\n                    <tfoot></tfoot>\n                    <tbody></tbody>\n                </table>\n            </div>'),this.data=e,this.colFeatures=s,this.model=i,this.filtersMap=new Map,this.thead=this.select("thead"),this.tbody=this.select("tbody"),this.tfoot=this.select("tfoot"),i.head&&(this.head=i.head),e&&e.length>0&&this.appendData(e),this.xlsxAccessor=new XlsxAccessor({name:this.parent.parent.head.title,context:null===(n=this.parent.context)||void 0===n?void 0:n.visibleValues,title:this.parent.parent.head.title,header:getCompleteRowsFromElement(this.thead),body:getCompleteRowsFromElement(this.tbody),total:getCompleteRowsFromElement(this.tfoot)[0]}),this.addScrollHelper()}set head(t){emptyElement(this.thead),this.thead.innerHTML+=`<tr>${t.map((t=>`<th>${t}</th>`)).join("")}</tr>`}appendData(t){let e=[];t.forEach((t=>t.forEach(((t,s)=>{var i;const n=null===(i=this.colFeatures)||void 0===i?void 0:i[s];"number"==typeof t&&"text"!==(null==n?void 0:n.type)?(null==n?void 0:n.formula)?e[s]=0:e[s]=e[s]?numberOf(e[s])+t:t:e[s]=""})))),e=this.applyFeaturesToRowData(e),this.tbody.innerHTML=t.map((t=>this.createHtmlRowText(this.applyFeaturesToRowData(t)))).join(""),t.length>1&&(this.tfoot.innerHTML=this.createHtmlRowText(e)),this.groupPrimaryCells(),this.spanTotalPrimaryCells()}applyFeaturesToRowData(t,e=t){var s;return null===(s=this.colFeatures)||void 0===s||s.forEach(((s,i)=>{var n,a;"numeric"===s.type&&s.formula?t[i]=executeFormulaForRowData(s.formula,t,e,this.data):"text"===s.type&&(null===(a=null===(n=s.replaceWithLabels)||void 0===n?void 0:n.fields)||void 0===a||a.forEach((e=>{const s=this.parent.parent.associatedFormSnapshot.fields.get(e),n=s?s.options.get(`${t[i]}`):void 0;n&&(t[i]=n)})))})),t}createHtmlRowText(t){return`\n            <tr>${t.map(((e,s)=>this.colFeatures&&this.colFeatures[s]?this.createHtmlCellText(s,t):`<td>${e}</td>`)).join("")}\n            </tr>`}createHtmlCellText(t,e){const s=this.colFeatures[t],i=e[t];if(s)return`\n                <td class="${s.type}${this.model.primaryColumnsNumber>t?" primary":""}" \n                    ${"numeric"===s.type&&s.colored?`style="color: ${i>=0?"var(--positive-color)":"var(--negative-color)"}"`:""}>\n                    ${i}\n                </td>`}applyFilter(t){t.append(new TextInput("🔎",(e=>{this.filtersMap.set(getCellIndexWithSpans(t),e)})).root)}filtrateTableMap(t){return filterMap(t,((t,e)=>{const s=e.concat(t.map((t=>String(t))));for(let t=0;t<s.length;t++){const e=this.filtersMap.get(t);if(!s[t].toLowerCase().includes(e?e.toLowerCase():""))return!1}return!0}))}spanTotalPrimaryCells(){this.tfoot.querySelectorAll("tr td.primary").forEach(((t,e)=>{0===e?(t.colSpan=this.model.primaryColumnsNumber,t.textContent="Итого"):t.remove()}))}groupPrimaryCells(t=this.tbody.querySelector("tr:first-of-type"),e=this.tbody.querySelector("tr:last-of-type"),s=0){let i,n;const a=()=>{n&&s<this.model.groupedColumnsNumber-1&&this.groupPrimaryCells(n.parentElement,i,s+1)};for(;i!==e;){i=i?i.nextElementSibling:t;const e=i.cells[s];n&&n.textContent===(null==e?void 0:e.textContent)?(n.rowSpan++,e.hidden=!0):(a(),n=i.querySelectorAll("td.primary")[s])}a()}addScrollHelper(){let t=!1;this.listen("scroll",(()=>{t&&0!=Math.round(this.root.getClientRects().item(0).top)&&scrollIntoElement(this.root)})),this.listen("mouseenter",(()=>t=!0)),this.listen("mouseleave",(()=>t=!1))}}function getCellIndexWithSpans(t){let e=-1,s=t.parentElement.parentElement.querySelectorAll("tr"),i=[],n=null,a=null,o=null;for(let r=0;r<s.length&&-1===e;r++){console.log(!0),i[r]=i[r]||[];const l=s[r];for(let s=0;s<l.cells.length;s++){n=l.cells[s],a=l.rowIndex,i[a]=i[a]||[],o=null;for(let t=0;t<=i[a].length&&null===o;t++)i[a][t]||(o=t);if(n===t){e=o;break}for(let t=a;t<a+n.rowSpan;t++)for(let e=o;e<o+n.colSpan;e++)i[t]=i[t]||[],i[t][e]=1}}return e}function getCompleteRowsFromElement(t){let e=[];return t.querySelectorAll("tr").forEach((t=>{let s=[];t.querySelectorAll("td, th").forEach((t=>{t.hidden||s.push({text:t.innerText.trim(),colspan:t.colSpan,rowspan:t.rowSpan})})),e.push(s)})),e}class Context extends InlineFragment{constructor(t,e){super(t,'<ul class="context"></ul>'),this.visibleValues=Object.entries(e).map((([e,s])=>e+": "+t.parent.associatedFormSnapshot.prettyFieldValues.get(s))),this.root.innerHTML=this.visibleValues.map((t=>`<li>${t}</li>`)).join("")}}class Body extends InlineFragment{constructor(t){super(t,'<div class="body"></div>'),this._collapsed=!1,this.collapse=()=>this.collapsed=!0,this.expand=()=>this.collapsed=!1}setReport(t){this.reset(),this.cache=t,t.context&&(this.context=new Context(this,t.context)),t.table&&(this.table=new Table(this,t.data,t.dataFeatures,t.table))}get collapsed(){return this._collapsed}set collapsed(t){this._collapsed=t,t?emptyElement(this.root):this.setReport(this.cache)}reset(){this.cache=void 0,emptyElement(this.root)}}resolveStyle("report");class ReportSlot extends InlineFragment{constructor(t,e){super(t,'<div class="report"></div>'),this.config=e,this.head=new Head(this,this.config.title),this.body=new Body(this)}applyReport(t,e){this.associatedFormSnapshot=e,this.reportModelCache=t,this.head.setTitleOrDefault(t.title),this.head.showButtons(),this.body.setReport(t),t.data&&0!==t.data.length?scrollIntoElement(this.root):popupMessage("Отчёт пуст","Отсутствуют подходящие данные")}}const cssPromises=Promise.all([resolveStyle("global"),resolveStyle("navigation"),resolveStyle("inputs"),resolveStyle("states"),resolveStyle("third-party/animate"),resolveStyle("misc")]);class ForgedApplication extends Fragment{constructor(t=document.body){let e;super(t),this.header=new Header,this.formContainer=new NavigationContainer,this.reportSlots=new Map,this.hide(),cssPromises.then((()=>this.show())),this.append(this.header,this.formContainer),document.title=appInfo.name,this.header.setAppInfo(appInfo);for(const t in appConfig){let s;if(t.endsWith("Form"))s=appConfig[t],e=e||s.title,this.formContainer.createTab(s.title,(()=>this.selectSlotsAssociatedWithForm(t)),this.createForm(s));else if(t.endsWith("Slot")){s=appConfig[t];const e=new ReportSlot(this,s);this.reportSlots.set(t,e),s.associatedWith&&e.hide()}}this.formContainer.pickTab(e)}createForm(t){const e=new Report(t.submitPath),s=new Form(t);return s.onSubmit=(t,i)=>{s.submitButton.disable();const n=s;e.fetch(t).then((t=>{var e;null===(e=this.reportSlots.get(t.slot))||void 0===e||e.applyReport(t,n),s.submitButton.enable()}))},s}selectSlotsAssociatedWithForm(t){Array.from(this.reportSlots.values()).forEach((e=>{e.config.associatedWith!==t&&e.config.associatedWith?e.hide():e.show()}))}}var ForgedApplication$1=Object.freeze({__proto__:null,ForgedApplication:ForgedApplication});export{Button as B,Fragment as F,Select as S,TextArea as T,ForgedApplication as a,ForgedApplication$1 as b};
//# sourceMappingURL=ForgedApplication-0eb96cf6.js.map

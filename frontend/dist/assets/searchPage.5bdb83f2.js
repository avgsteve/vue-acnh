import{I as e,L as t,a}from"./index.ff353531.js";import{m as n,M as s,L as l,D as r,b as o,o as i,d,c,w as u,J as m,K as h,e as p,E as g,G as _,F as C,V as f,I as b}from"./vendor.a945b803.js";import{_ as w,a as O,b as T}from"./detailedCardContent.13462854.js";import{_ as k}from"./AddToListBtn.6ad23a52.js";const D=n({name:"NumberStepper",components:{},inject:{currentValue:{default:10}},setup:()=>{},props:{disableInput:{type:Boolean,default:!0},initialNumber:{type:Number,default:5},minNumber:{type:Number,default:5},maxNumber:{type:Number,default:50},step:{type:Number,default:5},integer:{type:Boolean,default:!0},inputWidth:{type:String,default:"40px"},buttonSize:{type:String,default:"32px"},longPress:{type:Boolean,default:!0}},data:()=>({dataObj:null}),computed:{},watch:{},created(){},mounted(){console.warn("stepper is mounted! :",this)},unmounted(){},methods:{onChange(e){console.log("stepper的值改變了: ",e),this.$emit("EmitCurrentStepperValue",e)}}});D.render=function(e,t,a,n,o,i){const d=s("van-stepper");return l(),r(d,{modelValue:e.currentValue,"onUpdate:modelValue":t[1]||(t[1]=t=>e.currentValue=t),modelModifiers:{number:!0},onChange:e.onChange,step:"step"},null,8,["modelValue","onChange"])};const v=n({name:"SearchResultTable",components:{NumberStepper:D,ItemCard:w,ItemCardBody:O,DetailedCardContent:T,AddToListBtn:k},setup:()=>{let e=o(window.innerWidth);const t=()=>e.value=window.innerWidth;i((()=>window.addEventListener("resize",t))),d((()=>window.removeEventListener("resize",t)));const a=c((()=>e.value<550?"xs":e.value>549&&e.value<1200?"md":e.value>1199?"lg":void 0)),n=c((()=>e.value));return u(n,((e,t)=>{console.log({newWidth:e,oldWidth:t})})),{width:n,type:a}},props:{},data:()=>({data_numbersOfResultPerPage:20,data_stepperInitialValue:10,data_numberOfCurrentPage:1,data_showNameOfSelectedLanguageOnly:!1,data_showNameOfLanguage:{en:!0,zhTW:!0,zhCN:!0},data_cardSettingAndData:{cardTitle:"",setting:{closeOnClickOverlay:!0,showCancelBtn:!1,showLoader:!0},data:{}},data_itemId:"",windowWidth:window.innerWidth}),computed:{computed_selectedCategory(){return this.$store.getters[`itemsData/${e.GET_SELECTED_CATEGORY}`]},computed_selectedSorting(){return this.$store.getters[`itemsData/${e.get_SELECTED_SORTING_OPTION}`]},computed_currentQueryData(){return this.$store.getters[`itemsData/${e.GET_ITEMS_FOR_QUERY}`]},computed_totalPages(){const t=this.$store.getters[`itemsData/${e.GET_ITEMS_FOR_QUERY}`],a=this.data_numbersOfResultPerPage;return Math.ceil(t.length/a)},computed_resultsToRenderForCurrentPage(){let t=(this.data_numberOfCurrentPage-1)*this.data_numbersOfResultPerPage,a=Array.from(this.$store.getters[`itemsData/${e.GET_ITEMS_FOR_QUERY}`]).slice(t,t+this.data_numbersOfResultPerPage);for(const e of a)e.name=e.nameEn;return console.log("resultsToShowInPage",a),a},computed_ifNoResultsToShow(){return 0===Array.from(this.$store.getters[`itemsData/${e.GET_ITEMS_FOR_QUERY}`]).length}},watch:{data_showNameOfSelectedLanguageOnly(){const e=this.data_showNameOfSelectedLanguageOnly;console.log("是否只顯示目前語言的名稱: ",e);let a=this.$store.getters[`languageSetting/${t.GET_CURRENT_LANGUAGE}`];console.log("currentLanguage： ",a);let n=this.data_showNameOfLanguage;if(!0===e)for(const t in n)console.log("key:",t),console.log("showNameOfLanguage[key]:",n[t]),t!==a&&(n[t]=!1),t===a&&(n[t]=!0),console.log("處理完的 showNameOfLanguage:",n);else for(const t in n)n[t]=!0},windowWidth(e,t){console.log("newWidth:",e)}},created(){},mounted(){},unmounted(){},methods:{clickCardConfirmEventHandler(e){console.log("data in clickCardConfirmEventHandler: ",e),this.data_cardSettingAndData.showCard=!1},clickItemForDetail(e,t){console.log("clickItemForDetail is called: "),this.axios.get(`http://159.65.10.92:81/api/ac/items/detailed-data?name=${e}`).then((e=>{this.data_cardSettingAndData.showCard=!0;const a=e.data;a.idForTranslation=t,this.data_cardSettingAndData.data=a,setTimeout((()=>{this.data_cardSettingAndData.setting.showLoader=!1}),400)}))}}}),E=b();m("data-v-64ace528");const y={class:"SearchResultTable"},N={class:"searchFilterOption"},$={class:"searchFilterOption__item"},S={class:"resultsTitle"},L={class:"resultsCount"},F={class:"searchFilterOption__item"},P={class:"resultsTitle"},R={class:"searchFilterOption__item"},I={class:"resultsTitle"},x={class:"stepper"},V={class:"searchFilterOption__item"},W={class:"resultsTitle"},A={class:"stepper"},z={key:0},B={key:1,class:"itemTable"},G={key:0,class:"minWidthCell"},U={key:1,class:"minWidthCell"},M={key:2,class:"minWidthCell"},j={class:"clickForDetail-image"},Q={class:"clickForDetail source"},Y={class:"clickForDetail source"},H={key:0,class:"minWidthCell name_tw"},J={key:1,class:"minWidthCell name_cn"},K={key:2,class:"minWidthCell name_en"},q={class:"addToListBtn"};h();const X=E(((e,t,a,n,o,i)=>{const d=s("van-switch"),c=s("van-stepper"),u=s("AddToListBtn"),m=s("DetailedCardContent"),h=s("ItemCardBody"),b=s("ItemCard");return l(),r("div",y,[p("div",N,[p("div",$,[p("p",S,g(e.$t("ui.search.resultCount"))+": ",1),p("p",L,g(e.computed_currentQueryData.length),1)]),p("div",F,[p("p",P,g(e.$t("ui.search.showNameInCurrentLanguage")),1),p(d,{modelValue:e.data_showNameOfSelectedLanguageOnly,"onUpdate:modelValue":t[1]||(t[1]=t=>e.data_showNameOfSelectedLanguageOnly=t),"active-color":"#ee0a24","inactive-color":"#dcdee0",size:e.width>500?"26px":"18px"},null,8,["modelValue","size"])]),p("div",R,[p("p",I,g(e.$t("ui.search.resultsPerPage")),1),p("div",x,[p(c,{modelValue:e.data_numbersOfResultPerPage,"onUpdate:modelValue":t[2]||(t[2]=t=>e.data_numbersOfResultPerPage=t),step:"2",min:"5",max:"30",integer:"","disable-input":"","input-width":e.width>500?"32px":"24px","button-size":e.width>500?"28px":"18px"},null,8,["modelValue","input-width","button-size"])])]),p("div",V,[p("p",W,g(e.$t("ui.search.pageNumber"))+" : "+g(e.data_numberOfCurrentPage)+" / "+g(e.computed_totalPages),1),p("div",A,[p(c,{modelValue:e.data_numberOfCurrentPage,"onUpdate:modelValue":t[3]||(t[3]=t=>e.data_numberOfCurrentPage=t),step:"1",min:"1",max:e.computed_totalPages,integer:"","disable-input":"","input-width":e.width>500?"32px":"24px","button-size":e.width>500?"28px":"18px"},null,8,["modelValue","max","input-width","button-size"])])])]),p("div",null,[e.computed_ifNoResultsToShow?(l(),r("div",z,[p("h4",null,g(e.$t("ui.search.pageNumber")),1),p("h4",null,g(e.$t("ui.search.resetFilter"))+"?",1)])):_("",!0),e.computed_ifNoResultsToShow?_("",!0):(l(),r("table",B,[p("thead",null,[p("tr",null,[e.data_showNameOfLanguage.zhTW?(l(),r("th",G,g(e.$t("table.header.nameTw")),1)):_("",!0),e.data_showNameOfLanguage.zhCN?(l(),r("th",U,g(e.$t("table.header.nameCn")),1)):_("",!0),e.data_showNameOfLanguage.en?(l(),r("th",M,g(e.$t("table.header.nameEn")),1)):_("",!0),p("th",null,g(e.$t("ui.button.addToList")),1),p("th",j,g(e.$t("table.header.img")),1),p("th",null,g(e.$t("table.header.priceBuy")),1),p("th",null,g(e.$t("table.header.priceSell")),1),p("th",Q,g(e.$t("table.header.variants")),1),p("th",Y,g(e.$t("table.header.source")),1)])]),p("tbody",null,[(l(!0),r(C,null,f(e.computed_resultsToRenderForCurrentPage,((t,a)=>(l(),r("tr",{key:a,"data-item_name":t.nameEn},[e.data_showNameOfLanguage.zhTW?(l(),r("td",H,g(t.nameTw),1)):_("",!0),e.data_showNameOfLanguage.zhCN?(l(),r("td",J,g(t.nameCn),1)):_("",!0),e.data_showNameOfLanguage.en?(l(),r("td",K,g(t.nameEn),1)):_("",!0),p("td",q,[p(u,{prop_itemData:t,class:"no_absolutePosition"},null,8,["prop_itemData"])]),p("td",{onClick:a=>e.clickItemForDetail(t.nameEn,t._id.$oid),class:"clickForDetail clickForDetail-image"},[p("img",{src:t.img,alt:""},null,8,["src"])],8,["onClick"]),p("td",{onClick:a=>e.clickItemForDetail(t.nameEn,t._id.$oid),class:"clickForDetail price"},g("-1"==t.price.buy?"N/A":t.price.buy),9,["onClick"]),p("td",{onClick:a=>e.clickItemForDetail(t.nameEn,t._id.$oid),class:"clickForDetail price"},g(t.price.sell),9,["onClick"]),p("td",{onClick:a=>e.clickItemForDetail(t.nameEn,t._id.$oid),class:"clickForDetail variants"},g(t.variants.length),9,["onClick"]),p("td",{onClick:a=>e.clickItemForDetail(t.nameEn,t._id.$oid),class:"clickForDetail source"},g(e.$t(`items.sources.${t.source[0].replace("'s ","s")}`)),9,["onClick"])],8,["data-item_name"])))),128))])]))]),p(b,{onCardConfirmBtnClicked:e.clickCardConfirmEventHandler,prop_cardData:e.data_cardSettingAndData},{default:E((()=>[p(h,null,{default:E((()=>[p(m,{prop_cardData:e.data_cardSettingAndData},null,8,["prop_cardData"])])),_:1})])),_:1},8,["onCardConfirmBtnClicked","prop_cardData"])])}));v.render=X,v.__scopeId="data-v-64ace528";const Z=n({name:"searchPage",components:{Toolbar:a,SearchResultTable:v},setup:()=>{}}),ee=b();m("data-v-6b45f4b4");const te={class:"searchPageContainer"},ae=p("div",{class:"bottomSpace"},null,-1);h();const ne=ee(((e,t,a,n,o,i)=>{const d=s("Toolbar"),c=s("SearchResultTable");return l(),r("div",te,[p(d),p(c),ae])}));Z.render=ne,Z.__scopeId="data-v-6b45f4b4";export default Z;

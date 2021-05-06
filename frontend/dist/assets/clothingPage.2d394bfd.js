import{T as e,L as t,_ as a,d as o,D as l}from"./index.c1c2f98c.js";import{m as s,J as n,K as i,M as r,L as d,D as c,e as g,G as p,I as u,F as m,V as h,H as _,E as f,b as C,r as T,w as x,s as y,v}from"./vendor.a945b803.js";import{_ as S}from"./AddToListBtn.834e0c2d.js";const b=s({name:"Preloader",components:{},setup:()=>{},props:{prop_isLoading:{type:Boolean,default:!0}},data:()=>({dataObj:null}),computed:{},watch:{},created(){},mounted(){},unmounted(){},methods:{}}),L=u();n("data-v-5280090c");const $={key:0,class:"loadingContainer"},I={class:"loadingContainer__background"},E=g("p",{class:"loadingText"},"Loading ",-1);i();const F=L(((e,t,a,o,l,s)=>{const n=r("van-loading");return e.prop_isLoading?(d(),c("div",$,[g("div",I,[e.prop_isLoading?(d(),c(n,{key:0,class:"loader",color:"#dfdfdf",size:"48px",vertical:"",type:"spinner"},{default:L((()=>[E])),_:1})):p("",!0)])])):p("",!0)}));b.render=F,b.__scopeId="data-v-5280090c";const w=s({name:"CreaturePageTabs",components:{},setup:()=>{},props:{prop1:{type:Number},prop_categories:{type:Array}},data:()=>({dataObj:null}),computed:{},watch:{},created(){},mounted(){},unmounted(){},methods:{categoryClicked(e){this.$emit("categoryClicked",e)}}}),V=u(),D=V(((e,t,a,o,l,s)=>{const n=r("van-tab"),i=r("van-tabs");return d(),c(i,{onClick:t[1]||(t[1]=t=>e.categoryClicked(t))},{default:V((()=>[(d(!0),c(m,null,h(e.prop_categories,((t,a)=>(d(),c(n,{key:a,title:e.$t(`items.category.${t.toLowerCase()}`),name:t},{default:V((()=>[_(e.$slots,"default",{},void 0,!0)])),_:2},1032,["title","name"])))),128))])),_:1})}));w.render=D,w.__scopeId="data-v-35d8ae34";const A=s({name:"clothingFlexboxViewControl",components:{},setup:()=>{},props:{prop1:{type:Number},prop2:{type:String}},data:()=>({scaleValue:100,filterText:"",delayedEmitTimer:""}),computed:{},watch:{filterText(){clearTimeout(this.delayedEmitTimer);const e=this.filterText,t=document.querySelector("#filterInputField");e&&t.classList.add("active"),e||t.classList.remove("active");const a=setTimeout((()=>{console.log("emit!: ",e),this.$emit("filterTextChanged",e)}),500);this.delayedEmitTimer=a}},created(){},mounted(){},unmounted(){},methods:{onScaleValueChanged(t){e("目前縮放比例:"+t+"%"),this.$emit("scaleValueChanged",t)},onFocus(e){console.log("eventObj: ",e);document.querySelector("#filterInputField").classList.add("active")},onBlur(e){console.log("not focused");const t=document.querySelector("#filterInputField");this.filterText||t.classList.remove("active")}}}),R=u();n("data-v-b45663fe");const k={id:"displayControl"},O={class:"displayControl__box displayFilter"},P={class:"displayControl__box sizeScaleSlider__container"},N={class:"sliderText"};i();const j=R(((e,t,a,o,l,s)=>{const n=r("van-field"),i=r("van-slider");return d(),c("div",k,[g("div",O,[g(n,{id:"filterInputField",class:"override",modelValue:e.filterText,"onUpdate:modelValue":t[1]||(t[1]=t=>e.filterText=t),center:"",clearable:"",label:e.$t("searchBar.filter"),placeholder:"Enter filter",onFocus:e.onFocus,onBlur:e.onBlur},null,8,["modelValue","label","onFocus","onBlur"])]),g("div",P,[g("p",N,f(e.$t("searchBar.scaleSlider")),1),g("div",null,[g(i,{class:"sizeScaleSlider",modelValue:e.scaleValue,"onUpdate:modelValue":t[2]||(t[2]=t=>e.scaleValue=t),onChange:e.onScaleValueChanged,max:200,min:50},null,8,["modelValue","onChange"])])])])}));A.render=j,A.__scopeId="data-v-b45663fe";const B=s({name:"clothingFlexboxView",components:{clothingFlexboxViewControl:A,AddToListBtn:S},setup(){const e=C(100),t=e.value/100;let a=T({margin:`${8*t}px ${10*t}px ${6*t}px`,transform:"scale(1.1)"}),o=T({width:7*t+"rem",padding:` ${.5*t}rem`});return x(e,((e,t)=>{console.log("newValue of scale:",e);let l=e/100;a.margin=`${8*l}px ${10*l}px ${6*l}px`,o.width=7*l+"rem",o.padding=.5*l+"rem"})),{scaleValue:e,changeScaleHandler:t=>{e.value=t},flexboxStyle:a,flexboxImageStyle:o}},props:{prop_selectedRecipesData:{type:Array,required:!1,default:[]},prop_tagsData:{type:Array,required:!1,default:[]}},data:()=>({filterText:""}),computed:{computed_filteredCreatureData(){const e=this.$store.getters[`languageSetting/${t.GET_TRANSLATION_DATA_FOR_RECIPES}`];let a=Array.from(this.prop_selectedRecipesData);for(let t=0;t<a.length;t++){const o=a[t],l=e[o.name.split("'").join("").split(".").join("")];o.stringForFilter=l}return a=a.filter((e=>e.stringForFilter.includes(this.filterText))),a}},watch:{filterText(e){}},created(){},mounted(){},unmounted(){},methods:{setTag(e,t){document.querySelectorAll(".clothingData__box ").forEach((e=>e.classList.remove("active"))),t.target.parentElement.classList.add("active"),this.$emit("clothingelected",e)},changeFilterTextHandler(e){this.filterText=e}}}),H=u();n("data-v-7dfe0f32");const G=g("hr",null,null,-1),q=g("h4",{class:"tagSectionHeading"}," Step 2. 點選圖片查看資料: ",-1),M={id:"clothingData"},z={class:"clothingData__flexContainer"},U={class:"clothingName"},Q=g("br",null,null,-1);i();const J=H(((e,t,a,o,l,s)=>{const n=r("clothingFlexboxViewControl"),i=r("AddToListBtn");return y((d(),c("div",null,[G,q,g(n,{onScaleValueChanged:e.changeScaleHandler,onFilterTextChanged:e.changeFilterTextHandler},null,8,["onScaleValueChanged","onFilterTextChanged"]),g("div",M,[g("div",z,[(d(!0),c(m,null,h(e.computed_filteredCreatureData,((t,a)=>(d(),c("div",{class:"clothingData__box",style:e.flexboxStyle,key:t.name+"#"+a,onClick:a=>e.setTag(t.tag,a)},[g("img",{src:t.variants[0].closetImage||t.variants[0].image||t.variants[0].inventoryImage||t.variants[0].storageImage,alt:"Tag: "+t.name,style:e.flexboxImageStyle},null,12,["src","alt"]),g("p",U,f(e.$t(`items.item.${t.name.split("'").join("").split(".").join("")}`)),1),g(i,{class:"add-to-list-btn",prop_itemData:t},null,8,["prop_itemData"])],12,["onClick"])))),128))]),Q])],512)),[[v,e.prop_selectedRecipesData.length>0]])}));B.render=J,B.__scopeId="data-v-7dfe0f32";const K=s({name:"clothingPage",components:{SectionComponent:a,Preloader:b,clothingPageTabs:w,clothingFlexboxView:B},data:()=>({data_isLoading:!0,data_categories:[],data_selectedCategory:"",data_dataOfSelectedCategory:[],data_swipeable:!0,data_categoryMenuTitle:{text:"Select a category",value:""}}),computed:{computed_currentLocale(){return this.$i18n.locale},computed_dataIsLoading(){return this.data_isLoading},computed_clothingCategories(){return this.$store.getters[`clothingData/${o.GET_CLOTHING_CATEGORIES}`]}},watch:{data_clothingCategories(){}},created(){this.$store.dispatch(`clothingData/${o.SET_CLOTHING_CATEGORIES}`),this.$store.dispatch(`languageSetting/${t.SET_TRANSLATION_DATA_FOR_RECIPES}`)},beforeMount(){l.get("https://www.animal-crossing.me/api/ac/clothing/categories",{headers:{CLIENT_REQ:"Vue.js-FETCH_clothing_CATEGORIES"}}).then((e=>{const t=e.data;for(let a=0;a<t.length;a++)t[a];this.data_categories=t,this.data_isLoading=!1}))},mounted(){},beforeUnmount(){},methods:{getDataOfSelectedTag(e){const t=this.data_selectedCategory;if(!e)return console.log("data_selectedTag被重設"),void(this.prop_clothingPageResults=[]);this.data_selectedTag=e;let a=`https://www.animal-crossing.me/api/ac/items/detailed-data?sourceSheet=${t}&tag=${e}`;this.axios.get(a).then((t=>{const a=t.data;console.log("axios 傳回的資料 ",a),this.prop_clothingPageResults=a,this.data_tagsMenuTitle=e}))},setClickedCategory(e){e!==this.data_selectedCategory&&(this.data_selectedCategory=e,l.get(`https://www.animal-crossing.me/api/ac/clothing?category=${e}`,{headers:{CLIENT_REQ:`fetch RECIPES data by category: ${e}`}}).then((e=>{const t=e.data;this.data_dataOfSelectedCategory=t})))},clothingelected(e,t){console.log("clothingelected: ",{creatureName:e,eventTarget:t})}}}),W=u();n("data-v-7d1db0d6");const X={class:"itemsPageContainer"};i();const Y=W(((e,t,a,o,l,s)=>{const n=r("Preloader"),i=r("clothingFlexboxView"),u=r("clothingPageTabs"),m=r("SectionComponent");return d(),c("div",X,[g(n,{prop_isLoading:e.computed_dataIsLoading},null,8,["prop_isLoading"]),e.computed_dataIsLoading?p("",!0):(d(),c(m,{key:0,class:"no-margin",props_title:"分類",props_subtitle:"Step 1. 選取分類"},{default:W((()=>[g(u,{prop_categories:e.data_categories,onCategoryClicked:e.setClickedCategory},{default:W((()=>[g(i,{prop_selectedRecipesData:e.data_dataOfSelectedCategory,onClothingelected:e.clothingelected},null,8,["prop_selectedRecipesData","onClothingelected"])])),_:1},8,["prop_categories","onCategoryClicked"])])),_:1},8,["props_subtitle"]))])}));K.render=Y,K.__scopeId="data-v-7d1db0d6";export default K;
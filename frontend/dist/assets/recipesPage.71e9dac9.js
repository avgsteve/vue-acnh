import{T as e,L as t,_ as a,R as s,D as o}from"./index.ff353531.js";import{m as l,J as r,K as i,M as n,L as d,D as c,e as p,G as u,I as g,F as m,V as _,H as h,E as f,b as C,r as T,w as x,s as y,v as S}from"./vendor.a945b803.js";import{_ as v}from"./AddToListBtn.6ad23a52.js";const b=l({name:"Preloader",components:{},setup:()=>{},props:{prop_isLoading:{type:Boolean,default:!0}},data:()=>({dataObj:null}),computed:{},watch:{},created(){},mounted(){},unmounted(){},methods:{}}),$=g();r("data-v-5108bd98");const E={key:0,class:"loadingContainer"},I={class:"loadingContainer__background"},L=p("p",{class:"loadingText"},"Loading ",-1);i();const F=$(((e,t,a,s,o,l)=>{const r=n("van-loading");return e.prop_isLoading?(d(),c("div",E,[p("div",I,[e.prop_isLoading?(d(),c(r,{key:0,class:"loader",color:"#dfdfdf",size:"48px",vertical:"",type:"spinner"},{default:$((()=>[L])),_:1})):u("",!0)])])):u("",!0)}));b.render=F,b.__scopeId="data-v-5108bd98";const R=l({name:"CreaturePageTabs",components:{},setup:()=>{},props:{prop1:{type:Number},prop_categories:{type:Array}},data:()=>({dataObj:null}),computed:{},watch:{},created(){},mounted(){},unmounted(){},methods:{categoryClicked(e){this.$emit("categoryClicked",e)}}}),V=g(),D=V(((e,t,a,s,o,l)=>{const r=n("van-tab"),i=n("van-tabs");return d(),c(i,{onClick:t[1]||(t[1]=t=>e.categoryClicked(t))},{default:V((()=>[(d(!0),c(m,null,_(e.prop_categories,((t,a)=>(d(),c(r,{key:a,title:e.$t(`items.category.${t.toLowerCase()}`),name:t},{default:V((()=>[h(e.$slots,"default",{},void 0,!0)])),_:2},1032,["title","name"])))),128))])),_:1})}));R.render=D,R.__scopeId="data-v-822a3b02";const O=l({name:"recipesFlexboxViewControl",components:{},setup:()=>{},props:{prop1:{type:Number},prop2:{type:String}},data:()=>({scaleValue:100,filterText:"",delayedEmitTimer:""}),computed:{},watch:{filterText(){clearTimeout(this.delayedEmitTimer);const e=this.filterText,t=document.querySelector("#filterInputField");e&&t.classList.add("active"),e||t.classList.remove("active");const a=setTimeout((()=>{console.log("emit!: ",e),this.$emit("filterTextChanged",e)}),500);this.delayedEmitTimer=a}},created(){},mounted(){},unmounted(){},methods:{onScaleValueChanged(t){e("目前縮放比例:"+t+"%"),this.$emit("scaleValueChanged",t)},onFocus(e){console.log("eventObj: ",e);document.querySelector("#filterInputField").classList.add("active")},onBlur(e){console.log("not focused");const t=document.querySelector("#filterInputField");this.filterText||t.classList.remove("active")}}}),A=g();r("data-v-9fae24b6");const w={id:"displayControl"},k={class:"displayControl__box displayFilter"},P={class:"displayControl__box sizeScaleSlider__container"},N={class:"sliderText"};i();const B=A(((e,t,a,s,o,l)=>{const r=n("van-field"),i=n("van-slider");return d(),c("div",w,[p("div",k,[p(r,{id:"filterInputField",class:"override",modelValue:e.filterText,"onUpdate:modelValue":t[1]||(t[1]=t=>e.filterText=t),center:"",clearable:"",label:e.$t("searchBar.filter"),placeholder:"Enter filter",onFocus:e.onFocus,onBlur:e.onBlur},null,8,["modelValue","label","onFocus","onBlur"])]),p("div",P,[p("p",N,f(e.$t("searchBar.scaleSlider")),1),p("div",null,[p(i,{class:"sizeScaleSlider",modelValue:e.scaleValue,"onUpdate:modelValue":t[2]||(t[2]=t=>e.scaleValue=t),onChange:e.onScaleValueChanged,max:200,min:50},null,8,["modelValue","onChange"])])])])}));O.render=B,O.__scopeId="data-v-9fae24b6";const j=l({name:"recipesFlexboxView",components:{recipesFlexboxViewControl:O,AddToListBtn:v},setup(){const e=C(100),t=e.value/100;let a=T({margin:`${8*t}px ${10*t}px ${6*t}px`,transform:"scale(1.1)"}),s=T({width:7*t+"rem",padding:` ${.5*t}rem`});return x(e,((e,t)=>{console.log("newValue of scale:",e);let o=e/100;a.margin=`${8*o}px ${10*o}px ${6*o}px`,s.width=7*o+"rem",s.padding=.5*o+"rem"})),{scaleValue:e,changeScaleHandler:t=>{e.value=t},flexboxStyle:a,flexboxImageStyle:s}},props:{prop_selectedRecipesData:{type:Array,required:!1,default:[]},prop_tagsData:{type:Array,required:!1,default:[]}},data:()=>({filterText:""}),computed:{computed_filteredCreatureData(){const e=this.$store.getters[`languageSetting/${t.GET_TRANSLATION_DATA_FOR_RECIPES}`];let a=Array.from(this.prop_selectedRecipesData);for(let t=0;t<a.length;t++){const s=a[t],o=e[s.name.split("'").join("")];s.stringForFilter=o}return a=a.filter((e=>e.stringForFilter.includes(this.filterText))),a}},watch:{filterText(e){}},created(){},mounted(){},unmounted(){},methods:{setTag(e,t){document.querySelectorAll(".recipesData__box ").forEach((e=>e.classList.remove("active"))),t.target.parentElement.classList.add("active"),this.$emit("recipeselected",e)},changeFilterTextHandler(e){this.filterText=e}}}),H=g();r("data-v-9c79d300");const q=p("hr",null,null,-1),G=p("h4",{class:"tagSectionHeading"}," Step 2. 點選圖片查看資料: ",-1),M={id:"recipesData"},z={class:"recipesData__flexContainer"},U={class:"nameOfRecipeTag"},Q=p("br",null,null,-1);i();const J=H(((e,t,a,s,o,l)=>{const r=n("recipesFlexboxViewControl"),i=n("AddToListBtn");return y((d(),c("div",null,[q,G,p(r,{onScaleValueChanged:e.changeScaleHandler,onFilterTextChanged:e.changeFilterTextHandler},null,8,["onScaleValueChanged","onFilterTextChanged"]),p("div",M,[p("div",z,[(d(!0),c(m,null,_(e.computed_filteredCreatureData,((t,a)=>(d(),c("div",{class:"recipesData__box",style:e.flexboxStyle,key:t.name+"#"+a,onClick:a=>e.setTag(t.sourceSheet,a)},[p("img",{src:t.variants[0].closetImage||t.variants[0].image||t.variants[0].inventoryImage||t.variants[0].storageImage,alt:"Tag: "+t.name,style:e.flexboxImageStyle},null,12,["src","alt"]),p("p",U,f(e.$t(`items.item.${t.name.split("'").join("")}`)),1),p(i,{class:"add-to-list-btn",prop_itemData:t},null,8,["prop_itemData"])],12,["onClick"])))),128))]),Q])],512)),[[S,e.prop_selectedRecipesData.length>0]])}));j.render=J,j.__scopeId="data-v-9c79d300";const K=l({name:"recipesPage",components:{SectionComponent:a,Preloader:b,recipesPageTabs:R,recipesFlexboxView:j},data:()=>({data_isLoading:!0,data_categories:[],data_selectedCategory:"",data_dataOfSelectedCategory:[],data_swipeable:!0,data_categoryMenuTitle:{text:"Select a category",value:""}}),computed:{computed_currentLocale(){return this.$i18n.locale},computed_dataIsLoading(){return this.data_isLoading},computed_recipesCategories(){return this.$store.getters[`recipesData/${s.GET_recipes_CATEGORIES}`]}},watch:{data_recipesCategories(){}},created(){this.$store.dispatch(`recipesData/${s.SET_RECIPES_CATEGORIES}`),this.$store.dispatch(`languageSetting/${t.SET_TRANSLATION_DATA_FOR_RECIPES}`)},beforeMount(){o.get("http://159.65.10.92:81/api/ac/recipes/categories",{headers:{CLIENT_REQ:"Vue.js-FETCH_recipes_CATEGORIES"}}).then((e=>{const t=e.data;let a={};for(let s=0;s<t.length;s++){const e=t[s];a[e]=e}console.log(a),this.data_categories=t,this.data_isLoading=!1}))},mounted(){},beforeUnmount(){},methods:{getDataOfSelectedTag(e){const t=this.data_selectedCategory;if(!e)return console.log("data_selectedTag被重設"),void(this.prop_recipesPageResults=[]);this.data_selectedTag=e;let a=`http://159.65.10.92:81/api/ac/items/detailed-data?sourceSheet=${t}&tag=${e}`;this.axios.get(a).then((t=>{const a=t.data;console.log("axios 傳回的資料 ",a),this.prop_recipesPageResults=a,this.data_tagsMenuTitle=e}))},setClickedCategory(e){e!==this.data_selectedCategory&&(this.data_selectedCategory=e,o.get(`http://159.65.10.92:81/api/ac/recipes?category=${e}`,{headers:{CLIENT_REQ:`fetch RECIPES data by category: ${e}`}}).then((e=>{const t=e.data;this.data_dataOfSelectedCategory=t})))},nameOfRecipeTagSelected(e){console.log("nameOfRecipeTagSelected: ",{creatureName:e})}}}),W=g();r("data-v-3adf6d59");const X={class:"itemsPageContainer"};i();const Y=W(((e,t,a,s,o,l)=>{const r=n("Preloader"),i=n("recipesFlexboxView"),g=n("recipesPageTabs"),m=n("SectionComponent");return d(),c("div",X,[p(r,{prop_isLoading:e.computed_dataIsLoading},null,8,["prop_isLoading"]),e.computed_dataIsLoading?u("",!0):(d(),c(m,{key:0,class:"no-margin",props_title:"分類",props_subtitle:"Step 1. 選取分類"},{default:W((()=>[p(g,{prop_categories:e.data_categories,onCategoryClicked:e.setClickedCategory},{default:W((()=>[p(i,{prop_selectedRecipesData:e.data_dataOfSelectedCategory,onNameOfRecipeTagSelected:e.nameOfRecipeTagSelected},null,8,["prop_selectedRecipesData","onNameOfRecipeTagSelected"])])),_:1},8,["prop_categories","onCategoryClicked"])])),_:1},8,["props_subtitle"]))])}));K.render=Y,K.__scopeId="data-v-3adf6d59";export default K;

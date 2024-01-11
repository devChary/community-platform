import{a as v,F,j as I}from"./jsx-runtime-913be41c.js";import{r as e}from"./index-2506bfc3.js";import{b as O,a as T,c as B}from"./theme-ui-components.esm-1dc2aee2.js";import{j as G}from"./theme-ui-core-jsx-runtime.esm-9bc3c749.js";function M(s,n,i){var w=this,r=e.useRef(null),d=e.useRef(0),a=e.useRef(null),f=e.useRef([]),p=e.useRef(),y=e.useRef(),_=e.useRef(s),c=e.useRef(!0);e.useEffect(function(){_.current=s},[s]);var m=!n&&n!==0&&typeof window<"u";if(typeof s!="function")throw new TypeError("Expected a function");n=+n||0;var S=!!(i=i||{}).leading,k=!("trailing"in i)||!!i.trailing,g="maxWait"in i,h=g?Math.max(+i.maxWait||0,n):null;e.useEffect(function(){return c.current=!0,function(){c.current=!1}},[]);var L=e.useMemo(function(){var R=function(o){var u=f.current,V=p.current;return f.current=p.current=null,d.current=o,y.current=_.current.apply(V,u)},b=function(o,u){m&&cancelAnimationFrame(a.current),a.current=m?requestAnimationFrame(o):setTimeout(o,u)},t=function(o){if(!c.current)return!1;var u=o-r.current;return!r.current||u>=n||u<0||g&&o-d.current>=h},x=function(o){return a.current=null,k&&f.current?R(o):(f.current=p.current=null,y.current)},l=function o(){var u=Date.now();if(t(u))return x(u);if(c.current){var V=n-(u-r.current),C=g?Math.min(V,h-(u-d.current)):V;b(o,C)}},q=function(){var o=Date.now(),u=t(o);if(f.current=[].slice.call(arguments),p.current=w,r.current=o,u){if(!a.current&&c.current)return d.current=r.current,b(l,n),S?R(r.current):y.current;if(g)return b(l,n),R(r.current)}return a.current||b(l,n),y.current};return q.cancel=function(){a.current&&(m?cancelAnimationFrame(a.current):clearTimeout(a.current)),d.current=0,f.current=r.current=p.current=a.current=null},q.isPending=function(){return!!a.current},q.flush=function(){return a.current?x(Date.now()):y.current},q},[S,g,n,h,k,m]);return L}const $=()=>v(F,{children:v(O,{sx:{background:"white",position:"relative",zIndex:1,marginTop:"-2px",paddingX:2,paddingY:1,border:"2px solid",borderColor:"black",borderTopWidth:"1px",lineHeight:1.5,borderBottomLeftRadius:1,borderBottomRightRadius:1},children:v(T,{sx:{fontSize:1},children:"Fetching results from Open Street Map"})})}),E=s=>{const{results:n,callback:i,setShowResults:w}=s;return G(O,{"data-cy":"osm-geocoding-results",as:"ul",sx:{background:"white",padding:0,position:"relative",zIndex:1,margin:"-2px 0 0",border:"2px solid black",borderTopWidth:"1px",listStyle:"none",borderRadius:0,borderBottomLeftRadius:1,borderBottomRightRadius:1},children:n.map((r,d)=>G(O,{as:"li",sx:{paddingY:1,paddingX:2,lineHeight:1.5,"&:hover":{background:"softblue",cursor:"pointer"}},onClick:()=>{w(!1),i&&i(r)},children:r==null?void 0:r.display_name},d))})};try{E.displayName="OsmGeocodingResultsList",E.__docgenInfo={description:"",displayName:"OsmGeocodingResultsList",props:{results:{defaultValue:null,description:"",name:"results",required:!0,type:{name:"Result[]"}},callback:{defaultValue:null,description:"",name:"callback",required:!0,type:{name:"any"}},setShowResults:{defaultValue:null,description:"",name:"setShowResults",required:!0,type:{name:"Dispatch<SetStateAction<boolean>>"}}}}}catch{}const j=({placeholder:s="Search for an address",debounceMs:n=800,callback:i,acceptLanguage:w="en",viewbox:r="",loading:d=!1})=>{const[a,f]=e.useState(""),[p,y]=e.useState([]),[_,c]=e.useState(!1),[m,S]=e.useState(d),[k,g]=e.useState(!1),h=e.useRef(null);document.addEventListener("click",function(t){var l;((l=h==null?void 0:h.current)==null?void 0:l.contains(t.target))||c(!1)}),document.onkeyup=function(t){t.key==="Escape"&&c(!1)};function L(t=""){if(t.length===0)return;S(!0);let x=`https://nominatim.openstreetmap.org/search?format=json&q=${t}&accept-language=${w}`;r.length&&(x=`${x}&viewbox=${r}&bounded=1`),fetch(x,{headers:new Headers({"User-Agent":"onearmy.earth Community Platform (https://platform.onearmy.earth)"})}).then(l=>l.json()).then(l=>{y(l),c(!0)}).catch(null).finally(()=>S(!1))}const R=!!p.length&&_&&!m,b=M(t=>L(t),n);return e.useEffect(()=>{k&&b(a)},[a,k,b]),I("div",{"data-cy":"osm-geocoding",ref:h,style:{width:"100%"},children:[v(B,{autoComplete:"off",type:"search",name:"geocoding",id:"geocoding","data-cy":"osm-geocoding-input",placeholder:s,value:a,style:{width:"100%",background:"white",fontFamily:"Varela Round",fontSize:"14px",border:"2px solid black",height:"44px",display:"flex",borderRadius:R||m?"5px 5px 0 0":"5px",marginBottom:0},onClick:()=>c(!0),onChange:t=>{g(!0),f(t.target.value)}}),m&&v($,{}),R&&v(E,{results:p,callback:t=>{t&&(g(!1),f(t.display_name)),i(t)},setShowResults:c})]})};try{j.displayName="OsmGeocoding",j.__docgenInfo={description:"",displayName:"OsmGeocoding",props:{placeholder:{defaultValue:{value:"Search for an address"},description:"",name:"placeholder",required:!1,type:{name:"string"}},debounceMs:{defaultValue:{value:"800"},description:"",name:"debounceMs",required:!1,type:{name:"number"}},iconUrl:{defaultValue:null,description:"",name:"iconUrl",required:!1,type:{name:"string"}},callback:{defaultValue:null,description:"",name:"callback",required:!1,type:{name:"any"}},city:{defaultValue:null,description:"",name:"city",required:!1,type:{name:"string"}},countrycodes:{defaultValue:null,description:"",name:"countrycodes",required:!1,type:{name:"string"}},acceptLanguage:{defaultValue:{value:"en"},description:"",name:"acceptLanguage",required:!1,type:{name:"string"}},viewbox:{defaultValue:{value:""},description:"",name:"viewbox",required:!1,type:{name:"string"}},loading:{defaultValue:{value:"false"},description:"",name:"loading",required:!1,type:{name:"boolean"}}}}}catch{}export{j as O,E as a};
//# sourceMappingURL=OsmGeocoding-baff8f06.js.map
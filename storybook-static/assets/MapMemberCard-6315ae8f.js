import{a as e,j as r,F as d}from"./jsx-runtime-913be41c.js";import{U as p}from"./Username-2c9ab012.js";import{k as g}from"./emotion-react.browser.esm-ac7fc07b.js";import{C as h,b as a,d as s,I as f,a as l,A as b}from"./theme-ui-components.esm-1dc2aee2.js";const y=g`
  from {
    background: lightgrey;
  }
  to {
    background: grey;
  }
`,o=i=>{const{imageUrl:m,description:u,user:n,heading:c,comments:t}=i;return e(h,{sx:{maxWidth:"230px"},"data-cy":"MapMemberCard",children:r(a,{children:[!!i.loading&&r(d,{children:[e(s,{ratio:230/120,sx:{background:"lightgrey",animation:`${y} 800ms ease infinite`}}),e(a,{sx:{p:2,height:"109px"}})]}),!i.loading&&r(d,{children:[e(s,{ratio:230/120,sx:{background:"lightgrey"},children:e(f,{src:m,sx:{objectFit:"cover",width:"100%",height:"100%"}})}),r(a,{sx:{p:2},children:[e(l,{mb:2,sx:{fontSize:"12px",color:"blue"},children:c}),e("div",{children:e(p,{isVerified:!!n.isVerified,user:{userName:n.username,countryCode:n.country}})}),e(l,{mb:2,sx:{wordBreak:"break-word",fontSize:1,display:"block",color:"black"},children:u}),t?e(b,{variant:"info",sx:{fontSize:1,textAlign:"left"},"data-testid":"MapMemberCard: moderation comments",children:r(a,{children:["This map pin has been marked as requiring further changes.",e(a,{children:t})]})}):null]})]})]})})};try{o.displayName="MapMemberCard",o.__docgenInfo={description:"",displayName:"MapMemberCard",props:{loading:{defaultValue:null,description:"",name:"loading",required:!1,type:{name:"boolean"}},imageUrl:{defaultValue:null,description:"",name:"imageUrl",required:!0,type:{name:"string"}},description:{defaultValue:null,description:"",name:"description",required:!0,type:{name:"string"}},comments:{defaultValue:null,description:"",name:"comments",required:!0,type:{name:"string | null"}},user:{defaultValue:null,description:"",name:"user",required:!0,type:{name:"{ isVerified: boolean; username: string; country: string | null; }"}},heading:{defaultValue:null,description:"",name:"heading",required:!0,type:{name:"string"}},isEditable:{defaultValue:null,description:"",name:"isEditable",required:!0,type:{name:"boolean"}}}}}catch{}export{o as M};
//# sourceMappingURL=MapMemberCard-6315ae8f.js.map
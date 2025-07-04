import{u as r}from"./jsxRuntime.module-CQ7lm5on.js";/* empty css             */import"./preact.module-sGqYVYyh.js";function e({variant:h="default",padding:v="md",bg:p,borderColor:m,children:C,className:u="",...y}){const g=`card card-${h} card-${v}`,f=u?`${g} ${u}`:g,a=[];p&&a.push(`--card-bg: ${p}`),m&&a.push(`--card-border-color: ${m}`);const b=a.length>0?a.join("; "):void 0;return r("div",{class:f,style:b,...y,children:C})}const z={title:"Components/Card",component:e,parameters:{docs:{description:{component:"Uniwersalna karta z pełną parametryzacją stylów. Wspiera warianty, padding i custom kolory z CSS variables."}}},argTypes:{variant:{control:{type:"select"},options:["default","elevated","outlined"]},padding:{control:{type:"select"},options:["sm","md","lg"]},bg:{control:{type:"color"}},borderColor:{control:{type:"color"}}}},t={args:{children:"Default card content with basic styling."}},d={args:{variant:"elevated",children:"Elevated card with shadow effect."}},i={args:{variant:"outlined",children:"Outlined card with border styling."}},o={render:()=>r("div",{class:"flex gap-16 flex-wrap",children:[r(e,{variant:"default",children:"Default Card"}),r(e,{variant:"elevated",children:"Elevated Card"}),r(e,{variant:"outlined",children:"Outlined Card"})]}),parameters:{docs:{description:{story:"Wszystkie dostępne warianty kart"}}}},s={render:()=>r("div",{class:"flex gap-16 flex-wrap",children:[r(e,{variant:"elevated",padding:"sm",children:"Small Padding"}),r(e,{variant:"elevated",padding:"md",children:"Medium Padding"}),r(e,{variant:"elevated",padding:"lg",children:"Large Padding"})]}),parameters:{docs:{description:{story:"Różne rozmiary padding z atomic CSS classes"}}}},n={render:()=>r("div",{class:"flex gap-16 flex-wrap",children:[r(e,{bg:"#f8f9fa",borderColor:"#dee2e6",children:"Light Card"}),r(e,{bg:"#343a40",borderColor:"#6c757d",style:"color: white;",children:"Dark Card"}),r(e,{bg:"#e3f2fd",borderColor:"#2196f3",children:"Blue Card"}),r(e,{bg:"#f3e5f5",borderColor:"#9c27b0",children:"Purple Card"})]}),parameters:{docs:{description:{story:"Custom kolory używając CSS variables - --card-bg i --card-border-color"}}}},l={render:()=>r("div",{class:"max-w-400",children:r(e,{variant:"elevated",padding:"lg",children:[r("h3",{style:"margin: 0 0 12px 0; color: #333;",children:"Card Title"}),r("p",{style:"margin: 0 0 16px 0; color: #666; line-height: 1.5;",children:"This is a card with structured content including a title, description, and action button."}),r("button",{class:"btn btn-primary",children:"Action Button"})]})}),parameters:{docs:{description:{story:"Karta z strukturalną zawartością - tytuł, opis i przycisk"}}}},c={render:()=>r("div",{class:"grid",style:"grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px;",children:[r(e,{variant:"elevated",children:[r("h4",{style:"margin: 0 0 8px 0;",children:"Feature 1"}),r("p",{style:"margin: 0; color: #666;",children:"Ultra-small bundles for better performance"})]}),r(e,{variant:"elevated",children:[r("h4",{style:"margin: 0 0 8px 0;",children:"Feature 2"}),r("p",{style:"margin: 0; color: #666;",children:"Zero config setup with intelligent defaults"})]}),r(e,{variant:"elevated",children:[r("h4",{style:"margin: 0 0 8px 0;",children:"Feature 3"}),r("p",{style:"margin: 0; color: #666;",children:"Preact-first approach for minimal overhead"})]}),r(e,{variant:"elevated",children:[r("h4",{style:"margin: 0 0 8px 0;",children:"Feature 4"}),r("p",{style:"margin: 0; color: #666;",children:"Atomic CSS with performance optimization"})]})]}),parameters:{docs:{description:{story:"Grid układu kart z responsywnym designem"}}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Default card content with basic styling.'
  }
}`,...t.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'elevated',
    children: 'Elevated card with shadow effect.'
  }
}`,...d.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'outlined',
    children: 'Outlined card with border styling.'
  }
}`,...i.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => <div class="flex gap-16 flex-wrap">
      <Card variant="default">Default Card</Card>
      <Card variant="elevated">Elevated Card</Card>
      <Card variant="outlined">Outlined Card</Card>
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'Wszystkie dostępne warianty kart'
      }
    }
  }
}`,...o.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => <div class="flex gap-16 flex-wrap">
      <Card variant="elevated" padding="sm">Small Padding</Card>
      <Card variant="elevated" padding="md">Medium Padding</Card>
      <Card variant="elevated" padding="lg">Large Padding</Card>
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'Różne rozmiary padding z atomic CSS classes'
      }
    }
  }
}`,...s.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => <div class="flex gap-16 flex-wrap">
      <Card bg="#f8f9fa" borderColor="#dee2e6">Light Card</Card>
      <Card bg="#343a40" borderColor="#6c757d" style="color: white;">Dark Card</Card>
      <Card bg="#e3f2fd" borderColor="#2196f3">Blue Card</Card>
      <Card bg="#f3e5f5" borderColor="#9c27b0">Purple Card</Card>
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'Custom kolory używając CSS variables - --card-bg i --card-border-color'
      }
    }
  }
}`,...n.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <div class="max-w-400">
      <Card variant="elevated" padding="lg">
        <h3 style="margin: 0 0 12px 0; color: #333;">Card Title</h3>
        <p style="margin: 0 0 16px 0; color: #666; line-height: 1.5;">
          This is a card with structured content including a title, description, and action button.
        </p>
        <button class="btn btn-primary">Action Button</button>
      </Card>
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'Karta z strukturalną zawartością - tytuł, opis i przycisk'
      }
    }
  }
}`,...l.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => <div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px;">
      <Card variant="elevated">
        <h4 style="margin: 0 0 8px 0;">Feature 1</h4>
        <p style="margin: 0; color: #666;">Ultra-small bundles for better performance</p>
      </Card>
      <Card variant="elevated">
        <h4 style="margin: 0 0 8px 0;">Feature 2</h4>
        <p style="margin: 0; color: #666;">Zero config setup with intelligent defaults</p>
      </Card>
      <Card variant="elevated">
        <h4 style="margin: 0 0 8px 0;">Feature 3</h4>
        <p style="margin: 0; color: #666;">Preact-first approach for minimal overhead</p>
      </Card>
      <Card variant="elevated">
        <h4 style="margin: 0 0 8px 0;">Feature 4</h4>
        <p style="margin: 0; color: #666;">Atomic CSS with performance optimization</p>
      </Card>
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'Grid układu kart z responsywnym designem'
      }
    }
  }
}`,...c.parameters?.docs?.source}}};const k=["Default","Elevated","Outlined","AllVariants","AllPaddings","CustomColors","WithContent","CardGrid"];export{s as AllPaddings,o as AllVariants,c as CardGrid,n as CustomColors,t as Default,d as Elevated,i as Outlined,l as WithContent,k as __namedExportsOrder,z as default};

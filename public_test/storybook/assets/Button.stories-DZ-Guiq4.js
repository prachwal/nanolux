import{u as r}from"./jsxRuntime.module-CQ7lm5on.js";import{B as e}from"./Button-ifRHtVfc.js";import"./preact.module-sGqYVYyh.js";const p={title:"Components/Button",component:e,parameters:{docs:{description:{component:"Uniwersalny przycisk z pełną parametryzacją stylów. Wspiera warianty, rozmiary i custom kolory z CSS variables."}}},argTypes:{variant:{control:{type:"select"},options:["primary","secondary","danger"]},size:{control:{type:"select"},options:["sm","md","lg"]},bg:{control:{type:"color"}},color:{control:{type:"color"}}}},a={args:{variant:"primary",children:"Primary Button"}},t={args:{variant:"secondary",children:"Secondary Button"}},o={args:{variant:"danger",children:"Danger Button"}},n={render:()=>r("div",{class:"flex gap-8 items-center",children:[r(e,{variant:"primary",size:"sm",children:"Small"}),r(e,{variant:"primary",size:"md",children:"Medium"}),r(e,{variant:"primary",size:"lg",children:"Large"})]}),parameters:{docs:{description:{story:"Wszystkie dostępne rozmiary przycisków z atomic CSS classes"}}}},s={render:()=>r("div",{class:"flex gap-8 items-center",children:[r(e,{variant:"primary",children:"Primary"}),r(e,{variant:"secondary",children:"Secondary"}),r(e,{variant:"danger",children:"Danger"}),r(e,{children:"Default"})]})},i={render:()=>r("div",{class:"flex gap-8 flex-wrap",children:[r(e,{bg:"#ff6b6b",color:"white",children:"Custom Red"}),r(e,{bg:"#4ecdc4",color:"white",children:"Custom Teal"}),r(e,{bg:"#45b7d1",color:"white",children:"Custom Blue"}),r(e,{bg:"#f9ca24",color:"#2c2c2c",children:"Custom Yellow"}),r(e,{bg:"#6c5ce7",color:"white",children:"Custom Purple"})]}),parameters:{docs:{description:{story:"Custom kolory używając CSS variables - --btn-bg i --btn-color"}}}},c={render:()=>r("div",{class:"flex gap-8 items-center",children:[r(e,{variant:"primary",disabled:!0,children:"Disabled Primary"}),r(e,{variant:"secondary",disabled:!0,children:"Disabled Secondary"}),r(e,{disabled:!0,children:"Disabled Default"})]})},d={args:{variant:"primary",children:"Click me",onClick:()=>alert("Button clicked!")},parameters:{docs:{description:{story:"Button z obsługą zdarzeń onClick"}}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'primary',
    children: 'Primary Button'
  }
}`,...a.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'secondary',
    children: 'Secondary Button'
  }
}`,...t.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'danger',
    children: 'Danger Button'
  }
}`,...o.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => <div class="flex gap-8 items-center">
      <Button variant="primary" size="sm">Small</Button>
      <Button variant="primary" size="md">Medium</Button>
      <Button variant="primary" size="lg">Large</Button>
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'Wszystkie dostępne rozmiary przycisków z atomic CSS classes'
      }
    }
  }
}`,...n.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => <div class="flex gap-8 items-center">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="danger">Danger</Button>
      <Button>Default</Button>
    </div>
}`,...s.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => <div class="flex gap-8 flex-wrap">
      <Button bg="#ff6b6b" color="white">Custom Red</Button>
      <Button bg="#4ecdc4" color="white">Custom Teal</Button>
      <Button bg="#45b7d1" color="white">Custom Blue</Button>
      <Button bg="#f9ca24" color="#2c2c2c">Custom Yellow</Button>
      <Button bg="#6c5ce7" color="white">Custom Purple</Button>
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'Custom kolory używając CSS variables - --btn-bg i --btn-color'
      }
    }
  }
}`,...i.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => <div class="flex gap-8 items-center">
      <Button variant="primary" disabled>Disabled Primary</Button>
      <Button variant="secondary" disabled>Disabled Secondary</Button>
      <Button disabled>Disabled Default</Button>
    </div>
}`,...c.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'primary',
    children: 'Click me',
    onClick: () => alert('Button clicked!')
  },
  parameters: {
    docs: {
      description: {
        story: 'Button z obsługą zdarzeń onClick'
      }
    }
  }
}`,...d.parameters?.docs?.source}}};const y=["Primary","Secondary","Danger","AllSizes","AllVariants","CustomColors","Disabled","WithClickHandler"];export{n as AllSizes,s as AllVariants,i as CustomColors,o as Danger,c as Disabled,a as Primary,t as Secondary,d as WithClickHandler,y as __namedExportsOrder,p as default};

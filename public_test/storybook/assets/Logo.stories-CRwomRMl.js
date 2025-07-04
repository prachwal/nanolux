import{u as e}from"./jsxRuntime.module-CQ7lm5on.js";import{L as t}from"./Logo-mgDNWPhg.js";import"./preact.module-sGqYVYyh.js";/* empty css             */const d={title:"Components/Logo",component:t,parameters:{docs:{description:{component:"Komponent logo z opcjonalnym linkiem. Wspiera różne warianty i rozmiary z atomic CSS classes."}}},argTypes:{variant:{control:{type:"select"},options:["vite","preact"]},size:{control:{type:"select"},options:["sm","md","lg"]},target:{control:{type:"select"},options:["_blank","_self"]}}},r={args:{src:"/vite.svg",alt:"Vite logo",variant:"vite"}},a={args:{src:"/preact.svg",alt:"Preact logo",variant:"preact"}},s={render:()=>e("div",{class:"flex gap-16 items-center",children:[e(t,{src:"/vite.svg",alt:"Small Vite logo",variant:"vite",size:"sm"}),e(t,{src:"/vite.svg",alt:"Medium Vite logo",variant:"vite",size:"md"}),e(t,{src:"/vite.svg",alt:"Large Vite logo",variant:"vite",size:"lg"})]}),parameters:{docs:{description:{story:"Wszystkie dostępne rozmiary logo z atomic CSS classes"}}}},i={render:()=>e("div",{class:"flex gap-16 items-center",children:[e(t,{src:"/vite.svg",alt:"Vite logo",variant:"vite"}),e(t,{src:"/preact.svg",alt:"Preact logo",variant:"preact"})]}),parameters:{docs:{description:{story:"Różne warianty logo - Vite i Preact"}}}},o={args:{src:"/vite.svg",alt:"Vite logo with link",variant:"vite",href:"https://vitejs.dev",target:"_blank"},parameters:{docs:{description:{story:"Logo z linkiem otwieranym w nowej karcie"}}}},c={render:()=>e("div",{class:"grid gap-16",style:"grid-template-columns: repeat(3, 1fr); place-items: center;",children:[e(t,{src:"/vite.svg",alt:"Vite small",variant:"vite",size:"sm"}),e(t,{src:"/vite.svg",alt:"Vite medium",variant:"vite",size:"md"}),e(t,{src:"/vite.svg",alt:"Vite large",variant:"vite",size:"lg"}),e(t,{src:"/preact.svg",alt:"Preact small",variant:"preact",size:"sm"}),e(t,{src:"/preact.svg",alt:"Preact medium",variant:"preact",size:"md"}),e(t,{src:"/preact.svg",alt:"Preact large",variant:"preact",size:"lg"})]}),parameters:{docs:{description:{story:"Grid wszystkich kombinacji wariantów i rozmiarów"}}}},l={render:()=>e("div",{class:"flex gap-16",children:[e(t,{src:"/vite.svg",alt:"Interactive Vite logo",variant:"vite",href:"https://vitejs.dev",target:"_blank"}),e(t,{src:"/preact.svg",alt:"Interactive Preact logo",variant:"preact",href:"https://preactjs.com",target:"_blank"})]}),parameters:{docs:{description:{story:"Interaktywne logo z linkami do stron projektów"}}}},n={render:()=>e("div",{class:"flex flex-col gap-8",children:[e("div",{class:"text-sm",children:"Mobile (small):"}),e(t,{src:"/vite.svg",alt:"Mobile logo",variant:"vite",size:"sm"}),e("div",{class:"text-sm",children:"Tablet (medium):"}),e(t,{src:"/vite.svg",alt:"Tablet logo",variant:"vite",size:"md"}),e("div",{class:"text-sm",children:"Desktop (large):"}),e(t,{src:"/vite.svg",alt:"Desktop logo",variant:"vite",size:"lg"})]}),parameters:{docs:{description:{story:"Responsywne logo dla różnych urządzeń"}}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    src: '/vite.svg',
    alt: 'Vite logo',
    variant: 'vite'
  }
}`,...r.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    src: '/preact.svg',
    alt: 'Preact logo',
    variant: 'preact'
  }
}`,...a.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => <div class="flex gap-16 items-center">
      <Logo src="/vite.svg" alt="Small Vite logo" variant="vite" size="sm" />
      <Logo src="/vite.svg" alt="Medium Vite logo" variant="vite" size="md" />
      <Logo src="/vite.svg" alt="Large Vite logo" variant="vite" size="lg" />
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'Wszystkie dostępne rozmiary logo z atomic CSS classes'
      }
    }
  }
}`,...s.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => <div class="flex gap-16 items-center">
      <Logo src="/vite.svg" alt="Vite logo" variant="vite" />
      <Logo src="/preact.svg" alt="Preact logo" variant="preact" />
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'Różne warianty logo - Vite i Preact'
      }
    }
  }
}`,...i.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    src: '/vite.svg',
    alt: 'Vite logo with link',
    variant: 'vite',
    href: 'https://vitejs.dev',
    target: '_blank'
  },
  parameters: {
    docs: {
      description: {
        story: 'Logo z linkiem otwieranym w nowej karcie'
      }
    }
  }
}`,...o.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => <div class="grid gap-16" style="grid-template-columns: repeat(3, 1fr); place-items: center;">
      <Logo src="/vite.svg" alt="Vite small" variant="vite" size="sm" />
      <Logo src="/vite.svg" alt="Vite medium" variant="vite" size="md" />
      <Logo src="/vite.svg" alt="Vite large" variant="vite" size="lg" />
      <Logo src="/preact.svg" alt="Preact small" variant="preact" size="sm" />
      <Logo src="/preact.svg" alt="Preact medium" variant="preact" size="md" />
      <Logo src="/preact.svg" alt="Preact large" variant="preact" size="lg" />
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'Grid wszystkich kombinacji wariantów i rozmiarów'
      }
    }
  }
}`,...c.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <div class="flex gap-16">
      <Logo src="/vite.svg" alt="Interactive Vite logo" variant="vite" href="https://vitejs.dev" target="_blank" />
      <Logo src="/preact.svg" alt="Interactive Preact logo" variant="preact" href="https://preactjs.com" target="_blank" />
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'Interaktywne logo z linkami do stron projektów'
      }
    }
  }
}`,...l.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => <div class="flex flex-col gap-8">
      <div class="text-sm">Mobile (small):</div>
      <Logo src="/vite.svg" alt="Mobile logo" variant="vite" size="sm" />
      
      <div class="text-sm">Tablet (medium):</div>
      <Logo src="/vite.svg" alt="Tablet logo" variant="vite" size="md" />
      
      <div class="text-sm">Desktop (large):</div>
      <Logo src="/vite.svg" alt="Desktop logo" variant="vite" size="lg" />
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'Responsywne logo dla różnych urządzeń'
      }
    }
  }
}`,...n.parameters?.docs?.source}}};const z=["ViteLogo","PreactLogo","AllSizes","AllVariants","WithLink","LogoGrid","InteractiveLogo","ResponsiveLogo"];export{s as AllSizes,i as AllVariants,l as InteractiveLogo,c as LogoGrid,a as PreactLogo,n as ResponsiveLogo,r as ViteLogo,o as WithLink,z as __namedExportsOrder,d as default};

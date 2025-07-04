import{u as e}from"./jsxRuntime.module-CQ7lm5on.js";import{L as m}from"./Logo-mgDNWPhg.js";/* empty css                  */import"./preact.module-sGqYVYyh.js";/* empty css             */function t({title:l="NanoLux + Preact",description:u="Ultra-minimalistyczny framework komponentów",className:h="",...g}){const x=`app-header ${h}`.trim();return e("header",{className:x,...g,children:[e("div",{className:"app-header-logos",children:[e(m,{src:"/vite.svg",alt:"Vite logo",variant:"vite",href:"https://vite.dev",target:"_blank"}),e(m,{src:"/preact.svg",alt:"Preact logo",variant:"preact",href:"https://preactjs.com",target:"_blank"})]}),e("h1",{className:"app-header-title",children:l}),e("p",{className:"app-header-description",children:u})]})}const k={title:"Components/AppHeader",component:t,parameters:{docs:{description:{component:"Nagłówek aplikacji z logo i opisem. Responsywny design z atomic CSS classes."}}},argTypes:{title:{control:{type:"text"}},description:{control:{type:"text"}}}},i={args:{}},r={args:{title:"My Awesome App",description:"Building the future with NanoLux"}},o={args:{title:"NanoLux",description:"Minimalistic & Fast"}},a={args:{title:"NanoLux Framework",description:"Ultra-minimalistyczny framework komponentów dla Preact z atomic CSS, zero-config setup i ekstremalnymi optymalizacjami bundle size"}},s={render:()=>e("div",{children:[e(t,{title:"NanoLux Pro",description:"Professional edition with advanced features and enterprise support"}),e("div",{style:"margin-top: 32px; padding: 16px; background: #f8f9fa; border-radius: 8px;",children:e("p",{style:"margin: 0; color: #666;",children:"This is how the header looks in a real application context with content below it."})})]}),parameters:{docs:{description:{story:"Header w kontekście aplikacji z zawartością poniżej"}}}},n={render:()=>e("div",{class:"flex flex-col gap-32",children:[e(t,{title:"Short",description:"Brief and to the point"}),e(t,{title:"Medium Length Title",description:"A moderate description that provides good context"}),e(t,{title:"Very Long Application Title That Spans Multiple Words",description:"An extensive description that explains the application's purpose, features, and benefits in detail"})]}),parameters:{docs:{description:{story:"Różne długości tytułów i opisów"}}}},d={render:()=>e("div",{class:"flex flex-col gap-32",children:[e(t,{title:"NanoLux",description:"Ultra-minimalistic component framework"}),e(t,{title:"NanoLux Studio",description:"Visual development environment for components"}),e(t,{title:"NanoLux CLI",description:"Command-line tools for project scaffolding"}),e(t,{title:"NanoLux Docs",description:"Complete documentation and examples"})]}),parameters:{docs:{description:{story:"Różne warianty brandingu dla suite produktów"}}}},c={render:()=>e("div",{children:[e("div",{class:"text-sm mb-16",children:"Desktop View:"}),e("div",{style:"width: 100%; max-width: 1200px;",children:e(t,{title:"NanoLux Desktop",description:"Full-featured desktop experience with all components and features"})}),e("div",{class:"text-sm mb-16 mt-32",children:"Tablet View:"}),e("div",{style:"width: 100%; max-width: 768px;",children:e(t,{title:"NanoLux Tablet",description:"Optimized for medium screens and touch interfaces"})}),e("div",{class:"text-sm mb-16 mt-32",children:"Mobile View:"}),e("div",{style:"width: 100%; max-width: 375px;",children:e(t,{title:"NanoLux Mobile",description:"Compact mobile-first design"})})]}),parameters:{docs:{description:{story:"Responsywny design na różnych szerokościach ekranu"}}}},p={args:{title:"Styled Header",description:"Custom styled header with additional CSS",className:"custom-header-style"},decorators:[l=>e("div",{children:[e("style",{children:`
          .custom-header-style {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 32px;
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(0,0,0,0.1);
          }
          .custom-header-style .logo {
            filter: brightness(0) invert(1);
          }
        `}),e(l,{})]})],parameters:{docs:{description:{story:"Header z custom stylingiem używającym CSS variables"}}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {}
}`,...i.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'My Awesome App',
    description: 'Building the future with NanoLux'
  }
}`,...r.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'NanoLux',
    description: 'Minimalistic & Fast'
  }
}`,...o.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'NanoLux Framework',
    description: 'Ultra-minimalistyczny framework komponentów dla Preact z atomic CSS, zero-config setup i ekstremalnymi optymalizacjami bundle size'
  }
}`,...a.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => <div>
      <AppHeader title="NanoLux Pro" description="Professional edition with advanced features and enterprise support" />
      <div style="margin-top: 32px; padding: 16px; background: #f8f9fa; border-radius: 8px;">
        <p style="margin: 0; color: #666;">
          This is how the header looks in a real application context with content below it.
        </p>
      </div>
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'Header w kontekście aplikacji z zawartością poniżej'
      }
    }
  }
}`,...s.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => <div class="flex flex-col gap-32">
      <AppHeader title="Short" description="Brief and to the point" />
      <AppHeader title="Medium Length Title" description="A moderate description that provides good context" />
      <AppHeader title="Very Long Application Title That Spans Multiple Words" description="An extensive description that explains the application's purpose, features, and benefits in detail" />
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'Różne długości tytułów i opisów'
      }
    }
  }
}`,...n.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <div class="flex flex-col gap-32">
      <AppHeader title="NanoLux" description="Ultra-minimalistic component framework" />
      <AppHeader title="NanoLux Studio" description="Visual development environment for components" />
      <AppHeader title="NanoLux CLI" description="Command-line tools for project scaffolding" />
      <AppHeader title="NanoLux Docs" description="Complete documentation and examples" />
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'Różne warianty brandingu dla suite produktów'
      }
    }
  }
}`,...d.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => <div>
      <div class="text-sm mb-16">Desktop View:</div>
      <div style="width: 100%; max-width: 1200px;">
        <AppHeader title="NanoLux Desktop" description="Full-featured desktop experience with all components and features" />
      </div>
      
      <div class="text-sm mb-16 mt-32">Tablet View:</div>
      <div style="width: 100%; max-width: 768px;">
        <AppHeader title="NanoLux Tablet" description="Optimized for medium screens and touch interfaces" />
      </div>
      
      <div class="text-sm mb-16 mt-32">Mobile View:</div>
      <div style="width: 100%; max-width: 375px;">
        <AppHeader title="NanoLux Mobile" description="Compact mobile-first design" />
      </div>
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'Responsywny design na różnych szerokościach ekranu'
      }
    }
  }
}`,...c.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Styled Header',
    description: 'Custom styled header with additional CSS',
    className: 'custom-header-style'
  },
  decorators: [Story => <div>
        <style>{\`
          .custom-header-style {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 32px;
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(0,0,0,0.1);
          }
          .custom-header-style .logo {
            filter: brightness(0) invert(1);
          }
        \`}</style>
        <Story />
      </div>],
  parameters: {
    docs: {
      description: {
        story: 'Header z custom stylingiem używającym CSS variables'
      }
    }
  }
}`,...p.parameters?.docs?.source}}};const S=["Default","CustomTitle","ShortDescription","LongDescription","ProductShowcase","DifferentTitles","BrandingVariations","ResponsiveDemo","WithCustomStyling"];export{d as BrandingVariations,r as CustomTitle,i as Default,n as DifferentTitles,a as LongDescription,s as ProductShowcase,c as ResponsiveDemo,o as ShortDescription,p as WithCustomStyling,S as __namedExportsOrder,k as default};

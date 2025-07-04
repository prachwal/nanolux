import{u as e}from"./jsxRuntime.module-CQ7lm5on.js";import{B as t}from"./Button-ifRHtVfc.js";/* empty css             *//* empty css             *//* empty css                  */import"./hooks.module-Ckf0q3sI.js";/* empty css                       *//* empty css                    *//* empty css                   */import"./preact.module-sGqYVYyh.js";function r({title:u="Button Showcase",className:h="",...y}){const g=`button-showcase ${h}`.trim();return e("div",{className:g,...y,children:[u&&e("h4",{className:"button-showcase-title",children:u}),e("div",{className:"button-showcase-section",children:[e("h5",{className:"button-showcase-subtitle",children:"Rozmiary"}),e("div",{className:"button-showcase-group",children:[e(t,{size:"sm",variant:"primary",children:"Small"}),e(t,{size:"md",variant:"primary",children:"Medium"}),e(t,{size:"lg",variant:"primary",children:"Large"})]})]}),e("div",{className:"button-showcase-section",children:[e("h5",{className:"button-showcase-subtitle",children:"Kolory niestandardowe"}),e("div",{className:"button-showcase-group",children:[e(t,{bg:"#ff6b6b",color:"white",children:"Custom Red"}),e(t,{bg:"#4ecdc4",color:"white",children:"Custom Teal"}),e(t,{bg:"#45b7d1",color:"white",children:"Custom Blue"})]})]})]})}const A={title:"Components/ButtonShowcase",component:r,parameters:{docs:{description:{component:"Showcase różnych wariantów przycisków demonstrujący możliwości komponentu Button z atomic CSS classes."}}},argTypes:{title:{control:{type:"text"}}}},o={args:{}},i={args:{title:"Interactive Button Gallery"}},s={args:{title:""}},a={args:{title:"NanoLux Button System"},parameters:{docs:{description:{story:"Kompletna prezentacja systemu przycisków dla dokumentacji biblioteki komponentów"}}}},n={render:()=>e("div",{class:"flex flex-col gap-32",children:[e(r,{title:"Basic Variants"}),e(r,{title:"Size Options"}),e(r,{title:"Interactive States"})]}),parameters:{docs:{description:{story:"Kolekcja showcases z różnymi tematami"}}}},c={render:()=>e("div",{children:[e("div",{style:"margin-bottom: 24px; text-align: center;",children:[e("h3",{style:"margin: 0 0 8px 0; color: #333;",children:"NanoLux Design System"}),e("p",{style:"margin: 0; color: #666; font-size: 0.875rem;",children:"Complete button component showcase with all variants, sizes, and states"})]}),e(r,{title:"Complete Button Gallery"}),e("div",{style:"margin-top: 24px; padding: 16px; background: #f8f9fa; border-radius: 8px;",children:[e("h5",{style:"margin: 0 0 8px 0; color: #333;",children:"📋 Button Specifications:"}),e("ul",{style:"margin: 0; padding-left: 20px; color: #666; font-size: 0.875rem;",children:[e("li",{children:[e("strong",{children:"Variants:"})," Primary, Secondary, Danger"]}),e("li",{children:[e("strong",{children:"Sizes:"})," Small (sm), Medium (md), Large (lg)"]}),e("li",{children:[e("strong",{children:"States:"})," Default, Hover, Disabled"]}),e("li",{children:[e("strong",{children:"Customization:"})," CSS Variables for colors"]}),e("li",{children:[e("strong",{children:"Accessibility:"})," Full keyboard and screen reader support"]})]})]})]}),parameters:{docs:{description:{story:"Kompletny przegląd design system z dokumentacją specyfikacji"}}}},d={render:()=>e("div",{children:[e("div",{class:"text-sm mb-16",children:"Desktop Layout:"}),e("div",{style:"width: 100%; max-width: 1200px;",children:e(r,{title:"Full Desktop Experience"})}),e("div",{class:"text-sm mb-16 mt-32",children:"Tablet Layout:"}),e("div",{style:"width: 100%; max-width: 768px;",children:e(r,{title:"Tablet Optimized"})}),e("div",{class:"text-sm mb-16 mt-32",children:"Mobile Layout:"}),e("div",{style:"width: 100%; max-width: 375px;",children:e(r,{title:"Mobile Friendly"})})]}),parameters:{docs:{description:{story:"Responsywny showcase na różnych szerokościach ekranu"}}}},l={render:()=>e("div",{children:[e("div",{style:"margin-bottom: 24px;",children:[e("h4",{style:"margin: 0 0 8px 0; color: #333;",children:"🎮 Interactive Button Demo"}),e("p",{style:"margin: 0; color: #666; font-size: 0.875rem;",children:"Click any button to see interactions. All buttons include hover effects and accessibility features."})]}),e(r,{title:"Try All Buttons!"}),e("div",{style:"margin-top: 16px; padding: 12px; background: #e3f2fd; border-radius: 6px; border-left: 4px solid #2196f3;",children:e("div",{style:"font-size: 0.875rem; color: #1565c0;",children:["💡 ",e("strong",{children:"Performance Note:"})," Each button click is optimized for minimal reflow and repaint"]})})]}),parameters:{docs:{description:{story:"Interaktywna demonstracja z naciskiem na user experience"}}}},p={render:()=>e("div",{class:"flex flex-col gap-32",children:[e("div",{children:[e("h5",{style:"margin: 0 0 16px 0; color: #333;",children:"Light Theme"}),e("div",{style:"background: #ffffff; padding: 24px; border-radius: 8px; border: 1px solid #e0e0e0;",children:e(r,{title:"Light Theme Buttons"})})]}),e("div",{children:[e("h5",{style:"margin: 0 0 16px 0; color: #333;",children:"Dark Theme"}),e("div",{style:"background: #2c2c2c; padding: 24px; border-radius: 8px;",children:e("div",{style:"color: white;",children:e(r,{title:"Dark Theme Buttons"})})})]}),e("div",{children:[e("h5",{style:"margin: 0 0 16px 0; color: #333;",children:"Colored Background"}),e("div",{style:"background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 24px; border-radius: 8px;",children:e("div",{style:"color: white;",children:e(r,{title:"Gradient Background"})})})]})]}),parameters:{docs:{description:{story:"Showcase w różnych motywach i kontekstach kolorystycznych"}}}},m={render:()=>e("div",{children:[e("div",{style:"margin-bottom: 24px;",children:[e("h4",{style:"margin: 0 0 8px 0; color: #333;",children:"♿ Accessibility Showcase"}),e("p",{style:"margin: 0; color: #666; font-size: 0.875rem;",children:"All buttons meet WCAG guidelines with proper contrast ratios and keyboard navigation."})]}),e(r,{title:"Accessible Buttons"}),e("div",{style:"margin-top: 24px; display: grid; gap: 12px; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));",children:[e("div",{style:"padding: 12px; background: #e8f5e8; border-radius: 6px;",children:[e("strong",{style:"color: #155724;",children:"✓ Keyboard Navigation"}),e("div",{style:"font-size: 0.75rem; color: #155724;",children:"Tab, Enter, Space support"})]}),e("div",{style:"padding: 12px; background: #e8f5e8; border-radius: 6px;",children:[e("strong",{style:"color: #155724;",children:"✓ Screen Readers"}),e("div",{style:"font-size: 0.75rem; color: #155724;",children:"Proper ARIA labels"})]}),e("div",{style:"padding: 12px; background: #e8f5e8; border-radius: 6px;",children:[e("strong",{style:"color: #155724;",children:"✓ Color Contrast"}),e("div",{style:"font-size: 0.75rem; color: #155724;",children:"WCAG AA compliant"})]}),e("div",{style:"padding: 12px; background: #e8f5e8; border-radius: 6px;",children:[e("strong",{style:"color: #155724;",children:"✓ Focus Indicators"}),e("div",{style:"font-size: 0.75rem; color: #155724;",children:"Clear focus states"})]})]})]}),parameters:{docs:{description:{story:"Prezentacja funkcji accessibility z informacjami o zgodności WCAG"}}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {}
}`,...o.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Interactive Button Gallery'
  }
}`,...i.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    title: ''
  }
}`,...s.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'NanoLux Button System'
  },
  parameters: {
    docs: {
      description: {
        story: 'Kompletna prezentacja systemu przycisków dla dokumentacji biblioteki komponentów'
      }
    }
  }
}`,...a.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => <div class="flex flex-col gap-32">
      <ButtonShowcase title="Basic Variants" />
      <ButtonShowcase title="Size Options" />
      <ButtonShowcase title="Interactive States" />
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'Kolekcja showcases z różnymi tematami'
      }
    }
  }
}`,...n.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => <div>
      <div style="margin-bottom: 24px; text-align: center;">
        <h3 style="margin: 0 0 8px 0; color: #333;">NanoLux Design System</h3>
        <p style="margin: 0; color: #666; font-size: 0.875rem;">
          Complete button component showcase with all variants, sizes, and states
        </p>
      </div>
      
      <ButtonShowcase title="Complete Button Gallery" />
      
      <div style="margin-top: 24px; padding: 16px; background: #f8f9fa; border-radius: 8px;">
        <h5 style="margin: 0 0 8px 0; color: #333;">📋 Button Specifications:</h5>
        <ul style="margin: 0; padding-left: 20px; color: #666; font-size: 0.875rem;">
          <li><strong>Variants:</strong> Primary, Secondary, Danger</li>
          <li><strong>Sizes:</strong> Small (sm), Medium (md), Large (lg)</li>
          <li><strong>States:</strong> Default, Hover, Disabled</li>
          <li><strong>Customization:</strong> CSS Variables for colors</li>
          <li><strong>Accessibility:</strong> Full keyboard and screen reader support</li>
        </ul>
      </div>
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'Kompletny przegląd design system z dokumentacją specyfikacji'
      }
    }
  }
}`,...c.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <div>
      <div class="text-sm mb-16">Desktop Layout:</div>
      <div style="width: 100%; max-width: 1200px;">
        <ButtonShowcase title="Full Desktop Experience" />
      </div>
      
      <div class="text-sm mb-16 mt-32">Tablet Layout:</div>
      <div style="width: 100%; max-width: 768px;">
        <ButtonShowcase title="Tablet Optimized" />
      </div>
      
      <div class="text-sm mb-16 mt-32">Mobile Layout:</div>
      <div style="width: 100%; max-width: 375px;">
        <ButtonShowcase title="Mobile Friendly" />
      </div>
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'Responsywny showcase na różnych szerokościach ekranu'
      }
    }
  }
}`,...d.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <div>
      <div style="margin-bottom: 24px;">
        <h4 style="margin: 0 0 8px 0; color: #333;">🎮 Interactive Button Demo</h4>
        <p style="margin: 0; color: #666; font-size: 0.875rem;">
          Click any button to see interactions. All buttons include hover effects and accessibility features.
        </p>
      </div>
      
      <ButtonShowcase title="Try All Buttons!" />
      
      <div style="margin-top: 16px; padding: 12px; background: #e3f2fd; border-radius: 6px; border-left: 4px solid #2196f3;">
        <div style="font-size: 0.875rem; color: #1565c0;">
          💡 <strong>Performance Note:</strong> Each button click is optimized for minimal reflow and repaint
        </div>
      </div>
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'Interaktywna demonstracja z naciskiem na user experience'
      }
    }
  }
}`,...l.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => <div class="flex flex-col gap-32">
      <div>
        <h5 style="margin: 0 0 16px 0; color: #333;">Light Theme</h5>
        <div style="background: #ffffff; padding: 24px; border-radius: 8px; border: 1px solid #e0e0e0;">
          <ButtonShowcase title="Light Theme Buttons" />
        </div>
      </div>
      
      <div>
        <h5 style="margin: 0 0 16px 0; color: #333;">Dark Theme</h5>
        <div style="background: #2c2c2c; padding: 24px; border-radius: 8px;">
          <div style="color: white;">
            <ButtonShowcase title="Dark Theme Buttons" />
          </div>
        </div>
      </div>
      
      <div>
        <h5 style="margin: 0 0 16px 0; color: #333;">Colored Background</h5>
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 24px; border-radius: 8px;">
          <div style="color: white;">
            <ButtonShowcase title="Gradient Background" />
          </div>
        </div>
      </div>
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'Showcase w różnych motywach i kontekstach kolorystycznych'
      }
    }
  }
}`,...p.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <div>
      <div style="margin-bottom: 24px;">
        <h4 style="margin: 0 0 8px 0; color: #333;">♿ Accessibility Showcase</h4>
        <p style="margin: 0; color: #666; font-size: 0.875rem;">
          All buttons meet WCAG guidelines with proper contrast ratios and keyboard navigation.
        </p>
      </div>
      
      <ButtonShowcase title="Accessible Buttons" />
      
      <div style="margin-top: 24px; display: grid; gap: 12px; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));">
        <div style="padding: 12px; background: #e8f5e8; border-radius: 6px;">
          <strong style="color: #155724;">✓ Keyboard Navigation</strong>
          <div style="font-size: 0.75rem; color: #155724;">Tab, Enter, Space support</div>
        </div>
        <div style="padding: 12px; background: #e8f5e8; border-radius: 6px;">
          <strong style="color: #155724;">✓ Screen Readers</strong>
          <div style="font-size: 0.75rem; color: #155724;">Proper ARIA labels</div>
        </div>
        <div style="padding: 12px; background: #e8f5e8; border-radius: 6px;">
          <strong style="color: #155724;">✓ Color Contrast</strong>
          <div style="font-size: 0.75rem; color: #155724;">WCAG AA compliant</div>
        </div>
        <div style="padding: 12px; background: #e8f5e8; border-radius: 6px;">
          <strong style="color: #155724;">✓ Focus Indicators</strong>
          <div style="font-size: 0.75rem; color: #155724;">Clear focus states</div>
        </div>
      </div>
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'Prezentacja funkcji accessibility z informacjami o zgodności WCAG'
      }
    }
  }
}`,...m.parameters?.docs?.source}}};const D=["Default","CustomTitle","NoTitle","ComponentLibraryDemo","ShowcaseCollection","DesignSystemOverview","ResponsiveShowcase","InteractiveDemo","ThemeVariations","A11yShowcase"];export{m as A11yShowcase,a as ComponentLibraryDemo,i as CustomTitle,o as Default,c as DesignSystemOverview,l as InteractiveDemo,s as NoTitle,d as ResponsiveShowcase,n as ShowcaseCollection,p as ThemeVariations,D as __namedExportsOrder,A as default};

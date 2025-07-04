import{u as e}from"./jsxRuntime.module-CQ7lm5on.js";import{d as w}from"./hooks.module-Ckf0q3sI.js";import{B as h}from"./Button-ifRHtVfc.js";/* empty css             *//* empty css             *//* empty css                  *//* empty css                       *//* empty css                    *//* empty css                   */import"./preact.module-sGqYVYyh.js";function r({initialValue:p=0,className:a="",...x}){const[y,g]=w(p),f=`counter-demo ${a}`.trim();return e("div",{className:f,...x,children:[e("h3",{className:"counter-demo-title",children:"🎛️ Demo komponentów NanoLux"}),e("div",{className:"counter-demo-buttons",children:[e(h,{variant:"primary",onClick:()=>g(v=>v+1),children:["Count: ",y]}),e(h,{variant:"secondary",onClick:()=>g(p),children:"Reset"}),e(h,{variant:"danger",onClick:()=>g(y-1),children:"Decrease"})]})]})}const B={title:"Components/CounterDemo",component:r,parameters:{docs:{description:{component:"Demo komponentu z licznikiem pokazującym interaktywność i state management w Preact. Używa atomic CSS classes."}}},argTypes:{initialValue:{control:{type:"number"}}}},t={args:{}},o={args:{initialValue:10}},i={args:{initialValue:0}},n={args:{initialValue:-5}},s={args:{initialValue:100}},c={render:()=>e("div",{class:"flex flex-col gap-24",children:[e(r,{initialValue:0}),e(r,{initialValue:10}),e(r,{initialValue:50})]}),parameters:{docs:{description:{story:"Wiele niezależnych liczników z różnymi wartościami początkowymi"}}}},l={render:()=>e("div",{class:"grid gap-16",style:"grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));",children:[e(r,{initialValue:0}),e(r,{initialValue:5}),e(r,{initialValue:10}),e(r,{initialValue:15})]}),parameters:{docs:{description:{story:"Grid układu liczników z responsywnym designem"}}}},m={render:()=>e("div",{class:"max-w-400",children:[e("h3",{style:"margin: 0 0 16px 0; color: #333;",children:"Interactive Demo Showcase"}),e("p",{style:"margin: 0 0 24px 0; color: #666; line-height: 1.5;",children:"This counter demonstrates state management with Preact hooks. Click the buttons to see real-time updates with minimal bundle size."}),e(r,{initialValue:0}),e("div",{style:"margin-top: 16px; padding: 12px; background: #f8f9fa; border-radius: 6px; font-size: 0.875rem; color: #666;",children:["💡 ",e("strong",{children:"Performance:"})," Each state update is optimized for minimal re-renders"]})]}),parameters:{docs:{description:{story:"Prezentacja interaktywnych możliwości z opisem performance"}}}},d={render:()=>e("div",{class:"flex flex-col gap-16",children:[e("div",{style:"text-align: center;",children:[e("h4",{style:"margin: 0 0 8px 0;",children:"Performance Benchmark"}),e("p",{style:"margin: 0 0 16px 0; color: #666; font-size: 0.875rem;",children:"Multiple counters to test rendering performance"})]}),e("div",{class:"grid gap-8",style:"grid-template-columns: repeat(4, 1fr);",children:Array.from({length:8},(p,a)=>e(r,{initialValue:a*5},a))}),e("div",{style:"text-align: center; font-size: 0.75rem; color: #999;",children:"8 independent counter instances with separate state"})]}),parameters:{docs:{description:{story:"Test wydajności z wieloma instancjami komponentu"}}}},u={render:()=>e("div",{children:[e("style",{children:`
        .custom-counter-demo {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 24px;
          border-radius: 12px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.1);
        }
        .custom-counter-demo .counter-demo-title {
          color: white;
        }
        .custom-counter-demo .counter-demo-value {
          background: rgba(255,255,255,0.2);
          border-radius: 8px;
          padding: 8px;
        }
      `}),e(r,{initialValue:42,className:"custom-counter-demo"})]}),parameters:{docs:{description:{story:"Counter z custom stylingiem używającym CSS variables"}}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {}
}`,...t.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    initialValue: 10
  }
}`,...o.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    initialValue: 0
  }
}`,...i.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    initialValue: -5
  }
}`,...n.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    initialValue: 100
  }
}`,...s.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => <div class="flex flex-col gap-24">
      <CounterDemo initialValue={0} />
      <CounterDemo initialValue={10} />
      <CounterDemo initialValue={50} />
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'Wiele niezależnych liczników z różnymi wartościami początkowymi'
      }
    }
  }
}`,...c.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <div class="grid gap-16" style="grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));">
      <CounterDemo initialValue={0} />
      <CounterDemo initialValue={5} />
      <CounterDemo initialValue={10} />
      <CounterDemo initialValue={15} />
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'Grid układu liczników z responsywnym designem'
      }
    }
  }
}`,...l.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <div class="max-w-400">
      <h3 style="margin: 0 0 16px 0; color: #333;">Interactive Demo Showcase</h3>
      <p style="margin: 0 0 24px 0; color: #666; line-height: 1.5;">
        This counter demonstrates state management with Preact hooks. 
        Click the buttons to see real-time updates with minimal bundle size.
      </p>
      <CounterDemo initialValue={0} />
      <div style="margin-top: 16px; padding: 12px; background: #f8f9fa; border-radius: 6px; font-size: 0.875rem; color: #666;">
        💡 <strong>Performance:</strong> Each state update is optimized for minimal re-renders
      </div>
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'Prezentacja interaktywnych możliwości z opisem performance'
      }
    }
  }
}`,...m.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <div class="flex flex-col gap-16">
      <div style="text-align: center;">
        <h4 style="margin: 0 0 8px 0;">Performance Benchmark</h4>
        <p style="margin: 0 0 16px 0; color: #666; font-size: 0.875rem;">
          Multiple counters to test rendering performance
        </p>
      </div>
      
      <div class="grid gap-8" style="grid-template-columns: repeat(4, 1fr);">
        {Array.from({
        length: 8
      }, (_, i) => <CounterDemo key={i} initialValue={i * 5} />)}
      </div>
      
      <div style="text-align: center; font-size: 0.75rem; color: #999;">
        8 independent counter instances with separate state
      </div>
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'Test wydajności z wieloma instancjami komponentu'
      }
    }
  }
}`,...d.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => <div>
      <style>{\`
        .custom-counter-demo {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 24px;
          border-radius: 12px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.1);
        }
        .custom-counter-demo .counter-demo-title {
          color: white;
        }
        .custom-counter-demo .counter-demo-value {
          background: rgba(255,255,255,0.2);
          border-radius: 8px;
          padding: 8px;
        }
      \`}</style>
      
      <CounterDemo initialValue={42} className="custom-counter-demo" />
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'Counter z custom stylingiem używającym CSS variables'
      }
    }
  }
}`,...u.parameters?.docs?.source}}};const F=["Default","WithInitialValue","StartFromZero","StartFromNegative","StartFromHundred","MultipleCounters","CounterGrid","InteractiveShowcase","BenchmarkDemo","CustomStyling"];export{d as BenchmarkDemo,l as CounterGrid,u as CustomStyling,t as Default,m as InteractiveShowcase,c as MultipleCounters,s as StartFromHundred,n as StartFromNegative,i as StartFromZero,o as WithInitialValue,F as __namedExportsOrder,B as default};

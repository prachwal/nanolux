import{u as e}from"./jsxRuntime.module-CQ7lm5on.js";/* empty css                    */import"./preact.module-sGqYVYyh.js";function t({features:f,title:d="✨ Funkcje NanoLux",className:h="",...g}){const b=`feature-list ${h}`.trim();return e("div",{className:b,...g,children:[d&&e("h4",{className:"feature-list-title",children:d}),e("ul",{className:"feature-list-items",children:f.map((p,w)=>e("li",{className:"feature-list-item",children:[e("span",{className:"feature-list-icon",children:p.icon}),e("span",{className:"feature-list-text",children:p.text})]},w))})]})}const S={title:"Components/FeatureList",component:t,parameters:{docs:{description:{component:"Lista funkcjonalności z ikonami. Responsywny design z atomic CSS classes i semantic HTML."}}},argTypes:{title:{control:{type:"text"}},features:{control:{type:"object"}}}},u=[{icon:"📦",text:"Ultra-małe bundly <1KB runtime"},{icon:"⚡",text:"Zero config - działa out-of-the-box"},{icon:"🎯",text:"Preact-first approach (3KB vs 45KB React)"},{icon:"🎨",text:"CSS Variables + Atomic CSS"},{icon:"🔧",text:"Build-time optimizations"},{icon:"📱",text:"Responsywny design system"}],x=[{icon:"🚀",text:"Fast"},{icon:"🎯",text:"Precise"},{icon:"💡",text:"Smart"}],y=[{icon:"⚙️",text:"TypeScript support z automatycznym type inference"},{icon:"🏗️",text:"Vite + esbuild dla ultra-szybkiego development"},{icon:"🌳",text:"Automatyczny tree-shaking i dead code elimination"},{icon:"📊",text:"Bundle analyzer z performance budgets"},{icon:"🔄",text:"Hot Module Replacement z state preservation"},{icon:"🧪",text:"Integrated testing z Vitest + Storybook"}],i={args:{features:u}},s={args:{title:"NanoLux Features",features:u}},a={args:{title:"Core Values",features:x}},n={args:{title:"Technical Excellence",features:y}},o={args:{features:[{icon:"✨",text:"Beautiful components"},{icon:"🎭",text:"Semantic markup"},{icon:"♿",text:"Accessibility first"},{icon:"🎪",text:"Animation ready"}]}},r={args:{title:"Detailed Features",features:[{icon:"📦",text:"Ultra-minimalistic bundle size with aggressive tree-shaking and dead code elimination to ensure your application loads as fast as possible"},{icon:"🎨",text:"Advanced CSS Variables system combined with atomic CSS classes for maximum flexibility while maintaining consistent design patterns"},{icon:"⚡",text:"Zero configuration setup that works immediately out of the box with intelligent defaults and automatic optimization strategies"}]},parameters:{docs:{description:{story:"Długie teksty funkcjonalności z automatycznym zawijaniem"}}}},c={args:{title:"Icon Variety",features:[{icon:"🚀",text:"Emoji icons"},{icon:"→",text:"Symbol characters"},{icon:"★",text:"Special symbols"},{icon:"◆",text:"Geometric shapes"},{icon:"✓",text:"Checkmarks and status"},{icon:"#",text:"Typography symbols"}]},parameters:{docs:{description:{story:"Różne typy ikon - emoji, symbole, znaki specjalne"}}}},l={render:()=>e("div",{class:"grid gap-24",style:"grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));",children:[e(t,{title:"Before NanoLux",features:[{icon:"😵",text:"Massive bundle sizes"},{icon:"🐌",text:"Slow load times"},{icon:"⚙️",text:"Complex configuration"},{icon:"🔧",text:"Manual optimizations"}]}),e(t,{title:"With NanoLux",features:[{icon:"🎯",text:"Ultra-small bundles"},{icon:"⚡",text:"Lightning fast"},{icon:"✨",text:"Zero configuration"},{icon:"🚀",text:"Auto-optimized"}]})]}),parameters:{docs:{description:{story:"Porównanie dwóch list funkcjonalności w układzie grid"}}}},m={render:()=>e("div",{children:[e("div",{class:"text-sm mb-16",children:"Desktop View (3 columns):"}),e("div",{style:"width: 100%; max-width: 1200px;",children:e(t,{title:"Full Desktop Experience",features:y})}),e("div",{class:"text-sm mb-16 mt-32",children:"Tablet View (2 columns):"}),e("div",{style:"width: 100%; max-width: 768px;",children:e(t,{title:"Tablet Optimized",features:u})}),e("div",{class:"text-sm mb-16 mt-32",children:"Mobile View (1 column):"}),e("div",{style:"width: 100%; max-width: 375px;",children:e(t,{title:"Mobile First",features:x})})]}),parameters:{docs:{description:{story:"Responsywny design na różnych szerokościach ekranu"}}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    features: nanoluxFeatures
  }
}`,...i.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'NanoLux Features',
    features: nanoluxFeatures
  }
}`,...s.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Core Values',
    features: shortFeatures
  }
}`,...a.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Technical Excellence',
    features: technicalFeatures
  }
}`,...n.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    features: [{
      icon: '✨',
      text: 'Beautiful components'
    }, {
      icon: '🎭',
      text: 'Semantic markup'
    }, {
      icon: '♿',
      text: 'Accessibility first'
    }, {
      icon: '🎪',
      text: 'Animation ready'
    }]
  }
}`,...o.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Detailed Features',
    features: [{
      icon: '📦',
      text: 'Ultra-minimalistic bundle size with aggressive tree-shaking and dead code elimination to ensure your application loads as fast as possible'
    }, {
      icon: '🎨',
      text: 'Advanced CSS Variables system combined with atomic CSS classes for maximum flexibility while maintaining consistent design patterns'
    }, {
      icon: '⚡',
      text: 'Zero configuration setup that works immediately out of the box with intelligent defaults and automatic optimization strategies'
    }]
  },
  parameters: {
    docs: {
      description: {
        story: 'Długie teksty funkcjonalności z automatycznym zawijaniem'
      }
    }
  }
}`,...r.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Icon Variety',
    features: [{
      icon: '🚀',
      text: 'Emoji icons'
    }, {
      icon: '→',
      text: 'Symbol characters'
    }, {
      icon: '★',
      text: 'Special symbols'
    }, {
      icon: '◆',
      text: 'Geometric shapes'
    }, {
      icon: '✓',
      text: 'Checkmarks and status'
    }, {
      icon: '#',
      text: 'Typography symbols'
    }]
  },
  parameters: {
    docs: {
      description: {
        story: 'Różne typy ikon - emoji, symbole, znaki specjalne'
      }
    }
  }
}`,...c.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <div class="grid gap-24" style="grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));">
      <FeatureList title="Before NanoLux" features={[{
      icon: '😵',
      text: 'Massive bundle sizes'
    }, {
      icon: '🐌',
      text: 'Slow load times'
    }, {
      icon: '⚙️',
      text: 'Complex configuration'
    }, {
      icon: '🔧',
      text: 'Manual optimizations'
    }]} />
      <FeatureList title="With NanoLux" features={[{
      icon: '🎯',
      text: 'Ultra-small bundles'
    }, {
      icon: '⚡',
      text: 'Lightning fast'
    }, {
      icon: '✨',
      text: 'Zero configuration'
    }, {
      icon: '🚀',
      text: 'Auto-optimized'
    }]} />
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'Porównanie dwóch list funkcjonalności w układzie grid'
      }
    }
  }
}`,...l.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <div>
      <div class="text-sm mb-16">Desktop View (3 columns):</div>
      <div style="width: 100%; max-width: 1200px;">
        <FeatureList title="Full Desktop Experience" features={technicalFeatures} />
      </div>
      
      <div class="text-sm mb-16 mt-32">Tablet View (2 columns):</div>
      <div style="width: 100%; max-width: 768px;">
        <FeatureList title="Tablet Optimized" features={nanoluxFeatures} />
      </div>
      
      <div class="text-sm mb-16 mt-32">Mobile View (1 column):</div>
      <div style="width: 100%; max-width: 375px;">
        <FeatureList title="Mobile First" features={shortFeatures} />
      </div>
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'Responsywny design na różnych szerokościach ekranu'
      }
    }
  }
}`,...m.parameters?.docs?.source}}};const F=["Default","WithTitle","ShortList","TechnicalFeatures","NoTitle","LongFeatureTexts","DifferentIconTypes","ComparisonLists","ResponsiveDemo"];export{l as ComparisonLists,i as Default,c as DifferentIconTypes,r as LongFeatureTexts,o as NoTitle,m as ResponsiveDemo,a as ShortList,n as TechnicalFeatures,s as WithTitle,F as __namedExportsOrder,S as default};

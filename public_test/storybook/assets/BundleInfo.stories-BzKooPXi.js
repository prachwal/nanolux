import{u as e}from"./jsxRuntime.module-CQ7lm5on.js";/* empty css                   */import"./preact.module-sGqYVYyh.js";function i({cssSize:S="~950 bytes CSS",jsSize:m="~600 bytes JS",totalSize:y="~1.5KB",className:z="",...u}){const g=`bundle-info ${z}`.trim();return e("div",{className:g,...u,children:e("p",{className:"bundle-info-text",children:["Bundle size: "," ",e("strong",{className:"bundle-info-size",children:[S," + ",m]})," per component (gzipped)",e("br",{}),e("small",{className:"bundle-info-note",children:["Total overhead: ",y," for both Button + Card"]})]})})}const x={title:"Components/BundleInfo",component:i,parameters:{docs:{description:{component:"Wyświetla informacje o rozmiarze bundla. Kluczowy komponent dla performance-first filozofii NanoLux."}}},argTypes:{cssSize:{control:{type:"text"}},jsSize:{control:{type:"text"}},totalSize:{control:{type:"text"}}}},s={args:{}},r={args:{cssSize:"~800 bytes CSS",jsSize:"~400 bytes JS",totalSize:"~1.2KB"}},o={args:{cssSize:"~1.2KB CSS",jsSize:"~900 bytes JS",totalSize:"~2.1KB"}},t={args:{cssSize:"~500 bytes CSS",jsSize:"~300 bytes JS",totalSize:"~800 bytes"}},a={args:{cssSize:"~650 bytes CSS (gzipped)",jsSize:"~450 bytes JS (gzipped)",totalSize:"~1.1KB (gzipped)"},parameters:{docs:{description:{story:"Rozmiary dla produkcji z kompresją gzip"}}}},n={render:()=>e("div",{class:"flex flex-col gap-24",children:[e("div",{children:[e("h4",{style:"margin: 0 0 12px 0; color: #333;",children:"NanoLux Bundle"}),e(i,{cssSize:"~950 bytes CSS",jsSize:"~600 bytes JS",totalSize:"~1.5KB"})]}),e("div",{children:[e("h4",{style:"margin: 0 0 12px 0; color: #333;",children:"Typical React App"}),e(i,{cssSize:"~45KB CSS",jsSize:"~120KB JS",totalSize:"~165KB"})]}),e("div",{style:"padding: 16px; background: #e8f5e8; border-radius: 8px; border-left: 4px solid #28a745;",children:[e("strong",{style:"color: #155724;",children:"110x smaller!"})," NanoLux vs typical React setup"]})]}),parameters:{docs:{description:{story:"Porównanie rozmiarów NanoLux vs typowa aplikacja React"}}}},l={render:()=>e("div",{class:"flex flex-col gap-16",children:[e("h4",{style:"margin: 0; color: #333;",children:"Progressive Bundle Loading"}),e("div",{style:"display: flex; flex-direction: column; gap: 8px;",children:[e("div",{style:"font-size: 0.875rem; color: #666;",children:"Initial Load:"}),e(i,{cssSize:"~400 bytes CSS",jsSize:"~300 bytes JS",totalSize:"~700 bytes"})]}),e("div",{style:"display: flex; flex-direction: column; gap: 8px;",children:[e("div",{style:"font-size: 0.875rem; color: #666;",children:"+ First Interaction:"}),e(i,{cssSize:"~650 bytes CSS",jsSize:"~450 bytes JS",totalSize:"~1.1KB"})]}),e("div",{style:"display: flex; flex-direction: column; gap: 8px;",children:[e("div",{style:"font-size: 0.875rem; color: #666;",children:"+ Full Features:"}),e(i,{cssSize:"~950 bytes CSS",jsSize:"~600 bytes JS",totalSize:"~1.5KB"})]})]}),parameters:{docs:{description:{story:"Progresywne ładowanie bundle w różnych fazach aplikacji"}}}},d={render:()=>e("div",{class:"grid gap-16",style:"grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));",children:[e("div",{children:[e("h5",{style:"margin: 0 0 8px 0; color: #333;",children:"Minimum Viable"}),e(i,{cssSize:"~300B CSS",jsSize:"~200B JS",totalSize:"~500B"})]}),e("div",{children:[e("h5",{style:"margin: 0 0 8px 0; color: #333;",children:"Basic App"}),e(i,{cssSize:"~600B CSS",jsSize:"~400B JS",totalSize:"~1KB"})]}),e("div",{children:[e("h5",{style:"margin: 0 0 8px 0; color: #333;",children:"Full Featured"}),e(i,{cssSize:"~950B CSS",jsSize:"~600B JS",totalSize:"~1.5KB"})]}),e("div",{children:[e("h5",{style:"margin: 0 0 8px 0; color: #333;",children:"Enterprise"}),e(i,{cssSize:"~1.2KB CSS",jsSize:"~800B JS",totalSize:"~2KB"})]})]}),parameters:{docs:{description:{story:"Benchmark różnych poziomów złożoności aplikacji"}}}},c={render:()=>e("div",{children:[e(i,{cssSize:"~950 bytes CSS",jsSize:"~600 bytes JS",totalSize:"~1.5KB"}),e("div",{style:"margin-top: 24px; padding: 16px; background: #f8f9fa; border-radius: 8px;",children:[e("h5",{style:"margin: 0 0 12px 0; color: #333;",children:"💡 Optimization Tips:"}),e("ul",{style:"margin: 0; padding-left: 20px; color: #666; font-size: 0.875rem;",children:[e("li",{children:"Use atomic CSS classes instead of custom styles"}),e("li",{children:"Leverage CSS variables for dynamic theming"}),e("li",{children:"Import only the components you need"}),e("li",{children:"Enable tree-shaking in your build config"}),e("li",{children:"Use dynamic imports for code splitting"})]})]})]}),parameters:{docs:{description:{story:"Bundle info z praktycznymi tipami optymalizacji"}}}},p={render:()=>e("div",{children:[e("div",{style:"display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;",children:[e("h4",{style:"margin: 0; color: #333;",children:"Bundle Monitor"}),e("div",{style:"padding: 4px 8px; background: #28a745; color: white; border-radius: 4px; font-size: 0.75rem;",children:"OPTIMAL"})]}),e(i,{cssSize:"~950 bytes CSS",jsSize:"~600 bytes JS",totalSize:"~1.5KB"}),e("div",{style:"margin-top: 16px; display: flex; gap: 16px; font-size: 0.875rem;",children:[e("div",{style:"color: #28a745;",children:"✓ Under 2KB limit"}),e("div",{style:"color: #28a745;",children:"✓ Tree-shaking active"}),e("div",{style:"color: #28a745;",children:"✓ CSS optimized"})]})]}),parameters:{docs:{description:{story:"Real-time monitoring z wskaźnikami stanu optymalizacji"}}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {}
}`,...s.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    cssSize: '~800 bytes CSS',
    jsSize: '~400 bytes JS',
    totalSize: '~1.2KB'
  }
}`,...r.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    cssSize: '~1.2KB CSS',
    jsSize: '~900 bytes JS',
    totalSize: '~2.1KB'
  }
}`,...o.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    cssSize: '~500 bytes CSS',
    jsSize: '~300 bytes JS',
    totalSize: '~800 bytes'
  }
}`,...t.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    cssSize: '~650 bytes CSS (gzipped)',
    jsSize: '~450 bytes JS (gzipped)',
    totalSize: '~1.1KB (gzipped)'
  },
  parameters: {
    docs: {
      description: {
        story: 'Rozmiary dla produkcji z kompresją gzip'
      }
    }
  }
}`,...a.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => <div class="flex flex-col gap-24">
      <div>
        <h4 style="margin: 0 0 12px 0; color: #333;">NanoLux Bundle</h4>
        <BundleInfo cssSize="~950 bytes CSS" jsSize="~600 bytes JS" totalSize="~1.5KB" />
      </div>
      
      <div>
        <h4 style="margin: 0 0 12px 0; color: #333;">Typical React App</h4>
        <BundleInfo cssSize="~45KB CSS" jsSize="~120KB JS" totalSize="~165KB" />
      </div>
      
      <div style="padding: 16px; background: #e8f5e8; border-radius: 8px; border-left: 4px solid #28a745;">
        <strong style="color: #155724;">110x smaller!</strong> NanoLux vs typical React setup
      </div>
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'Porównanie rozmiarów NanoLux vs typowa aplikacja React'
      }
    }
  }
}`,...n.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <div class="flex flex-col gap-16">
      <h4 style="margin: 0; color: #333;">Progressive Bundle Loading</h4>
      
      <div style="display: flex; flex-direction: column; gap: 8px;">
        <div style="font-size: 0.875rem; color: #666;">Initial Load:</div>
        <BundleInfo cssSize="~400 bytes CSS" jsSize="~300 bytes JS" totalSize="~700 bytes" />
      </div>
      
      <div style="display: flex; flex-direction: column; gap: 8px;">
        <div style="font-size: 0.875rem; color: #666;">+ First Interaction:</div>
        <BundleInfo cssSize="~650 bytes CSS" jsSize="~450 bytes JS" totalSize="~1.1KB" />
      </div>
      
      <div style="display: flex; flex-direction: column; gap: 8px;">
        <div style="font-size: 0.875rem; color: #666;">+ Full Features:</div>
        <BundleInfo cssSize="~950 bytes CSS" jsSize="~600 bytes JS" totalSize="~1.5KB" />
      </div>
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'Progresywne ładowanie bundle w różnych fazach aplikacji'
      }
    }
  }
}`,...l.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <div class="grid gap-16" style="grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));">
      <div>
        <h5 style="margin: 0 0 8px 0; color: #333;">Minimum Viable</h5>
        <BundleInfo cssSize="~300B CSS" jsSize="~200B JS" totalSize="~500B" />
      </div>
      
      <div>
        <h5 style="margin: 0 0 8px 0; color: #333;">Basic App</h5>
        <BundleInfo cssSize="~600B CSS" jsSize="~400B JS" totalSize="~1KB" />
      </div>
      
      <div>
        <h5 style="margin: 0 0 8px 0; color: #333;">Full Featured</h5>
        <BundleInfo cssSize="~950B CSS" jsSize="~600B JS" totalSize="~1.5KB" />
      </div>
      
      <div>
        <h5 style="margin: 0 0 8px 0; color: #333;">Enterprise</h5>
        <BundleInfo cssSize="~1.2KB CSS" jsSize="~800B JS" totalSize="~2KB" />
      </div>
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'Benchmark różnych poziomów złożoności aplikacji'
      }
    }
  }
}`,...d.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => <div>
      <BundleInfo cssSize="~950 bytes CSS" jsSize="~600 bytes JS" totalSize="~1.5KB" />
      
      <div style="margin-top: 24px; padding: 16px; background: #f8f9fa; border-radius: 8px;">
        <h5 style="margin: 0 0 12px 0; color: #333;">💡 Optimization Tips:</h5>
        <ul style="margin: 0; padding-left: 20px; color: #666; font-size: 0.875rem;">
          <li>Use atomic CSS classes instead of custom styles</li>
          <li>Leverage CSS variables for dynamic theming</li>
          <li>Import only the components you need</li>
          <li>Enable tree-shaking in your build config</li>
          <li>Use dynamic imports for code splitting</li>
        </ul>
      </div>
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'Bundle info z praktycznymi tipami optymalizacji'
      }
    }
  }
}`,...c.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => <div>
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
        <h4 style="margin: 0; color: #333;">Bundle Monitor</h4>
        <div style="padding: 4px 8px; background: #28a745; color: white; border-radius: 4px; font-size: 0.75rem;">
          OPTIMAL
        </div>
      </div>
      
      <BundleInfo cssSize="~950 bytes CSS" jsSize="~600 bytes JS" totalSize="~1.5KB" />
      
      <div style="margin-top: 16px; display: flex; gap: 16px; font-size: 0.875rem;">
        <div style="color: #28a745;">
          ✓ Under 2KB limit
        </div>
        <div style="color: #28a745;">
          ✓ Tree-shaking active
        </div>
        <div style="color: #28a745;">
          ✓ CSS optimized
        </div>
      </div>
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'Real-time monitoring z wskaźnikami stanu optymalizacji'
      }
    }
  }
}`,...p.parameters?.docs?.source}}};const B=["Default","OptimalSizes","LargerBundle","TinyBundle","ProductionSizes","ComparisonView","ProgressiveLoading","BenchmarkGrid","OptimizationTips","RealTimeMonitoring"];export{d as BenchmarkGrid,n as ComparisonView,s as Default,o as LargerBundle,r as OptimalSizes,c as OptimizationTips,a as ProductionSizes,l as ProgressiveLoading,p as RealTimeMonitoring,t as TinyBundle,B as __namedExportsOrder,x as default};

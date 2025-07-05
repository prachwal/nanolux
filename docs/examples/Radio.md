# Radio Examples

*From Storybook: Components/Radio*

## Basic

```tsx
<div class="flex flex-col gap-8">
      <Radio name="basic" value="option1" label="Option 1" />
      <Radio name="basic" value="option2" label="Option 2" />
      <Radio name="basic" value="option3" label="Option 3" />
    </div>
```

---

## WithDefaultSelected

```tsx
<div class="flex flex-col gap-8">
      <Radio name="default" value="small" label="Small" />
      <Radio name="default" value="medium" label="Medium" checked />
      <Radio name="default" value="large" label="Large" />
    </div>
```

---

## AllSizes

```tsx
<div class="flex flex-col gap-12">
      <div>
        <h4 class="mb-8 font-medium">Small</h4>
        <div class="flex flex-col gap-4">
          <Radio name="sizes-sm" value="1" label="Small radio option" size="sm" />
          <Radio name="sizes-sm" value="2" label="Another small option" size="sm" />
        </div>
      </div>
      
      <div>
        <h4 class="mb-8 font-medium">Medium (Default
```

---

## DisabledStates

```tsx
<div class="flex flex-col gap-8">
      <Radio name="disabled" value="enabled" label="Enabled option" />
      <Radio name="disabled" value="disabled1" label="Disabled option" disabled />
      <Radio name="disabled" value="disabled2" label="Disabled and checked" disabled checked />
    </div>
```

---

## FormExample

```tsx
<form class="max-w-400">
      <fieldset class="border-0 p-0 m-0">
        <legend class="text-lg font-medium mb-12">Choose your subscription plan:</legend>
        
        <div class="flex flex-col gap-8">
          <Radio 
            name="subscription" 
            value="free" 
            label="Free - Basic features only" 
          />
          <Radio 
            name="subscription" 
            value="pro" 
            label="Pro - $9.99/month with advanced features" 
            checked 
          />
          <Radio 
            name="subscription" 
            value="enterprise" 
            label="Enterprise - $29.99/month with full access" 
          />
        </div>
      </fieldset>
      
      <div class="mt-16">
        <button type="submit" class="btn btn-primary">
          Continue with Selected Plan
        </button>
      </div>
    </form>
```

---

## MultipleGroups

```tsx
<div class="flex gap-24">
      <div>
        <h4 class="mb-8 font-medium">Size</h4>
        <div class="flex flex-col gap-6">
          <Radio name="size" value="small" label="Small" />
          <Radio name="size" value="medium" label="Medium" checked />
          <Radio name="size" value="large" label="Large" />
        </div>
      </div>
      
      <div>
        <h4 class="mb-8 font-medium">Color</h4>
        <div class="flex flex-col gap-6">
          <Radio name="color" value="red" label="Red" />
          <Radio name="color" value="blue" label="Blue" checked />
          <Radio name="color" value="green" label="Green" />
        </div>
      </div>
    </div>
```

---

## InteractiveTest

```tsx
<div class="flex flex-col gap-8">
      <Radio name="interactive" value="test1" label="Test Option 1" />
      <Radio name="interactive" value="test2" label="Test Option 2" />
    </div>
```

---

## Basic

```tsx
<div class="flex flex-col gap-8">
      <Radio name="basic" value="option1" label="Option 1" />
      <Radio name="basic" value="option2" label="Option 2" />
      <Radio name="basic" value="option3" label="Option 3" />
    </div>
```

---

## WithDefaultSelected

```tsx
<div class="flex flex-col gap-8">
      <Radio name="default" value="small" label="Small" />
      <Radio name="default" value="medium" label="Medium" checked />
      <Radio name="default" value="large" label="Large" />
    </div>
```

---

## AllSizes

```tsx
<div class="flex flex-col gap-12">
      <div>
        <h4 class="mb-8 font-medium">Small</h4>
        <div class="flex flex-col gap-4">
          <Radio name="sizes-sm" value="1" label="Small radio option" size="sm" />
          <Radio name="sizes-sm" value="2" label="Another small option" size="sm" />
        </div>
      </div>
      
      <div>
        <h4 class="mb-8 font-medium">Medium (Default)</h4>
        <div class="flex flex-col gap-6">
          <Radio name="sizes-md" value="1" label="Medium radio option" size="md" />
          <Radio name="sizes-md" value="2" label="Another medium option" size="md" />
        </div>
      </div>
      
      <div>
        <h4 class="mb-8 font-medium">Large</h4>
        <div class="flex flex-col gap-8">
          <Radio name="sizes-lg" value="1" label="Large radio option" size="lg" />
          <Radio name="sizes-lg" value="2" label="Another large option" size="lg" />
        </div>
      </div>
    </div>
```

---

## DisabledStates

```tsx
<div class="flex flex-col gap-8">
      <Radio name="disabled" value="enabled" label="Enabled option" />
      <Radio name="disabled" value="disabled1" label="Disabled option" disabled />
      <Radio name="disabled" value="disabled2" label="Disabled and checked" disabled checked />
    </div>
```

---

## FormExample

```tsx
<form class="max-w-400">
      <fieldset class="border-0 p-0 m-0">
        <legend class="text-lg font-medium mb-12">Choose your subscription plan:</legend>
        
        <div class="flex flex-col gap-8">
          <Radio 
            name="subscription" 
            value="free" 
            label="Free - Basic features only" 
          />
          <Radio 
            name="subscription" 
            value="pro" 
            label="Pro - $9.99/month with advanced features" 
            checked 
          />
          <Radio 
            name="subscription" 
            value="enterprise" 
            label="Enterprise - $29.99/month with full access" 
          />
        </div>
      </fieldset>
      
      <div class="mt-16">
        <button type="submit" class="btn btn-primary">
          Continue with Selected Plan
        </button>
      </div>
    </form>
```

---

## MultipleGroups

```tsx
<div class="flex gap-24">
      <div>
        <h4 class="mb-8 font-medium">Size</h4>
        <div class="flex flex-col gap-6">
          <Radio name="size" value="small" label="Small" />
          <Radio name="size" value="medium" label="Medium" checked />
          <Radio name="size" value="large" label="Large" />
        </div>
      </div>
      
      <div>
        <h4 class="mb-8 font-medium">Color</h4>
        <div class="flex flex-col gap-6">
          <Radio name="color" value="red" label="Red" />
          <Radio name="color" value="blue" label="Blue" checked />
          <Radio name="color" value="green" label="Green" />
        </div>
      </div>
    </div>
```

---

## InteractiveTest

```tsx
<div class="flex flex-col gap-8">
      <Radio name="interactive" value="test1" label="Test Option 1" />
      <Radio name="interactive" value="test2" label="Test Option 2" />
    </div>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement)
    
    // Test: opcje są widoczne
    const option1 = canvas.getByLabelText('Test Option 1')
    const option2 = canvas.getByLabelText('Test Option 2')
    
    await expect(option1).toBeInTheDocument()
    await expect(option2).toBeInTheDocument()
    
    // Test: opcje mają tę samą nazwę grupy
    await expect(option1).toHaveAttribute('name', 'interactive')
    await expect(option2).toHaveAttribute('name', 'interactive')
    
    // Test: domyślnie żadna opcja nie jest zaznaczona
    await expect(option1).not.toBeChecked()
    await expect(option2).not.toBeChecked(
```

---

*Examples extracted from Storybook stories.*
*Last updated: 2025-07-04T19:01:45.675Z*

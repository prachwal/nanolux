# Checkbox Examples

*From Storybook: Components/Checkbox*

## Default

```tsx
// Example code not available
```

---

## Checked

```tsx
// Example code not available
```

---

## Indeterminate

```tsx
// Example code not available
```

---

## AllSizes

```tsx
<div class="flex flex-col gap-16">
      <Checkbox size="sm" label="Small checkbox" />
      <Checkbox size="md" label="Medium checkbox (default
```

---

## States

```tsx
// Example code not available
```

---

## WithoutLabel

```tsx
// Example code not available
```

---

## FormExample

```tsx
// Example code not available
```

---

## CustomStyling

```tsx
// Example code not available
```

---

## InteractiveTest

```tsx
// Example code not available
```

---

## KeyboardNavigation

```tsx
// Example code not available
```

---

## DisabledState

```tsx
// Example code not available
```

---

## AllSizes

```tsx
<div class="flex flex-col gap-16">
      <Checkbox size="sm" label="Small checkbox" />
      <Checkbox size="md" label="Medium checkbox (default)" />
      <Checkbox size="lg" label="Large checkbox" />
    </div>
```

---

## States

```tsx
<div class="flex flex-col gap-16">
      <Checkbox label="Normal checkbox" />
      <Checkbox label="Checked checkbox" checked={true} />
      <Checkbox label="Indeterminate checkbox" indeterminate={true} />
      <Checkbox label="Error checkbox" error={true} />
      <Checkbox label="Disabled checkbox" disabled={true} />
      <Checkbox label="Disabled checked" disabled={true} checked={true} />
    </div>
```

---

## WithoutLabel

```tsx
<div class="flex gap-16 items-center">
      <Checkbox aria-label="Checkbox without visible label" />
      <Checkbox checked={true} aria-label="Checked checkbox without label" />
      <Checkbox indeterminate={true} aria-label="Indeterminate checkbox without label" />
    </div>
```

---

## FormExample

```tsx
<form class="flex flex-col gap-12">
      <div>
        <h3 class="mb-8 font-medium">Select your preferences:</h3>
        <div class="flex flex-col gap-8">
          <Checkbox name="notifications" value="email" label="Email notifications" />
          <Checkbox name="notifications" value="sms" label="SMS notifications" />
          <Checkbox name="notifications" value="push" label="Push notifications" checked={true} />
        </div>
      </div>
      
      <div class="mt-16">
        <Checkbox 
          name="terms" 
          value="accepted" 
          label="I agree to the Terms of Service and Privacy Policy"
          error={false}
        />
      </div>
    </form>
```

---

## CustomStyling

```tsx
<div class="flex flex-col gap-16">
      <div style="--checkbox-bg-checked: #10b981; --checkbox-border-checked: #10b981;">
        <Checkbox label="Green checkbox" checked={true} />
      </div>
      <div style="--checkbox-bg-checked: #f59e0b; --checkbox-border-checked: #f59e0b;">
        <Checkbox label="Orange checkbox" checked={true} />
      </div>
      <div style="--checkbox-size: 24px; --checkbox-check-size: 16px;">
        <Checkbox label="Extra large checkbox" checked={true} />
      </div>
    </div>
```

---

*Examples extracted from Storybook stories.*
*Last updated: 2025-07-04T19:01:45.682Z*

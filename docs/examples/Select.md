# Select Examples

*From Storybook: Components/Select*

## Default

```tsx
// Example code not available
```

---

## WithSelectedValue

```tsx
// Example code not available
```

---

## AllSizes

```tsx
// Example code not available
```

---

## States

```tsx
// Example code not available
```

---

## WithDisabledOptions

```tsx
// Example code not available
```

---

## LongOptions

```tsx
// Example code not available
```

---

## CustomWidth

```tsx
<div class="flex flex-col gap-16">
      <div style="width: 150px;">
        <label class="block mb-4 text-sm font-medium">Narrow (150px
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

## AllSizes

```tsx
<div class="flex flex-col gap-16">
      <div>
        <label class="block mb-4 text-sm font-medium">Small Select</label>
        <Select 
          options={sampleOptions} 
          size="sm" 
          placeholder="Small select..."
        />
      </div>
      <div>
        <label class="block mb-4 text-sm font-medium">Medium Select (default)</label>
        <Select 
          options={sampleOptions} 
          size="md" 
          placeholder="Medium select..."
        />
      </div>
      <div>
        <label class="block mb-4 text-sm font-medium">Large Select</label>
        <Select 
          options={sampleOptions} 
          size="lg" 
          placeholder="Large select..."
        />
      </div>
    </div>
```

---

## States

```tsx
<div class="flex flex-col gap-16">
      <div>
        <label class="block mb-4 text-sm font-medium">Normal State</label>
        <Select 
          options={sampleOptions} 
          placeholder="Normal select..."
        />
      </div>
      <div>
        <label class="block mb-4 text-sm font-medium">Error State</label>
        <Select 
          options={sampleOptions} 
          error={true}
          placeholder="Error select..."
        />
      </div>
      <div>
        <label class="block mb-4 text-sm font-medium">Disabled State</label>
        <Select 
          options={sampleOptions} 
          disabled={true}
          placeholder="Disabled select..."
        />
      </div>
    </div>
```

---

## CustomWidth

```tsx
<div class="flex flex-col gap-16">
      <div style="width: 150px;">
        <label class="block mb-4 text-sm font-medium">Narrow (150px)</label>
        <Select 
          options={sampleOptions} 
          placeholder="Narrow..."
        />
      </div>
      <div style="width: 400px;">
        <label class="block mb-4 text-sm font-medium">Wide (400px)</label>
        <Select 
          options={sampleOptions} 
          placeholder="Wide select..."
        />
      </div>
    </div>
```

---

*Examples extracted from Storybook stories.*
*Last updated: 2025-07-04T19:01:45.674Z*

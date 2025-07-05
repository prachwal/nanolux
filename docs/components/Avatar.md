# Avatar Component

Avatar component for displaying user profile pictures, initials, or placeholder content.

## Overview

The Avatar component provides a flexible way to display user avatars with support for images, initials, different sizes, shapes, and status indicators. It gracefully handles fallbacks when images fail to load.

## Basic Usage

```tsx
import Avatar from '@/components/Avatar/Avatar'

{/* With image */}
<Avatar src="/path/to/avatar.jpg" alt="John Doe" />

{/* With initials */}
<Avatar initials="JD" />

{/* Auto-generated initials from name */}
<Avatar name="John Doe" />
```

## Sizes

```tsx
<Avatar size="xs" name="Extra Small" />
<Avatar size="sm" name="Small" />
<Avatar size="md" name="Medium" />      {/* Default */}
<Avatar size="lg" name="Large" />
<Avatar size="xl" name="Extra Large" />
<Avatar size="2xl" name="2X Large" />
```

## Shapes

### Circle (Default)
```tsx
<Avatar src="/avatar.jpg" shape="circle" />
```

### Square
```tsx
<Avatar src="/avatar.jpg" shape="square" />
```

### Rounded Square
```tsx
<Avatar src="/avatar.jpg" shape="rounded" />
```

## Variants

### Color Variants for Initials
```tsx
<Avatar initials="JD" variant="primary" />
<Avatar initials="JS" variant="secondary" />
<Avatar initials="BD" variant="success" />
<Avatar initials="AW" variant="warning" />
<Avatar initials="ER" variant="danger" />
<Avatar initials="IF" variant="info" />
<Avatar initials="NL" variant="neutral" />
```

### Custom Colors
```tsx
<Avatar 
  initials="CC" 
  bg="#ff6b6b" 
  color="#ffffff" 
/>
```

## Features

### With Status Indicator
```tsx
<Avatar 
  src="/avatar.jpg" 
  showStatus 
  status="online" 
/>

<Avatar 
  initials="JD" 
  showStatus 
  status="away" 
/>

<Avatar 
  name="Busy User" 
  showStatus 
  status="busy" 
/>

<Avatar 
  name="Offline User" 
  showStatus 
  status="offline" 
/>
```

### With Border
```tsx
<Avatar 
  src="/avatar.jpg" 
  bordered 
/>
```

### Fallback Handling
```tsx
{/* Falls back to initials if image fails */}
<Avatar 
  src="/broken-image.jpg" 
  name="John Doe" 
/>

{/* Falls back to placeholder if no image or initials */}
<Avatar 
  src="/broken-image.jpg" 
  placeholder={<UserIcon />}
/>
```

## Common Patterns

### User Profile
```tsx
function UserProfile({ user }) {
  return (
    <div className="user-profile">
      <Avatar 
        src={user.avatarUrl}
        name={user.fullName}
        size="xl"
        showStatus
        status={user.onlineStatus}
        bordered
      />
      <div className="user-info">
        <h3>{user.fullName}</h3>
        <p>{user.role}</p>
      </div>
    </div>
  )
}
```

### Comment Thread
```tsx
function Comment({ comment }) {
  return (
    <div className="comment">
      <Avatar 
        src={comment.author.avatar}
        name={comment.author.name}
        size="sm"
      />
      <div className="comment-content">
        <strong>{comment.author.name}</strong>
        <p>{comment.text}</p>
      </div>
    </div>
  )
}
```

### Team Member List
```tsx
function TeamMemberList({ members }) {
  return (
    <div className="team-grid">
      {members.map(member => (
        <div key={member.id} className="team-member">
          <Avatar 
            src={member.photo}
            name={member.name}
            size="lg"
            variant="primary"
            bordered
          />
          <h4>{member.name}</h4>
          <p>{member.position}</p>
        </div>
      ))}
    </div>
  )
}
```

### Avatar Group/Stack
```tsx
function AvatarGroup({ users, max = 3 }) {
  const visibleUsers = users.slice(0, max)
  const remainingCount = users.length - max

  return (
    <div className="avatar-group">
      {visibleUsers.map(user => (
        <Avatar 
          key={user.id}
          src={user.avatar}
          name={user.name}
          size="sm"
          bordered
        />
      ))}
      {remainingCount > 0 && (
        <Avatar 
          initials={`+${remainingCount}`}
          size="sm"
          variant="neutral"
          bordered
        />
      )}
    </div>
  )
}
```

### Chat Interface
```tsx
function ChatMessage({ message, isOwn }) {
  return (
    <div className={`chat-message ${isOwn ? 'own' : 'other'}`}>
      {!isOwn && (
        <Avatar 
          src={message.sender.avatar}
          name={message.sender.name}
          size="sm"
          showStatus
          status={message.sender.status}
        />
      )}
      <div className="message-bubble">
        {message.text}
      </div>
    </div>
  )
}
```

## Best Practices

1. **Provide meaningful alt text**: Always include descriptive alt text for images
2. **Use appropriate sizes**: Choose sizes that fit your layout and hierarchy
3. **Handle missing images**: Provide fallbacks like initials or placeholders
4. **Consider loading states**: Show loading indicators for slow-loading images
5. **Maintain consistency**: Use consistent avatar sizes and styles throughout your app

## Accessibility

- **Alt Text**: Proper alt text for screen readers
- **Color Contrast**: High contrast between text and background colors
- **Keyboard Focus**: Focusable when interactive
- **Semantic HTML**: Uses appropriate HTML elements and ARIA attributes

## Related Components

- [Button](./Button.md) - For clickable avatars
- [Badge](./Badge.md) - For status indicators
- [Loading](./Loading.md) - For loading states

## API Reference

See [Avatar API](../api/Avatar.md) for detailed prop documentation.

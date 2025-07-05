import type { Meta, StoryObj } from '@storybook/preact'
import { Button, Input, Flex, Stack, Heading, Text, Card } from '../components/index'

const meta: Meta = {
  title: 'Phase 1/Foundation Showcase',
  parameters: {
    docs: {
      description: {
        component: 'Phase 1: Foundation - Showcase wszystkich podstawowych komponentów NanoLux. Demonstracja kompletnego systemu z atomic CSS.'
      }
    }
  }
}

export default meta
type Story = StoryObj

export const FoundationComponents: Story = {
  render: () => (
    <div class="max-w-600 mx-auto p-20">
      <Stack spacing={24}>
        {/* Header Section */}
        <div class="text-center">
          <Heading level={1} size="4xl" center>
            NanoLux Foundation
          </Heading>
          <Text size="lg" center muted>
            Phase 1: Wszystkie podstawowe komponenty gotowe!
          </Text>
        </div>

        {/* Typography Showcase */}
        <Card variant="elevated" padding="lg">
          <Heading level={2}>Typography System</Heading>
          <Stack spacing={12}>
            <Flex direction="column" gap={8}>
              <Heading level={3}>Headings</Heading>
              <Heading level={4} size="sm">Small heading H4</Heading>
              <Heading level={5}>Medium heading H5</Heading>
              <Heading level={6} size="lg">Large heading H6</Heading>
            </Flex>
            
            <Flex direction="column" gap={8}>
              <Heading level={3}>Text Variants</Heading>
              <Text size="xl" weight="bold">Extra large bold text</Text>
              <Text>Regular paragraph text with normal weight</Text>
              <Text size="sm" muted>Small muted text for secondary information</Text>
            </Flex>
          </Stack>
        </Card>

        {/* Button Showcase */}
        <Card variant="outlined" padding="lg">
          <Heading level={2}>Button System</Heading>
          <Stack spacing={16}>
            <div>
              <Heading level={4} size="sm">Variants</Heading>
              <Flex gap={12} wrap>
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="danger">Danger</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
              </Flex>
            </div>
            
            <div>
              <Heading level={4} size="sm">Sizes</Heading>
              <Flex gap={12} align="center">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
                <Button size="xl">Extra Large</Button>
              </Flex>
            </div>
            
            <div>
              <Heading level={4} size="sm">States & Icons</Heading>
              <Flex gap={12} wrap>
                <Button variant="primary" icon="🔍">Search</Button>
                <Button variant="secondary" loading>Loading...</Button>
                <Button disabled>Disabled</Button>
                <Button variant="outline" icon="💾">Save</Button>
              </Flex>
            </div>
          </Stack>
        </Card>

        {/* Input Showcase */}
        <Card padding="lg">
          <Heading level={2}>Input System</Heading>
          <Stack spacing={16}>
            <div>
              <Heading level={4} size="sm">Basic Inputs</Heading>
              <Stack spacing={12}>
                <Input placeholder="Default input" />
                <Input type="email" prefixIcon="📧" placeholder="Email with icon" />
                <Input type="password" suffixIcon="👁️" placeholder="Password with eye" />
              </Stack>
            </div>
            
            <div>
              <Heading level={4} size="sm">Sizes & States</Heading>
              <Stack spacing={12}>
                <Input size="sm" placeholder="Small input" />
                <Input size="lg" placeholder="Large input" />
                <Input invalid suffixIcon="⚠️" placeholder="Invalid input" />
                <Input disabled placeholder="Disabled input" />
              </Stack>
            </div>
          </Stack>
        </Card>

        {/* Layout Showcase */}
        <Card variant="outlined" padding="lg">
          <Heading level={2}>Layout System</Heading>
          <Stack spacing={16}>
            <div>
              <Heading level={4} size="sm">Flex Layouts</Heading>
              <Card padding="sm" style="background: #f8f9fa;">
                <Text size="sm" muted>Space Between + Center</Text>
                <Flex justify="between" align="center">
                  <Button size="sm">Left</Button>
                  <Text>Content</Text>
                  <Button size="sm" variant="outline">Right</Button>
                </Flex>
              </Card>
            </div>
            
            <div>
              <Heading level={4} size="sm">Stack Layouts</Heading>
              <Card padding="sm" style="background: #f8f9fa;">
                <Text size="sm" muted>Vertical Stack</Text>
                <Stack spacing={8}>
                  <Button size="sm" variant="primary">First</Button>
                  <Button size="sm" variant="secondary">Second</Button>
                  <Button size="sm" variant="outline">Third</Button>
                </Stack>
              </Card>
            </div>
            
            <div>
              <Heading level={4} size="sm">Complex Nested Layout</Heading>
              <Card padding="sm" style="background: #f8f9fa;">
                <Flex direction="column" gap={12}>
                  <Flex justify="between" align="center">
                    <Heading level={5} size="sm">Header Section</Heading>
                    <Button size="sm" variant="ghost" icon="⚙️">Settings</Button>
                  </Flex>
                  
                  <Flex gap={16}>
                    <Stack spacing={8} className="flex-1">
                      <Input size="sm" prefixIcon="🔍" placeholder="Search..." />
                      <Text size="sm">Main content area</Text>
                    </Stack>
                    
                    <Stack spacing={8}>
                      <Button size="sm" variant="primary">Action 1</Button>
                      <Button size="sm" variant="outline">Action 2</Button>
                    </Stack>
                  </Flex>
                </Flex>
              </Card>
            </div>
          </Stack>
        </Card>

        {/* Complete Form Example */}
        <Card variant="elevated" padding="lg">
          <Heading level={2}>Complete Form Example</Heading>
          <Text muted>
            Przykład kompletnego formularza używającego wszystkich komponentów Phase 1
          </Text>
          
          <Stack spacing={16} style="margin-top: 16px;">
            <Stack spacing={12}>
              <div>
                <Text weight="medium" size="sm">Name</Text>
                <Input placeholder="Enter your name" />
              </div>
              
              <div>
                <Text weight="medium" size="sm">Email</Text>
                <Input type="email" prefixIcon="📧" placeholder="Enter your email" />
              </div>
              
              <div>
                <Text weight="medium" size="sm">Phone</Text>
                <Input type="tel" prefixIcon="📞" placeholder="Enter phone number" />
              </div>
            </Stack>
            
            <Flex justify="end" gap={12}>
              <Button variant="outline">Cancel</Button>
              <Button variant="primary" icon="💾">Save Contact</Button>
            </Flex>
          </Stack>
        </Card>

        {/* Performance Info */}
        <Card padding="lg" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;">
          <Heading level={2} color="white">Phase 1: Complete! 🎉</Heading>
          <Stack spacing={12}>
            <Text size="lg" color="white">
              6/6 komponentów foundation gotowych do użycia
            </Text>
            
            <Flex wrap gap={16}>
              <div>
                <Text weight="bold" color="white">Bundle Size</Text>
                <Text size="sm" color="rgba(255,255,255,0.9)">~2.5KB total</Text>
              </div>
              <div>
                <Text weight="bold" color="white">Test Coverage</Text>
                <Text size="sm" color="rgba(255,255,255,0.9)">201/201 passed</Text>
              </div>
              <div>
                <Text weight="bold" color="white">Components</Text>
                <Text size="sm" color="rgba(255,255,255,0.9)">Button, Input, Layout, Typography</Text>
              </div>
            </Flex>
            
            <Button variant="outline" style="background: rgba(255,255,255,0.1); border-color: rgba(255,255,255,0.3); color: white;">
              Start Phase 2: Forms & Navigation →
            </Button>
          </Stack>
        </Card>
      </Stack>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Kompletny showcase Phase 1 Foundation - wszystkie komponenty działają razem w harmonii, demonstrując pełny potencjał NanoLux atomic CSS system.'
      }
    }
  }
}

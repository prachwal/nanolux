import { useState } from 'preact/hooks'
import Checkbox from '../components/Checkbox/Checkbox'

export default function CheckboxDemo() {
  const [checked1, setChecked1] = useState(false)
  const [checked2, setChecked2] = useState(true)
  const [checked3, setChecked3] = useState(false)

  return (
    <div style="padding: 20px;">
      <h2>Checkbox Demo</h2>
      
      <div style="margin: 20px 0;">
        <h3>State Debug:</h3>
        <p>Checkbox 1: {checked1 ? 'CHECKED' : 'UNCHECKED'}</p>
        <p>Checkbox 2: {checked2 ? 'CHECKED' : 'UNCHECKED'}</p>
        <p>Checkbox 3: {checked3 ? 'CHECKED' : 'UNCHECKED'}</p>
      </div>
      
      <div style="margin: 20px 0;">
        <Checkbox 
          label="Toggle me (Checkbox 1)" 
          checked={checked1}
          onChange={(newChecked) => {
            console.log('Checkbox 1 changed to:', newChecked)
            setChecked1(newChecked)
          }}
        />
      </div>
      
      <div style="margin: 20px 0;">
        <Checkbox 
          label="Pre-checked (Checkbox 2)" 
          checked={checked2}
          onChange={(newChecked) => {
            console.log('Checkbox 2 changed to:', newChecked)
            setChecked2(newChecked)
          }}
        />
      </div>
      
      <div style="margin: 20px 0;">
        <Checkbox 
          label="Indeterminate (Checkbox 3)" 
          checked={checked3}
          indeterminate={true}
          onChange={(newChecked) => {
            console.log('Checkbox 3 changed to:', newChecked)
            setChecked3(newChecked)
          }}
        />
      </div>
      
      <div style="margin: 20px 0;">
        <button 
          onClick={() => {
            setChecked1(!checked1)
            setChecked2(!checked2)
            setChecked3(!checked3)
          }}
          style="padding: 8px 16px; margin: 10px 0;"
        >
          Toggle All
        </button>
      </div>
    </div>
  )
}

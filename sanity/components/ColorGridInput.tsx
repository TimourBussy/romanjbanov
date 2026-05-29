import {useState, useMemo} from 'react'
import {set, unset} from 'sanity'
import {Box, Button, Flex, Stack, Text, TextInput} from '@sanity/ui'
import {TAILWIND_COLOR_MAP} from '../lib/tailwindColors'

const COLOR_NAMES = [
  'slate',
  'gray',
  'zinc',
  'neutral',
  'stone',
  'red',
  'orange',
  'amber',
  'yellow',
  'lime',
  'green',
  'emerald',
  'teal',
  'cyan',
  'sky',
  'blue',
  'indigo',
  'violet',
  'purple',
  'fuchsia',
  'pink',
  'rose',
]
const SHADES = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950']

export function ColorGridInput(props: any) {
  const {value, onChange} = props
  const [searchTerm, setSearchTerm] = useState('')

  const filteredColors = useMemo(() => {
    const result: Array<{color: string; hex: string}> = []
    COLOR_NAMES.forEach((colorName) => {
      SHADES.forEach((shade) => {
        const colorValue = `${colorName}-${shade}`
        if (colorValue.includes(searchTerm.toLowerCase()))
          result.push({
            color: colorValue,
            hex: TAILWIND_COLOR_MAP[colorName]?.[shade] || '#ccc',
          })
      })
    })
    return result
  }, [searchTerm])

  return (
    <Stack gap={3}>
      <TextInput
        placeholder="Search colors (e.g., blue-500, red)"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.currentTarget.value)}
      />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(44px, 1fr))',
          gap: '8px',
        }}
      >
        {filteredColors.map(({color, hex}) => (
          <button
            key={color}
            onClick={() => onChange(set(color))}
            style={{
              width: '100%',
              aspectRatio: '1',
              padding: 0,
              background: hex,
              border: value === color ? '3px solid #000' : '1px solid #ccc',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            title={color}
          />
        ))}
      </div>
      {value && (
        <Flex gap={2} align="center">
          <Box
            style={{
              width: '32px',
              height: '32px',
              background: TAILWIND_COLOR_MAP[value.split('-')[0]]?.[value.split('-')[1]] || '#ccc',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
          />
          <Text>{value}</Text>
          <Button text="Clear" onClick={() => onChange(unset())} mode="ghost" />
        </Flex>
      )}
    </Stack>
  )
}

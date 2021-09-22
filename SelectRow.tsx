import { Card, HStack, Box, Select, Text, ISelectProps } from 'native-base'
import * as React from 'react'

export interface SelectRowProps {
  onValueChange: ISelectProps['onValueChange']
  text: string
  testID: string | undefined
  maxHours?: number
}

export default function SelectRow({ onValueChange, text, testID, maxHours = 24 }: SelectRowProps) {
  const selectItems: any[] = []

  for (let x = 0; x <= maxHours; x++) {
    selectItems.push(<Select.Item label={`${x}`} value={`${x}`} />)

    if (x !== maxHours) {
      selectItems.push(<Select.Item label={`${x + 0.5}`} value={`${x + 0.5}`} />)
    }
  }

  return (
    <Card>
      <HStack>
        <Box justifyContent="center">
          <Text>{text}</Text>
        </Box>
        <Box flexGrow={1} paddingLeft="2">
          <Select onValueChange={onValueChange} testID={testID}>
            {selectItems}
          </Select>
        </Box>
      </HStack>
    </Card>
  )
}

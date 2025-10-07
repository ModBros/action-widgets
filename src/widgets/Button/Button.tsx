import React, { CSSProperties } from 'react'
import {
  useColorField,
  useFileField,
  useFontField,
  useNumberField,
  useStringField
} from '@modbros/dashboard-sdk'
import styled from 'styled-components'

const StyledButton = styled.button`
  cursor: pointer;
`

export const Button = () => {
  // label
  const label = useStringField({ field: 'label' })
  const labelFont = useFontField({ field: 'label_font' })
  const labelFontSize = useNumberField({ field: 'label_font_size' })
  const labelColor = useColorField({ field: 'label_color' })

  // background
  const backgroundColor = useColorField({ field: 'background_color' })
  const backgroundImage = useFileField({ field: 'background_image' })

  // border
  const borderColor = useColorField({ field: 'border_color' })
  const borderWidth = useNumberField({ field: 'border_width', defaultValue: 3 })
  const borderRadius = useStringField({
    field: 'border_radius',
    defaultValue: ''
  })

  const style: CSSProperties = {
    cursor: 'pointer'
  }

  if (labelFont) {
    style.fontFamily = labelFont
  }

  if(labelFontSize) {
    style.fontSize = `${labelFontSize}px`;
  }

  if (!labelColor.isEmpty()) {
    style.color = labelColor.toRgbaCss()
  }

  if (backgroundImage) {
    style.backgroundImage = `url('${backgroundImage.src}')`
    style.backgroundSize = 'cover'
    style.backgroundPosition = '50% 50%'
    style.backgroundRepeat = 'no-repeat'
  } else if (!backgroundColor.isEmpty()) {
    style.backgroundColor = backgroundColor.toRgbaCss()
  }

  if (!borderColor.isEmpty()) {
    style.borderColor = borderColor.toRgbaCss()
  }

  style.borderStyle = 'solid'
  style.borderWidth = borderWidth
  style.borderRadius = borderRadius.match(/^\d+$/)
    ? `${borderRadius}px`
    : borderRadius

  return <StyledButton style={style}>{label}</StyledButton>
}

export default Button

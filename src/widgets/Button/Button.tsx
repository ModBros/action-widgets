import React, { CSSProperties } from 'react'
import {
  useCheckboxField,
  useColorField,
  useFileField,
  useFontField,
  useNumberField,
  useSelectField,
  useStringField
} from '@modbros/dashboard-sdk'
import styled from 'styled-components'

const StyledButton = styled.button`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Button = () => {
  // label
  const label = useStringField({ field: 'label' })
  const labelFont = useFontField({ field: 'label_font' })
  const labelFontSize = useNumberField({ field: 'label_font_size' })
  const labelColor = useColorField({ field: 'label_color' })

  // icon
  const icon = useFileField({ field: 'icon' })
  const iconPosition = useSelectField({
    field: 'icon_position',
    defaultValue: 'prefix'
  })
  const iconWidth = useNumberField({ field: 'icon_width' })
  const iconHeight = useNumberField({ field: 'icon_height' })
  const iconGap = useNumberField({ field: 'icon_gap', defaultValue: 8 })
  const iconFillSpace = useCheckboxField({ field: 'icon_fill_space' })

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

  if (labelFontSize) {
    style.fontSize = `${labelFontSize}px`
  }

  if (!labelColor.isEmpty()) {
    style.color = labelColor.toRgbaCss()
  }

  if (backgroundImage) {
    style.backgroundImage = `url('${backgroundImage.src}')`
    style.backgroundSize = 'cover'
    style.backgroundPosition = '50% 50%'
    style.backgroundRepeat = 'no-repeat'
  }

  if (!backgroundColor.isEmpty()) {
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

  if (icon && label) {
    style.flexDirection = iconPosition === 'suffix' ? 'row-reverse' : 'row'

    if (iconFillSpace) {
      // icon and label are pushed apart, the gap acts as horizontal padding
      style.justifyContent = 'space-between'
      style.paddingLeft = `${iconGap}px`
      style.paddingRight = `${iconGap}px`
    } else {
      style.gap = `${iconGap}px`
    }
  }

  const iconStyle: CSSProperties = {
    flexShrink: 0,
    objectFit: 'contain'
  }

  iconStyle.width = iconWidth ? `${iconWidth}px` : 'auto'
  iconStyle.height = iconHeight ? `${iconHeight}px` : 'auto'

  if (!iconWidth && !iconHeight) {
    iconStyle.height = '1em'
  }

  return (
    <StyledButton style={style}>
      {icon && <img style={iconStyle} src={icon.src} alt={''} />}
      {label && <span>{label}</span>}
    </StyledButton>
  )
}

export default Button

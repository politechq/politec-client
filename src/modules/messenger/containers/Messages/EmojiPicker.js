import React, { Fragment, useRef } from 'react'
import { bool, func } from 'prop-types'
import { useTranslation } from 'react-i18next'

import { CSSTransition } from 'react-transition-group'
import styled from 'styled-components'

import { equals, ifElse } from 'ramda'
import { alwaysOne, alwaysZero } from 'ramda-extension'

import { Picker } from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'

import ls from 'utils/ls'

const StyledOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

const EmojiPicker = ({ addEmoji, closePicker, isPickerOpened }) => {
  const { t } = useTranslation()
  const getTheme = () => ls.get('THEME')
  const nodeRef = useRef(null)
  return (
    <CSSTransition in={isPickerOpened} nodeRef={nodeRef} unmountOnExit>
      {state => (
        <Fragment>
          <StyledOverlay onClick={closePicker} />
          <Picker
            i18n={{
              categories: {
                activity: t('category-activity'),
                custom: t('category-custom'),
                flags: t('category-flags'),
                foods: t('category-foods'),
                nature: t('category-nature'),
                objects: t('category-objects'),
                people: t('category-people'),
                places: t('category-places'),
                recent: t('category-recent'),
                search: t('category-search'),
                smileys: t('category-smileys'),
                symbols: t('category-symbols'),
              },
              categorieslabel: t('categories-label'),
              clear: t('clear'),
              notfound: t('notfound'),
              search: t('search'),
              skintext: t('skintext'),
              skintones: {
                1: t('skintone-1'),
                2: t('skintone-2'),
                3: t('skintone-3'),
                4: t('skintone-4'),
                5: t('skintone-5'),
                6: t('skintone-6'),
              },
            }}
            onClick={({ native }) => {
              addEmoji(native)
            }}
            set={'apple'}
            showPreview={false}
            style={{
              bottom: 20,
              opacity: ifElse(equals('entered'), alwaysOne, alwaysZero)(state),
              position: 'absolute',
              right: 16,
              transition: '0.25s',
            }}
            theme={getTheme()}
          />
        </Fragment>
      )}
    </CSSTransition>
  )
}

EmojiPicker.propTypes = {
  addEmoji: func.isRequired,
  closePicker: func.isRequired,
  isPickerOpened: bool.isRequired,
}

export default EmojiPicker

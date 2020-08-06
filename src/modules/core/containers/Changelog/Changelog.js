import React from 'react'
import { useTranslation } from 'react-i18next'
import useDocumentTitle from 'hooks/use-document-title'

const Changelog = () => {
  useDocumentTitle('Changelog')
  const { t } = useTranslation()
  return <div>{t('changelog')}</div>
}

export default Changelog

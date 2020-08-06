import React from 'react'
import { useTranslation } from 'react-i18next'
import useDocumentTitle from 'hooks/use-document-title'

const AddRole = () => {
  const { t } = useTranslation()
  useDocumentTitle(t('add-role'))
  return <div>{'Add role'}</div>
}

export default AddRole

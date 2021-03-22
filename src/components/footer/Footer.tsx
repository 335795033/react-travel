import React from "react";
import { Layout, Typography } from 'antd'
import { useTranslation, withTranslation } from 'react-i18next'

export const Footer : React.FC = () => {
  const { t } = useTranslation();
  return (
    <Layout.Footer>
    <Typography.Title level={3} style={{textAlign:'center'}}>
      版权所有 @ recat 旅游网{t('footer.detail')}
    </Typography.Title>
  </Layout.Footer>
  )
}
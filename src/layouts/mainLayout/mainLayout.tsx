import React from 'react'
import styles from './mainLayout.module.css'
import { Header, Footer } from '../../components'

export const MainLayout: React.FC = ({ children }) => {
  return <>
    <Header></Header>
    {/* 页面内容 */}
    <div className={styles['page-content']}>{children}</div>
    <Footer></Footer>
  </>
}
import React, { useState, useEffect } from 'react'
import styles from './Header.module.css'
import logo from '../../assets/logo.svg'
import { Layout, Typography, Input, Menu, Button, Dropdown } from 'antd'
import { GlobalOutlined } from '@ant-design/icons';
import { useHistory, useLocation, useParams, useRouteMatch } from 'react-router-dom'
import { useSelector } from '../../redux/hooks'
import { useDispatch } from 'react-redux'
import jwt_decode, { JwtPayload as DefaultJwtPayload } from 'jwt-decode'
import { LanguageActionsTypes, addLanguageActionCreator, chengeLangugaeActionCreator } from '../../redux/language/languageActions'
import { userlSlice } from '../../redux/user/slice';
// import { Dispatch } from 'redux'
// import { RootState } from '../../redux/store'

interface JwtPayload extends DefaultJwtPayload {
  username: string
}

export const Header: React.FC = () => {
  const history = useHistory() //导航操作
  const location = useLocation() //当前路径的信息
  const params = useParams() //路径匹配的数据
  const match = useRouteMatch() //url的参数
  const language = useSelector((state) => state.language.language) //获得store中的state数据
  const languageList = useSelector((state) => state.language.languageList)
  const dispatch = useDispatch()

  const jwt = useSelector(s => s.user.token)
  const [username, setUsername] = useState('')

  const shoppingCartItems = useSelector(s=>s.shoppingCart.items)
  const shoppingCartLoading = useSelector(s=> s.shoppingCart.loading)


  useEffect(() => {
    if (jwt) {
      const token = jwt_decode<JwtPayload>(jwt) // 解码
      setUsername(token.username)
    }
  }, [jwt])

  const menuClickHandler = (e) => {
    if (e.key === 'new') {
      //处理新语言添加action
      dispatch(addLanguageActionCreator('新语言', 'new_lang'))
    } else {
      dispatch(chengeLangugaeActionCreator(e.key))
    }
  };

  const onLogout = () => {
    dispatch(userlSlice.actions.logOut())
    history.push('/')
    // window.location.reload(false)
  }

  return (
    <div className={styles['app-header']}>
      {/*top-header */}
      <div className={styles['top-header']}>
        <div className={styles.inner}>
          <Typography.Text>让旅游更幸福</Typography.Text>
          <Dropdown.Button
            style={{ marginLeft: 15 }}
            overlay={
              <Menu onClick={menuClickHandler}>
                {languageList.map(l => {
                  return <Menu.Item key={l.code}>{l.name}</Menu.Item>
                })}
                <Menu.Item key={'new'}>添加新语言</Menu.Item>
              </Menu>
            }
            icon={<GlobalOutlined></GlobalOutlined>}
          >
            {language === 'zh' ? '中文' : 'English'}
          </Dropdown.Button>
          {jwt ?
            <Button.Group className={styles['button-group']}>
              <span>欢迎
                <Typography.Text>{username}</Typography.Text>
              </span>
              <Button loading={shoppingCartLoading} onClick={()=>history.push('/shoppingCart')}>购物车({shoppingCartItems.length})</Button>
              <Button onClick={onLogout}>注销</Button>
            </Button.Group>
            : <Button.Group className={styles['button-group']}>
              <Button onClick={() => history.push('/register')}>注册</Button>
              <Button onClick={() => history.push('/signIn')}>登录</Button>
            </Button.Group>
          }
        </div>
      </div>
      <Layout.Header className={styles['main-header']}>
        <span onClick={() => { history.push('/') }}>
          <img src={logo} alt="logo" className={styles['App-logo']} />
          <Typography.Title level={3} className={styles.title}>React 旅游网</Typography.Title>
        </span>
        <Input.Search onSearch={(keywords) => history.push('/search/' + keywords)} placeholder="请输入旅游目的地、主题、或关键字" className={styles['search-input']}></Input.Search>
      </Layout.Header>
      <Menu mode={'horizontal'} className={styles['main-menu']}>
        <Menu.Item key={1}>旅游首页</Menu.Item>
        <Menu.Item key={2}>周末游</Menu.Item>
        <Menu.Item key={3}>跟团游</Menu.Item>
        <Menu.Item key={4}>自由行</Menu.Item>
        <Menu.Item key={5}>私家团</Menu.Item>
        <Menu.Item key={6}>邮轮</Menu.Item>
        <Menu.Item key={7}>景点+酒店</Menu.Item>
        <Menu.Item key={8}>当地游玩</Menu.Item>
        <Menu.Item key={9}>主题游</Menu.Item>
        <Menu.Item key={10}>定制游</Menu.Item>
        <Menu.Item key={11}>游学</Menu.Item>
        <Menu.Item key={12}>签证</Menu.Item>
        <Menu.Item key={13}>企业邮</Menu.Item>
        <Menu.Item key={14}>高端游</Menu.Item>
        <Menu.Item key={15}>爱玩户外</Menu.Item>
        <Menu.Item key={16}>保险</Menu.Item>
      </Menu>
    </div>
  )
};
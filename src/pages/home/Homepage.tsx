import React from 'react'
import { Header, Footer, Carousel, SideMenu, ProductCollection } from '../../components'
import { Row, Col, Typography, Spin } from 'antd'
import { productList1, productList2, productList3 } from './mockups'
import sideImage from '../../assets/images/sider_2019_12-09.png'
import sideImage2 from '../../assets/images/sider_2019_02-04.png'
import sideImage3 from '../../assets/images/sider_2019_02-04-2.png'
import styles from './HomePage.module.css'
import { withTranslation, WithTranslation } from 'react-i18next'
import axios from 'axios'


interface State {
  loading: boolean,
  error: string | null,
  productList: any[]
}
class HomePageComponet extends React.Component<WithTranslation, State> {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      error: null,
      productList: []
    }
  }

  async componentDidMount() {
    try {
      const { data } = await axios.get('xxx', { //等待get请求的执行
        headers: {
          'x-icode': ''
        },
      });
      this.setState({
        loading: false,
        error: null,
        productList: data
      })
    } catch (error) {
      this.setState({
        error: error.message,
        loading: false,
      })
    }
  }
  render() {
    // console.log(this.props.t)
    const { t } = this.props
    const { productList, loading, error } = this.state
    if (loading) {
      return <Spin
        size="large"
        style={{
          marginTop: 200,
          marginBottom: 200,
          marginLeft: 'auto',
          marginRight: 'auto',
          width: '100%'
        }}
      />
    }
    if (error) {
      return <div>网站出错：{error}</div>
    }
    return <>
      <Header></Header>
      {/* 页面内容 */}
      <div className={styles['page-content']}>
        <Row style={{ marginTop: 20 }}>
          <Col span={6}>
            <SideMenu></SideMenu>
          </Col>
          <Col span={18}>
            <Carousel></Carousel>
          </Col>
        </Row>
        <ProductCollection
          title={
            <Typography.Title level={3} type="warning">
              {t("home_page.hot_recommended")}
            </Typography.Title>
          }
          sideImage={sideImage}
          products={productList1}
        />
        <ProductCollection title={<Typography.Title level={3} type="danger">{t('home_page.new_arrival')}</Typography.Title>}
          sideImage={sideImage2}
          products={productList2}
        />
        <ProductCollection title={<Typography.Title level={3} type="success">{t('home_page.domestic_travel')}</Typography.Title>}
          sideImage={sideImage3}
          products={productList3}
        />
      </div>
      <Footer></Footer>
    </>
  }
}

export const HomePage = withTranslation()(HomePageComponet) //高阶组件的高阶组件
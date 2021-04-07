import React from 'react'
import styles from './ProductIntro.module.css'
import { Typography, Carousel, Image, Rate, Table } from 'antd'
import { ColumnsType } from 'antd/es/table'

interface PropsType {
  title: string;
  shortDescription: string;
  price: number | string;
  coupons: string;
  points: string;
  discount: string;
  rating: string | number;
  pictures: string[]
}

const columns: ColumnsType<RowType> = [
  {
    title: 'title',
    dataIndex: 'title',
    key: 'title',
    align: 'left',
    width: 120
  },
  {
    title: 'description',
    dataIndex: 'description',
    key: 'description',
    align: 'center',
  }
];

interface RowType {
  title: string,
  description: string | number | JSX.Element;
  key: number
}

export const ProductIntro: React.FC<PropsType> = ({
  title,
  shortDescription,
  price,
  coupons,
  discount,
  rating,
  pictures
}) => {

  const tableDataSource: RowType[] = [
    {
      key: 0,
      title: "路线名称",
      description: title,
    },
    {
      key: 1,
      title: "价格",
      description: (
        <>
          ¥{" "}
          <Typography.Text type="danger" strong>
            {price}
          </Typography.Text>
        </>
      ),
    },
    {
      key: 2,
      title: "限时抢购折扣",
      description: discount ? (
        <>
          ¥ <Typography.Text delete>{price}</Typography.Text>{" "}
          <Typography.Text type="danger" strong>
            ¥ {discount}
          </Typography.Text>
        </>
      ) : (
        "暂无折扣"
      ),
    },
    {
      key: 2,
      title: "领取优惠",
      description: coupons ? discount : "无优惠券可领",
    },
    {
      key: 2,
      title: "线路评价",
      description: (
        <>
          <Rate allowHalf defaultValue={+rating} />
          <Typography.Text style={{ marginLeft: 10 }}>
            {rating} 星
          </Typography.Text>
        </>
      ),
    },
  ];

  return <div className={styles['intro-container']}>
    <Typography.Title level={4}>{title}</Typography.Title>
    <Typography.Text>{shortDescription}</Typography.Text>
    <div className={styles['intro-detail-content']}>
      <Typography.Text style={{ marginLeft: 20 }}>
        ￥<span className={styles['intro-detail-strong-text']}>{price}</span>/人起
      </Typography.Text>
      <Typography.Text style={{ marginLeft: 50 }}>
        <span className={styles['intro-detail-strong-text']}>{rating}</span>分
      </Typography.Text>
      <Carousel autoplay slidesToShow={3}>
        <Image height={150} src='https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg1.3lian.com%2F2015%2Fa1%2F144%2Fd%2F83.jpg&refer=http%3A%2F%2Fimg1.3lian.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1619943289&t=250698052773e9e8280bdd987bef0f9a'></Image>
        <Image height={150} src='https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201312%2F03%2F165620x7cknad7vruvec1z.jpg&refer=http%3A%2F%2Fattach.bbs.miui.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1619943521&t=ec2353f45c94c9d0f501095f04ce1afc'></Image>
        <Image height={150} src='https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3555255749,4279001161&fm=26&gp=0.jpg'></Image>
      </Carousel>
      <Table<RowType> columns={columns} dataSource={tableDataSource} size="small" bordered={false} pagination={false}></Table>
    </div>
  </div>
}
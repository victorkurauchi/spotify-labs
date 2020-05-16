import React from 'react';
import { Row, Col, Empty, Card, Divider, Typography } from 'antd'

const { Meta } = Card
const { Title } = Typography

type Props = {
  data: { items: any[] };
}

const AlbumCatalog = ({ data }: Props) => {
  if (!data?.items?.length) return <Empty />

  return (
    <>
      <Divider orientation="left" style={{ color: '#333', fontWeight: 'normal' }}>
        <Title level={3}>Albums</Title>
      </Divider>
      <Row gutter={[16, 24]}>
        { data.items.map(album => (
          <Col className="gutter-row" span={6}>
            <Card
              hoverable
              cover={<img alt="example" src={album.images[1].url} />}
            >
              <Meta title={album.name} description={`Released at ${album.release_date} with ${album.total_tracks} tracks`} />
            </Card>
          </Col>
        ))}
      </Row>
    </>
  )
} 
export default AlbumCatalog

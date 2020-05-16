import React from 'react';
import { Row, Col, Card, Divider, Typography } from 'antd'

const { Meta } = Card
const { Title } = Typography

type Props = {
  data: { items: any[] };
}

const ArtistCatalog = ({ data }: Props) => {
  if (!data?.items?.length) return null

  const fallback = 'https://images.unsplash.com/photo-1466232373731-46205f0b668e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80'
  
  return (
    <>
      <Divider orientation="left" style={{ color: '#333', fontWeight: 'normal' }}>
        <Title level={3}>Artists</Title>
      </Divider>
      <Row gutter={[16, 24]}>
        { data.items.map(artist => (
          <Col className="gutter-row" span={6}>
            <Card
              hoverable
              cover={<img style={{ maxHeight: '370px' }} alt="example" src={artist.images?.length ? artist.images[1].url : fallback } />}
            >
              <Meta title={artist.name} description={artist.genres.join(',')} />
            </Card>
          </Col>
        ))}
      </Row>
    </>
  )
} 
export default ArtistCatalog

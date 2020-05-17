import React from 'react';
import { Empty, List, Skeleton, Avatar } from 'antd'
import { useAppStateContainer } from '../../context/application';
import { ADD_TRACK_TO_PLAYLIST } from '../../store/actionTypes';

type Props = {
  data: { items: any[] };
  options: string[];
}

const TrackCatalog = ({ data, options }: Props) => {
  if (!data?.items?.length) return <Empty />
  const { state, dispatch } = useAppStateContainer()
  const { playlist } = state.playlistState

  const addToPlaylist = (item: any) => {
    if (!playlist.find(track => track.id === item.id)) {
      dispatch({
        type: ADD_TRACK_TO_PLAYLIST,
        payload: item
      })
    }
  }

  const renderActions = (item: any, options: string[]) => {
    const actions = [
      { key: 'add', comp: () => (<a href="#" onClick={() => addToPlaylist(item)} key="list-loadmore-edit">add to playlist</a>) },
      { key: 'listen', comp: () => (<a href={item.external_urls.spotify} target="_blank" key="list-loadmore-more">listen</a>) },
      { key: 'remove', comp: () => (<a key="list-loadmore-more">remove</a>) },
    ]

    return actions.filter(a => options.indexOf(a.key) > -1).map(a => a.comp())
  }

  return (
    <List
      className="demo-loadmore-list"
      // loading={initLoading}
      itemLayout="horizontal"
      // loadMore={loadMore}
      dataSource={data.items}
      renderItem={item => (
        <List.Item actions={renderActions(item, options)}>
          <Skeleton avatar title={false} loading={false} active>
            <List.Item.Meta
              avatar={
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              }
              title={<a href="https://ant.design">{item.name}</a>}
              description={`By ${item.artists[0].name} - Popularity ${item.popularity}/100`}
            />
            <div>content</div>
          </Skeleton>
        </List.Item>
      )}
    />
  );
} 
export default TrackCatalog

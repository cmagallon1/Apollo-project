import React, { Fragment } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { Loading, Header, LaunchDetail } from '../components';
import { ActionButton } from '../containers';

export const GET_LAUNCH_DETAILS = gql`
  query LaunchDetails($launchId: ID!) {
  launch(id: $launchId) {
    id
    isInCart @client
    site
    isBooked
    rocket {
      id
      name
      type
    }
    mission {
      name
      missionPatch
    }
  }
}
`;

const Launch = ({ launchId }) => {
  const { data, loading, error } = useQuery(GET_LAUNCH_DETAILS, {
    variables: { launchId }
  });

  console.log(error)
  if(loading) return <Loading/>;
  if(error) return <p>ERROR: { error.message }</p>;
  if(!data) return <p>NOT_FOUND</p>;

  return (
    <Fragment>
      <Header
        image={
          data.launch && data.launch.mission && data.launch.mission.missionPatch
        }
      >
        {data && data.launch && data.launch.mission && data.launch.mission.name}
     </Header>
      <LaunchDetail {...data.launch} />
      <ActionButton {...data.launch} />
    </Fragment>
  );
}

export default Launch;

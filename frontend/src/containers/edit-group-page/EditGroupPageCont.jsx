import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import { useHistory, useParams } from 'react-router-dom';
import LoadingComp from '../../components/common/LoadingComp';
import EditGroupTeacherElementCont from './EditGroupTeacherElementCont';
import EditGroupStudentElementCont from './EditGroupStudentElementCont';
import EditGroupDetailsCont from './EditGroupDetailsCont';
import EditGroupPageComp from '../../components/edit-group-page/EditGroupPageComp';

const EDIT_GROUP_QUERY = gql`
  query getGroup($groupId: ID!) {
    group(groupId: $groupId) {
      id
      ...GroupDetails
      teachers {
        id
        ...TeacherDetails
      }
      students {
        id
        ...StudentDetails
      }
    }
  }
  ${EditGroupTeacherElementCont.fragments.USER_DETAILS_FRAGMENT}
  ${EditGroupStudentElementCont.fragments.USER_DETAILS_FRAGMENT}
  ${EditGroupDetailsCont.fragments.GROUP_DETAILS_FRAGMENT}
`;

export default function EditGroupPageCont() {
  const history = useHistory();
  const { groupid: groupId } = useParams();

  const { data } = useQuery(EDIT_GROUP_QUERY, {
    variables: { groupId },
  });

  if (!data?.group) {
    return <LoadingComp />;
  }

  return (
    <EditGroupPageComp
      group={data.group}
      onNavigateBack={() => history.goBack()}
    />
  );
}

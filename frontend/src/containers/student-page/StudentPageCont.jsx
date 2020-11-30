import React, { useState } from 'react';
import gql from 'graphql-tag';
import toast from 'toasted-notes';
import { useMutation, useQuery } from '@apollo/client';
import { useAuthentication } from '../../AuthService';
import StudentPageComp from '../../components/student-page/StudentPageComp';
import LoadingComp from '../../components/common/LoadingComp';
import GroupListElementCont from '../common/GroupListElementCont';

// todo fragmentek nem működnek teszt közben
export const STUDENT_GROUPS_QUERY = gql`
  query getUser($userId: ID!) {
    user(userId: $userId) {
      id
      name
      code
      studentGroups {
        id
        name
        news
        newsChangedDate
        ...GroupDetails
      }
    }
  }
  ${GroupListElementCont.fragments.GROUP_DETAILS_FRAGMENT}
`;

export const JOIN_GROUP_MUTATION = gql`
  mutation AddStudentToGroupFromCode($userId: ID!, $groupCode: String!) {
    addStudentToGroupFromCode(userId: $userId, groupCode: $groupCode) {
      id
      ...GroupDetails
    }
  }
  ${GroupListElementCont.fragments.GROUP_DETAILS_FRAGMENT}
`;

export default function StudentPageCont() {
  const { userId } = useAuthentication();
  const [joinGroupCode, setJoinGroupCode] = useState('');

  const { data } = useQuery(STUDENT_GROUPS_QUERY, {
    variables: { userId },
  });

  const [joinGroup] = useMutation(JOIN_GROUP_MUTATION, {
    onCompleted: ({ data: result }) =>
      toast.notify(
        `Joined to group: ${result.addStudentToGroupFromCode?.name}`
      ),
    onError: () => toast.notify(`No group with code: ${joinGroupCode}`),
    update: (cache) => {
      cache.modify({
        id: `User:${userId}`,
        fields: {
          studentGroups(existingGroupRefs, { INVALIDATE }) {
            return INVALIDATE;
          },
        },
      });
    },
  });

  if (!data?.user) {
    return <LoadingComp />;
  }

  return (
    <StudentPageComp
      user={data.user}
      joinCode={joinGroupCode}
      onJoinCodeChange={(value) =>
        setJoinGroupCode(value.toUpperCase().slice(0, 8))
      }
      joinDisabled={!joinGroupCode || !joinGroupCode.trim().length}
      onJoinGroup={() =>
        joinGroup({
          variables: { userId: data.user.id, groupCode: joinGroupCode },
        })
      }
    />
  );
}

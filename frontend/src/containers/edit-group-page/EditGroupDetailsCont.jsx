import React from 'react';
import gql from 'graphql-tag';
import toast from 'toasted-notes';
import { useMutation } from '@apollo/client';
import PropTypes from 'prop-types';
import FormCont from '../common/FormCont';

const GROUP_DETAILS_FRAGMENT = gql`
  fragment GroupDetails on Group {
    id
    name
    description
  }
`;

const EDIT_GROUP_MUTATION = gql`
  mutation EditGroup($groupId: ID!, $input: NameDescInput!) {
    editGroup(groupId: $groupId, input: $input) {
      ...GroupDetails
    }
  }
  ${GROUP_DETAILS_FRAGMENT}
`;

export default function EditGroupDetailsCont({ group }) {
  const [editGroup] = useMutation(EDIT_GROUP_MUTATION, {
    onCompleted: () => toast.notify('Group details edited successfully'),
    onError: () => toast.notify('Error'),
  });

  if (!group) {
    return <div />;
  }

  return (
    <FormCont
      initialName={group.name}
      initialDescription={group.description}
      onSubmit={(values) => {
        editGroup({
          variables: {
            input: {
              description: values.description,
              name: values.name,
            },
            groupId: group.id,
          },
        });
      }}
    />
  );
}

EditGroupDetailsCont.fragments = {
  GROUP_DETAILS_FRAGMENT,
};

EditGroupDetailsCont.propTypes = {
  group: PropTypes.object.isRequired,
};

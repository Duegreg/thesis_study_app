import React from 'react';
import gql from 'graphql-tag';
import toast from 'toasted-notes';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import PropTypes, { number, string } from 'prop-types';
import ModalFormComp from '../../components/common/ModalFormComp';

const CREATE_TEST_MUTATION = gql`
  mutation CreateTest($groupId: ID!, $input: NameDescInput!) {
    createTest(groupId: $groupId, input: $input) {
      name
    }
  }
`;

export default function NewTestDialogCont({ groupId }) {
  const history = useHistory();

  const [createTest] = useMutation(CREATE_TEST_MUTATION, {
    onCompleted: (data) =>
      toast.notify(`Test created with name: ${data.createTest?.name}`),
    onError: () => toast.notify('Error :('),
    update: (cache) => {
      cache.modify({
        id: `Group:${groupId}`,
        fields: {
          tests(existingTestRefs, { INVALIDATE }) {
            return INVALIDATE;
          },
        },
      });
    },
  });

  const onSubmit = (values) => {
    createTest({
      variables: {
        groupId,
        input: { description: values.description, name: values.name },
      },
    }).then(() => history.goBack());
  };

  return (
    <ModalFormComp
      title="New Test"
      onHide={() => history.goBack()}
      onSubmit={onSubmit}
    />
  );
}

NewTestDialogCont.propTypes = {
  groupId: PropTypes.oneOfType([number, string]).isRequired,
};

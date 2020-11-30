import gql from 'graphql-tag';
import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import toast from 'toasted-notes';
import PropTypes, { number, string } from 'prop-types';
import TeacherGroupElementComp from '../../components/teacher-group-page/TeacherGroupElementComp';

const TEST_DETAILS_FRAGMENT = gql`
  fragment TestDetails on Test {
    id
    name
    description
    active
  }
`;

const EDIT_TEST_STATUS_MUTATION = gql`
  mutation EditTestStatus($testId: ID!, $active: Boolean!) {
    editTestStatus(testId: $testId, active: $active) {
      id
      ...TestDetails
    }
  }
  ${TEST_DETAILS_FRAGMENT}
`;

export default function TeacherGroupElementCont({ test, selectedTestId }) {
  const match = useRouteMatch();

  const [changeTestStatus] = useMutation(EDIT_TEST_STATUS_MUTATION, {
    onCompleted: (data) =>
      toast.notify(
        `Test status changed to: ${
          data.editTestStatus?.active ? 'Active' : 'Inactive'
        }`
      ),
    onError: () => toast.notify('Error :('),
  });

  return (
    <TeacherGroupElementComp
      isSelected={selectedTestId === test.id}
      test={test}
      onChangeStatus={() =>
        changeTestStatus({
          variables: { testId: test.id, active: !test.active },
        })
      }
      statusPath={`${match.url}/test/${test.id}`}
      editPath={`${match.url}/test/${test.id}/edit`}
    />
  );
}

TeacherGroupElementCont.propTypes = {
  test: PropTypes.object.isRequired,
  selectedTestId: PropTypes.oneOfType([number, string]),
};

TeacherGroupElementCont.fragments = {
  TEST_DETAILS_FRAGMENT,
};

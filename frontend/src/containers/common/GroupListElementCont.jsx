import React from 'react'
import gql from 'graphql-tag';
import {useRouteMatch} from "react-router-dom";
import GroupListElementComp from "../../components/common/GroupListElementComp";
import PropTypes from "prop-types";
import {isDateInAWeek} from "../../utils/date-utils";


const GROUP_DETAILS_FRAGMENT = gql`
    fragment GroupDetails on Group {
        id
        name
        news
        newsChangedDate
    }`;

export default function GroupListElementCont({group}) {
    let match = useRouteMatch();

    if (!group) {
        return (<div/>);
    }

    return (
        <GroupListElementComp
            group={group}
            onClickPath={`${match.url}/group/${group.id}`}
            isNewsFresh={isDateInAWeek(group.newsChangedDate)}
        />
    );
}

GroupListElementCont.fragments = {
    GROUP_DETAILS_FRAGMENT: GROUP_DETAILS_FRAGMENT,
};

GroupListElementCont.propTypes = {
    group: PropTypes.object.isRequired,
}




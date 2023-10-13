import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './message-token.reducer';

export const MessageTokenDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const messageTokenEntity = useAppSelector(state => state.messageToken.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="messageTokenDetailsHeading">Message Token</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{messageTokenEntity.id}</dd>
          <dt>
            <span id="description">Description</span>
          </dt>
          <dd>{messageTokenEntity.description}</dd>
          <dt>
            <span id="timeSent">Time Sent</span>
          </dt>
          <dd>{messageTokenEntity.timeSent}</dd>
          <dt>
            <span id="tokenValue">Token Value</span>
          </dt>
          <dd>{messageTokenEntity.tokenValue}</dd>
          <dt>
            <span id="received">Received</span>
          </dt>
          <dd>{messageTokenEntity.received ? 'true' : 'false'}</dd>
          <dt>
            <span id="actioned">Actioned</span>
          </dt>
          <dd>{messageTokenEntity.actioned ? 'true' : 'false'}</dd>
          <dt>
            <span id="contentFullyEnqueued">Content Fully Enqueued</span>
          </dt>
          <dd>{messageTokenEntity.contentFullyEnqueued ? 'true' : 'false'}</dd>
          <dt>Placeholder</dt>
          <dd>
            {messageTokenEntity.placeholders
              ? messageTokenEntity.placeholders.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.description}</a>
                    {messageTokenEntity.placeholders && i === messageTokenEntity.placeholders.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/message-token" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/message-token/${messageTokenEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default MessageTokenDetail;

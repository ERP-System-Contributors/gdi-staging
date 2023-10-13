import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './file-type.reducer';

export const FileTypeDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const fileTypeEntity = useAppSelector(state => state.fileType.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="fileTypeDetailsHeading">File Type</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{fileTypeEntity.id}</dd>
          <dt>
            <span id="fileTypeName">File Type Name</span>
          </dt>
          <dd>{fileTypeEntity.fileTypeName}</dd>
          <dt>
            <span id="fileMediumType">File Medium Type</span>
          </dt>
          <dd>{fileTypeEntity.fileMediumType}</dd>
          <dt>
            <span id="description">Description</span>
          </dt>
          <dd>{fileTypeEntity.description}</dd>
          <dt>
            <span id="fileTemplate">File Template</span>
          </dt>
          <dd>
            {fileTypeEntity.fileTemplate ? (
              <div>
                {fileTypeEntity.fileTemplateContentType ? (
                  <a onClick={openFile(fileTypeEntity.fileTemplateContentType, fileTypeEntity.fileTemplate)}>Open&nbsp;</a>
                ) : null}
                <span>
                  {fileTypeEntity.fileTemplateContentType}, {byteSize(fileTypeEntity.fileTemplate)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="fileType">File Type</span>
          </dt>
          <dd>{fileTypeEntity.fileType}</dd>
          <dt>Placeholder</dt>
          <dd>
            {fileTypeEntity.placeholders
              ? fileTypeEntity.placeholders.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.description}</a>
                    {fileTypeEntity.placeholders && i === fileTypeEntity.placeholders.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/file-type" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/file-type/${fileTypeEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default FileTypeDetail;

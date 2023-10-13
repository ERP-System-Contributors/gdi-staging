import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Input, InputGroup, FormGroup, Form, Row, Col, Table } from 'reactstrap';
import { openFile, byteSize, translate, TextFormat, getSortState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IFileUpload } from 'app/shared/model/files/file-upload.model';
import { searchEntities, getEntities } from './file-upload.reducer';

export const FileUpload = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(location, ITEMS_PER_PAGE, 'id'), location.search)
  );

  const fileUploadList = useAppSelector(state => state.fileUpload.entities);
  const loading = useAppSelector(state => state.fileUpload.loading);
  const totalItems = useAppSelector(state => state.fileUpload.totalItems);

  const getAllEntities = () => {
    if (search) {
      dispatch(
        searchEntities({
          query: search,
          page: paginationState.activePage - 1,
          size: paginationState.itemsPerPage,
          sort: `${paginationState.sort},${paginationState.order}`,
        })
      );
    } else {
      dispatch(
        getEntities({
          page: paginationState.activePage - 1,
          size: paginationState.itemsPerPage,
          sort: `${paginationState.sort},${paginationState.order}`,
        })
      );
    }
  };

  const startSearching = e => {
    if (search) {
      setPaginationState({
        ...paginationState,
        activePage: 1,
      });
      dispatch(
        searchEntities({
          query: search,
          page: paginationState.activePage - 1,
          size: paginationState.itemsPerPage,
          sort: `${paginationState.sort},${paginationState.order}`,
        })
      );
    }
    e.preventDefault();
  };

  const clear = () => {
    setSearch('');
    setPaginationState({
      ...paginationState,
      activePage: 1,
    });
    dispatch(getEntities({}));
  };

  const handleSearch = event => setSearch(event.target.value);

  const sortEntities = () => {
    getAllEntities();
    const endURL = `?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`;
    if (location.search !== endURL) {
      navigate(`${location.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    sortEntities();
  }, [paginationState.activePage, paginationState.order, paginationState.sort, search]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const page = params.get('page');
    const sort = params.get(SORT);
    if (page && sort) {
      const sortSplit = sort.split(',');
      setPaginationState({
        ...paginationState,
        activePage: +page,
        sort: sortSplit[0],
        order: sortSplit[1],
      });
    }
  }, [location.search]);

  const sort = p => () => {
    setPaginationState({
      ...paginationState,
      order: paginationState.order === ASC ? DESC : ASC,
      sort: p,
    });
  };

  const handlePagination = currentPage =>
    setPaginationState({
      ...paginationState,
      activePage: currentPage,
    });

  const handleSyncList = () => {
    sortEntities();
  };

  return (
    <div>
      <h2 id="file-upload-heading" data-cy="FileUploadHeading">
        File Uploads
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh list
          </Button>
          <Link to="/file-upload/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new File Upload
          </Link>
        </div>
      </h2>
      <Row>
        <Col sm="12">
          <Form onSubmit={startSearching}>
            <FormGroup>
              <InputGroup>
                <Input type="text" name="search" defaultValue={search} onChange={handleSearch} placeholder="Search" />
                <Button className="input-group-addon">
                  <FontAwesomeIcon icon="search" />
                </Button>
                <Button type="reset" className="input-group-addon" onClick={clear}>
                  <FontAwesomeIcon icon="trash" />
                </Button>
              </InputGroup>
            </FormGroup>
          </Form>
        </Col>
      </Row>
      <div className="table-responsive">
        {fileUploadList && fileUploadList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  ID <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('description')}>
                  Description <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('fileName')}>
                  File Name <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('periodFrom')}>
                  Period From <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('periodTo')}>
                  Period To <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('fileTypeId')}>
                  File Type Id <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('dataFile')}>
                  Data File <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('uploadSuccessful')}>
                  Upload Successful <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('uploadProcessed')}>
                  Upload Processed <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('uploadToken')}>
                  Upload Token <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {fileUploadList.map((fileUpload, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/file-upload/${fileUpload.id}`} color="link" size="sm">
                      {fileUpload.id}
                    </Button>
                  </td>
                  <td>{fileUpload.description}</td>
                  <td>{fileUpload.fileName}</td>
                  <td>
                    {fileUpload.periodFrom ? <TextFormat type="date" value={fileUpload.periodFrom} format={APP_LOCAL_DATE_FORMAT} /> : null}
                  </td>
                  <td>
                    {fileUpload.periodTo ? <TextFormat type="date" value={fileUpload.periodTo} format={APP_LOCAL_DATE_FORMAT} /> : null}
                  </td>
                  <td>{fileUpload.fileTypeId}</td>
                  <td>
                    {fileUpload.dataFile ? (
                      <div>
                        {fileUpload.dataFileContentType ? (
                          <a onClick={openFile(fileUpload.dataFileContentType, fileUpload.dataFile)}>Open &nbsp;</a>
                        ) : null}
                        <span>
                          {fileUpload.dataFileContentType}, {byteSize(fileUpload.dataFile)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td>{fileUpload.uploadSuccessful ? 'true' : 'false'}</td>
                  <td>{fileUpload.uploadProcessed ? 'true' : 'false'}</td>
                  <td>{fileUpload.uploadToken}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/file-upload/${fileUpload.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/file-upload/${fileUpload.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/file-upload/${fileUpload.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="danger"
                        size="sm"
                        data-cy="entityDeleteButton"
                      >
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No File Uploads found</div>
        )}
      </div>
      {totalItems ? (
        <div className={fileUploadList && fileUploadList.length > 0 ? '' : 'd-none'}>
          <div className="justify-content-center d-flex">
            <JhiItemCount page={paginationState.activePage} total={totalItems} itemsPerPage={paginationState.itemsPerPage} />
          </div>
          <div className="justify-content-center d-flex">
            <JhiPagination
              activePage={paginationState.activePage}
              onSelect={handlePagination}
              maxButtons={5}
              itemsPerPage={paginationState.itemsPerPage}
              totalItems={totalItems}
            />
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default FileUpload;

import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Input, InputGroup, FormGroup, Form, Row, Col, Table } from 'reactstrap';
import { byteSize, translate, getSortState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IGdiTransactionDataIndex } from 'app/shared/model/gdi/gdi-transaction-data-index.model';
import { searchEntities, getEntities } from './gdi-transaction-data-index.reducer';

export const GdiTransactionDataIndex = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(location, ITEMS_PER_PAGE, 'id'), location.search)
  );

  const gdiTransactionDataIndexList = useAppSelector(state => state.gdiTransactionDataIndex.entities);
  const loading = useAppSelector(state => state.gdiTransactionDataIndex.loading);
  const totalItems = useAppSelector(state => state.gdiTransactionDataIndex.totalItems);

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
      <h2 id="gdi-transaction-data-index-heading" data-cy="GdiTransactionDataIndexHeading">
        Gdi Transaction Data Indices
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh list
          </Button>
          <Link
            to="/gdi-transaction-data-index/new"
            className="btn btn-primary jh-create-entity"
            id="jh-create-entity"
            data-cy="entityCreateButton"
          >
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Gdi Transaction Data Index
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
        {gdiTransactionDataIndexList && gdiTransactionDataIndexList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  ID <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('datasetName')}>
                  Dataset Name <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('databaseName')}>
                  Database Name <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('updateFrequency')}>
                  Update Frequency <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('datasetBehavior')}>
                  Dataset Behavior <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('minimumDataRowsPerRequest')}>
                  Minimum Data Rows Per Request <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('maximumDataRowsPerRequest')}>
                  Maximum Data Rows Per Request <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('datasetDescription')}>
                  Dataset Description <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('dataPath')}>
                  Data Path <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Business Team <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Data Set Template <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {gdiTransactionDataIndexList.map((gdiTransactionDataIndex, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/gdi-transaction-data-index/${gdiTransactionDataIndex.id}`} color="link" size="sm">
                      {gdiTransactionDataIndex.id}
                    </Button>
                  </td>
                  <td>{gdiTransactionDataIndex.datasetName}</td>
                  <td>{gdiTransactionDataIndex.databaseName}</td>
                  <td>{gdiTransactionDataIndex.updateFrequency}</td>
                  <td>{gdiTransactionDataIndex.datasetBehavior}</td>
                  <td>{gdiTransactionDataIndex.minimumDataRowsPerRequest}</td>
                  <td>{gdiTransactionDataIndex.maximumDataRowsPerRequest}</td>
                  <td>{gdiTransactionDataIndex.datasetDescription}</td>
                  <td>{gdiTransactionDataIndex.dataPath}</td>
                  <td>
                    {gdiTransactionDataIndex.businessTeam ? (
                      <Link to={`/business-team/${gdiTransactionDataIndex.businessTeam.id}`}>
                        {gdiTransactionDataIndex.businessTeam.businessTeam}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {gdiTransactionDataIndex.dataSetTemplate ? (
                      <Link to={`/business-document/${gdiTransactionDataIndex.dataSetTemplate.id}`}>
                        {gdiTransactionDataIndex.dataSetTemplate.documentTitle}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button
                        tag={Link}
                        to={`/gdi-transaction-data-index/${gdiTransactionDataIndex.id}`}
                        color="info"
                        size="sm"
                        data-cy="entityDetailsButton"
                      >
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/gdi-transaction-data-index/${gdiTransactionDataIndex.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/gdi-transaction-data-index/${gdiTransactionDataIndex.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
          !loading && <div className="alert alert-warning">No Gdi Transaction Data Indices found</div>
        )}
      </div>
      {totalItems ? (
        <div className={gdiTransactionDataIndexList && gdiTransactionDataIndexList.length > 0 ? '' : 'd-none'}>
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

export default GdiTransactionDataIndex;

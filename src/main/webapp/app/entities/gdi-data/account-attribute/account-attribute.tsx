import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Input, InputGroup, FormGroup, Form, Row, Col, Table } from 'reactstrap';
import { translate, TextFormat, getSortState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IAccountAttribute } from 'app/shared/model/gdi-data/account-attribute.model';
import { searchEntities, getEntities } from './account-attribute.reducer';

export const AccountAttribute = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(location, ITEMS_PER_PAGE, 'id'), location.search)
  );

  const accountAttributeList = useAppSelector(state => state.accountAttribute.entities);
  const loading = useAppSelector(state => state.accountAttribute.loading);
  const totalItems = useAppSelector(state => state.accountAttribute.totalItems);

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
      <h2 id="account-attribute-heading" data-cy="AccountAttributeHeading">
        Account Attributes
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh list
          </Button>
          <Link to="/account-attribute/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Account Attribute
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
        {accountAttributeList && accountAttributeList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  ID <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('reportingDate')}>
                  Reporting Date <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('customerNumber')}>
                  Customer Number <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('accountContractNumber')}>
                  Account Contract Number <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('accountName')}>
                  Account Name <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('accountOpeningDate')}>
                  Account Opening Date <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('accountClosingDate')}>
                  Account Closing Date <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('debitInterestRate')}>
                  Debit Interest Rate <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('creditInterestRate')}>
                  Credit Interest Rate <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('sanctionedAccountLimitFcy')}>
                  Sanctioned Account Limit Fcy <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('sanctionedAccountLimitLcy')}>
                  Sanctioned Account Limit Lcy <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('accountStatusChangeDate')}>
                  Account Status Change Date <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('expiryDate')}>
                  Expiry Date <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Bank Code <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Branch Code <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Account Ownership Type <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {accountAttributeList.map((accountAttribute, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/account-attribute/${accountAttribute.id}`} color="link" size="sm">
                      {accountAttribute.id}
                    </Button>
                  </td>
                  <td>
                    {accountAttribute.reportingDate ? (
                      <TextFormat type="date" value={accountAttribute.reportingDate} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{accountAttribute.customerNumber}</td>
                  <td>{accountAttribute.accountContractNumber}</td>
                  <td>{accountAttribute.accountName}</td>
                  <td>
                    {accountAttribute.accountOpeningDate ? (
                      <TextFormat type="date" value={accountAttribute.accountOpeningDate} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {accountAttribute.accountClosingDate ? (
                      <TextFormat type="date" value={accountAttribute.accountClosingDate} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{accountAttribute.debitInterestRate}</td>
                  <td>{accountAttribute.creditInterestRate}</td>
                  <td>{accountAttribute.sanctionedAccountLimitFcy}</td>
                  <td>{accountAttribute.sanctionedAccountLimitLcy}</td>
                  <td>
                    {accountAttribute.accountStatusChangeDate ? (
                      <TextFormat type="date" value={accountAttribute.accountStatusChangeDate} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {accountAttribute.expiryDate ? (
                      <TextFormat type="date" value={accountAttribute.expiryDate} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {accountAttribute.bankCode ? (
                      <Link to={`/institution-code/${accountAttribute.bankCode.id}`}>{accountAttribute.bankCode.institutionCode}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {accountAttribute.branchCode ? (
                      <Link to={`/bank-branch-code/${accountAttribute.branchCode.id}`}>{accountAttribute.branchCode.branchCode}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {accountAttribute.accountOwnershipType ? (
                      <Link to={`/account-ownership-type/${accountAttribute.accountOwnershipType.id}`}>
                        {accountAttribute.accountOwnershipType.accountOwnershipType}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button
                        tag={Link}
                        to={`/account-attribute/${accountAttribute.id}`}
                        color="info"
                        size="sm"
                        data-cy="entityDetailsButton"
                      >
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/account-attribute/${accountAttribute.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/account-attribute/${accountAttribute.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
          !loading && <div className="alert alert-warning">No Account Attributes found</div>
        )}
      </div>
      {totalItems ? (
        <div className={accountAttributeList && accountAttributeList.length > 0 ? '' : 'd-none'}>
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

export default AccountAttribute;

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import api from '../../services/api';

import Container from '../../components/Container';
import { Loading, Owner, IssueList, IssueState, Pagination } from './styles';

export default class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    repository: {},
    issues: [],
    loading: true,
    issueState: 'all',
    pageState: 1,
    perPage: 5,
  };

  async componentDidMount() {
    const { match } = this.props;

    console.log('chamei o DidMount');

    const repoName = decodeURIComponent(match.params.repository);

    const { pageState, issueState, perPage } = this.state;

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: issueState,
          per_page: perPage,
          page: pageState,
        },
      }),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: null,
    });
  }

  async componentDidUpdate(_, prevState) {
    const { issueState, pageState } = this.state;

    if (
      prevState.issueState !== issueState ||
      prevState.pageState !== pageState
    ) {
      this.handleBuscaIssues();
    }
  }

  handleBuscaIssues = async () => {
    const { match } = this.props;
    const { issueState, pageState, perPage } = this.state;

    console.log(issueState);

    console.log(pageState);

    const repoName = decodeURIComponent(match.params.repository);

    const issues = await api.get(`/repos/${repoName}/issues`, {
      params: {
        state: issueState,
        per_page: perPage,
        page: pageState,
      },
    });

    this.setState({
      issues: issues.data,
      issueState,
    });
  };

  handlePrevClick = async () => {
    const { pageState } = this.state;

    if (pageState > 1) {
      const newPageState = pageState - 1;
      this.setState({
        pageState: newPageState,
      });
    }
  };

  handleNextClick = async () => {
    const { pageState } = this.state;

    if (pageState >= 1) {
      const newPageState = pageState + 1;
      this.setState({
        pageState: newPageState,
      });
    }
  };

  render() {
    const { repository, issues, loading, issueState, pageState } = this.state;

    if (loading) {
      return <Loading>Carregando</Loading>;
    }

    return (
      <Container>
        <Owner>
          <Link to="/"> Voltar aos repositórios</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>
        <IssueState state={issueState}>
          <button
            type="button"
            onClick={() => this.setState({ issueState: 'all' })}
          >
            all
          </button>
          <button
            type="button"
            onClick={() => this.setState({ issueState: 'open' })}
            value={2}
          >
            Open
          </button>
          <button
            type="button"
            value={3}
            onClick={() => this.setState({ issueState: 'closed' })}
          >
            Close
          </button>
        </IssueState>
        <IssueList>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssueList>
        <Pagination pageState={pageState}>
          <button type="button" onClick={this.handlePrevClick}>
            <FaArrowLeft />
          </button>
          <button type="button" onClick={this.handleNextClick}>
            <FaArrowRight />
          </button>
        </Pagination>
      </Container>
    );
  }
}

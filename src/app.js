/* eslint-disable react/prefer-stateless-function */
import React, { PureComponent, PropTypes } from 'react';
import { Layout } from 'antd';
import Header from './widgets/Header';
import steem from '@steemit/steem-js';

if (process.env.CHAIN_PREFIX) {
  steem.config.set('address_prefix', process.env.CHAIN_PREFIX);
}

if (process.env.CHAIN_ID) {
  steem.config.set('chain_id', process.env.CHAIN_ID);
}

export default class App extends PureComponent {
  static propTypes = {
    children: PropTypes.shape(),
    auth: PropTypes.shape({
      user: PropTypes.shape({
        name: PropTypes.string,
      }),
    }),
  }

  render() {
    const { children, auth } = this.props;
    return (
      <Layout>
        <Layout.Header style={{ borderBottom: '1px solid #E9E7E7' }}>
          <Header username={this.props.auth.user.name} />
        </Layout.Header>
        <Layout.Content>
          {React.cloneElement(
            children,
            { auth }
          )}
        </Layout.Content>
      </Layout>
    );
  }
}

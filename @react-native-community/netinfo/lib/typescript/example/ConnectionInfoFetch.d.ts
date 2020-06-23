/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */
import * as React from 'react';
interface State {
    connectionInfo: string;
}
export default class ConnectionInfoCurrent extends React.Component<{}, State> {
    state: {
        connectionInfo: string;
    };
    componentDidMount(): void;
    _fetchState: () => Promise<void>;
    render(): JSX.Element;
}
export {};

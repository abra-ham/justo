import React from 'react';
import { render } from 'react-dom';

import PublicRoutes from './PublicRoutes';

const rootElement = document.getElementById('app');

render(<PublicRoutes />, rootElement);

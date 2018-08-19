import React from 'react';
import Game from './Game';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
  shallow(<Game />);
});

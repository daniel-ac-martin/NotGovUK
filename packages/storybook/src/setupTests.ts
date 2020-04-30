import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { h, mount, shallow } from './test-helpers';

configure({ adapter: new Adapter() });

global.h = h;
global.mount = mount;
global.shallow = shallow;

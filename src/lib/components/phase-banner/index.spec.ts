import PhaseBanner from './';

describe('PhaseBanner', () => {
  describe('when given a phase property and children', () => {
    const phaseBanner = h(PhaseBanner, { phase: 'Alpha' }, 'Omega');
    const component = shallow(phaseBanner);

    it('contains a Tag', () => expect(component.find('Tag').length).toEqual(1));
    it('contains the children provided', () => expect(component.text()).toContain('Omega'));
  });
});

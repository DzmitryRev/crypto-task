import { ComponentStory, ComponentMeta } from '@storybook/react';
import {
  MemoryRouter, Route, Routes,
} from 'react-router-dom';
import Modal from '../components/Modal/Modal';
import ButtonLink from '../components/Link/Link';

export default {
  title: 'Modal',
  component: Modal,
  args: {
    children: '',
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <ButtonLink color="green" path="/modal">
          open modal
        </ButtonLink>
        <Routes>
          <Route path="/modal" element={<Story />} />
        </Routes>
      </MemoryRouter>
    ),
  ],
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />;

export const Default = Template.bind({});
Default.args = {
  type: 'default',
};

export const Minify = Template.bind({});
Minify.args = {
  type: 'minify',
};

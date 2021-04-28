import type { AxiosStatic } from 'axios';

const mockAxios = jest.createMockFromModule<AxiosStatic>('axios');

mockAxios.create = jest.fn(() => mockAxios);

export default mockAxios;

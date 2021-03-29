import axios from 'axios';
import config from 'config';
import { StatusCodes } from 'http-status-codes';
import { LoggerInstance } from 'winston';

export type Address = {
  fullAddress: string;
  street1: string;
  street2?: string;
  town: string;
  county?: string;
  postcode: string;
};

export const getAddressesFromPostcode = async (postcode: string, logger: LoggerInstance): Promise<Address[]> => {
  try {
    const response = await axios.get('postcode', {
      baseURL: `${config.get('services.postcodeLookup.url')}/addresses`,
      headers: {
        accept: 'application/json',
      },
      params: {
        key: config.get('services.postcodeLookup.token'),
        postcode,
      },
    });

    if (!response.data?.results) {
      return [];
    }

    return response.data.results.map(
      ({
        DPA: {
          ADDRESS,
          BUILDING_NUMBER = '',
          SUB_BUILDING_NAME = '',
          BUILDING_NAME = '',
          ORGANISATION_NAME = '',
          THOROUGHFARE_NAME = '',
          DEPENDENT_THOROUGHFARE_NAME = '',
          DEPENDENT_LOCALITY = '',
          DOUBLE_DEPENDENT_LOCALITY = '',
          POST_TOWN,
          LOCAL_CUSTODIAN_CODE_DESCRIPTION = '',
          POSTCODE,
        },
      }) => ({
        fullAddress: ADDRESS,
        street1: [
          BUILDING_NUMBER,
          [ORGANISATION_NAME, SUB_BUILDING_NAME, BUILDING_NAME, THOROUGHFARE_NAME].filter(Boolean).join(', '),
        ]
          .filter(Boolean)
          .join(' '),
        street2: [DEPENDENT_THOROUGHFARE_NAME, DEPENDENT_LOCALITY, DOUBLE_DEPENDENT_LOCALITY]
          .filter(Boolean)
          .join(', '),
        town: POST_TOWN,
        county: LOCAL_CUSTODIAN_CODE_DESCRIPTION,
        postcode: POSTCODE,
      })
    );
  } catch (err) {
    if (err.response?.status === StatusCodes.UNAUTHORIZED) {
      logger.error('Postcode lookup key is invalid');
    } else if (!err.response?.data?.error?.message.includes('postcode must contain a minimum')) {
      logger.error('Postcode lookup service error', err);
    }
    return [];
  }
};

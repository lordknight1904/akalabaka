import { enabledLanguages, localizationData } from '../../../Intl/setup';
import { SWITCH_LANGUAGE } from './IntlActions';
import {REHYDRATE} from 'redux-persist/constants'

const initLocale = global.navigator && global.navigator.language || 'en';

const initialState = {
  locale: initLocale,
  enabledLanguages,
  ...(localizationData[initLocale] || {}),
};

const IntlReducer = (state = initialState, action) => {
  switch (action.type) {
    case REHYDRATE:
      const incoming = action.payload.app;
      console.log(incoming);
      return {...state};
    case SWITCH_LANGUAGE: {
      const { type, ...actionWithoutType } = action; // eslint-disable-line
      return { ...state, ...actionWithoutType };
    }

    default:
      return state;
  }
};

export default IntlReducer;
